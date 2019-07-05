const pkg = require('../../../package.json');
const { TwilioCliError } = require('../error');
const { doesObjectHaveProperty } = require('../javascript-utilities');
const { logger } = require('../messaging/logging');
const OpenApiClient = require('../open-api-client');
const TwilioApiBrowser = require('./api-browser');
const TwilioSchemaConverter = require('../api-schema/twilio-converter');

// AccountSid is a special snowflake
const ACCOUNT_SID_FLAG = 'AccountSid';

class TwilioApiClient {
  constructor(username, password, opts) {
    opts = opts || {};

    this.username = username;
    this.password = password;
    this.accountSid = opts.accountSid || this.username;
    this.region = opts.region;

    this.apiClient = new OpenApiClient({
      httpClient: opts.httpClient,
      apiBrowser: new TwilioApiBrowser(),
      converter: new TwilioSchemaConverter()
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
    opts.method = 'get';

    const { body } = await this.request(opts);
    const items = this.getResponseItems(body);

    // If there's another page of results, "Let's Get It".
    const nextPageUri = (body.meta && body.meta.nextPageUrl) || body.nextPageUri;

    if (nextPageUri) {
      const nextItems = await this.list({
        domain: opts.domain,
        host: opts.host,
        path: opts.path,
        uri: nextPageUri
      });

      // Append all the items from the subsequent page(s).
      items.push(...nextItems);
    }

    return items;
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
   * @param {string} [opts.region] - The request region
   * @param {string} [opts.uri] - The request uri
   * @param {string} [opts.username] - The username used for auth
   * @param {string} [opts.password] - The password used for auth
   * @param {object} [opts.headers] - The request headers
   * @param {object} [opts.data] - The request data
   * @param {int} [opts.timeout] - The request timeout in milliseconds
   * @param {boolean} [opts.allowRedirects] - Should the client follow redirects
   */
  async request(opts) {
    opts = Object.assign({}, opts);

    opts.username = opts.username || this.username;
    opts.password = opts.password || this.password;
    opts.region = opts.region || this.region;
    opts.headers = opts.headers || {};
    opts.data = opts.data || {};

    opts.headers['User-Agent'] = `twilio-api-client/${pkg.version} (node.js ${process.version})`;
    opts.headers['Accept-Charset'] = 'utf-8';

    if (opts.method.toLowerCase() === 'post' && !opts.headers['Content-Type']) {
      opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (!opts.headers.Accept) {
      opts.headers.Accept = 'application/json';
    }

    if (!opts.uri) {
      if (opts.path.includes(ACCOUNT_SID_FLAG) && !doesObjectHaveProperty(opts.data, ACCOUNT_SID_FLAG)) {
        opts.data[ACCOUNT_SID_FLAG] = this.accountSid;
      }
    }

    const { statusCode, body } = await this.apiClient.request(opts);

    if (statusCode < 200 || statusCode >= 300) {
      const parsed = JSON.parse(body);
      throw new TwilioCliError(`Error code ${parsed.code} from Twilio: ${parsed.message}. See ${parsed.more_info} for more info.`, parsed.code);
    }

    return { statusCode, body };
  }
}

module.exports = TwilioApiClient;
