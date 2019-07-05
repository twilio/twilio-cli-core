const fs = require('fs');
const { camelCase } = require('../naming-conventions');
let apiSpec; // Lazy-loaded below.

const OPERATIONS = ['post', 'get', 'delete'];

class TwilioApiBrowser {
  constructor(apiSpec) {
    apiSpec = apiSpec || this.loadApiSpecFromDisk();
    this.domains = this.loadDomains(apiSpec);
  }

  loadApiSpecFromDisk() {
    if (!apiSpec) {
      const specPattern = /twilio_(.+)\.json/;
      const specNameIndex = 1;

      apiSpec = fs.readdirSync(__dirname)
        .filter(filename => filename.match(specPattern))
        .map(filename => {
          const domainName = filename.match(specPattern)[specNameIndex];

          return { [domainName]: require(`./${filename}`) };
        });

      apiSpec = Object.assign({}, ...apiSpec);
    }

    return apiSpec;
  }

  loadDomains(apiSpec) {
    const domains = apiSpec;

    Object.values(domains).forEach(spec => {
      Object.values(spec.paths).forEach(path => {
        // Naive assumption: The Twilio APIs only have a single server.
        path.server = path.servers[0].url;
        delete path.servers;

        path.operations = {};
        path.description = path.description.replace(/(\r\n|\n|\r)/gm, ' ');

        // Move the operations into an operations object.
        OPERATIONS.forEach(operationName => {
          if (operationName in path) {
            path.operations[operationName] = path[operationName];
            delete path[operationName];
          }
        });

        // Convert extensions to camel-cased properties.
        Object.entries(path).forEach(([key, value]) => {
          const extensionMatch = key.match(/x-(.+)/);

          if (extensionMatch) {
            const newKey = camelCase(extensionMatch[1]);
            path[newKey] = value;
            delete path[key];
          }
        });
      });
    });

    return domains;
  }
}

module.exports = TwilioApiBrowser;
