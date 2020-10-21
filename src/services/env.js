const os = require('os');
const path = require('path');

const { CLI_NAME } = require('./config');

const configureEnv = () => {
  const twilioDir = (() => {
    if (process.platform === 'win32' && process.env.APPDATA) {
      return path.join(process.env.APPDATA, CLI_NAME);
    }
    return path.join(process.env.HOME || os.homedir(), `.${CLI_NAME}`);
  })();

  const envDirs = ['TWILIO_CACHE_DIR', 'TWILIO_CONFIG_DIR', 'TWILIO_DATA_DIR'];

  envDirs.forEach((envVarName) => {
    if (!process.env[envVarName]) {
      process.env[envVarName] = twilioDir;
    }
  });
};

module.exports = configureEnv;
