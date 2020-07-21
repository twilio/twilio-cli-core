const { expect, test } = require('@twilio/cli-test');
const generalUtils = require('../../src/utils/general');

describe('utils', () => {
  describe('general', () => {
    class BaseError extends Error {
      // No-op
    }

    class ExtendedError extends BaseError {
      // No-op
    }

    test.it('should return true for instanceOf', () => {
      const baseError = new BaseError();
      const extendedError = new ExtendedError();

      expect(generalUtils.instanceOf(extendedError, ExtendedError)).to.equal(true);
      expect(generalUtils.instanceOf(extendedError, BaseError)).to.equal(true);
      expect(generalUtils.instanceOf(extendedError, Error)).to.equal(true);

      expect(generalUtils.instanceOf(baseError, BaseError)).to.equal(true);
      expect(generalUtils.instanceOf(baseError, Error)).to.equal(true);
    });

    test.it('should return false for instanceOf', () => {
      class Foo extends Error {}

      const baseError = new BaseError();
      const extendedError = new ExtendedError();

      expect(generalUtils.instanceOf(baseError, Foo)).to.equal(false);
      expect(generalUtils.instanceOf(extendedError, Foo)).to.equal(false);
    });
  });
});
