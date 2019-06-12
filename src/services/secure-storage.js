const keytar = require('keytar');
const { CLI_NAME } = require('./config');

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

  async saveCredentials(projectId, username, password) {
    await keytar.setPassword(CLI_NAME, projectId, username + '|' + password);
  }

  async getCredentials(projectId) {
    let credentials = null;
    try {
      credentials = await keytar.getPassword(CLI_NAME, projectId);
    } catch (e) {
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
