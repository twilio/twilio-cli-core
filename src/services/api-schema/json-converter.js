const { logger } = require('../messaging/logging');

const SCHEMA_TYPE_TO_CONVERT_FUNC_MAP = {
  array: 'convertArray',
  boolean: 'convertBoolean',
  integer: 'convertInteger',
  number: 'convertNumber',
  object: 'convertObject',
  string: 'convertString',
};

/**
 * A JSON Schema conversion orchestrator. It accepts a JSON schema and value
 * and converts any fields that require ... conversion.
 */
class JsonSchemaConverter {
  constructor() {
    this.logger = logger;
  }

  convertSchema(schema, value) {
    if (schema) {
      if (!value) {
        if (!schema.nullable) {
          this.logger.debug(`Null value found when nullable not allowed by schema: ${JSON.stringify(schema)}`);
        }

        return value;
      }

      const convertFunc = SCHEMA_TYPE_TO_CONVERT_FUNC_MAP[schema.type];

      if (convertFunc) {
        value = this[convertFunc](schema, value);
      } else {
        this.logger.debug(`No conversion function for "${schema.type}" schema type`);
      }
    }

    return value;
  }

  convertArray(schema, value) {
    // Recurse into the value using the schema's items schema.
    return value.map((item) => this.convertSchema(schema.items, item));
  }

  convertObject(schema, value) {
    const converted = {};

    let { properties } = schema;

    /*
     * If the schema has no properties, it is a free-form object with arbitrary
     * property/value pairs. We'll map the object's keys to null-schemas so
     * they'll be processed as-is (i.e., no type so just use the value).
     */
    if (!properties) {
      const nameList = Object.keys(value).map((name) => ({ [name]: null }));

      properties = Object.assign({}, ...nameList);
    }

    /*
     * Convert each object property and store it in the converted object, if a
     * value was provided.
     */
    Object.entries(properties).forEach(([name, propSchema]) => {
      const { propName, propValue } = this.convertObjectProperty(propSchema, name, value[name]);

      if (propValue !== undefined) {
        converted[propName] = propValue;
      }
    });

    return converted;
  }

  convertObjectProperty(propSchema, propName, propValue) {
    if (propValue !== undefined) {
      propValue = this.convertSchema(propSchema, propValue);
    }

    return { propName, propValue };
  }

  convertBoolean(schema, value) {
    return value;
  }

  convertInteger(schema, value) {
    return value;
  }

  convertNumber(schema, value) {
    return value;
  }

  convertString(schema, value) {
    return value;
  }
}

module.exports = JsonSchemaConverter;
