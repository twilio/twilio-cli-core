const http_ = require('http');
const https = require('https');
const os = require('os');

const HttpsProxyAgent = require('https-proxy-agent');
const qs = require('qs');

const pkg = require('../../package.json');
const { TwilioCliError } = require('../services/error');
const { NETWORK_ERROR } = require('../services/messaging/help-messages');

const NETWORK_ERROR_CODES = new Set(['ETIMEDOUT', 'ESOCKETTIMEDOUT', 'ECONNABORTED']);

const STANDARD_HEADERS = ['user-agent', 'accept-charset', 'connection', 'authorization', 'accept', 'content-type'];

class CliRequestClient {
  constructor(commandName, logger, http) {
    this.commandName = commandName;
    this.logger = logger;
    this.http = http || require('axios');
    if (process.env.HTTP_PROXY) {
      /*
       * If environment variable HTTP_PROXY is set,
       * add an appropriate httpsAgent to axios.
       */
      this.http.defaults.proxy = false;
      this.http.defaults.httpsAgent = new HttpsProxyAgent(process.env.HTTP_PROXY);
    }
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
      const b64Auth = Buffer.from(`${opts.username}:${opts.password}`).toString('base64');
      headers.Authorization = `Basic ${b64Auth}`;
    }

    const componentInfo = (headers['User-Agent'] || '').replace(' (', '|').replace(')', '').split('|');
    componentInfo.push(`${os.platform()} ${os.release()} ${os.arch()}`);
    componentInfo.push(this.commandName);
    headers['User-Agent'] = `${pkg.name}/${pkg.version} (${componentInfo.join(', ')})`;

    const options = {
      timeout: opts.timeout || 30000,
      maxRedirects: opts.allowRedirects ? 10 : 0,
      url: opts.uri,
      method: opts.method,
      headers,
      httpAgent: opts.forever ? new http_.Agent({ keepAlive: true }) : undefined,
      httpsAgent: opts.forever ? new https.Agent({ keepAlive: true }) : undefined,
      validateStatus: (status) => {
        return status >= 100 && status < 600;
      },
    };

    if (opts.data) {
      options.data = qs.stringify(opts.data, { arrayFormat: 'repeat' });
    }

    if (opts.params) {
      options.params = opts.params;
      options.paramsSerializer = (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      };
    }

    this.lastRequest = options;
    this.logRequest(options);

    try {
      const response = await this.http(options);

      this.logger.debug(`response.statusCode: ${response.status}`);
      this.logger.debug(`response.headers: ${JSON.stringify(response.headers)}`);

      if (response.status < 200 || response.status >= 400) {
        const { message, code } = this.formatErrorMessage(response.data);
        throw new TwilioCliError(message, code, response.data);
      }

      return {
        body: response.data,
        statusCode: response.status,
        headers: response.headers,
      };
    } catch (error) {
      if (NETWORK_ERROR_CODES.has(error.code)) {
        throw new TwilioCliError(NETWORK_ERROR);
      }

      throw error;
    }
  }

  logRequest(options) {
    this.logger.debug('-- BEGIN Twilio API Request --');
    this.logger.debug(`${options.method} ${options.url}`);

    if (options.data) {
      this.logger.debug('Form data:');
      this.logger.debug(options.data);
    }

    if (options.params && Object.keys(options.params).length > 0) {
      this.logger.debug('Querystring:');
      this.logger.debug(options.params);
    }

    const customHeaders = Object.keys(options.headers).filter((header) => {
      return !STANDARD_HEADERS.includes(header.toLowerCase());
    });
    if (customHeaders) {
      this.logger.debug('Custom HTTP Headers:');
      customHeaders.forEach((header) => this.logger.debug(`${header}: ${options.headers[header]}`));
    }

    this.logger.debug(`User-Agent: ${options.headers['User-Agent']}`);
    this.logger.debug('-- END Twilio API Request --');
  }

  /* eslint-disable camelcase */
  // In the rare event parameters are missing, display a readable message
  formatErrorMessage({ code, message, more_info, details }) {
    const moreInfoMessage = more_info ? `See ${more_info} for more info.` : '';
    const error = {
      message: `Error code ${code || 'N/A'} from Twilio: ${message || 'No message provided'}. ${moreInfoMessage}`,
      code,
      details,
    };

    return error;
  }
  /* eslint-enable camelcase */
}

module.exports = CliRequestClient;
