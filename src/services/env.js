const os = require('os');
const path = require('path');

const { CLI_NAME } = require('./config');

const configureEnv = () => {
  const home = process.env.HOME || process.env.USERPROFILE || os.homedir();
  const twilioDir = path.join(home, `.${CLI_NAME}`);

  const envDirs = ['TWILIO_CACHE_DIR', 'TWILIO_CONFIG_DIR', 'TWILIO_DATA_DIR'];

  envDirs.forEach((envVarName) => {
    if (!process.env[envVarName]) {
      process.env[envVarName] = twilioDir;
    }
  });
};

module.exports = configureEnv;
