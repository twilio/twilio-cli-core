const JsonSchemaConverter = require('./json-converter');
const { camelCase } = require('../naming-conventions');

const STRING_FORMAT_TO_CONVERT_FUNC_MAP = {
  'date-time': 'convertDateTime',
  'date-time-rfc-2822': 'convertDateTime',
  'uri': 'convertUri'
};

/**
 * A Twilio extension of the JSON Schema converter.
 */
class TwilioSchemaConverter extends JsonSchemaConverter {
  convertObjectProperty(propSchema, propName, propValue) {
    propValue = this.convertSchema(propSchema, propValue);

    return { propName: camelCase(propName), propValue };
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
    const dateValue = new Date(value);

    if (isNaN(dateValue)) {
      this.logger.debug(`Date-Time value "${value}" is not properly formatted for "${schema.format}" schema format`);
      return value;
    }

    return dateValue;
  }

  convertUri(schema, value) {
    return value;
  }
}

module.exports = TwilioSchemaConverter;
