const { doesObjectHaveProperty, sleep } = require('../../src/services/javascript-utilities');

const { expect, test } = require('@twilio/cli-test');

describe('services', () => {
  describe('javascript-utilities', () => {
    describe('doesObjectHaveProperty', () => {
      test.it('should find the foo property on a standard object', () => {
        expect(doesObjectHaveProperty({ foo: 'bar' }, 'foo')).to.be.true;
      });

      test.it('should not find the foobar property on a standard object', () => {
        expect(doesObjectHaveProperty({ foo: 'bar' }, 'foobar')).to.be.false;
      });

      test.it('should find the foo property on a prototypeless object', () => {
        const testObj = Object.create(null);
        testObj.foo = 'bar';
        expect(doesObjectHaveProperty(testObj, 'foo')).to.be.true;
      });

      test.it('should not find the foobar property on a prototypeless object', () => {
        const testObj = Object.create(null);
        testObj.foo = 'bar';
        expect(doesObjectHaveProperty(testObj, 'foobar')).to.be.false;
      });

      test.it('should not crash if object null or undefined', () => {
        expect(doesObjectHaveProperty(null, 'foobar')).to.be.false;
        expect(doesObjectHaveProperty(undefined, 'foobar')).to.be.false;
      });
    });

    describe('sleep', () => {
      test.it('should sleep about as long as it is told', async () => {
        const sleepTimeLower = 80;
        const sleepTimeTarget = 100;
        const sleepTimeUpper = 120;

        const startTime = Date.now();
        await sleep(sleepTimeTarget);
        const endTime = Date.now();

        expect(endTime - startTime).to.be.within(sleepTimeLower, sleepTimeUpper);
      });
    });
  });
});
