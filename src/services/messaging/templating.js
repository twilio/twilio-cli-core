const templatize = (templateStrings, ...templateKeys) => {
  return (...values) => {
    // Assume the last value is an object.
    const dict = values[values.length - 1] || {};
    const result = [templateStrings[0]];

    templateKeys.forEach((key, i) => {
      /*
       * Numerical keys will perform a 0-based index lookup on the provided values.
       * Others will perform a string-key lookup on the last value.
       */
      const value = Number.isInteger(key) ? values[key] : dict[key];

      // Append the lookup value and the next string in the template.
      result.push(value);
      result.push(templateStrings[i + 1]);
    });

    // Squash 'em all together.
    return result.join('');
  };
};

module.exports = {
  templatize,
};
