const { expect, test } = require('@twilio/cli-test');

const { templatize } = require('../../../src/services/messaging/templating');

const EXPECTED_MESSAGE = 'Indiana Jones and the Template of Doom';

describe('services', () => {
  describe('messaging', () => {
    describe('templating.templatize', () => {
      test.it('should handle a string without params', () => {
        const template = templatize`Indiana Jones and the Template of Doom`;

        expect(template()).to.equal(EXPECTED_MESSAGE);
      });

      test.it('should handle index-based params', () => {
        const template = templatize`${1} Jones and the ${0} of Doom`;

        expect(template('Template', 'Indiana')).to.equal(EXPECTED_MESSAGE);
      });

      test.it('should handle key-based params', () => {
        const template = templatize`${'who'} and the ${'what'}`;

        expect(template({ who: 'Indiana Jones', what: 'Template of Doom' })).to.equal(EXPECTED_MESSAGE);
      });

      test.it('should handle both index- and key-based params', () => {
        const template = templatize`${0} and the ${'what'}`;

        expect(template('Indiana Jones', { what: 'Template of Doom' })).to.equal(EXPECTED_MESSAGE);
      });
    });
  });
});
