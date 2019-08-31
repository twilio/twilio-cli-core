const { expect, test } = require('@twilio/cli-test');
const { requireNative } = require('../../src/services/require-native');

describe('services', () => {
  describe('require-native', () => {
    test.it('can load modules', () => {
      expect(requireNative('chai')).to.not.be.undefined;
    });

    test.it('does not throw for unknown modules', () => {
      expect(requireNative('chai-dai')).to.be.undefined;
    });
  });
});
