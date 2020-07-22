const pkg = require('../../../package.json');
const { doesObjectHaveProperty } = require('../javascript-utilities');
const { logger } = require('../messaging/logging');
const OpenApiClient = require('../open-api-client');
const TwilioApiBrowser = require('./api-browser');
const TwilioSchemaConverter = require('../api-schema/twilio-converter');

// Special snowflakes
const TwilioApiFlags = {
  ACCOUNT_SID: 'AccountSid',
  PAGE_SIZE: 'PageSize',
  LIMIT: 'Limit',
  NO_LIMIT: 'NoLimit',
};

class TwilioApiClient {
  constructor(username, password, opts) {
    opts = opts || {};

    this.username = username;
    this.password = password;
    this.accountSid = opts.accountSid || this.username;
    this.edge = opts.edge;
    this.region = opts.region;

    this.apiClient = new OpenApiClient({
      httpClient: opts.httpClient,
      apiBrowser: new TwilioApiBrowser(),
      converter: new TwilioSchemaConverter(),
    });

    if (!this.username) {
      throw new Error('username is required');
    }

    if (!this.password) {
      throw new Error('password is required');
    }

    if (!this.accountSid.startsWith('AC')) {
      throw new Error('accountSid must start with AC');
    }
  }

  async create(opts) {
    opts.method = 'post';

    const { body } = await this.request(opts);

    return body;
  }

  async fetch(opts) {
    opts.method = 'get';

    const { body } = await this.request(opts);

    return body;
  }

  async update(opts) {
    opts.method = 'post';

    const { body } = await this.request(opts);

    return body;
  }

  async remove(opts) {
    opts.method = 'delete';

    const { statusCode } = await this.request(opts);

    return statusCode === 204;
  }

  async list(opts) {
    const items = [];
    const limit = this.getLimit(opts.data);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      opts.method = 'get';

      // eslint-disable-next-line no-await-in-loop
      const { body } = await this.request(opts);
      const pageItems = this.getResponseItems(body);

      // Append all the items from the next page.
      items.push(...pageItems);

      if (limit !== undefined && items.length >= limit) {
        logger.debug(`Limiting result set to ${limit} record(s)`);
        return items.slice(0, limit);
      }

      // If there's another page of results, "Let's Get It".
      const nextPageUri = (body.meta && body.meta.nextPageUrl) || body.nextPageUri;

      if (!nextPageUri) {
        break;
      }

      opts = {
        domain: opts.domain,
        host: opts.host,
        path: opts.path,
        uri: nextPageUri,
      };
    }

    return items;
  }

  getLimit(options) {
    // 'no-limit' outranks 'limit' so begone.
    if (!options || options[TwilioApiFlags.NO_LIMIT]) {
      return undefined;
    }

    const limit = options[TwilioApiFlags.LIMIT];

    if (limit !== undefined) {
      if (options[TwilioApiFlags.PAGE_SIZE] > limit) {
        logger.debug(`Reducing page size to ${limit}`);
        options[TwilioApiFlags.PAGE_SIZE] = limit;
      }
    }

    return limit;
  }

  getResponseItems(responseBody) {
    // Find any properties that are arrays. We expect this to be exactly 1.
    const arrayProps = Object.values(responseBody).filter(Array.isArray);

    if (arrayProps.length === 1) {
      return arrayProps[0];
    }

    logger.debug(`Response does not contain a single list item: ${Object.keys(responseBody).join(', ')}`);
    return [];
  }

  /**
   * Makes a request to the Twilio API using the configured http client.
   * Authentication information is automatically added if none is provided.
   *
   * @param {object} opts - The options argument
   * @param {string} opts.method - The http method
   * @param {string} opts.path - The request path
   * @param {string} [opts.host] - The request host
   * @param {string} [opts.edge] - The request edge. Defaults to none.
   * @param {string} [opts.region] - The request region. Default to us1 if edge defined
   * @param {string} [opts.uri] - The request uri
   * @param {string} [opts.username] - The username used for auth
   * @param {string} [opts.password] - The password used for auth
   * @param {object} [opts.headers] - The request headers
   * @param {object} [opts.data] - The request data
   * @param {object} [opts.pathParams] - The request path parameter values
   * @param {int} [opts.timeout] - The request timeout in milliseconds
   * @param {boolean} [opts.allowRedirects] - Should the client follow redirects
   */
  async request(opts) {
    opts = { ...opts };

    opts.username = opts.username || this.username;
    opts.password = opts.password || this.password;
    opts.headers = opts.headers || {};
    opts.data = opts.data || {};
    opts.pathParams = opts.pathParams || {};

    opts.headers['User-Agent'] = `twilio-api-client/${pkg.version} (node.js ${process.version})`;
    opts.headers['Accept-Charset'] = 'utf-8';

    if (opts.method.toLowerCase() === 'post' && !opts.headers['Content-Type']) {
      opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (!opts.headers.Accept) {
      opts.headers.Accept = 'application/json';
    }

    if (!opts.uri) {
      if (
        opts.path.includes(TwilioApiFlags.ACCOUNT_SID) &&
        !doesObjectHaveProperty(opts.pathParams, TwilioApiFlags.ACCOUNT_SID)
      ) {
        opts.pathParams[TwilioApiFlags.ACCOUNT_SID] = this.accountSid;
      }
    }

    opts.edge = opts.edge || this.edge;
    opts.region = opts.region || this.region;
    return this.apiClient.request(opts);
  }
}

module.exports = {
  TwilioApiClient,
  TwilioApiFlags,
};
