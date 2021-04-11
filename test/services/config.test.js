const path = require('path');
const fs = require('fs');

const tmp = require('tmp');
const { expect, test, constants } = require('@twilio/cli-test');

const { Config, ConfigData, PluginConfig } = require('../../src/services/config');

const FAKE_AUTH_TOKEN = '1234567890abcdefghijklmnopqrstuvwxyz';

describe('services', () => {
  describe('config', () => {
    describe('ConfigData.addProfile', () => {
      test.it('should add a new profile', () => {
        const configData = new ConfigData();
        configData.addProfile('newProfile', constants.FAKE_ACCOUNT_SID, 'dev');

        expect(configData.profiles[0].id).to.equal('newProfile');
        expect(configData.profiles[0].accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(configData.profiles[0].region).to.equal('dev');
      });

      test.it('should update an existing profile', () => {
        const configData = new ConfigData();
        configData.addProfile('activeProfile', constants.FAKE_ACCOUNT_SID, 'dev');
        configData.addProfile('activeProfile', 'new-account-sid');

        expect(configData.profiles[0].id).to.equal('activeProfile');
        expect(configData.profiles[0].accountSid).to.equal('new-account-sid');
        expect(configData.profiles[0].region).to.be.undefined;
      });
    });

    describe('ConfigData.getProfileById', () => {
      test.it('should return undefined if no profiles', () => {
        const configData = new ConfigData();
        const profile = configData.getProfileById('DOES_NOT_EXIST');
        expect(profile).to.be.undefined;
      });

      test.it('should return undefined if no profiles, even with env vars', () => {
        const configData = new ConfigData();
        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = FAKE_AUTH_TOKEN;

        const profile = configData.getProfileById('DOES_NOT_EXIST');
        expect(profile).to.be.undefined;
      });

      test.it('should return first profile if it exists, and no env vars', () => {
        const configData = new ConfigData();
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);

        const profile = configData.getProfileById();
        expect(profile.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(profile.apiKey).to.be.undefined;
        expect(profile.apiSecret).to.be.undefined;
      });

      test.it('return the active profile if there are multiple profiles', () => {
        const configData = new ConfigData();
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProfile('secondProfile', 'new_account_SID');
        configData.addProfile('thirdProfile', 'newest_account_SID');
        configData.setActiveProfile('secondProfile');

        const profile = configData.getProfileById();
        expect(profile.accountSid).to.equal('new_account_SID');
        expect(profile.apiKey).to.be.undefined;
        expect(profile.apiSecret).to.be.undefined;
      });

      test.it('should return profile populated from AccountSid/AuthToken env vars', () => {
        const configData = new ConfigData();
        configData.addProfile('envProfile', constants.FAKE_ACCOUNT_SID);

        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = FAKE_AUTH_TOKEN;

        const profile = configData.getProfileById();
        expect(profile.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(profile.apiKey).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(profile.apiSecret).to.equal(FAKE_AUTH_TOKEN);
      });

      test.it('should return profile populated from AccountSid/ApiKey env vars', () => {
        const configData = new ConfigData();
        configData.addProfile('envProfile', constants.FAKE_ACCOUNT_SID);

        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = 'api key should take precedence';
        process.env.TWILIO_API_KEY = constants.FAKE_API_KEY;
        process.env.TWILIO_API_SECRET = constants.FAKE_API_SECRET;

        const profile = configData.getProfileById();
        expect(profile.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(profile.apiKey).to.equal(constants.FAKE_API_KEY);
        expect(profile.apiSecret).to.equal(constants.FAKE_API_SECRET);
      });

      test.it('should return profile populated with region env var', () => {
        const configData = new ConfigData();
        configData.addProfile('envProfile', constants.FAKE_ACCOUNT_SID);

        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = FAKE_AUTH_TOKEN;
        process.env.TWILIO_REGION = 'region';

        const profile = configData.getProfileById();
        expect(profile.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(profile.apiKey).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(profile.apiSecret).to.equal(FAKE_AUTH_TOKEN);
        expect(profile.region).to.equal('region');
      });
    });

    describe('ConfigData.activeProfile', () => {
      test.it('should return first profile when no active profile is set', () => {
        const configData = new ConfigData();
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProfile('secondProfile', 'new_account_SID');
        configData.addProfile('thirdProfile', 'newest_account_SID');
        const active = configData.getActiveProfile();

        expect(active.id).to.equal('firstProfile');
        expect(active.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
      });

      test.it('should return active profile when active profile has been set', () => {
        const configData = new ConfigData();
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProfile('secondProfile', 'new_account_SID');
        configData.addProfile('thirdProfile', 'newest_account_SID');
        configData.setActiveProfile('secondProfile');
        const active = configData.getActiveProfile();

        expect(active.id).to.equal('secondProfile');
        expect(active.accountSid).to.equal('new_account_SID');
      });

      test.it('should not allow the active profile to not exist', () => {
        const configData = new ConfigData();
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);
        expect(configData.setActiveProfile('secondProfile')).to.be.undefined;
        expect(configData.getActiveProfile().id).to.equal('firstProfile');
      });

      test.it('should return undefined if profile does not exist and there are no profiles configured', () => {
        const configData = new ConfigData();
        const active = configData.getActiveProfile();
        expect(active).to.be.undefined;
      });
    });

    describe('ConfigData.removeProfile', () => {
      test.it('remove a profile that does not exist', () => {
        const configData = new ConfigData();
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProfile('secondProfile', 'new_account_SID');
        configData.addProfile('thirdProfile', 'newest_account_SID');
        const fakeProfile = {
          id: 'DOES_NOT_EXIST',
          accountSid: 'fake_SID',
        };
        const originalLength = configData.profiles.length;
        configData.removeProfile(fakeProfile);

        expect(configData.profiles.length).to.equal(originalLength);
      });

      test.it('removes profile', () => {
        const configData = new ConfigData();
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProfile('secondProfile', 'new_account_SID');
        configData.addProfile('thirdProfile', 'newest_account_SID');
        const profile = configData.getProfileById('secondProfile');
        configData.removeProfile(profile);

        expect(configData.profiles[1].id).to.equal('thirdProfile');
        expect(configData.profiles[1].accountSid).to.equal('newest_account_SID');
      });

      test.it('removes active profile', () => {
        const configData = new ConfigData();
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProfile('secondProfile', 'new_account_SID');
        configData.addProfile('thirdProfile', 'newest_account_SID');
        const profile = configData.setActiveProfile('firstProfile');
        configData.removeProfile(profile);

        expect(configData.profiles[1].id).to.equal('thirdProfile');
        expect(configData.profiles[1].accountSid).to.equal('newest_account_SID');
        expect(configData.activeProfile).to.equal(null);
      });
    });
    describe('ConfigData.prompts', () => {
      test.it('should store prompt acks', () => {
        const configData = new ConfigData();

        expect(configData.isPromptAcked('prompt-1')).to.be.false;
        configData.ackPrompt('prompt-1');
        expect(configData.isPromptAcked('prompt-1')).to.be.true;
        expect(configData.isPromptAcked('prompt-2')).to.be.false;
      });
    });

    describe('Config', () => {
      const tempConfigDir = tmp.dirSync({ unsafeCleanup: true });

      test.it('saves and loads user configuration with space trimmed', async () => {
        const config = new Config(tempConfigDir.name);
        const userConfig = await config.load();
        userConfig.addProfile('  profile  \t', 'sid  \n ', '    stage');
        userConfig.setActiveProfile('\tprofile\t');
        userConfig.ackPrompt('impromptu');

        const saveMessage = await config.save(userConfig);
        expect(saveMessage).to.contain(`${tempConfigDir.name}${path.sep}config.json`);

        const loadedConfig = await config.load();
        expect(loadedConfig).to.deep.equal(userConfig);
        expect(loadedConfig.getActiveProfile().id).to.equal('profile');
      });

      test.it('works with config dirs that did not exist', async () => {
        const nestedConfig = path.join(tempConfigDir.name, 'some', 'nested', 'path');

        const config = new Config(nestedConfig);
        const userConfig = await config.load();

        const saveMessage = await config.save(userConfig);
        expect(saveMessage).to.contain(`${nestedConfig}${path.sep}config.json`);
      });
    });

    describe('PluginConfig', () => {
      let tempConfigDir;
      beforeEach(() => {
        tempConfigDir = tmp.dirSync({ unsafeCleanup: true });
      });
      afterEach(() => {
        tempConfigDir.removeCallback();
      });

      test.it("loads an empty object when the plugin directory doesn't exist", async () => {
        const pluginConfig = new PluginConfig(tempConfigDir.name, 'test-plugin');
        expect(await pluginConfig.getConfig()).to.deep.equal({});
      });

      test.it("saves config to the plugin directory when it doesn't exist", async () => {
        const pluginConfig = new PluginConfig(tempConfigDir.name, 'test-plugin');
        await pluginConfig.setConfig({ foo: 'bar' });
        expect(await pluginConfig.getConfig()).to.deep.equal({ foo: 'bar' });
      });

      test.it('overwrites config when it already exists', async () => {
        const pluginConfig = new PluginConfig(tempConfigDir.name, 'test-plugin');
        await pluginConfig.setConfig({ hello: 'world' });

        const pluginConfig2 = new PluginConfig(tempConfigDir.name, 'test-plugin');
        await pluginConfig2.setConfig({ foo: 'bar' });
        expect(await pluginConfig2.getConfig()).to.deep.equal({ foo: 'bar' });
      });
    });
  });
});
