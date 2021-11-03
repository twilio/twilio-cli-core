const fs = require('fs');
const readline = require('readline');

const { logger } = require('../../src/services/messaging/logging');

const defaultVersionRegex = /(\d+)\.(\d+)\.(\d+)/;
const defaultDateRegex = /\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
const cliCoreChangelogFile = 'CHANGES.md';
const oaiChangelogFile = 'OAI_CHANGES.md';

class ChangeLogHelper {
  constructor(
    cliCoreChangelogFilename = cliCoreChangelogFile,
    oaiChangelogFilename = oaiChangelogFile,
    versionRegex = defaultVersionRegex,
    dateRegex = defaultDateRegex,
  ) {
    this.versionRegex = versionRegex;
    this.dateRegex = dateRegex;
    this.cliCoreChangelogFilename = cliCoreChangelogFilename;
    this.oaiChangelogFilename = oaiChangelogFilename;
    this.logger = logger;
  }

  async getAllReleaseVersionsFromGivenDate(date) {
    this.logger.info(`Started detecting the versions from the date: ${date}`);
    const versions = [];
    const readLine = await this.getReadLiner(this.oaiChangelogFilename);
    for await (const line of readLine) {
      const currentDate = this.dateRegex.exec(line);
      if (currentDate) {
        const version = this.versionRegex.exec(line);
        if (version) {
          versions.push(version[0]);
        }
        if (currentDate[0] <= date) {
          break;
        }
      }
    }
    this.logger.info(`Detected Versions: ${versions}`);
    return versions;
  }

  async getLatestChangelogGeneratedDate() {
    this.logger.info('Started detecting the latest date in cli core changelog');
    let latestDate;
    const readLine = await this.getReadLiner(this.cliCoreChangelogFilename);
    for await (const line of readLine) {
      latestDate = this.dateRegex.exec(line);
      if (latestDate) {
        latestDate = latestDate[0];
        this.logger.info(`Detected the latest Date: ${latestDate}`);
        break;
      }
    }
    return latestDate;
  }

  async getChangesAfterGivenDate(date) {
    this.logger.info(`Started getting the changelog from given date: ${date}`);
    let readLines = false;
    let fileData = '';
    const readLine = await this.getReadLiner(this.oaiChangelogFilename);
    for await (const line of readLine) {
      const currentDate = this.dateRegex.exec(line);
      if (currentDate) {
        if (currentDate[0] > date) {
          this.logger.info('Reading the lines');
          readLines = true;
        } else {
          this.logger.info(`Changes from OpenAPI specs: ${fileData}`);
          break;
        }
      } else if (readLines) {
        fileData += `${line}\n`;
      }
    }
    return fileData;
  }

  async appendChangesToChangelog() {
    this.logger.info('Started appendChangesToChangelog');
    try {
      const latestDate = await this.getLatestChangelogGeneratedDate(); // changes.md
      if (latestDate) {
        const changeLog = await this.getChangesAfterGivenDate(latestDate); // oai_changes.md
        if (changeLog) {
          this.logger.info('Updating the CHANGES.md');
          const data = fs.readFileSync(this.cliCoreChangelogFilename);
          if (data.toString().includes(changeLog)) {
            this.logger.info(`Provided changes are already in cli core changeLog: ${changeLog}`);
            return;
          }
          const fd = fs.openSync(this.cliCoreChangelogFilename, 'w+');
          const insert = Buffer.from(changeLog);
          fs.writeSync(fd, insert, 0, insert.length, 0);
          fs.writeSync(fd, data, 0, data.length, insert.length);
          fs.close(fd, (err) => {
            if (err) throw err;
          });
          fs.writeFileSync('changeLog.md', changeLog);
        }
      }
    } catch (error) {
      this.logger.error(`Error while updating the changelog: ${error.message}`);
      throw new Error(error);
    }
  }

  async getReadLiner(filename) {
    if (!fs.existsSync(filename)) {
      throw new Error(`File not found: ${filename}`);
    }
    const fileStream = fs.createReadStream(filename);
    return readline.createInterface({
      input: fileStream,
    });
  }
}
module.exports = {
  ChangeLogHelper,
};
