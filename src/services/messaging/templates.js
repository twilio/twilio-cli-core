const { templatize } = require('./templating');

const configSaved = templatize`twilio-cli configuration saved to "${'path'}"`;

module.exports = {
  configSaved
};
