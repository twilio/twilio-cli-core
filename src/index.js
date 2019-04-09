module.exports = {
  baseCommands: {
    BaseCommand: require('./base-commands/base-command'),
    TwilioClientCommand: require('./base-commands/twilio-client-command')
  },
  services: {
    CLIRequestClient: require('./services/cli-http-client'),
    config: require('./services/config'),
    JSUtils: require('./services/javascript-utilities'),
    logging: require('./services/logging'),
    secureStorage: require('./services/secure-storage')
  },
  configureEnv: require('./services/env')
};
