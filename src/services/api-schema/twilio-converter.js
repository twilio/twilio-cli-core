const JsonSchemaConverter = require('./json-converter');
const { camelCase } = require('../naming-conventions');

const STRING_FORMAT_TO_CONVERT_FUNC_MAP = {
  'date-time': 'convertDateTime',
  'date-time-rfc-2822': 'convertDateTime',
  uri: 'convertUri',
};

/**
 * A Twilio extension of the JSON Schema converter. We do additional date-time
 * conversion and also camelCase object property names (keys).
 */
class TwilioSchemaConverter extends JsonSchemaConverter {
  convertObjectProperty(propSchema, propName, propValue) {
    // Convert the property *and* camelCase the key to make it more JSON-ic.
    if (propValue !== undefined) {
      propValue = this.convertSchema(propSchema, propValue);
    }

    if (propSchema) {
      propName = camelCase(propName);
    }

    return { propName, propValue };
  }

  convertString(schema, value) {
    if (schema.format) {
      const validateFunc = STRING_FORMAT_TO_CONVERT_FUNC_MAP[schema.format];

      if (validateFunc) {
        value = this[validateFunc](schema, value);
      } else {
        this.logger.debug(`No conversion function for "${schema.format}" schema format`);
      }
    }

    return value;
  }

  convertDateTime(schema, value) {
    // The date constructor accepts both ISO 8601 and RFC 2822 date-time formats.
    const dateValue = new Date(value);

    if (isNaN(dateValue)) {
      this.logger.debug(`Date-Time value "${value}" is not properly formatted for "${schema.format}" schema format`);
      return value;
    }

    return dateValue;
  }

  convertUri(schema, value) {
    // We don't currently do any URI conversion. This just keeps from logging non-helpful debug.
    return value;
  }
}

module.exports = TwilioSchemaConverter;
