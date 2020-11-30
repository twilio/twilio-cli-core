const url = require('url');

const { logger } = require('./messaging/logging');
const { doesObjectHaveProperty } = require('./javascript-utilities');
const JsonSchemaConverter = require('./api-schema/json-converter');

class OpenApiClient {
  constructor({ httpClient, apiBrowser, converter }) {
    this.httpClient = httpClient;
    this.apiBrowser = apiBrowser;
    this.converter = converter || new JsonSchemaConverter();
  }

  async request(opts) {
    opts = { ...opts };

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

    const isPost = opts.method.toLowerCase() === 'post';
    const params = this.getParams(opts, operation);

    if (!opts.uri) {
      opts.uri = this.getUri(opts);
    }

    // If the URI is relative, determine the host and prepend it.
    if (opts.uri.startsWith('/')) {
      if (!opts.host) {
        opts.host = path.server;
      }
      opts.uri = opts.host + opts.uri;
    }

    const uri = new url.URL(opts.uri);
    uri.hostname = this.getHost(uri.hostname, opts);
    opts.uri = uri.href;

    opts.params = isPost ? null : params;
    opts.data = isPost ? params : null;

    const response = await this.httpClient.request(opts);

    return this.parseResponse(domain, operation, response, opts);
  }

  getParams(opts, operation) {
    const params = {};
    (operation.parameters || []).forEach((parameter) => {
      /*
       * Build the actual request params from the spec's query parameters. This
       * effectively drops all params that are not in the spec.
       */
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
    /*
     * Evaluate the request path by replacing path parameters with their value
     * from the request data.
     */
    return opts.path.replace(/{(.+?)}/g, (fullMatch, pathNode) => {
      let value = '';

      if (doesObjectHaveProperty(opts.pathParams, pathNode)) {
        value = opts.pathParams[pathNode];
        value = encodeURIComponent(value);
      }

      logger.debug(`pathNode=${pathNode}, value=${value}`);

      return value;
    });
  }

  getHost(host, opts) {
    if (opts.region || opts.edge) {
      const domain = host.split('.').slice(-2).join('.');
      const prefix = host.split(`.${domain}`)[0];

      // eslint-disable-next-line prefer-const
      let [product, edge, region] = prefix.split('.');
      if (edge && !region) {
        region = edge;
        edge = undefined;
      }
      edge = opts.edge || edge;
      region = opts.region || region || (opts.edge && 'us1');
      return [product, edge, region, domain].filter((part) => part).join('.');
    }
    return host;
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
      const statusCodeRange = `${statusCode.toString()[0]}XX`;
      response = operation.responses[statusCodeRange];

      if (!response) {
        logger.debug(`Response schema not found for status code ${statusCode} (${statusCodeRange})`);
        return undefined;
      }
    }

    const { schema } = response.content[contentType];

    return this.evaluateRefs(schema, domain);
  }

  convertBody(responseBody, schema) {
    return this.converter.convertSchema(schema, responseBody);
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
    local
      .split('/')
      .filter((n) => n)
      .forEach((nodeName) => {
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
