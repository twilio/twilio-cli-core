const { CLI_NAME } = require('../config');

const ENV_VAR_CMD = process.platform === 'win32' ? 'set' : 'export';
const ENV_VARS_USAGE = `# OPTION 1 (recommended)
${ENV_VAR_CMD} TWILIO_ACCOUNT_SID=your Account SID from twil.io/console
${ENV_VAR_CMD} TWILIO_API_KEY=an API Key created at twil.io/get-api-key
${ENV_VAR_CMD} TWILIO_API_SECRET=the secret for the API Key

# OPTION 2
${ENV_VAR_CMD} TWILIO_ACCOUNT_SID=your Account SID from twil.io/console
${ENV_VAR_CMD} TWILIO_AUTH_TOKEN=your Auth Token from twil.io/console`;

exports.HELP_ENVIRONMENT_VARIABLES = `Alternatively, ${CLI_NAME} can use credentials stored in environment variables:

${ENV_VARS_USAGE}

Once these environment variables are set, a ${CLI_NAME} profile is not required and you may skip the "login" step.`;

exports.ACCESS_DENIED = `${CLI_NAME} profiles use Standard API Keys which are not permitted to manage Accounts (e.g., create Subaccounts) and other API Keys. If you require this functionality a Master API Key or Auth Token must be stored in environment variables:

${ENV_VARS_USAGE}`;

exports.NETWORK_ERROR = `${CLI_NAME} encountered a network connectivity error. \
Please check your network connection and try your command again. \
Check on Twilio service status at https://status.twilio.com/`;
