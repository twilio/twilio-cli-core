class TwilioCliError extends Error {
  constructor(message, exitCode, data) {
    super(message);
    this.name = this.constructor.name;
    this.exitCode = exitCode;
    this.data = data;
  }
}

module.exports = { TwilioCliError };
