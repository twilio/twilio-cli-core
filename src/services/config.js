const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const MessageTemplates = require('./messaging/templates');

class ConfigDataProject {
  constructor(id, accountSid, region) {
    this.id = id;
    this.accountSid = accountSid;
    this.region = region;
  }
}

class ConfigData {
  constructor() {
    this.projects = [];
    this.activeProject = null;
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
    let project;

    if (!projectId) {
      project = this.getProjectFromEnvironment();
    }

    if (this.projects.length > 0) {
      if (!project) {
        const selectedProjectId = projectId || this.activeProject;
        if (selectedProjectId) {
          project = this.projects.find(project => project.id === selectedProjectId);
        } else {
          project = this.projects[0];
        }
      }
    }

    return project;
  }

  removeProject(projectToRemove) {
    this.projects = this.projects.filter(project => {
      return project.id !== projectToRemove.id;
    });
  }

  addProject(id, accountSid, region) {
    const existing = this.getProjectById(id);
    if (existing) {
      existing.accountSid = accountSid;
      existing.region = region;
    } else {
      this.projects.push(new ConfigDataProject(id, accountSid, region));
    }
  }

  loadFromObject(configObj) {
    this.activeProject = configObj.activeProject;
    configObj.projects = configObj.projects || [];
    configObj.projects.forEach(project => {
      this.addProject(project.id, project.accountSid, project.region);
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
    // Migrate to 'fs.mkdirSync' with 'recursive: true' when no longer supporting Node8.
    shell.mkdir('-p', this.configDir);
    await fs.writeJSON(this.filePath, userConfig, { flag: 'w' });

    return MessageTemplates.configSaved({ path: this.filePath });
  }
}

module.exports = { Config, ConfigData };
