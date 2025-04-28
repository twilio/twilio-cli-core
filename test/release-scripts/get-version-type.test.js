const { expect, test } = require('@twilio/cli-test');
const proxyquire = require('proxyquire');

describe('release-scripts', () => {
  describe('get-version-type', () => {
    test.it('Get version upgrade type - Major', async () => {
      mockChangeLogHelper = {
        getLatestChangelogGeneratedDate: async () => '2021-09-08',
        getAllReleaseVersionsFromGivenDate: async () => ['2.28.1', '1.21.0'],
      };

      const { getVersionType } = proxyquire('../../.github/scripts/get-version-type', {
        './change-log-helper': {
          ChangeLogHelper: class {
            constructor() {
              return mockChangeLogHelper;
            }
          },
        },
      });

      const result = await getVersionType();

      expect(result).to.eq(0);
    });
    test.it('Get version upgrade type - Minor', async () => {
      mockChangeLogHelper = {
        getLatestChangelogGeneratedDate: async () => '2021-09-08',
        getAllReleaseVersionsFromGivenDate: async () => ['2.28.0', '2.27.0'],
      };

      const { getVersionType } = proxyquire('../../.github/scripts/get-version-type', {
        './change-log-helper': {
          ChangeLogHelper: class {
            constructor() {
              return mockChangeLogHelper;
            }
          },
        },
      });

      const result = await getVersionType();

      expect(result).to.eq(1);
    });

    test.it('Get version upgrade type - Patch', async () => {
      mockChangeLogHelper = {
        getLatestChangelogGeneratedDate: async () => '2021-09-08',
        getAllReleaseVersionsFromGivenDate: async () => ['2.28.1', '2.28.0'],
      };

      const { getVersionType } = proxyquire('../../.github/scripts/get-version-type', {
        './change-log-helper': {
          ChangeLogHelper: class {
            constructor() {
              return mockChangeLogHelper;
            }
          },
        },
      });

      const result = await getVersionType();

      expect(result).to.eq(2);
    });
  });
});
