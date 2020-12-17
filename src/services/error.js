class TwilioCliError extends Error {
  constructor(message, exitCode, details) {
    super(message);
    this.name = this.constructor.name;
    this.exitCode = exitCode;
    this.details = details;
  }
}

module.exports = { TwilioCliError };
