let keytar; // Lazy-loaded below.
const { CLI_NAME } = require('./config');
const { TwilioCliError } = require('./error');
const { HELP_ENVIRONMENT_VARIABLES } = require('./messaging/help-messages');
const { requireNative } = require('./require-native');

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
  constructor(platform) {
    this.platform = platform || process.platform;
  }

  get keytar() {
    if (!keytar) {
      keytar = requireNative('keytar');

      // If we can't load up keytar, tell the user that maybe they should just
      // stick to env vars.
      if (!keytar) {
        throw new TwilioCliError('Secure credential storage failed to load.\n\n' + HELP_ENVIRONMENT_VARIABLES);
      }
    }

    return keytar;
  }

  async saveCredentials(profileId, username, password) {
    await this.keytar.setPassword(CLI_NAME, profileId, username + '|' + password);
  }

  async removeCredentials(profileId) {
    return this.keytar.deletePassword(CLI_NAME, profileId);
  }

  async getCredentials(profileId) {
    let credentials = null;
    try {
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
