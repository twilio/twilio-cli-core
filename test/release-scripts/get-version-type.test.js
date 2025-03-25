const fs = require('fs');

const { expect, test } = require('@twilio/cli-test');
const { Volume } = require('memfs');
const { patchFs } = require('fs-monkey');

const { getVersionType } = require('../../.github/scripts/get-version-type');

describe('release-scripts', () => {
  describe('get-version-type', () => {
    test.it('Get version upgrade type - Error', async () => {
      await expect(getVersionType()).to.be.rejectedWith('File not found: OAI_CHANGES.md');
    });
    test.it('Get version upgrade type - Major', async () => {
      const unpatch = patchFs(
        Volume.fromJSON({
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
        }),
      );
      const result = await getVersionType();
      expect(result).to.eq(0);
      unpatch();
    });
    test.it('Get version upgrade type - Minor', async () => {
      const unpatch = patchFs(
        Volume.fromJSON({
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
        }),
      );
      const result = await getVersionType();
      expect(result).to.eq(1);
      unpatch();
    });

    test.it('Get version upgrade type - Patch', async () => {
      const unpatch = patchFs(
        Volume.fromJSON({
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
        }),
      );
      const result = await getVersionType();
      expect(result).to.eq(2);
      unpatch();
    });
    test.it('Get version upgrade type - Invalid', async () => {
      const unpatch = patchFs(
        Volume.fromJSON({
          'CHANGES.md':
            '[2021-09-08] Version 2.28.1\n' +
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
        }),
      );
      const result = await getVersionType();
      expect(result).to.eq(-1);
      unpatch();
    });
  });
});
