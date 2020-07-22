const doesObjectHaveProperty = (obj, propertyName) => {
  if (!obj) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(obj, propertyName);
};

/**
 * Recursively translates the keys and values of the object using the given translator functions.
 *
 * @param {object} obj - The object to have its keys translated
 * @param {function(object)} [keyFunc] - The function to translate and return each key
 * @param {function(object)} [valueFunc] - The function to translate and return each value
 * @returns {*} Input obj with keys and/or values translated
 */
const translateObject = (obj, keyFunc, valueFunc) => {
  if (!obj) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => translateObject(item, keyFunc, valueFunc));
  }

  if (typeof obj === 'object') {
    const jsonObj = typeof obj.toJSON === 'function' ? obj.toJSON() : obj;

    const translated = {};
    for (const oldKey in jsonObj) {
      if (doesObjectHaveProperty(obj, oldKey)) {
        const newKey = keyFunc ? keyFunc(oldKey) : oldKey;
        const value = obj[oldKey];

        translated[newKey] = translateObject(value, keyFunc, valueFunc);
      }
    }

    return translated;
  }

  return valueFunc ? valueFunc(obj) : obj;
};

/**
 * Recursively translates the keys of the object using the given key translator function.
 *
 * @param {object} obj - The object to have its keys translated
 * @param {function(object)} keyFunc - The function to translate and return each key
 * @returns {*} Input obj with keys translated
 */
const translateKeys = (obj, keyFunc) => {
  return translateObject(obj, keyFunc, null);
};

/**
 * Recursively translates the values of the object using the given values translator function.
 *
 * @param {object} obj - The object to have its values translated
 * @param {function(object)} valueFunc - The function to translate and return each value
 * @returns {*} Input obj with values translated
 */
const translateValues = (obj, valueFunc) => {
  return translateObject(obj, null, valueFunc);
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const splitArray = (array, testFunc) => {
  const left = [];
  const right = [];

  array.forEach((item) => (testFunc(item) ? left.push(item) : right.push(item)));

  return [left, right];
};

/**
 * Checks whether an object is instance of a given class
 * @param {Object} instance  the instance object to check
 * @param klass     the class the instance object to be checked against
 * @returns {boolean} whether the instance is instanceof the provided klass
 */
const instanceOf = (instance, klass) => {
  while (instance && instance !== Object.prototype) {
    if (!instance || !instance.constructor || !instance.constructor.name) {
      return false;
    }

    if (klass.name === instance.constructor.name) {
      return true;
    }

    instance = Object.getPrototypeOf(instance);
  }

  return false;
};

module.exports = {
  doesObjectHaveProperty,
  translateObject,
  translateKeys,
  translateValues,
  sleep,
  splitArray,
  instanceOf,
};
