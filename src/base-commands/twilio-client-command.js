const { Flags: flags } = require('@oclif/core');

const BaseCommand = require('./base-command');
const CliRequestClient = require('../services/cli-http-client');
const { TwilioApiClient, TwilioApiFlags } = require('../services/twilio-api');
const { TwilioCliError } = require('../services/error');
const { translateValues, instanceOf } = require('../services/javascript-utilities');
const { camelCase, kebabCase } = require('../services/naming-conventions');
const { ACCESS_DENIED, HELP_ENVIRONMENT_VARIABLES } = require('../services/messaging/help-messages');

// CLI flags are kebab-cased, whereas API flags are PascalCased.
const CliFlags = translateValues(TwilioApiFlags, kebabCase);

const ACCESS_DENIED_CODE = 20003;

class TwilioClientCommand extends BaseCommand {
  constructor(argv, config) {
    super(argv, config);
    this.httpClient = undefined;
    this.twilio = undefined;
    this.twilioApi = undefined;
  }

  async run() {
    await super.run();

    // check if profile flag is required as per the config
    if (this.userConfig.requireProfileInput && !this.flags.profile) {
      throw new TwilioCliError(
        `Error: Missing required flag:\n -p, --profile PROFILE  ${TwilioClientCommand.flags.profile.description} To disable this check run:\n\n  twilio config:set --no-require-profile-input`,
      );
    }
    this.currentProfile = this.userConfig.getProfileById(this.flags.profile);
    const pluginName = (this.config.userAgent || ' ').split(' ')[0];

    const reportUnconfigured = (verb, message = '', commandName = 'create') => {
      const profileParam = this.flags.profile ? ` --profile "${this.flags.profile}"` : '';
      throw new TwilioCliError(
        `To ${verb} the profile, run:\n\n  twilio profiles:${commandName}${profileParam}${message}`,
      );
    };

    if (!this.currentProfile) {
      const profileName = this.flags.profile ? ` "${this.flags.profile}"` : '';
      if (Object.keys(this.userConfig.profiles).length !== 0 && !profileName) {
        this.logger.error(`There is no active profile set.`);
        reportUnconfigured('activate', '', 'use');
      } else {
        this.logger.error(`Could not find profile${profileName}.`);
        reportUnconfigured('create', `\n\n${HELP_ENVIRONMENT_VARIABLES}`);
      }
    }

    this.logger.debug(`Using profile: ${this.currentProfile.id}`);

    if (!this.currentProfile.apiKey || !this.currentProfile.apiSecret) {
      this.logger.error(`Could not get credentials for profile "${this.currentProfile.id}".`);
      reportUnconfigured('reconfigure');
    }

    this.httpClient = new CliRequestClient(this.id, this.logger, undefined, pluginName);
  }

  async catch(error) {
    /*
     * Append to the error message when catching API access denied errors with
     * profile-auth (i.e., standard API key auth).
     */
    if (instanceOf(error, TwilioCliError) && error.exitCode === ACCESS_DENIED_CODE) {
      if (!this.currentProfile.id.startsWith('${TWILIO')) {
        // Auth *not* using env vars.
        error.message += `\n\n${ACCESS_DENIED}`;
      }
    }

    return super.catch(error);
  }

  parseProperties() {
    if (!this.constructor.PropertyFlags) {
      return null;
    }

    let updatedProperties = null;
    Object.keys(this.constructor.PropertyFlags).forEach((propName) => {
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
      result: '?',
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
    const REGION_EDGE_MAP = {
      au1: 'sydney',
      br1: 'sao-paulo',
      de1: 'frankfurt',
      ie1: 'dublin',
      jp1: 'tokyo',
      jp2: 'osaka',
      sg1: 'singapore',
      us1: 'ashburn',
      us2: 'umatilla',
    };
    let edgeValue = process.env.TWILIO_EDGE || this.userConfig.edge;
    const regionValue = this.currentProfile.region;
    if (edgeValue !== undefined && regionValue !== undefined) {
      this.logger.warn(
        'Deprecation Warning: For regional processing, DNS is of format product.edge.region.twilio.com;otherwise use product.twilio.com',
      );
    }

    if (regionValue && !edgeValue && REGION_EDGE_MAP[regionValue]) {
      this.logger.warn('Deprecation warning: Setting default `edge` for provided `region`');
      edgeValue = REGION_EDGE_MAP[regionValue];
    }
    return new ClientClass(this.currentProfile.apiKey, this.currentProfile.apiSecret, {
      accountSid: this.flags[CliFlags.ACCOUNT_SID] || this.currentProfile.accountSid,
      edge: process.env.TWILIO_EDGE || this.userConfig.edge || edgeValue,
      region: this.currentProfile.region,
      httpClient: this.httpClient,
    });
  }
}

TwilioClientCommand.flags = {
  profile: flags.string({
    char: 'p',
    description: 'Shorthand identifier for your profile.',
  }),
  ...BaseCommand.flags,
};

TwilioClientCommand.accountSidFlag = {
  [CliFlags.ACCOUNT_SID]: flags.string({
    description: 'Access resources for the specified account.',
  }),
};

TwilioClientCommand.limitFlags = {
  [CliFlags.LIMIT]: flags.string({
    description: `The maximum number of resources to return. Use '--${CliFlags.NO_LIMIT}' to disable.`,
    default: 50,
    exclusive: [CliFlags.NO_LIMIT],
  }),
  [CliFlags.NO_LIMIT]: flags.boolean({
    default: false,
    hidden: true,
    exclusive: [CliFlags.LIMIT],
  }),
};

TwilioClientCommand.noHeader = {
  'no-header': flags.boolean({
    description: 'Skip including of headers while listing the data.',
  }),
};

module.exports = TwilioClientCommand;
