const doesObjectHaveProperty = (obj, propertyName) => {
  if (!obj) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(obj, propertyName);
};

const translateKeys = (obj, keyFunc) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => translateKeys(item, keyFunc));
  }

  const jsonObj = typeof obj.toJSON === 'function' ? obj.toJSON() : obj;

  const translated = {};
  for (const oldKey in jsonObj) {
    if (doesObjectHaveProperty(obj, oldKey)) {
      const newKey = keyFunc(oldKey);
      const value = obj[oldKey];

      translated[newKey] = translateKeys(value, keyFunc);
    }
  }

  return translated;
};

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const splitArray = (array, testFunc) => {
  const left = [];
  const right = [];

  array.forEach(item => testFunc(item) ? left.push(item) : right.push(item));

  return [left, right];
};

module.exports = {
  doesObjectHaveProperty,
  translateKeys,
  sleep,
  splitArray
};
