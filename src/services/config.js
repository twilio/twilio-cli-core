const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

const DEFAULT_PROJECT = 'default';

class ConfigDataProject {
  constructor(id, accountSid) {
    this.id = id;
    this.accountSid = accountSid;
  }
}

class ConfigData {
  constructor() {
    this.projects = [];
  }

  getProjectFromEnvironment() {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_API_KEY, TWILIO_API_SECRET } = process.env;
    if (!TWILIO_ACCOUNT_SID) return;

    if (TWILIO_API_KEY && TWILIO_API_SECRET)
      return {
        // eslint-disable-next-line no-template-curly-in-string
        id: '${TWILIO_API_KEY}/${TWILIO_API_SECRET}',
        accountSid: TWILIO_ACCOUNT_SID,
        apiKey: TWILIO_API_KEY,
        apiSecret: TWILIO_API_SECRET
      };

    if (TWILIO_AUTH_TOKEN)
      return {
        // eslint-disable-next-line no-template-curly-in-string
        id: '${TWILIO_ACCOUNT_SID}/${TWILIO_AUTH_TOKEN}',
        accountSid: TWILIO_ACCOUNT_SID,
        apiKey: TWILIO_ACCOUNT_SID,
        apiSecret: TWILIO_AUTH_TOKEN
      };
  }

  getProjectById(projectId) {
    let project = this.projects.find(project => project.id === projectId);

    if (projectId === DEFAULT_PROJECT && !project) {
      project = this.getProjectFromEnvironment();
    }

    return project;
  }

  removeProject(projectToRemove) {
    this.projects = this.projects.filter(project => {
      return project.id !== projectToRemove.id;
    });
  }

  addProject(id, accountSid) {
    const existing = this.getProjectById(id);
    if (existing) {
      existing.accountSid = accountSid;
    } else {
      this.projects.push(new ConfigDataProject(id, accountSid));
    }
  }

  loadFromObject(configObj) {
    configObj.projects = configObj.projects || [];
    configObj.projects.forEach(project => {
      this.addProject(project.id, project.accountSid);
    });
  }
}

class Config {
  constructor(configDir) {
    this.configDir = configDir;
    this.filePath = path.join(configDir, 'config.json');
  }

  async load() {
    const configData = new ConfigData();

    if (!fs.existsSync(this.filePath)) {
      return configData;
    }

    configData.loadFromObject(await fs.readJSON(this.filePath));
    return configData;
  }

  async save(userConfig) {
    shell.mkdir('-p', this.configDir);
    await fs.writeJSON(this.filePath, userConfig, { flag: 'w' });
  }
}

module.exports = { Config, ConfigData, DEFAULT_PROJECT };
