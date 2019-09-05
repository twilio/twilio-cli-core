const { Command, flags } = require('@oclif/command');
const { CLIError } = require('@oclif/errors');
const { Config, ConfigData } = require('../services/config');
const { TwilioCliError } = require('../services/error');
const { UNEXPECTED_ERROR } = require('../services/messaging/help-messages');
const { logger, LoggingLevel } = require('../services/messaging/logging');
const { OutputFormats } = require('../services/output-formats');
const { SecureStorage } = require('../services/secure-storage');
let inquirer; // We'll lazy-load this only when it's needed.

const DEFAULT_LOG_LEVEL = 'info';
const DEFAULT_OUTPUT_FORMAT = 'columns';

class BaseCommand extends Command {
  constructor(argv, config) {
    super(argv, config);
    this.configFile = new Config('');
    this.userConfig = new ConfigData();
    this.secureStorage = new SecureStorage();
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

    this.logger.debug('Config File: ' + this.configFile.filePath);

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
    if (error instanceof CLIError) {
      return super.catch(error);
    }

    if (error instanceof TwilioCliError) {
      // User/API errors
      this.logger.error(error.message);
      this.logger.debug(error.stack);
      this.exit(error.exitCode || 1);
    } else {
      // System errors
      this.logger.error(UNEXPECTED_ERROR);
      this.logger.debug(error.message);
      this.logger.debug(error.stack);
      this.exit(1);
    }
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

    process.stdout.write(this.outputProcessor(dataArray, limitedData || dataArray, options) + '\n');
  }

  getLimitedData(dataArray, properties) {
    const invalidPropertyNames = new Set();
    const propNames = properties.split(',').map(p => p.trim());
    const limitedData = dataArray.map(fullItem => {
      const limitedItem = {};

      propNames.forEach(p => {
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
      invalidPropertyNames.forEach(p => {
        warn(`"${p}" is not a valid property name.`);
      });
    }

    return limitedData;
  }

  getPromptMessage(message) {
    // Drop the trailing period and put a colon at the end of the message.
    return message.trim().replace(/[.:]?$/, ':');
  }
}

BaseCommand.flags = {
  'cli-log-level': flags.enum({
    char: 'l',
    helpLabel: '-l',
    default: DEFAULT_LOG_LEVEL,
    options: Object.keys(LoggingLevel),
    description: 'Level of logging messages.'
  }),

  'cli-output-format': flags.enum({
    char: 'o',
    helpLabel: '-o',
    default: DEFAULT_OUTPUT_FORMAT,
    options: Object.keys(OutputFormats),
    description: 'Format of command output.'
  })
};

module.exports = BaseCommand;
