const chalk = require('chalk');
const { flags } = require('@oclif/command');
const BaseCommand = require('./base-command');
const CliRequestClient = require('../services/cli-http-client');
const { TwilioApiClient } = require('../services/twilio-api');
const { TwilioCliError } = require('../services/error');
const { HELP_ENVIRONMENT_VARIABLES, UNEXPECTED_ERROR } = require('../services/messaging/help-messages');

class TwilioClientCommand extends BaseCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);
    this.httpClient = undefined;
    this.twilio = undefined;
    this.twilioApi = undefined;

    // Ensure the 'runCommand' function is defined in the child class.
    if (!this.runCommand || typeof this.runCommand !== 'function') {
      throw new TwilioCliError(`The class "${this.constructor.name}" must implement the function "runCommand"`);
    }
  }

  async run() {
    await super.run();

    try {
      this.currentProject = this.userConfig.getProjectById(this.flags.project);

      const reportUnconfigured = (verb, message = '') => {
        const projParam = this.flags.project ? ' -p ' + this.flags.project : '';
        throw new TwilioCliError(
          `To ${verb} the project, run: ` + chalk.whiteBright('twilio projects:add' + projParam) + message
        );
      };

      if (!this.currentProject) {
        this.logger.error('No project configured.');
        reportUnconfigured('add', '\n\n' + HELP_ENVIRONMENT_VARIABLES);
      }

      this.logger.debug('Using project: ' + this.currentProject.id);

      if (!this.currentProject.apiKey || !this.currentProject.apiSecret) {
        const creds = await this.secureStorage.getCredentials(this.currentProject.id);
        if (creds.apiKey === 'error') {
          this.logger.error(`Could not get credentials for project "${this.currentProject.id}".`);
          reportUnconfigured('reconfigure');
        }
        this.currentProject.apiKey = creds.apiKey;
        this.currentProject.apiSecret = creds.apiSecret;
      }

      this.httpClient = new CliRequestClient(this.id, this.logger);

      // Run the 'abstract' command executor.
      return await this.runCommand();
    } catch (error) {
      if (error instanceof TwilioCliError) {
        // User/API errors
        this.logger.error(error.message);
        this.logger.debug(error.stack);
        this.exit(error.exitCode || 1);
      } else {
        // System errors
        this.logger.error(UNEXPECTED_ERROR);
        this.logger.debug(error.message);
        this.logger.debug(error.stack);
        this.exit(1);
      }
    }
  }

  parseProperties() {
    if (!this.constructor.PropertyFlags) {
      return null;
    }

    let updatedProperties = null;
    Object.keys(this.constructor.PropertyFlags).forEach(propName => {
      if (this.flags[propName]) {
        updatedProperties = updatedProperties || {};
        // Convert kebab-case to camelCase
        const paramName = propName.replace(/-([a-z])/g, g => g[1].toUpperCase());
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
    return new ClientClass(this.currentProject.apiKey, this.currentProject.apiSecret, {
      accountSid: this.flags['sub-account-sid'] || this.currentProject.accountSid,
      region: this.currentProject.region,
      httpClient: this.httpClient
    });
  }
}

TwilioClientCommand.flags = Object.assign(
  {
    project: flags.string({
      char: 'p',
      description: 'Shorthand identifier for your Twilio project.'
    }),
    'sub-account-sid': flags.string({
      description: 'access resources for the specified sub-account'
    })
  },
  BaseCommand.flags
);

module.exports = TwilioClientCommand;
