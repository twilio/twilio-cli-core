const { templatize } = require('./templating');

exports.configSaved = templatize`twilio-cli configuration saved to "${'path'}"`;

exports.unexpectedError = templatize`twilio-cli encountered an unexpected error. \
To report this issue, execute the command with the "-l debug" flag, then copy the output to a new issue here: \
"${'url'}"`;
