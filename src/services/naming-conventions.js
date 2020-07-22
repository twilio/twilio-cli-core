const kebabCase = (input) => {
  return input
    .trim()
    .replace(/[ _]/g, '-') // from snake_case (or spaces)
    .replace(/([a-z\d])([A-Z])/g, '$1-$2') // from PascalCase or camelCase
    .toLowerCase()
    .replace(/-+/g, '-') // remove duplicate dashes
    .replace(/^-|-$/g, ''); // remove leading and trailing dashes
};

const camelCase = (input) => {
  return input
    .trim()
    .replace(/^[-_]+|[-_]+$/g, '') // remove leading and trailing dashes and underscores
    .replace(/^[A-Z]/, (g) => g[0].toLowerCase()) // from PascalCase
    .replace(/\.[A-Z]/g, (g) => g.toLowerCase()) // from dot-separated
    .replace(/[A-Z]{2,}/g, (g) => g.toLowerCase()) // consecutive caps (e.g. "AWS")  TODO: What about AWSRoute53?
    .replace(/[-_ ]([a-z])/g, (g) => g[1].toUpperCase()) // from kebab-case or snake_case (or spaces)
    .replace(/ /g, ''); // remove any remaining spaces
};

const snakeCase = (input) => {
  return input
    .trim()
    .replace(/[ -]/g, '_') // from kebab-case (or spaces)
    .replace(/([a-z\d])([A-Z])/g, '$1_$2') // from PascalCase or camelCase
    .toLowerCase()
    .replace(/_+/g, '_') // remove duplicate underscores
    .replace(/^_|_$/g, ''); // remove leading and trailing underscores
};

const capitalize = (input) => {
  return input.trim().replace(/^[a-z]/, (g) => g[0].toUpperCase()); // upper the first character
};

const pascalCase = (input) => {
  return camelCase(input) // camelize first
    .replace(/(^|\.)[a-z]/g, (g) => g.toUpperCase()); // upper the first character and after each dot
};

module.exports = {
  kebabCase,
  camelCase,
  snakeCase,
  capitalize,
  pascalCase,
};
