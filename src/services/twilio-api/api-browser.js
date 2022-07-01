const fs = require('fs');

const { camelCase } = require('../naming-conventions');

let apiSpec; // Lazy-loaded below.

const OPERATIONS = ['post', 'get', 'delete'];

class TwilioApiBrowser {
  constructor(spec) {
    spec = spec || this.loadApiSpecFromDisk();
    spec = this.mergeVersions(spec);
    this.domains = this.loadDomains(spec);
  }

  mergeVersions(spec) {
    // merge the domain_versions into a single domain
    const mergedSpec = {};
    for (const domainNameWithVersion in spec) {
      if (spec.hasOwnProperty(domainNameWithVersion)) {
        const domainName = domainNameWithVersion.split('_')[0];
        if (domainName in mergedSpec) {
          const existing = mergedSpec[domainName];
          const current = spec[domainNameWithVersion];
          Object.assign(existing.components.schemas, current.components.schemas);
          Object.assign(existing.paths, current.paths);
          mergedSpec[domainName] = existing;
        } else {
          mergedSpec[domainName] = spec[domainNameWithVersion];
        }
      }
    }

    return mergedSpec;
  }

  loadApiSpecFromDisk() {
    if (!apiSpec) {
      const specPattern = /twilio_(.+)\.json/;
      const specNameIndex = 1;

      apiSpec = fs
        .readdirSync(__dirname)
        .filter((filename) => filename.match(specPattern) && !filename.match('twilio_preview.json'))
        .map((filename) => {
          const domainName = filename.match(specPattern)[specNameIndex];

          return { [domainName]: require(`./${filename}`) };
        });

      apiSpec = Object.assign({}, ...apiSpec);
    }

    return apiSpec;
  }

  updateTwilioVendorExtensionProperty(input) {
    Object.entries(input).forEach(([key, value]) => {
      if (key === 'x-twilio') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          input[subKey] = subValue;
        });
        delete input[key];
      }
    });
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
            this.updateTwilioVendorExtensionProperty(operation);
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

        // Lift the Twilio vendor extension properties.
        this.updateTwilioVendorExtensionProperty(path);
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
