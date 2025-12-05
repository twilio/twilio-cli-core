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

exports.REGION_AUTH_TOKEN_REQUIRED = `Authentication failed. When using regional resources, you must authenticate with a region-specific Auth Token.

To obtain a region-specific Auth Token:
1. Log into the Twilio Console
2. Navigate to Account > API Keys & Tokens section
3. Use the Auth Token for that specific region located below the API Keys
4. Use this region-specific Auth Token when creating your profile

Example:
  $ twilio profiles:create --region au1 --edge sydney
  ? Auth Token: [enter your AU1-specific auth token here]

For more information, visit: https://www.twilio.com/docs/global-infrastructure/edge-locations`;

exports.NETWORK_ERROR = `${CLI_NAME} encountered a network connectivity error. \
Please check your network connection and try your command again. \
Check on Twilio service status at https://status.twilio.com/`;
