const doesObjectHaveProperty = (obj, propertyName) => {
  if (!obj) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(obj, propertyName);
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
  sleep,
  splitArray
};
