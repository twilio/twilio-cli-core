const chalk = require('chalk');
const { flags } = require('@oclif/command');
const BaseCommand = require('./base-command');
const CLIRequestClient = require('../services/cli-http-client');
const { HELP_ENVIRONMENT_VARIABLES } = require('../services/messaging/help-messages');

class TwilioClientCommand extends BaseCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);
    this.httpClient = undefined;
    this.twilioClient = undefined;
  }

  async run() {
    await super.run();

    this.currentProject = this.userConfig.getProjectById(this.flags.project);

    const reportUnconfigured = (verb, infoMessage) => {
      const projParam = this.flags.project ? ' -p ' + this.flags.project : '';
      this.logger.error('To ' + verb + ' project, run: ' + chalk.whiteBright('twilio projects:add' + projParam));
      if (infoMessage) {
        this.logger.info(infoMessage);
      }
      this.exit(1);
    };

    if (!this.currentProject) {
      this.logger.error('No project configured.');
      reportUnconfigured('add', '\n' + HELP_ENVIRONMENT_VARIABLES);
      return;
    }

    this.logger.debug('Using project: ' + this.currentProject.id);

    if (!this.currentProject.apiKey || !this.currentProject.apiSecret) {
      const creds = await this.secureStorage.getCredentials(this.currentProject.id);
      if (creds.apiKey === 'error') {
        this.logger.error('Could not get credentials for project "' + this.currentProject.id + '".');
        reportUnconfigured('reconfigure');
        return;
      }
      this.currentProject.apiKey = creds.apiKey;
      this.currentProject.apiSecret = creds.apiSecret;
    }

    this.httpClient = new CLIRequestClient(this.id, this.logger);
    this.twilioClient = require('twilio')(this.currentProject.apiKey, this.currentProject.apiSecret, {
      accountSid: this.currentProject.accountSid,
      region: this.currentProject.region,
      httpClient: this.httpClient
    });
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
}

TwilioClientCommand.flags = Object.assign(
  {
    project: flags.string({
      char: 'p',
      description: 'Shorthand identifier for your Twilio project.'
    })
  },
  BaseCommand.flags
);

module.exports = TwilioClientCommand;
