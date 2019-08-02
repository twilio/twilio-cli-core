let keytar; // Lazy-loaded below.
const { CLI_NAME } = require('./config');
const { logger } = require('../services/messaging/logging');

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
      // Since keytar is a native module (compiled for the specific version of
      // Node it was installed with), we don't want plugins that depend on us
      // to depend on it. Otherwise, they'd need to reinstall each time Node
      // changes since it requires keytar be reinstalled. For this reason, we
      // don't expect to find keytar under the normal dependency tree. It
      // should exist with the CLI's dependencies. We'll attempt to find out
      // where that is based on the location of the script that kicked off the
      // process. Resolve any symlinks along the way to find the "real" path
      // and then load up the module. If this fails for whatever reason,
      // fallback to the standard location (and log some debug).
      try {
        const realAppPath = require('fs').realpathSync(process.argv[1]);
        const realKeytarPath = require.resolve('keytar', { paths: [realAppPath] });

        keytar = require(realKeytarPath);
      } catch (error) {
        logger.debug('Failed to find the keytar module with the CLI: ' + error.message);

        keytar = require('keytar');
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
