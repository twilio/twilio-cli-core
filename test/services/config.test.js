const path = require('path');

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

        expect(configData.profiles.newProfile.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(configData.profiles.newProfile.region).to.equal('dev');
      });

      test.it('should add a new profile with apiKey', () => {
        const configData = new ConfigData();
        configData.addProfile(
          'newProfile',
          constants.FAKE_ACCOUNT_SID,
          'dev',
          constants.FAKE_API_KEY,
          constants.FAKE_API_SECRET,
        );

        expect(configData.profiles.newProfile.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(configData.profiles.newProfile.region).to.equal('dev');
        expect(configData.profiles.newProfile.apiKey).to.equal(constants.FAKE_API_KEY);
        expect(configData.profiles.newProfile.apiSecret).to.equal(constants.FAKE_API_SECRET);
      });

      test.it('should update an existing profile', () => {
        const configData = new ConfigData();
        configData.addProfile('activeProfile', constants.FAKE_ACCOUNT_SID, 'dev');
        configData.addProfile('activeProfile', 'new-account-sid');

        expect(configData.profiles.activeProfile.accountSid).to.equal('new-account-sid');
        expect(configData.profiles.activeProfile.region).to.be.undefined;
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

      test.it('should return undefined if first profile not exists with apiKey and apiSecret', () => {
        const configData = new ConfigData();
        configData.profiles = {};
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);

        const profile = configData.getProfileById();
        expect(profile.apiKey).to.be.undefined;
        expect(profile.apiSecret).to.be.undefined;
      });

      test.it('should return profile with apiKey and apiSecret', () => {
        const configData = new ConfigData();
        configData.addProfile('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.profiles = {
          firstProfile: {
            accountSid: constants.FAKE_ACCOUNT_SID,
            apiKey: constants.FAKE_API_KEY,
            apiSecret: constants.FAKE_API_SECRET,
          },
        };

        const profile = configData.getProfileById('firstProfile');
        expect(profile.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(profile.apiKey).to.equal(constants.FAKE_API_KEY);
        expect(profile.apiSecret).to.equal(constants.FAKE_API_SECRET);
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

      test.it('should remove profile from projects if duplicate found', () => {
        const configData = new ConfigData();
        configData.addProject('testProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProfile(
          'testProfile',
          constants.FAKE_ACCOUNT_SID,
          '',
          constants.FAKE_API_KEY,
          constants.FAKE_API_SECRET,
        );

        expect(configData.projects).to.be.empty;
        expect(configData.profiles.testProfile.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
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
        configData.addProject('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProfile(
          'secondProfile',
          'new_account_SID',
          '',
          constants.FAKE_API_KEY,
          constants.FAKE_API_SECRET,
        );
        configData.addProfile(
          'thirdProfile',
          'newest_account_SID',
          '',
          constants.FAKE_API_KEY,
          constants.FAKE_API_SECRET,
        );
        const fakeProfile = {
          id: 'DOES_NOT_EXIST',
          accountSid: 'fake_SID',
        };
        const originalLength = configData.projects.length;
        const originalProfilesLength = Object.keys(configData.profiles).length;
        configData.removeProfile(fakeProfile);

        expect(configData.projects.length).to.equal(originalLength);
        expect(Object.keys(configData.profiles).length).to.equal(originalProfilesLength);
      });

      test.it('removes profile from projects', () => {
        const configData = new ConfigData();
        configData.addProject('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProfile', 'new_account_SID');
        configData.addProject('thirdProfile', 'newest_account_SID');
        configData.addProfile(
          'fourthProfile',
          'fourth_account_SID',
          '',
          constants.FAKE_API_KEY,
          constants.FAKE_API_SECRET,
        );
        const profile = configData.getProfileById('secondProfile');
        const originalLengthProfiles = Object.keys(configData.profiles).length;
        configData.removeProfile(profile);

        expect(configData.projects[1].id).to.equal('thirdProfile');
        expect(configData.projects[1].accountSid).to.equal('newest_account_SID');
        expect(Object.keys(configData.profiles).length).to.equal(originalLengthProfiles);
      });
      test.it('removes profile from profiles', () => {
        const configData = new ConfigData();
        configData.addProject('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProfile', 'new_account_SID');
        configData.addProfile('thirdProfile', 'newest_account_SID', '', 'third_api_key', 'third_api_secret');
        configData.addProfile(
          'fourthProfile',
          'fourth_account_SID',
          '',
          constants.FAKE_API_KEY,
          constants.FAKE_API_SECRET,
        );
        const profile = configData.getProfileById('thirdProfile');
        const originalLengthProjects = configData.projects.length;
        configData.removeProfile(profile);

        expect(configData.projects.length).to.equal(originalLengthProjects);
        expect(configData.profiles[profile.id]).to.be.undefined;
      });

      test.it('removes active profile of projects', () => {
        const configData = new ConfigData();
        configData.addProject('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProfile', 'new_account_SID');
        configData.addProject('thirdProfile', 'newest_account_SID');
        configData.addProfile(
          'fourthProfile',
          'fourth_account_SID',
          '',
          constants.FAKE_API_KEY,
          constants.FAKE_API_SECRET,
        );
        const profile = configData.setActiveProfile('firstProfile');
        const originalLengthProfiles = Object.keys(configData.profiles).length;
        configData.removeProfile(profile);

        expect(configData.projects[1].id).to.equal('thirdProfile');
        expect(configData.projects[1].accountSid).to.equal('newest_account_SID');
        expect(configData.activeProfile).to.equal(null);
        expect(Object.keys(configData.profiles).length).to.equal(originalLengthProfiles);
      });

      test.it('removes active profile of profiles', () => {
        const configData = new ConfigData();
        configData.addProject('firstProfile', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProfile', 'new_account_SID');
        configData.addProfile('thirdProfile', 'newest_account_SID', '', 'third_api_key', 'third_api_secret');
        configData.addProfile(
          'fourthProfile',
          'fourth_account_SID',
          '',
          constants.FAKE_API_KEY,
          constants.FAKE_API_SECRET,
        );
        const profile = configData.setActiveProfile('thirdProfile');
        const originalLengthProjects = configData.projects.length;
        configData.removeProfile(profile);

        expect(configData.projects.length).to.equal(originalLengthProjects);
        expect(configData.profiles[profile.id]).to.be.undefined;
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
      let tempConfigDir;
      beforeEach(() => {
        tempConfigDir = tmp.dirSync({ unsafeCleanup: true });
      });

      test.it('saves and loads user configuration with space trimmed', async () => {
        const config = new Config(tempConfigDir.name);
        const userConfig = await config.load();
        userConfig.addProfile('  profile  \t', 'sid  \n ', '    stage', 'test_key', 'test_secret');
        userConfig.setActiveProfile('\tprofile\t');
        userConfig.ackPrompt('impromptu');

        const saveMessage = await config.save(userConfig);
        expect(saveMessage).to.contain(`${tempConfigDir.name}${path.sep}config.json`);

        const loadedConfig = await config.load();
        expect(loadedConfig).to.deep.equal(userConfig);
        expect(loadedConfig.getActiveProfile().id).to.equal('profile');
      });

      test.it('should load projects post sanitization and not removed from list on load', async () => {
        const config = new Config(tempConfigDir.name);
        const configData = await config.load();
        configData.addProfile('  profile  ', 'sid_profile  ', '    dev', 'test_key', 'test_secret');
        configData.addProject('    profile', ' sid_project ', '    dev');
        await config.save(configData);

        const loadedConfig = await config.load();
        expect(loadedConfig).to.deep.equal(configData);
        expect(loadedConfig.projects).to.have.length(1); // Removal shouldn't be performed on projects
        expect(Object.keys(loadedConfig.profiles)).to.have.length(1);
        expect(Object.keys(loadedConfig.profiles)[0]).to.equal('profile');
        expect(loadedConfig.profiles.profile.accountSid).to.equal('sid_profile');
        expect(loadedConfig.projects[0].id).to.equal('profile');
        expect(loadedConfig.projects[0].accountSid).to.equal('sid_project');
        expect(loadedConfig.projects[0].region).to.equal('dev');
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
