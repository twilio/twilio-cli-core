const { ChangeLogHelper } = require('./change-log-helper');

const ch = new ChangeLogHelper();

const updateChangeLog = async () => {
  return ch.appendChangesToChangelog();
};
(async () => {
  await updateChangeLog();
})();
