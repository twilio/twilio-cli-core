const { Command, flags: oclifFlags } = require('@oclif/command');
const { CLIError } = require('@oclif/errors');

const pkg = require('../../package.json');
const MessageTemplates = require('../services/messaging/templates');
const { Config, ConfigData, PluginConfig } = require('../services/config');
const { TwilioCliError } = require('../services/error');
const { logger, LoggingLevel } = require('../services/messaging/logging');
const { OutputFormats } = require('../services/output-formats');
const { getCommandPlugin, requireInstall } = require('../services/require-install');
const { SecureStorage } = require('../services/secure-storage');
const { instanceOf } = require('../services/javascript-utilities');

let inquirer; // We'll lazy-load this only when it's needed.

const DEFAULT_LOG_LEVEL = 'info';
const DEFAULT_OUTPUT_FORMAT = 'columns';

class BaseCommand extends Command {
  constructor(argv, config) {
    super(argv, config);
    this.configFile = new Config('');
    this.userConfig = new ConfigData();
    this.secureStorage = new SecureStorage({ command: this });
  }

  get inquirer() {
    if (!inquirer) {
      inquirer = require('inquirer');
    }
    return inquirer;
  }

  async run() {
    const { args, flags } = this.parse(this.constructor);
    this.args = args;
    this.flags = flags;
    await this.loadConfig();

    this.outputProcessor = OutputFormats[this.flags['cli-output-format'] || DEFAULT_OUTPUT_FORMAT];

    this.logger = logger;
    this.logger.config.level = LoggingLevel[flags['cli-log-level'] || DEFAULT_LOG_LEVEL];

    this.logger.debug(`Config File: ${this.configFile.filePath}`);

    // Replace oclif's output commands
    this.log = this.logger.info;
    this.error = this.logger.error;
    this.warn = this.logger.warn;
  }

  async loadConfig() {
    this.configFile = new Config(this.config.configDir);
    this.userConfig = await this.configFile.load();
  }

  async catch(error) {
    if (!this.logger || instanceOf(error, CLIError)) {
      return super.catch(error);
    }

    if (instanceOf(error, TwilioCliError)) {
      // User/API errors
      if (this.flags['cli-output-format'] === 'json') {
        this.output(error.data);
      } else {
        this.logger.error(error.message);
        this.logger.debug(error.stack);
      }
      this.exit(error.exitCode || 1);
    } else {
      // System errors
      let url = '';
      try {
        url = this.getIssueUrl(getCommandPlugin(this));
      } catch (e) {
        // No-op
      }

      this.logger.error(MessageTemplates.unexpectedError({ url }));
      this.logger.debug(error.message);
      this.logger.debug(error.stack);
      this.exit(1);
    }

    throw error;
  }

  getIssueUrl(plugin) {
    const getPropertyUrl = (value) => value && (value.url || value);
    const getPackageUrl = (pjson) =>
      getPropertyUrl(pjson.bugs) || getPropertyUrl(pjson.homepage) || getPropertyUrl(pjson.repository);

    /*
     * If we found the plugin and an issue URL for it, use it. Otherwise
     * fallback to our own issue URL.
     */
    return (plugin && getPackageUrl(plugin.pjson)) || getPackageUrl(pkg);
  }

  /**
   * Drops the week day and timezone name from the result of Date.toString().
   *
   *   In: "Fri May 24 2019 11:43:11 GMT-0600 (MDT)"
   *   Out: "May 24 2019 11:43:11 GMT-0600"
   *
   * @param {string} value - date string to sanitize
   * @returns {string} the sanitized date string
   */
  sanitizeDateString(value) {
    return value.slice(4, 33);
  }

  output(fullData, properties, options) {
    const dataArray = fullData.constructor === Array ? fullData : [fullData];

    if (dataArray.length === 0) {
      this.logger.info('No results');
      return;
    }

    const limitedData = properties ? this.getLimitedData(dataArray, properties) : null;

    process.stdout.write(`${this.outputProcessor(dataArray, limitedData || dataArray, options)}\n`);
  }

  getLimitedData(dataArray, properties) {
    const invalidPropertyNames = new Set();
    const propNames = properties.split(',').map((p) => p.trim());
    const limitedData = dataArray.map((fullItem) => {
      const limitedItem = {};

      propNames.forEach((p) => {
        let propValue = fullItem[p];

        if (propValue === undefined) {
          invalidPropertyNames.add(p);
          return;
        }

        if (propValue instanceof Date) {
          const dateString = propValue.toString();
          propValue = this.sanitizeDateString(dateString);
        } else if (typeof propValue === 'object') {
          propValue = JSON.stringify(propValue);
        }

        limitedItem[p] = propValue;
      });

      return limitedItem;
    });

    if (invalidPropertyNames.size > 0) {
      const warn = this.logger.warn.bind(this.logger);
      invalidPropertyNames.forEach((p) => {
        warn(`"${p}" is not a valid property name.`);
      });
    }

    return limitedData;
  }

  getPromptMessage(message) {
    // Drop the trailing period and put a colon at the end of the message.
    return message.trim().replace(/[.:]?$/, ':');
  }

  async install(name) {
    return requireInstall(name, this);
  }

  get pluginConfig() {
    if (!this._pluginConfig) {
      const plugin = getCommandPlugin(this);
      this._pluginConfig = new PluginConfig(this.config.configDir, plugin.name);
    }
    return this._pluginConfig;
  }

  async getPluginConfig() {
    return this.pluginConfig.getConfig();
  }

  async setPluginConfig(config) {
    return this.pluginConfig.setConfig(config);
  }
}

BaseCommand.flags = {
  'cli-log-level': oclifFlags.enum({
    char: 'l',
    helpLabel: '-l',
    default: DEFAULT_LOG_LEVEL,
    options: Object.keys(LoggingLevel),
    description: 'Level of logging messages.',
  }),

  'cli-output-format': oclifFlags.enum({
    char: 'o',
    helpLabel: '-o',
    default: DEFAULT_OUTPUT_FORMAT,
    options: Object.keys(OutputFormats),
    description: 'Format of command output.',
  }),
};

module.exports = BaseCommand;
