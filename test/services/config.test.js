const { expect, test, constants } = require('@twilio/cli-test');
const { ConfigData, DEFAULT_PROJECT } = require('../../src/services/config');

const FAKE_AUTH_TOKEN = '1234567890abcdefghijklmnopqrstuvwxyz';

describe('services', () => {
  describe('config', () => {
    describe('ConfigData.getProjectById', () => {
      test.it('should return undefined if no projects or env vars', async () => {
        const configData = new ConfigData();
        const project = configData.getProjectById(DEFAULT_PROJECT);
        expect(project).to.equal(undefined);
      });

      test.it('should return project populated from AccountSid/AuthToken env vars', async () => {
        const configData = new ConfigData();
        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = FAKE_AUTH_TOKEN;

        const project = configData.getProjectById(DEFAULT_PROJECT);
        expect(project.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(project.apiKey).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(project.apiSecret).to.equal(FAKE_AUTH_TOKEN);
      });

      test.it('should return project populated from AccountSid/ApiKey env vars', async () => {
        const configData = new ConfigData();
        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = 'api key should take precedence';
        process.env.TWILIO_API_KEY = constants.FAKE_API_KEY;
        process.env.TWILIO_API_SECRET = constants.FAKE_API_SECRET;

        const project = configData.getProjectById(DEFAULT_PROJECT);
        expect(project.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
        expect(project.apiKey).to.equal(constants.FAKE_API_KEY);
        expect(project.apiSecret).to.equal(constants.FAKE_API_SECRET);
      });

      test.it('should ignore env vars if a non-default project is requested', async () => {
        const configData = new ConfigData();
        process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
        process.env.TWILIO_AUTH_TOKEN = 'api key should take precedence';
        process.env.TWILIO_API_KEY = constants.FAKE_API_KEY;
        process.env.TWILIO_API_SECRET = constants.FAKE_API_SECRET;

        const project = configData.getProjectById('my-other-project');
        expect(project).to.equal(undefined);
      });
    });
  });
});
