/* eslint-disable no-console */
const chalk = require('chalk');

const { Config } = require('../services/config');
const configureEnv = require('../services/env');

const PORT_WARNING = `Profiles exist with API keys in system keychain. Please run ${chalk.bold(
  'twilio profiles:port',
)} to port keys to config.`;

class PostInstallDisplayManager {
  constructor(configDir, userConfig) {
    configureEnv();
    this.configDir = configDir || process.env.TWILIO_CONFIG_DIR;
    this.configFile = new Config(this.configDir);
    this.userConfig = userConfig;
  }

  hasProjects() {
    return this.userConfig.projects && this.userConfig.projects.length > 0;
  }

  hasPreConfiguredProfiles() {
    return this.hasProjects() || (this.userConfig.profiles && Object.keys(this.userConfig.profiles).length > 0);
  }

  displayGrid() {
    console.log();
    console.log('*************************************************************************');
    console.log('*                                                                       *');
    console.log('* To get started, please create a twilio-cli profile:                   *');
    console.log('*                                                                       *');
    console.log('*     twilio login                                                      *');
    console.log('*                                                                       *');
    console.log('*     OR                                                                *');
    console.log('*                                                                       *');
    console.log('*     twilio profiles:create                                            *');
    console.log('*                                                                       *');
    console.log('*************************************************************************');
    console.log();
  }

  async displayMessage() {
    this.userConfig = this.userConfig || (await this.configFile.load());

    if (!this.hasPreConfiguredProfiles()) {
      this.displayGrid();
    }

    if (this.hasProjects()) {
      console.warn(chalk.yellowBright(` » ${PORT_WARNING}`));
    }
  }
}

module.exports = {
  PostInstallDisplayManager,
  PORT_WARNING,
};
