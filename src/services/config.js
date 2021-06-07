/* eslint-disable max-classes-per-file */
const path = require('path');

const fs = require('fs-extra');

const MessageTemplates = require('./messaging/templates');

const CLI_NAME = 'twilio-cli';

class ConfigDataProfile {
  constructor(id, accountSid, region) {
    this.id = id;
    this.accountSid = accountSid;
    this.region = region;
  }
}

class ConfigData {
  constructor() {
    this.edge = undefined;
    this.email = {};
    this.prompts = {};
    this.projects = [];
    this.activeProfile = null;
    this.profiles = {};
  }

  getProfileFromEnvironment() {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_API_KEY, TWILIO_API_SECRET, TWILIO_REGION } = process.env;
    if (!TWILIO_ACCOUNT_SID) {
      return undefined;
    }

    if (TWILIO_API_KEY && TWILIO_API_SECRET) {
      return {
        // eslint-disable-next-line no-template-curly-in-string
        id: '${TWILIO_API_KEY}/${TWILIO_API_SECRET}',
        accountSid: TWILIO_ACCOUNT_SID,
        apiKey: TWILIO_API_KEY,
        apiSecret: TWILIO_API_SECRET,
        region: TWILIO_REGION,
      };
    }

    if (TWILIO_AUTH_TOKEN) {
      return {
        // eslint-disable-next-line no-template-curly-in-string
        id: '${TWILIO_ACCOUNT_SID}/${TWILIO_AUTH_TOKEN}',
        accountSid: TWILIO_ACCOUNT_SID,
        apiKey: TWILIO_ACCOUNT_SID,
        apiSecret: TWILIO_AUTH_TOKEN,
        region: TWILIO_REGION,
      };
    }

    return undefined;
  }

  getProfileById(profileId) {
    let profile;

    if (!profileId) {
      profile = this.getProfileFromEnvironment();
    }

    if (!profile) {
      if (profileId) {
        // Clean the profile ID.
        profileId = this.sanitize(profileId);
        profile = this.projects.find((p) => p.id === profileId);
      } else {
        profile = this.getActiveProfile();
      }
      this.addApiKeysToProfile(profile);
    }

    return profile;
  }

  setActiveProfile(profileId) {
    if (profileId) {
      const profile = this.getProfileById(profileId);

      if (profile) {
        this.activeProfile = profile.id;
        return profile;
      }
    }

    return undefined;
  }

  getActiveProfile() {
    let profile;
    if (this.projects.length > 0) {
      if (this.activeProfile) {
        profile = this.projects.find((p) => p.id === this.activeProfile);
      }
      if (!profile) {
        profile = this.projects[0];
      }
    }
    return profile;
  }

  removeProfile(profileToRemove) {
    this.projects = this.projects.filter((profile) => {
      return profile.id !== profileToRemove.id;
    });
    if (profileToRemove.id === this.activeProfile) {
      this.activeProfile = null;
    }
  }

  addProfile(id, accountSid, region) {
    // Clean all the inputs.
    id = this.sanitize(id);
    accountSid = this.sanitize(accountSid);
    region = this.sanitize(region);

    const existing = this.getProfileById(id);
    if (existing) {
      existing.accountSid = accountSid;
      existing.region = region;
    } else {
      this.projects.push(new ConfigDataProfile(id, accountSid, region));
    }
  }

  isPromptAcked(promptId) {
    const prompt = this.prompts[promptId];

    return Boolean(prompt && prompt.acked);
  }

  ackPrompt(promptId) {
    let prompt = this.prompts[promptId];

    if (!prompt) {
      prompt = {};
      this.prompts[promptId] = prompt;
    }

    prompt.acked = true;
  }

  loadFromObject(configObj) {
    this.edge = configObj.edge;
    this.email = configObj.email || {};
    this.prompts = configObj.prompts || {};
    this.profiles = configObj.profiles || {};
    // Note the historical 'projects' naming.
    configObj.projects = configObj.projects || [];
    configObj.projects.forEach((project) => this.addProfile(project.id, project.accountSid, project.region));
    this.setActiveProfile(configObj.activeProject);
  }

  sanitize(string) {
    // Trim whitespace if given a non-null string.
    return string ? string.trim() : string;
  }

  addApiKeysToProfile(profile) {
    if (profile) {
      const credentials = this.getApiKeysByProfileID(profile.id);
      if (credentials) {
        profile.apiKey = credentials.apiKey;
        profile.apiSecret = credentials.apiSecret;
      }
    }
  }

  getApiKeysByProfileID(profileId) {
    if (this.profiles) {
      const { profiles } = this;
      if (profileId && profiles.hasOwnProperty(profileId)) {
        return { apiKey: profiles[profileId].apiKey, apiSecret: profiles[profileId].apiSecret };
      }
    }
    return null;
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

  async save(configData) {
    configData = {
      edge: configData.edge,
      email: configData.email,
      prompts: configData.prompts,
      // Note the historical 'projects' naming.
      projects: configData.projects,
      activeProject: configData.activeProfile,
    };

    fs.mkdirSync(this.configDir, { recursive: true });
    await fs.writeJSON(this.filePath, configData, { flag: 'w' });

    return MessageTemplates.configSaved({ path: this.filePath });
  }
}

class PluginConfig {
  constructor(configDir, pluginName) {
    this.filePath = path.join(configDir, 'plugins', pluginName, 'config.json');
  }

  async getConfig() {
    try {
      return await fs.readJSON(this.filePath, { encoding: 'utf-8' });
    } catch (error) {
      return {};
    }
  }

  async setConfig(config) {
    try {
      await fs.writeJSON(this.filePath, config);
    } catch (error) {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      await fs.writeJSON(this.filePath, config);
    }
  }
}

module.exports = {
  CLI_NAME,
  Config,
  ConfigData,
  PluginConfig,
};
