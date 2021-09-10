const fs = require('fs');

const { expect, test } = require('@twilio/cli-test');
const mock = require('mock-fs');

const { getVersionType } = require('../../.github/scripts/get-version-type');

describe('release-scripts', () => {
  describe('get-version-type', () => {
    afterEach(() => {
      mock.restore();
    });
    test.it('Get version upgrade type - Error', async () => {
      await expect(getVersionType()).to.be.rejectedWith("ENOENT: no such file or directory, open 'OAI_CHANGES.md'");
    });
    test.it('Get version upgrade type - Major', async () => {
      mock({
        'CHANGES.md':
          '[2021-08-26] Version 2.28.1\n' +
          '---------------------------\n' +
          '**Test**\n' +
          '- Changes for test\n' +
          '\n',
        'OAI_CHANGES.md':
          '[2021-09-08] Version 2.0.0\n' +
          '---------------------------\n' +
          '**OAI**\n' +
          '- Latest changes from OAI\n' +
          '\n' +
          '**Second change**\n' +
          '- Added OAI change\n' +
          '\n' +
          '\n' +
          '[2021-08-25] Version 1.20.1\n' +
          '---------------------------\n' +
          '**Previous OAI change**\n' +
          '- Previous OAI\n' +
          '- Test Change OAI\n' +
          '\n' +
          '\n',
      });
      const result = await getVersionType();
      expect(result).to.eq(0);
    });
    test.it('Get version upgrade type - Minor', async () => {
      mock({
        'CHANGES.md':
          '[2021-08-26] Version 2.28.1\n' +
          '---------------------------\n' +
          '**Test**\n' +
          '- Changes for test\n' +
          '\n',
        'OAI_CHANGES.md':
          '[2021-09-08] Version 1.21.0\n' +
          '---------------------------\n' +
          '**OAI**\n' +
          '- Latest changes from OAI\n' +
          '\n' +
          '**Second change**\n' +
          '- Added OAI change\n' +
          '\n' +
          '\n' +
          '[2021-08-25] Version 1.20.1\n' +
          '---------------------------\n' +
          '**Previous OAI change**\n' +
          '- Previous OAI\n' +
          '- Test Change OAI\n' +
          '\n' +
          '\n',
      });
      const result = await getVersionType();
      expect(result).to.eq(1);
    });

    test.it('Get version upgrade type - Patch', async () => {
      mock({
        'CHANGES.md':
          '[2021-08-26] Version 2.28.1\n' +
          '---------------------------\n' +
          '**Test**\n' +
          '- Changes for test\n' +
          '\n',
        'OAI_CHANGES.md':
          '[2021-09-08] Version 1.20.2\n' +
          '---------------------------\n' +
          '**OAI**\n' +
          '- Latest changes from OAI\n' +
          '\n' +
          '**Second change**\n' +
          '- Added OAI change\n' +
          '\n' +
          '\n' +
          '[2021-08-25] Version 1.20.1\n' +
          '---------------------------\n' +
          '**Previous OAI change**\n' +
          '- Previous OAI\n' +
          '- Test Change OAI\n' +
          '\n' +
          '\n',
      });
      const result = await getVersionType();
      expect(result).to.eq(2);
    });
  });
});
