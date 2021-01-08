class TwilioCliError extends Error {
  constructor(message, exitCode, details = 'No details provided') {
    super(message);
    this.name = this.constructor.name;
    this.exitCode = exitCode;
    this.details = details;
  }
}

module.exports = { TwilioCliError };
