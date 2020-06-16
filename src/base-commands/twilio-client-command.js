const { flags } = require('@oclif/command');
const BaseCommand = require('./base-command');
const CliRequestClient = require('../services/cli-http-client');
const { TwilioApiClient, TwilioApiFlags } = require('../services/twilio-api');
const { TwilioCliError } = require('../services/error');
const { translateValues } = require('../services/javascript-utilities');
const { camelCase, kebabCase } = require('../services/naming-conventions');
const { HELP_ENVIRONMENT_VARIABLES } = require('../services/messaging/help-messages');

// CLI flags are kebab-cased, whereas API flags are PascalCased.
const CliFlags = translateValues(TwilioApiFlags, kebabCase);

class TwilioClientCommand extends BaseCommand {
  constructor(argv, config) {
    super(argv, config);
    this.httpClient = undefined;
    this.twilio = undefined;
    this.twilioApi = undefined;
  }

  async run() {
    await super.run();

    this.currentProfile = this.userConfig.getProfileById(this.flags.profile);

    const reportUnconfigured = (verb, message = '') => {
      const profileParam = this.flags.profile ? ` --profile "${this.flags.profile}"` : '';
      throw new TwilioCliError(
        `To ${verb} the profile, run:\n\n  twilio profiles:create${profileParam}${message}`
      );
    };

    if (!this.currentProfile) {
      const profileName = this.flags.profile ? ` "${this.flags.profile}"` : '';
      this.logger.error(`Could not find profile${profileName}.`);
      reportUnconfigured('create', '\n\n' + HELP_ENVIRONMENT_VARIABLES);
    }

    this.logger.debug('Using profile: ' + this.currentProfile.id);

    if (!this.currentProfile.apiKey || !this.currentProfile.apiSecret) {
      const creds = await this.secureStorage.getCredentials(this.currentProfile.id);
      if (creds.apiKey === 'error') {
        this.logger.error(`Could not get credentials for profile "${this.currentProfile.id}".`);
        reportUnconfigured('reconfigure');
      }
      this.currentProfile.apiKey = creds.apiKey;
      this.currentProfile.apiSecret = creds.apiSecret;
    }

    this.httpClient = new CliRequestClient(this.id, this.logger);
  }

  parseProperties() {
    if (!this.constructor.PropertyFlags) {
      return null;
    }

    let updatedProperties = null;
    Object.keys(this.constructor.PropertyFlags).forEach(propName => {
      if (this.flags[propName] !== undefined) {
        updatedProperties = updatedProperties || {};
        const paramName = camelCase(propName);
        updatedProperties[paramName] = this.flags[propName];
      }
    });

    return updatedProperties;
  }

  async updateResource(resource, resourceSid, updatedProperties) {
    const results = {
      sid: resourceSid,
      result: '?'
    };

    updatedProperties = updatedProperties || this.parseProperties();
    this.logger.debug('Updated properties:');
    this.logger.debug(updatedProperties);

    if (updatedProperties) {
      try {
        await resource(resourceSid).update(updatedProperties);
        results.result = 'Success';
        Object.assign(results, updatedProperties);
      } catch (error) {
        this.logger.error(error.message);
        results.result = 'Error';
      }
    } else {
      this.logger.warn('Nothing to update.');
      results.result = 'Nothing to update';
    }

    return results;
  }

  get twilioClient() {
    if (!this.twilio) {
      this.twilio = this.buildClient(require('twilio'));
    }
    return this.twilio;
  }

  get twilioApiClient() {
    if (!this.twilioApi) {
      this.twilioApi = this.buildClient(TwilioApiClient);
    }
    return this.twilioApi;
  }

  buildClient(ClientClass) {
    return new ClientClass(this.currentProfile.apiKey, this.currentProfile.apiSecret, {
      accountSid: this.flags[CliFlags.ACCOUNT_SID] || this.currentProfile.accountSid,
      edge: process.env.TWILIO_EDGE || this.userConfig.edge,
      region: this.currentProfile.region,
      httpClient: this.httpClient
    });
  }
}

TwilioClientCommand.flags = Object.assign(
  {
    profile: flags.string({
      char: 'p',
      description: 'Shorthand identifier for your profile.'
    })
  },
  BaseCommand.flags
);

TwilioClientCommand.accountSidFlag = {
  [CliFlags.ACCOUNT_SID]: flags.string({
    description: 'Access resources for the specified account.'
  })
};

TwilioClientCommand.limitFlags = {
  [CliFlags.LIMIT]: flags.string({
    description: `The maximum number of resources to return. Use '--${CliFlags.NO_LIMIT}' to disable.`,
    default: 50,
    exclusive: [CliFlags.NO_LIMIT]
  }),
  [CliFlags.NO_LIMIT]: flags.boolean({
    default: false,
    hidden: true,
    exclusive: [CliFlags.LIMIT]
  })
};

module.exports = TwilioClientCommand;
