/**
 * Checks whether an object is instance of a given class
 * @param {Object} instance  the instance object to check
 * @param klass     the class the instance object to be checked against
 * @returns {boolean} whether the instance is instanceof the provided klass
 */
module.exports.instanceOf = (instance, klass) => {
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
