const fs = require('fs');

const { expect, test } = require('@twilio/cli-test');
const { Volume } = require('memfs');
const { patchFs } = require('fs-monkey');

const { ChangeLogHelper } = require('../../.github/scripts/change-log-helper');

const defaultVersionRegex = /(\d+)\.(\d+)\.(\d+)/;
const defaultDateRegex = /\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
const cliCoreChangelogFile = 'CHANGES.md';
const oaiChangelogFile = 'OAI_CHANGES.md';

describe('release-scripts', () => {
  describe('change-log-helper', () => {
    let unpatch;
    beforeEach(() => {
      unpatch = patchFs(
        Volume.fromJSON({
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
        }),
      );
    });
    afterEach(() => {
      unpatch();
    });
    test.it('change-log-helper Default', () => {
      const changeLogHelper = new ChangeLogHelper();
      expect(changeLogHelper.versionRegex.toString()).to.eq(defaultVersionRegex.toString());
      expect(changeLogHelper.dateRegex.toString()).to.eq(defaultDateRegex.toString());
      expect(changeLogHelper.cliCoreChangelogFilename).to.eq(cliCoreChangelogFile);
      expect(changeLogHelper.oaiChangelogFilename).to.eq(oaiChangelogFile);
    });

    test.it('change-log-helper with custom values', () => {
      const cliCoreChangelog = 'test-changes.md';
      const changeLogHelper = new ChangeLogHelper(cliCoreChangelog);
      expect(changeLogHelper.cliCoreChangelogFilename).to.eq(cliCoreChangelog);
      expect(changeLogHelper.oaiChangelogFilename).to.eq(oaiChangelogFile);
      expect(changeLogHelper.versionRegex.toString()).to.eq(defaultVersionRegex.toString());
      expect(changeLogHelper.dateRegex.toString()).to.eq(defaultDateRegex.toString());
    });

    test.it('getAllReleaseVersionsFromGivenDate', async () => {
      const changeLogHelper = new ChangeLogHelper();
      let versions = await changeLogHelper.getAllReleaseVersionsFromGivenDate('2021-08-26');
      expect(versions.length).to.eq(2);
      versions = await changeLogHelper.getAllReleaseVersionsFromGivenDate('2021-08-12');
      expect(versions.length).to.eq(3);
      versions = await changeLogHelper.getAllReleaseVersionsFromGivenDate('2021-09-09');
      expect(versions.length).to.eq(1);
    });

    test.it('getLatestChangelogGeneratedDate', async () => {
      const invalidChangeLogHelper = new ChangeLogHelper('invalid-changes.md');
      await expect(invalidChangeLogHelper.getLatestChangelogGeneratedDate()).to.be.rejectedWith(
        'File not found: invalid-changes.md',
      );
      const changeLogHelper = new ChangeLogHelper();
      const date = await changeLogHelper.getLatestChangelogGeneratedDate();
      expect(date).to.eq('2021-08-26');
    });

    test.it('getChangesAfterGivenDate', async () => {
      const invalidChangeLogHelper = new ChangeLogHelper('CHANGES.md', 'invalid-oai-changes.md');
      await expect(invalidChangeLogHelper.getChangesAfterGivenDate('2021-08-26')).to.be.rejectedWith(
        'File not found: invalid-oai-changes.md',
      );
      const changeLogHelper = new ChangeLogHelper();
      const changes = await changeLogHelper.getChangesAfterGivenDate('2021-08-26');
      expect(changes).to.contain('Latest changes from OAI');
      expect(changes).to.not.contain('Previous OAI change');
      const moreChanges = await changeLogHelper.getChangesAfterGivenDate('2021-08-12');
      expect(moreChanges).to.contain('Latest changes from OAI');
      expect(moreChanges).to.contain('Previous OAI change');
      const invalidChanges = await changeLogHelper.getChangesAfterGivenDate('2020-08-12');
      expect(invalidChanges).to.contain('');
    });

    test.it('appendChangesToChangelog', async () => {
      const invalidChangeLogHelper = new ChangeLogHelper('invalid-changes.md');
      await expect(invalidChangeLogHelper.appendChangesToChangelog()).to.be.rejectedWith(
        'Error: File not found: invalid-changes.md',
      );
      expect(fs.existsSync('changeLog.md')).to.eq(false);
      const changeLogHelper = new ChangeLogHelper();
      await changeLogHelper.appendChangesToChangelog();
      expect(fs.existsSync('changeLog.md')).to.eq(true);
    });
  });
});
