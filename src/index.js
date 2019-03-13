module.exports = {
  baseCommands: {
    BaseCommand: require('./base-commands/base-command'),
    TwilioClientCommand: require('./base-commands/twilio-client-command')
  },
  services: {
    CLIRequestClient: require('./services/cli-http-client'),
    config: require('./services/config'),
    logging: require('./services/logging')
  }
};
