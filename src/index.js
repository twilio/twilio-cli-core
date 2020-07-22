module.exports = {
  baseCommands: {
    BaseCommand: require('./base-commands/base-command'),
    TwilioClientCommand: require('./base-commands/twilio-client-command'),
  },
  services: {
    TwilioApi: require('./services/twilio-api'),
    CliRequestClient: require('./services/cli-http-client'),
    config: require('./services/config'),
    error: require('./services/error'),
    JSUtils: require('./services/javascript-utilities'),
    logging: require('./services/messaging/logging'),
    templating: require('./services/messaging/templating'),
    namingConventions: require('./services/naming-conventions'),
    outputFormats: require('./services/output-formats'),
    secureStorage: require('./services/secure-storage'),
  },
  configureEnv: require('./services/env'),
};
