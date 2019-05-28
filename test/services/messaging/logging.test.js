const { expect, test } = require('@twilio/cli-test');
const { logger } = require('../../../src/services/messaging/logging');

describe('services', () => {
  describe('messaging', () => {
    describe('logging.logger', () => {
      test.stderr().it('should at least log errors by default', ctx => {
        logger.error('heir or?');
        expect(ctx.stderr).to.not.be.empty;
      });

      test.stderr().it('should not log debug by default', ctx => {
        logger.debug('eek!');
        expect(ctx.stderr).to.be.empty;
      });
    });
  });
});
