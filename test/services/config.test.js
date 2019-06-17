const tmp = require('tmp');
const path = require('path');

const { expect, test, constants } = require('@twilio/cli-test');
const { Config, ConfigData } = require('../../src/services/config');

const FAKE_AUTH_TOKEN = '1234567890abcdefghijklmnopqrstuvwxyz';

describe('services', () => {
  describe('config', () => {
    describe('ConfigData.addProject', () => {
      test.it('should add a new project', () => {
        const configData = new ConfigData();
        configData.addProject('newProject', constants.FAKE_ACCOUNT_SID, 'dev');

        expect(configData.projects[0].id).to.equal('newProject');
        expect(configData.projects[0].accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(configData.projects[0].region).to.equal('dev');
      });

      test.it('should update an existing project', () => {
        const configData = new ConfigData();
        configData.addProject('activeProject', constants.FAKE_ACCOUNT_SID, 'dev');
        configData.addProject('activeProject', 'new-account-sid');

        expect(configData.projects[0].id).to.equal('activeProject');
        expect(configData.projects[0].accountSid).to.equal('new-account-sid');
        expect(configData.projects[0].region).to.equal(undefined);
      });
    });

    describe('ConfigData.getProjectById', () => {
      test.it('should return undefined if no projects', () => {
        const configData = new ConfigData();
        const project = configData.getProjectById('DOES_NOT_EXIST');
        expect(project).to.equal(undefined);
      });
      test.it('should return undefined if no projects, even with env vars', () => {
        const configData = new ConfigData();
        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = FAKE_AUTH_TOKEN;

        const project = configData.getProjectById('DOES_NOT_EXIST');
        expect(project).to.equal(undefined);
      });
      test.it('should return first project if it exists, and no env vars', () => {
        const configData = new ConfigData();
        configData.addProject('firstProject', constants.FAKE_ACCOUNT_SID);

        const project = configData.getProjectById();
        expect(project.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(project.apiKey).to.equal(undefined);
        expect(project.apiSecret).to.equal(undefined);
      });
      test.it('return the active project if there are multiple projects', () => {
        const configData = new ConfigData();
        configData.addProject('firstProject', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProject', 'new_account_SID');
        configData.addProject('thirdProject', 'newest_account_SID');

        configData.activeProject = 'secondProject';
        const project = configData.getProjectById();
        expect(project.accountSid).to.equal('new_account_SID');
        expect(project.apiKey).to.equal(undefined);
        expect(project.apiSecret).to.equal(undefined);
      });
      test.it('should return project populated from AccountSid/AuthToken env vars', () => {
        const configData = new ConfigData();
        configData.addProject('envProject', constants.FAKE_ACCOUNT_SID);

        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = FAKE_AUTH_TOKEN;

        const project = configData.getProjectById();
        expect(project.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(project.apiKey).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(project.apiSecret).to.equal(FAKE_AUTH_TOKEN);
      });

      test.it('should return project populated from AccountSid/ApiKey env vars', () => {
        const configData = new ConfigData();
        configData.addProject('envProject', constants.FAKE_ACCOUNT_SID);

        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = 'api key should take precedence';
        process.env.TWILIO_API_KEY = constants.FAKE_API_KEY;
        process.env.TWILIO_API_SECRET = constants.FAKE_API_SECRET;

        const project = configData.getProjectById();
        expect(project.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(project.apiKey).to.equal(constants.FAKE_API_KEY);
        expect(project.apiSecret).to.equal(constants.FAKE_API_SECRET);
      });
    });

    describe('ConfigData.getActiveProject', () => {
      test.it('should return first project when no active project is set', () => {
        const configData = new ConfigData();
        configData.addProject('firstProject', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProject', 'new_account_SID');
        configData.addProject('thirdProject', 'newest_account_SID');
        const active = configData.getActiveProject();

        expect(active.id).to.equal('firstProject');
        expect(active.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
      });
      test.it('should return active project when active project has been set', () => {
        const configData = new ConfigData();
        configData.addProject('firstProject', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProject', 'new_account_SID');
        configData.addProject('thirdProject', 'newest_account_SID');
        configData.activeProject = 'secondProject';
        const active = configData.getActiveProject();

        expect(active.id).to.equal('secondProject');
        expect(active.accountSid).to.equal('new_account_SID');
      });
      test.it('should return undefined if project does not exist and there are no projects configured', () => {
        const configData = new ConfigData();
        const active = configData.getActiveProject();
        expect(active).to.equal(undefined);
      });
    });

    describe('ConfigData.removeProject', () => {
      test.it('remove a project that does not exist', () => {
        const configData = new ConfigData();
        configData.addProject('firstProject', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProject', 'new_account_SID');
        configData.addProject('thirdProject', 'newest_account_SID');
        const fakeProject = {
          id: 'DOES_NOT_EXIST',
          accountSid: 'fake_SID'
        };
        const originalLength = configData.projects.length;
        configData.removeProject(fakeProject);

        expect(configData.projects.length).to.equal(originalLength);
      });
      test.it('removes project', () => {
        const configData = new ConfigData();
        configData.addProject('firstProject', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProject', 'new_account_SID');
        configData.addProject('thirdProject', 'newest_account_SID');
        const project = configData.getProjectById('secondProject');
        configData.removeProject(project);

        expect(configData.projects[1].id).to.equal('thirdProject');
        expect(configData.projects[1].accountSid).to.equal('newest_account_SID');
      });
      test.it('removes active project', () => {
        const configData = new ConfigData();
        configData.addProject('firstProject', constants.FAKE_ACCOUNT_SID);
        configData.addProject('secondProject', 'new_account_SID');
        configData.addProject('thirdProject', 'newest_account_SID');
        const project = configData.getProjectById('firstProject');
        configData.activeProject = 'firstProject';
        configData.removeProject(project);

        expect(configData.projects[1].id).to.equal('thirdProject');
        expect(configData.projects[1].accountSid).to.equal('newest_account_SID');
        expect(configData.activeProject).to.equal(null);
      });
    });

    describe('Config', () => {
      const tempConfigDir = tmp.dirSync({ unsafeCleanup: true });

      test.it('saves and loads user configuration', async () => {
        const config = new Config(tempConfigDir.name);
        const userConfig = await config.load();
        userConfig.addProject('myProject', constants.FAKE_ACCOUNT_SID, 'stage');

        const saveMessage = await config.save(userConfig);
        expect(saveMessage).to.contain(`${tempConfigDir.name}${path.sep}config.json`);

        const loadedConfig = await config.load();
        expect(loadedConfig).to.deep.equal(userConfig);
      });

      test.it('works with config dirs that did not exist', async () => {
        const nestedConfig = path.join(tempConfigDir.name, 'some', 'nested', 'path');

        const config = new Config(nestedConfig);
        const userConfig = await config.load();

        const saveMessage = await config.save(userConfig);
        expect(saveMessage).to.contain(`${nestedConfig}${path.sep}config.json`);
      });
    });
  });
});
