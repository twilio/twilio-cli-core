const chalk = require('chalk');
const { flags } = require('@oclif/command');
const BaseCommand = require('./base-command');
const CliRequestClient = require('../services/cli-http-client');
const { TwilioApiClient } = require('../services/twilio-api');
const { TwilioCliError } = require('../services/error');
const { camelCase } = require('../services/naming-conventions');
const { HELP_ENVIRONMENT_VARIABLES } = require('../services/messaging/help-messages');

// 'account-sid' is a special snowflake
const ACCOUNT_SID = 'account-sid';

class TwilioClientCommand extends BaseCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);
    this.httpClient = undefined;
    this.twilio = undefined;
    this.twilioApi = undefined;
  }

  async run() {
    await super.run();

    this.currentProfile = this.userConfig.getProfileById(this.flags.profile);

    const reportUnconfigured = (verb, message = '') => {
      const profileParam = this.flags.profile ? ' -p ' + this.flags.profile : '';
      throw new TwilioCliError(
        `To ${verb} the profile, run: ` + chalk.whiteBright('twilio profiles:add' + profileParam) + message
      );
    };

    if (!this.currentProfile) {
      this.logger.error('No profile configured.');
      reportUnconfigured('add', '\n\n' + HELP_ENVIRONMENT_VARIABLES);
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
      } catch (err) {
        this.logger.error(err.message);
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
      accountSid: this.flags[ACCOUNT_SID] || this.currentProfile.accountSid,
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
  [ACCOUNT_SID]: flags.string({
    description: 'Access resources for the specified account.'
  })
};

module.exports = TwilioClientCommand;
