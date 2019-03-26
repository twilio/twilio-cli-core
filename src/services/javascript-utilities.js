const doesObjectHaveProperty = (obj, propertyName) => {
  if (!obj) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(obj, propertyName);
};

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  doesObjectHaveProperty,
  sleep
};
