const { CLI_NAME } = require('../config');

exports.HELP_ENVIRONMENT_VARIABLES = `Alternatively, ${CLI_NAME} can use credentials stored in environment variables:

# OPTION 1 (recommended)
TWILIO_ACCOUNT_SID = your Account SID from twil.io/console
TWILIO_API_KEY = an API Key created at twil.io/get-api-key
TWILIO_API_SECRET = the secret for the API Key

# OPTION 2
TWILIO_ACCOUNT_SID = your Account SID from twil.io/console
TWILIO_AUTH_TOKEN = your Auth Token from twil.io/console

Once these environment variables are set, a ${CLI_NAME} profile is not required to move forward with installation.`;

exports.NETWORK_ERROR = `${CLI_NAME} encountered a network connectivity error. \
Please check your network connection and try your command again. \
Check on Twilio service status at https://status.twilio.com/`;
