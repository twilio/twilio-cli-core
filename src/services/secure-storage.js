const keytar = require('keytar');
const TWILIO_CLI_IDENTIFIER = 'twilio-cli';

const PLATFORM_DESCRIPTIONS = {
  darwin: 'in your keychain',
  win32: 'in the Windows Credential Vault',
  linux: 'using libsecret'
};

class SecureStorage {
  constructor(platform) {
    this.platform = platform || process.platform;
  }

  async saveCredentials(projectId, username, password) {
    await keytar.setPassword(TWILIO_CLI_IDENTIFIER, projectId, username + '|' + password);
  }

  async getCredentials(projectId) {
    let credentials = null;
    try {
      credentials = await keytar.getPassword('twilio-cli', projectId);
    } catch (e) {
      return { apiKey: 'error', apiSecret: e.message };
    }

    const [apiKey, apiSecret] = credentials ? credentials.split('|') : ['error', 'error'];

    return {
      apiKey,
      apiSecret
    };
  }

  get platformDescription() {
    return PLATFORM_DESCRIPTIONS[this.platform];
  }
}

module.exports = {
  SecureStorage
};
