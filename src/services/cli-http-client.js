const os = require('os');
const pkg = require('../../package.json');
const { TwilioCliError } = require('../services/error');
const { NETWORK_ERROR } = require('../services/messaging/help-messages');

const NETWORK_ERROR_CODES = new Set(['ETIMEDOUT', 'ESOCKETTIMEDOUT']);

class CliRequestClient {
  constructor(commandName, logger, http) {
    this.commandName = commandName;
    this.logger = logger;
    this.http = require('util').promisify(http || require('request'));
  }

  /**
   * Make an HTTP request.
   *
   * @param {object} opts - The options argument
   * @param {string} opts.method - The http method
   * @param {string} opts.uri - The request uri
   * @param {string} [opts.username] - The username used for auth
   * @param {string} [opts.password] - The password used for auth
   * @param {object} [opts.headers] - The request headers
   * @param {object} [opts.params] - The request params
   * @param {object} [opts.data] - The request data
   * @param {int} [opts.timeout=30000] - The request timeout in milliseconds
   * @param {boolean} [opts.allowRedirects] - Should the client follow redirects
   * @param {boolean} [opts.forever] - Set to true to use the forever-agent
   */
  async request(opts) {
    opts = opts || {};
    if (!opts.method) {
      throw new Error('http method is required');
    }

    if (!opts.uri) {
      throw new Error('uri is required');
    }

    const headers = opts.headers || {};

    if (!headers.Connection && !headers.connection) {
      headers.Connection = 'close';
    }

    if (opts.username && opts.password) {
      const b64Auth = Buffer.from(opts.username + ':' + opts.password).toString('base64');
      headers.Authorization = 'Basic ' + b64Auth;
    }

    const componentInfo = (headers['User-Agent'] || '')
      .replace(' (', '|')
      .replace(')', '')
      .split('|');
    componentInfo.push(os.platform() + ' ' + os.release() + ' ' + os.arch());
    componentInfo.push(this.commandName);
    headers['User-Agent'] = pkg.name + '/' + pkg.version + ' (' + componentInfo.join(', ') + ')';

    const options = {
      timeout: opts.timeout || 30000,
      followRedirect: opts.allowRedirects || false,
      url: opts.uri,
      method: opts.method,
      headers,
      forever: opts.forever !== false
    };

    this.logger.debug('-- BEGIN Twilio API Request --');
    this.logger.debug(options.method + ' ' + options.url);

    if (opts.data) {
      options.formData = opts.data;
      if (options.formData) {
        this.logger.debug('Form data:');
        this.logger.debug(options.formData);
      }
    }

    if (opts.params) {
      options.qs = opts.params;
      options.useQuerystring = true;
      if (options.qs && Object.keys(options.qs).length > 0) {
        this.logger.debug('Querystring:');
        this.logger.debug(options.qs);
      }
    }
    this.logger.debug('User-Agent: ' + options.headers['User-Agent']);
    this.logger.debug('-- END Twilio API Request --');

    this.lastRequest = options;

    try {
      const response = await this.http(options);

      this.logger.debug('response.statusCode: ' + response.statusCode);
      this.logger.debug('response.headers: ' + JSON.stringify(response.headers));

      return response;
    } catch (error) {
      if (NETWORK_ERROR_CODES.has(error.code)) {
        throw new TwilioCliError(NETWORK_ERROR);
      }

      throw error;
    }
  }
}

module.exports = CliRequestClient;
