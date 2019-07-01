const { doesObjectHaveProperty, translateKeys, sleep, splitArray } = require('../../src/services/javascript-utilities');

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

    describe('translateKeys', () => {
      const keyFunc = key => key.toUpperCase();

      test.it('should translate the keys of a complex object', () => {
        const actual = {
          nullValue: null,
          anArray: ['a', 'b', 'c'],
          nested: { level2: { level3: 'value' } },
          custom: {
            one: 1,
            two: 2,
            three: 3,
            toJSON() {
              return { one: this.one, two: this.two };
            }
          }
        };

        const expected = {
          NULLVALUE: null,
          ANARRAY: ['a', 'b', 'c'],
          NESTED: { LEVEL2: { LEVEL3: 'value' } },
          CUSTOM: {
            ONE: 1,
            TWO: 2
          }
        };

        expect(translateKeys(actual, keyFunc)).to.eql(expected);
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

    describe('splitArray', () => {
      test.it('should split the array in 2', () => {
        const testArray = ['a', 'ey!', 'bee', 'b', 'c', 'SEA'];
        const isLengthOne = item => item.length === 1;

        const [matched, notMatched] = splitArray(testArray, isLengthOne);

        expect(matched).to.deep.equal(['a', 'b', 'c']);
        expect(notMatched).to.deep.equal(['ey!', 'bee', 'SEA']);
      });
    });
  });
});
