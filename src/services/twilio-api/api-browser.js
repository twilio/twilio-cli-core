const fs = require('fs');

const { camelCase } = require('../naming-conventions');

let apiSpec; // Lazy-loaded below.

const OPERATIONS = ['post', 'get', 'delete'];

class TwilioApiBrowser {
  constructor(spec) {
    if (!apiSpec) {
      apiSpec = spec || this.loadApiSpecFromDisk();
    }

    this.domains = this.loadDomains(apiSpec);
  }

  loadApiSpecFromDisk() {
    if (!apiSpec) {
      const specPattern = /twilio_(.+)\.json/;
      const specNameIndex = 1;

      apiSpec = fs
        .readdirSync(__dirname)
        .filter((filename) => filename.match(specPattern))
        .map((filename) => {
          const domainName = filename.match(specPattern)[specNameIndex];

          return { [domainName]: require(`./${filename}`) };
        });

      apiSpec = Object.assign({}, ...apiSpec);
    }

    return apiSpec;
  }

  loadDomains(obj) {
    // Clone the spec since we'll be modifying it.
    const domains = JSON.parse(JSON.stringify(obj));

    Object.values(domains).forEach((spec) => {
      Object.values(spec.paths).forEach((path) => {
        // Naive assumption: The Twilio APIs only have a single server.
        path.server = path.servers[0].url;
        delete path.servers;

        path.operations = {};
        path.description = path.description.replace(/(\r\n|\n|\r)/gm, ' ');

        // Move the operations into an operations object.
        OPERATIONS.forEach((operationName) => {
          if (operationName in path) {
            const operation = path[operationName];
            path.operations[operationName] = operation;
            delete path[operationName];

            /*
             * Convert all the request body properties to query parameters for
             * simpler parsing downstream.
             */
            const parameters = this.requestPropertiesToParameters(operation.requestBody);

            if (parameters.length > 0) {
              operation.parameters = operation.parameters ? operation.parameters.concat(parameters) : parameters;
            }
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

  requestPropertiesToParameters(requestBody) {
    const parameters = [];
    const content = (requestBody || {}).content || {};

    Object.values(content).forEach((type) => {
      const typeSchema = type.schema || {};
      const properties = typeSchema.properties || {};
      const required = typeSchema.required || [];

      Object.entries(properties).forEach(([name, schema]) => {
        parameters.push({
          name,
          schema,
          in: 'query',
          required: required.includes(name),
          description: schema.description,
        });
      });
    });

    return parameters;
  }
}

module.exports = TwilioApiBrowser;
