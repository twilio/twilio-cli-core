const { logger } = require('./messaging/logging');
const { camelCase, capitalize } = require('./naming-conventions');
const { doesObjectHaveProperty, translateKeys } = require('./javascript-utilities');
const JsonSchemaConverter = require('./api-schema/json-converter');

class OpenApiClient {
  constructor({ httpClient, apiBrowser, converter }) {
    this.httpClient = httpClient;
    this.apiBrowser = apiBrowser;
    this.converter = converter || new JsonSchemaConverter();
  }

  /**
   * Makes a request to the Twilio API using the configured http client.
   * Authentication information is automatically added if none is provided.
   *
   * @param {object} opts - The options argument
   * @param {string} opts.method - The http method
   * @param {string} opts.path - The request path
   * @param {string} opts.domain - The request domain
   * @param {string} [opts.host] - The request host
   * @param {string} [opts.uri] - The request uri
   * @param {object} [opts.data] - The request data
   */
  async request(opts) {
    opts = opts || {};

    const domain = this.apiBrowser.domains[opts.domain];
    const path = domain.paths[opts.path];
    const operation = path.operations[opts.method];

    const isPost = (opts.method.toLowerCase() === 'post');
    const params = this.getParams(opts, operation);

    if (!opts.uri) {
      opts.uri = this.getUri(opts);
    }

    if (!opts.host) {
      opts.host = path.server;
    }

    const response = await this.httpClient.request({
      ...opts,
      uri: opts.host + opts.uri,
      params: (isPost ? null : params),
      data: (isPost ? params : null)
    });

    return this.parseResponse(domain, operation, response, opts);
  }

  getParams(opts, operation) {
    opts.data = translateKeys(opts.data, camelCase);
    opts.data = translateKeys(opts.data, capitalize);

    const params = {};
    operation.parameters.forEach(parameter => {
      if (parameter.in === 'query' && doesObjectHaveProperty(opts.data, parameter.name)) {
        params[parameter.name] = opts.data[parameter.name];
      }
    });

    return params;
  }

  getUri(opts) {
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

    let node = domain;
    local.split('/').filter(n => n).forEach(nodeName => {
      node = node[nodeName];
    });

    return node;
  }
}

module.exports = OpenApiClient;
