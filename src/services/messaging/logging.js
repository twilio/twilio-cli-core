const chalk = require('chalk');

const LoggingLevel = {
  debug: -1,
  info: 0,
  warn: 1,
  error: 2,
  none: 10,
};

const LoggingLevelStyle = {
  [LoggingLevel.debug]: (msg) => chalk.dim(`[DEBUG] ${msg}`),
  [LoggingLevel.info]: (msg) => msg,
  [LoggingLevel.warn]: (msg) => chalk.italic(` » ${msg}`),
  [LoggingLevel.error]: (msg) => chalk.bold(` » ${msg}`),
};

class Logger {
  constructor(config) {
    this.config = config;
  }

  debug(msg) {
    this.log(msg, LoggingLevel.debug);
  }

  info(msg) {
    this.log(msg, LoggingLevel.info);
  }

  warn(msg) {
    this.log(msg, LoggingLevel.warn);
  }

  error(msg) {
    this.log(msg, LoggingLevel.error);
  }

  log(msg, level) {
    level = level || LoggingLevel.info;

    if (level >= this.config.level) {
      const message = typeof msg === 'string' ? msg : JSON.stringify(msg);
      process.stderr.write(`${LoggingLevelStyle[level](message)}\n`);
    }
  }
}

const logger = new Logger({
  level: LoggingLevel.info,
});

module.exports = {
  LoggingLevel,
  Logger, // class
  logger, // global instance
};
