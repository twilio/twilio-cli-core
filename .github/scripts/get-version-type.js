/* eslint-disable no-console */
const { ChangeLogHelper } = require('./change-log-helper');

const ch = new ChangeLogHelper();

const getVersionType = async () => {
  const latestDate = await ch.getLatestChangelogGeneratedDate();
  const versions = await ch.getAllReleaseVersionsFromGivenDate(latestDate);
  if (versions.length >= 2) {
    const version1 = versions[0].split('.');
    const version2 = versions[versions.length - 1].split('.');
    for (let i = 0; i < 3; i++) {
      if (version1[i] !== version2[i]) return i;
    }
  }
  return -1;
};
(async () => {
  console.log(await getVersionType());
})();
module.exports = {
  getVersionType,
};
