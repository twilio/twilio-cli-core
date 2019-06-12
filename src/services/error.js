class TwilioCliError extends Error {
  constructor(message, exitCode) {
    super(message);
    this.name = this.constructor.name;
    this.exitCode = exitCode;
  }
}

module.exports = { TwilioCliError };
