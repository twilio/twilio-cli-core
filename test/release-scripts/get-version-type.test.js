const fs = require('fs');

const { expect, test } = require('@twilio/cli-test');
const mock = require('mock-fs');
const proxyquire = require('proxyquire');

const mockChangeLogHelper = {
  getLatestChangelogGeneratedDate: async () => '2021-08-26',
  getAllReleaseVersionsFromGivenDate: async () => ['2.28.1', '2.0.0'],
};

const { getVersionType } = proxyquire('../../.github/scripts/get-version-type', {
  './change-log-helper': {
    ChangeLogHelper: function () {
      return mockChangeLogHelper;
    },
  },
});

// const { getVersionType } = require('../../.github/scripts/get-version-type');

describe('release-scripts', () => {
  describe('get-version-type', () => {
    beforeEach(() => {
      mock({
        'CHANGES.md':
          '[2021-08-26] Version 2.28.1\n' +
          '---------------------------\n' +
          '**Test**\n' +
          '- Changes for test\n' +
          '\n' +
          '[2021-08-12] Version 2.28.0\n' +
          '---------------------------\n' +
          '**Library - Test**\n' +
          '- Test changes Library\n' +
          '\n' +
          '\n' +
          '[2021-07-29] Version 2.27.1\n' +
          '---------------------------\n' +
          '**Test**\n' +
          '- Add test changes',
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
          '\n' +
          '[2021-08-11] Version 1.20.0\n' +
          '---------------------------\n' +
          '**Third Version**\n' +
          '- Changes in third version\n' +
          '\n',
      });
    });
    afterEach(() => {
      mock.restore();
    });
    test.it('Get version upgrade type - Error', async () => {
      await expect(getVersionType()).to.be.rejectedWith('File not found: OAI_CHANGES.md');
    });
    test.it('Get version upgrade type - Major', async () => {
      const result = await getVersionType();
      expect(result).to.eq(0);
    });
    test.it('Get version upgrade type - Minor', async () => {
      const result = await getVersionType();
      expect(result).to.eq(1);
    });

    test.it('Get version upgrade type - Patch', async () => {
      const result = await getVersionType();
      expect(result).to.eq(2);
    });
    test.it('Get version upgrade type - Invalid', async () => {
      const result = await getVersionType();
      expect(result).to.eq(-1);
    });
  });
});
