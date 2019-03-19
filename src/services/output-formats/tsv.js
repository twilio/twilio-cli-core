const TSV = require('tsv');

module.exports = (fullData, limitedData, options) => {
  if (limitedData.length === 0) {
    return '';
  }

  options = options || { showHeaders: true };
  TSV.header = options.showHeaders;

  return TSV.stringify(limitedData);
};
