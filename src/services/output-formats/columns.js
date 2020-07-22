const chalk = require('chalk');
const columnify = require('columnify');

const { capitalize } = require('../naming-conventions');

function headingTransform(heading) {
  const capitalizeWords = ['Id', 'Sid', 'Iso', 'Sms', 'Url'];

  heading = heading.replace(/([A-Z])/g, ' $1');
  heading = capitalize(heading);
  heading = heading
    .split(' ')
    .map((word) => (capitalizeWords.indexOf(word) > -1 ? word.toUpperCase() : word))
    .join(' ');
  return chalk.bold(heading);
}

module.exports = (fullData, limitedData, options) => {
  if (limitedData.length === 0) {
    return '';
  }

  const columns = Object.keys(limitedData[0])
    .map((key) => ({ key, value: { headingTransform } }))
    .reduce((map, obj) => {
      map[obj.key] = obj.value;
      return map;
    }, {});

  options = options || {};
  return columnify(limitedData, {
    columnSplitter: '  ',
    config: columns,
    ...options,
  });
};
