const fs = require('fs');

const { camelCase } = require('../naming-conventions');

let apiSpec; // Lazy-loaded below.

const OPERATIONS = ['post', 'get', 'delete', 'put', 'patch'];

/*
 * Maps PUT and PATCH HTTP methods to the operation key used in path.operations.
 * get/post/delete keep their HTTP method name as the key so the existing
 * open-api-client.js lookup (path.operations[opts.method]) continues to work.
 */
const HTTP_METHOD_TO_OPERATION_KEY = {
  put: 'update',
  patch: 'patch',
};

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
          existing.components.parameters = existing.components.parameters || {};
          Object.assign(existing.components.parameters, current.components.parameters || {});
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
        .filter((filename) => filename.match(specPattern) && !filename.match('twilio_voice_oneconsole.json'))
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
      // Some new-style specs put servers at the top level, not per-path.
      const specServer = spec.servers && spec.servers[0] && spec.servers[0].url;

      Object.entries(spec.paths).forEach((entry) => {
        const key = entry[0];
        const path = entry[1];
        if (key === '/healthcheck') return;
        /*
         * Naive assumption: The Twilio APIs only have a single server.
         * Fall back to spec-level server when path has no servers array.
         */
        const pathServer = path.servers && path.servers[0] && path.servers[0].url;
        path.server = pathServer || specServer;
        delete path.servers;

        path.operations = {};
        path.description = (path.description || '').replace(/(\r\n|\n|\r)/gm, ' ');

        /*
         * Resolve and hoist path-level parameters (shared across all operations on this path).
         */
        const pathLevelParams = this.resolveParameterRefs(path.parameters || [], spec);
        delete path.parameters;

        /*
         * Move the operations into an operations object.
         * PUT and PATCH are stored under action-name keys ('update', 'patch').
         * GET, POST, DELETE keep their HTTP method name as the key.
         */
        OPERATIONS.forEach((operationName) => {
          if (operationName in path) {
            const operation = path[operationName];
            this.updateTwilioVendorExtensionProperty(operation);
            const operationKey = HTTP_METHOD_TO_OPERATION_KEY[operationName] || operationName;
            operation.httpMethod = operationName;
            path.operations[operationKey] = operation;
            delete path[operationName];

            /*
             * Resolve any $ref entries in the operation-level parameters array,
             * then merge with path-level parameters (operation-level takes precedence).
             */
            const resolvedOpParams = this.resolveParameterRefs(operation.parameters || [], spec);
            const mergedParams = [...pathLevelParams];
            resolvedOpParams.forEach((p) => {
              if (!mergedParams.find((existing) => existing.name === p.name)) {
                mergedParams.push(p);
              }
            });
            if (mergedParams.length > 0) {
              operation.parameters = mergedParams;
            }

            /*
             * Convert all the request body properties to query parameters for
             * simpler parsing downstream.
             */
            const parameters = this.requestPropertiesToParameters(operation.requestBody, spec);

            if (parameters.length > 0) {
              const existingParams = operation.parameters || [];
              const newParams = parameters.filter((p) => !existingParams.find((e) => e.name === p.name));
              operation.parameters = existingParams.concat(newParams);
            }
          }
        });

        // Lift the Twilio vendor extension properties.
        this.updateTwilioVendorExtensionProperty(path);
      });
    });

    return domains;
  }

  requestPropertiesToParameters(requestBody, spec) {
    const parameters = [];
    const content = (requestBody || {}).content || {};

    // Prefer application/json when present; fall back to the first available type.
    const contentType = content['application/json'] ? 'application/json' : Object.keys(content)[0];
    const type = content[contentType];
    if (!type) return parameters;

    const { properties, required } = this.flattenSchema(type.schema || {}, spec);
    Object.entries(properties).forEach(([name, schema]) => {
      parameters.push({
        name,
        schema,
        in: 'query',
        required: required.includes(name),
        description: schema.description,
      });
    });

    return parameters;
  }

  /*
   * Resolve a schema to a flat { properties, required } object, handling:
   *   - $ref          → look up in components.schemas, then recurse
   *   - allOf         → merge all branch properties; a field is required if
   *                     any branch requires it
   *   - oneOf / anyOf → union all branch properties; a field is required only
   *                     if every branch requires it (true discriminator keys
   *                     like `inputSource` satisfy this)
   *   - plain object  → return its properties directly
   *
   * A visited set prevents infinite loops on circular $ref chains.
   */
  flattenSchema(schema, spec, visited) {
    visited = visited || new Set();

    if (!schema || typeof schema !== 'object') {
      return { properties: {}, required: [] };
    }

    if (schema.$ref) {
      if (visited.has(schema.$ref)) {
        return { properties: {}, required: [] };
      }
      visited.add(schema.$ref);
      const refName = schema.$ref.split('/').pop();
      const resolved = ((spec.components || {}).schemas || {})[refName];
      if (!resolved) return { properties: {}, required: [] };
      return this.flattenSchema(resolved, spec, visited);
    }

    if (schema.allOf) {
      const merged = { properties: {}, required: [] };
      schema.allOf.forEach((branch) => {
        const { properties, required } = this.flattenSchema(branch, spec, new Set(visited));
        Object.assign(merged.properties, properties);
        required.forEach((r) => {
          if (!merged.required.includes(r)) merged.required.push(r);
        });
      });
      if (schema.properties) Object.assign(merged.properties, schema.properties);
      if (schema.required) {
        schema.required.forEach((r) => {
          if (!merged.required.includes(r)) merged.required.push(r);
        });
      }
      return merged;
    }

    if (schema.oneOf || schema.anyOf) {
      const branches = (schema.oneOf || schema.anyOf).map((branch) =>
        this.flattenSchema(branch, spec, new Set(visited)),
      );
      const allProperties = {};
      branches.forEach(({ properties }) => Object.assign(allProperties, properties));
      // Mark required only when every branch requires the field
      const requiredInAll =
        branches.length > 0
          ? Object.keys(allProperties).filter((name) => branches.every(({ required }) => required.includes(name)))
          : [];
      return { properties: allProperties, required: requiredInAll };
    }

    return { properties: schema.properties || {}, required: schema.required || [] };
  }

  resolveSchemaRef(schema, spec) {
    if (!schema || !schema.$ref || !spec) return schema;
    const refName = schema.$ref.split('/').pop();
    return ((spec.components || {}).schemas || {})[refName] || schema;
  }

  resolveParameterRefs(parameters, spec) {
    const componentParameters = (spec.components || {}).parameters || {};
    return parameters.map((param) => {
      if (param.$ref) {
        const refName = param.$ref.split('/').pop();
        return componentParameters[refName] || param;
      }
      return param;
    });
  }
}

module.exports = TwilioApiBrowser;
