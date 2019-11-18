const { CLI_NAME } = require('./config');
const { TwilioCliError } = require('./error');
const { HELP_ENVIRONMENT_VARIABLES } = require('./messaging/help-messages');

const STORAGE_LOCATIONS = {
  KEYCHAIN: 'keychain',
  WIN_CRED_VAULT: 'win_cred_vault',
  LIBSECRET: 'libsecret'
};

const PLATFORM_TO_LOCATION = {
  darwin: STORAGE_LOCATIONS.KEYCHAIN,
  win32: STORAGE_LOCATIONS.WIN_CRED_VAULT,
  linux: STORAGE_LOCATIONS.LIBSECRET
};

class SecureStorage {
  constructor({ command, platform } = {}) {
    this.command = command;
    this.platform = platform || process.platform;
    this.keytar = null;
  }

  async loadKeytar() {
    if (!this.keytar) {
      try {
        this.keytar = await this.command.install('keytar');
      } catch (error) {
        // If we can't load up keytar, tell the user that maybe they should just stick to env vars.
        throw new TwilioCliError('Secure credential storage failed to load.\n\n' + HELP_ENVIRONMENT_VARIABLES);
      }
    }

    return this.keytar;
  }

  async saveCredentials(profileId, username, password) {
    await this.loadKeytar();
    await this.keytar.setPassword(CLI_NAME, profileId, username + '|' + password);
  }

  async removeCredentials(profileId) {
    await this.loadKeytar();
    return this.keytar.deletePassword(CLI_NAME, profileId);
  }

  async getCredentials(profileId) {
    let credentials = null;
    try {
      await this.loadKeytar();
      credentials = await this.keytar.getPassword(CLI_NAME, profileId);
    } catch (e) {
      if (e instanceof TwilioCliError) {
        throw e;
      }

      return { apiKey: 'error', apiSecret: e.message };
    }

    const [apiKey, apiSecret] = credentials ? credentials.split('|') : ['error', 'error'];

    return {
      apiKey,
      apiSecret
    };
  }

  get storageLocation() {
    return PLATFORM_TO_LOCATION[this.platform];
  }
}

module.exports = {
  SecureStorage,
  STORAGE_LOCATIONS
};
