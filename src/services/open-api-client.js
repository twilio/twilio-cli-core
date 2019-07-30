const { logger } = require('./messaging/logging');
const { pascalCase } = require('./naming-conventions');
const { doesObjectHaveProperty, translateKeys } = require('./javascript-utilities');
const JsonSchemaConverter = require('./api-schema/json-converter');

class OpenApiClient {
  constructor({ httpClient, apiBrowser, converter }) {
    this.httpClient = httpClient;
    this.apiBrowser = apiBrowser;
    this.converter = converter || new JsonSchemaConverter();
  }

  async request(opts) {
    opts = Object.assign({}, opts);

    const domain = this.apiBrowser.domains[opts.domain];

    if (!domain) {
      throw new Error(`Domain name not found: ${opts.domain}`);
    }

    const path = domain.paths[opts.path];

    if (!path) {
      throw new Error(`Path not found: ${opts.domain}.${opts.path}`);
    }

    const operation = path.operations[opts.method];

    if (!operation) {
      throw new Error(`Operation not found: ${opts.domain}.${opts.path}.${opts.method}`);
    }

    // Normalize the request data keys to pascal-case (i.e., upper camel-case).
    opts.data = translateKeys(opts.data, pascalCase);

    const isPost = (opts.method.toLowerCase() === 'post');
    const params = this.getParams(opts, operation);

    if (!opts.uri) {
      opts.uri = this.getUri(opts);
    }

    // If the URI is relative, determine the host and prepend it.
    if (opts.uri.startsWith('/')) {
      if (!opts.host) {
        opts.host = path.server;
      }

      if (opts.region) {
        const parts = opts.host.split('.');

        // From 'https://api.twilio.com/' to 'https://api.{region}.twilio.com/'
        if (parts.length > 1 && parts[1] !== opts.region) {
          parts.splice(1, 0, opts.region);
          opts.host = parts.join('.');
        }
      }

      opts.uri = opts.host + opts.uri;
    }

    opts.params = (isPost ? null : params);
    opts.data = (isPost ? params : null);

    const response = await this.httpClient.request(opts);

    return this.parseResponse(domain, operation, response, opts);
  }

  getParams(opts, operation) {
    const params = {};
    operation.parameters.forEach(parameter => {
      // Build the actual request params from the spec's query parameters. This
      // effectively drops all params that are not in the spec.
      if (parameter.in === 'query' && doesObjectHaveProperty(opts.data, parameter.name)) {
        let value = opts.data[parameter.name];

        if (parameter.schema.type === 'boolean') {
          value = value.toString();
        }

        params[parameter.name] = value;
      }
    });

    return params;
  }

  getUri(opts) {
    // Evaluate the request path by replacing path parameters with their value
    // from the request data.
    return opts.path.replace(/{(.+?)}/g, (fullMatch, pathNode) => {
      let value = '';

      if (doesObjectHaveProperty(opts.data, pathNode)) {
        value = opts.data[pathNode];
      }

      logger.debug(`pathNode=${pathNode}, value=${value}`);

      return value;
    });
  }

  parseResponse(domain, operation, response, requestOpts) {
    if (response.body) {
      const responseSchema = this.getResponseSchema(domain, operation, response.statusCode, requestOpts.headers.Accept);

      // If we were able to find the schema for the response body, convert it.
      if (responseSchema) {
        response.body = this.convertBody(response.body, responseSchema);
      }
    }

    return response;
  }

  getResponseSchema(domain, operation, statusCode, contentType) {
    let response = operation.responses[statusCode];

    if (!response) {
      const statusCodeRange = statusCode.toString()[0] + 'XX';
      response = operation.responses[statusCodeRange];

      if (!response) {
        logger.debug(`Response schema not found for status code ${statusCode} (${statusCodeRange})`);
        return;
      }
    }

    const schema = response.content[contentType].schema;

    return this.evaluateRefs(schema, domain);
  }

  convertBody(responseBody, schema) {
    const parsedBody = JSON.parse(responseBody);
    return this.converter.convertSchema(schema, parsedBody);
  }

  evaluateRefs(schema, domain) {
    if (!schema || typeof schema !== 'object') {
      return schema;
    }

    if (doesObjectHaveProperty(schema, '$ref')) {
      schema = this.getRef(schema.$ref, domain);
    }

    Object.entries(schema).forEach(([key, value]) => {
      schema[key] = this.evaluateRefs(value, domain);
    });

    return schema;
  }

  getRef(ref, domain) {
    // https://swagger.io/docs/specification/using-ref/
    const [remote, local] = ref.split('#');

    if (remote) {
      logger.debug(`Remote refs are not yet supported. Assuming local ref: ${remote}`);
    }

    let node = domain;
    local.split('/').filter(n => n).forEach(nodeName => {
      if (doesObjectHaveProperty(node, nodeName)) {
        node = node[nodeName];
      }
    });

    if (!node) {
      logger.debug(`Ref not found: ${ref}`);
    }

    return node;
  }
}

module.exports = OpenApiClient;
