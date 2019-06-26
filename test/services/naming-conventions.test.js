const { kebabCase, camelCase, snakeCase, capitalize } = require('../../src/services/naming-conventions');

const { expect, test } = require('@twilio/cli-test');

describe('services', () => {
  describe('namingConventions', () => {
    test.it('handles single word', () => {
      expect(kebabCase('one')).to.equal('one');
      expect(camelCase('one')).to.equal('one');
      expect(snakeCase('one')).to.equal('one');
    });

    test.it('handles all caps word', () => {
      expect(kebabCase('ONE')).to.equal('one');
      expect(camelCase('ONE')).to.equal('one');
      expect(snakeCase('ONE')).to.equal('one');
    });

    test.it('trims leading and trailing spaces', () => {
      expect(kebabCase('  one  ')).to.equal('one');
      expect(camelCase('  one  ')).to.equal('one');
      expect(snakeCase('  one  ')).to.equal('one');
    });

    test.it('trims leading and trailing symbols', () => {
      expect(kebabCase('___one___')).to.equal('one');
      expect(camelCase('___one___')).to.equal('one');
      expect(snakeCase('___one___')).to.equal('one');
    });

    test.it('handles words with spaces', () => {
      expect(kebabCase('one two')).to.equal('one-two');
      expect(kebabCase('one two three')).to.equal('one-two-three');

      expect(camelCase('one two')).to.equal('oneTwo');
      expect(camelCase('one two three')).to.equal('oneTwoThree');

      expect(snakeCase('one two')).to.equal('one_two');
      expect(snakeCase('one two three')).to.equal('one_two_three');
    });

    test.it('handles two words with extra space', () => {
      expect(kebabCase('one  two')).to.equal('one-two');
      expect(kebabCase('one  two  three')).to.equal('one-two-three');

      expect(camelCase('one  two')).to.equal('oneTwo');
      expect(camelCase('one  two  three')).to.equal('oneTwoThree');

      expect(snakeCase('one  two')).to.equal('one_two');
      expect(snakeCase('one  two  three')).to.equal('one_two_three');
    });

    test.it('handles snake_case', () => {
      expect(kebabCase('one_two')).to.equal('one-two');
      expect(kebabCase('one_two_three')).to.equal('one-two-three');

      expect(camelCase('one_two')).to.equal('oneTwo');
      expect(camelCase('one_two_three')).to.equal('oneTwoThree');

      expect(snakeCase('one_two')).to.equal('one_two');
      expect(snakeCase('one_two_three')).to.equal('one_two_three');
    });

    test.it('handles camelCase', () => {
      expect(kebabCase('oneTwo')).to.equal('one-two');
      expect(kebabCase('oneTwoThree')).to.equal('one-two-three');

      expect(camelCase('oneTwo')).to.equal('oneTwo');
      expect(camelCase('oneTwoThree')).to.equal('oneTwoThree');

      expect(snakeCase('oneTwo')).to.equal('one_two');
      expect(snakeCase('oneTwoThree')).to.equal('one_two_three');
    });

    test.it('handles PascalCase', () => {
      expect(kebabCase('OneTwo')).to.equal('one-two');
      expect(kebabCase('OneTwoThree')).to.equal('one-two-three');

      expect(camelCase('OneTwo')).to.equal('oneTwo');
      expect(camelCase('OneTwoThree')).to.equal('oneTwoThree');

      expect(snakeCase('OneTwo')).to.equal('one_two');
      expect(snakeCase('OneTwoThree')).to.equal('one_two_three');
    });

    test.it('handles PascalCase with digits', () => {
      expect(kebabCase('One1Two')).to.equal('one1-two');
      expect(kebabCase('One1Two2Three')).to.equal('one1-two2-three');

      expect(camelCase('One1Two')).to.equal('one1Two');
      expect(camelCase('One1Two2Three')).to.equal('one1Two2Three');

      expect(snakeCase('One1Two')).to.equal('one1_two');
      expect(snakeCase('One1Two2Three')).to.equal('one1_two2_three');
    });

    test.it('handles kebab-case', () => {
      expect(kebabCase('one-two')).to.equal('one-two');
      expect(kebabCase('one-two-three')).to.equal('one-two-three');

      expect(camelCase('one-two')).to.equal('oneTwo');
      expect(camelCase('one-two-three')).to.equal('oneTwoThree');

      expect(snakeCase('one-two')).to.equal('one_two');
      expect(snakeCase('one-two-three')).to.equal('one_two_three');
    });

    describe('capitalize', () => {
      test.it('handles single word', () => {
        expect(capitalize('one')).to.equal('One');
      });

      test.it('handles multiple words', () => {
        expect(capitalize('one two three')).to.equal('One two three');
      });

      test.it('trims leading and trailing spaces', () => {
        expect(capitalize('  one  ')).to.equal('One');
      });
    });
  });
});
