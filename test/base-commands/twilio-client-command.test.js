const { expect, test, constants } = require('@twilio/cli-test');
const TwilioClientCommand = require('../../src/base-commands/twilio-client-command');
const { Config, ConfigData } = require('../../src/services/config');

describe('base-commands', () => {
  describe('twilio-client-command', () => {
    class TestClientCommand extends TwilioClientCommand {
    }

    class ThrowingClientCommand extends TwilioClientCommand {
      async run() {
        await super.run();

        throw new Error('We were so wrong!');
      }
    }

    class AccountSidClientCommand extends TwilioClientCommand {
    }

    TestClientCommand.flags = TwilioClientCommand.flags;
    ThrowingClientCommand.flags = TwilioClientCommand.flags;
    AccountSidClientCommand.flags = Object.assign({}, TwilioClientCommand.flags, TwilioClientCommand.accountSidFlag);

    const setUpTest = (
      args = [],
      { setUpUserConfig = undefined, mockSecureStorage = true, commandClass: CommandClass = TestClientCommand } = {}
    ) => {
      return test
        .do(ctx => {
          ctx.userConfig = new ConfigData();
          if (setUpUserConfig) {
            setUpUserConfig(ctx.userConfig);
          } else {
            ctx.userConfig.addProfile('MyFirstProfile', constants.FAKE_ACCOUNT_SID);
            ctx.userConfig.addProfile('twilio-cli-unit-testing', constants.FAKE_ACCOUNT_SID, 'stage');
          }
        })
        .twilioCliEnv(Config)
        .stderr()
        .do(async ctx => {
          ctx.testCmd = new CommandClass(args, ctx.fakeConfig);
          ctx.testCmd.secureStorage =
            {
              async getCredentials(profileId) {
                return {
                  apiKey: mockSecureStorage ? constants.FAKE_API_KEY : 'error',
                  apiSecret: constants.FAKE_API_SECRET + profileId
                };
              }
            };

          // This is essentially what oclif does behind the scenes.
          try {
            await ctx.testCmd.run();
          } catch (e) {
            await ctx.testCmd.catch(e);
          }
        });
    };

    setUpTest(['-l', 'debug']).it('should create a client for the active profile', ctx => {
      expect(ctx.stderr).to.contain('MyFirstProfile');
      expect(ctx.testCmd.twilioClient.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
      expect(ctx.testCmd.twilioClient.username).to.equal(constants.FAKE_API_KEY);
      expect(ctx.testCmd.twilioClient.password).to.equal(constants.FAKE_API_SECRET + 'MyFirstProfile');
      expect(ctx.testCmd.twilioClient.region).to.equal(undefined);
    });

    setUpTest(['-l', 'debug', '--account-sid', 'ACbaccbaccbaccbaccbaccbaccbaccbacc'], { commandClass: AccountSidClientCommand }).it(
      'should create a client for the active profile with a different account SID',
      ctx => {
        expect(ctx.stderr).to.contain('MyFirstProfile');
        expect(ctx.testCmd.twilioClient.accountSid).to.equal('ACbaccbaccbaccbaccbaccbaccbaccbacc');
        expect(ctx.testCmd.twilioClient.username).to.equal(constants.FAKE_API_KEY);
        expect(ctx.testCmd.twilioClient.password).to.equal(constants.FAKE_API_SECRET + 'MyFirstProfile');
        expect(ctx.testCmd.twilioClient.region).to.equal(undefined);
      }
    );

    setUpTest(['-l', 'debug'], { setUpUserConfig: () => 0 })
      .exit(1)
      .it('should fail for a non-existent active profile', ctx => {
        expect(ctx.stderr).to.contain('Could not find profile');
        expect(ctx.stderr).to.contain('To create the profile, run:');
        expect(ctx.stderr).to.contain('twilio profiles:create');
        expect(ctx.stderr).to.contain('TWILIO_ACCOUNT_SID');
      });

    setUpTest(['-p', 'alt', '-l', 'debug'])
      .exit(1)
      .it('should fail for a non-existent profile', ctx => {
        expect(ctx.stderr).to.contain('Could not find profile');
        expect(ctx.stderr).to.contain('To create the profile, run:');
        expect(ctx.stderr).to.contain('twilio profiles:create --profile "alt"');
        expect(ctx.stderr).to.contain('TWILIO_ACCOUNT_SID');
      });

    setUpTest(['-p', 'twilio-cli-unit-testing']).it('should create a client for a non-default profile', ctx => {
      expect(ctx.testCmd.twilioClient.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
      expect(ctx.testCmd.twilioClient.username).to.equal(constants.FAKE_API_KEY);
      expect(ctx.testCmd.twilioClient.password).to.equal(constants.FAKE_API_SECRET + 'twilio-cli-unit-testing');
      expect(ctx.testCmd.twilioClient.region).to.equal('stage');
    });

    setUpTest(['-p', 'twilio-cli-unit-testing'], { mockSecureStorage: false })
      .exit(1)
      .it('should handle a secure storage error', ctx => {
        expect(ctx.stderr).to.contain('Could not get credentials for profile "twilio-cli-unit-testing"');
        expect(ctx.stderr).to.contain('To reconfigure the profile, run:');
        expect(ctx.stderr).to.contain('twilio profiles:create --profile "twilio-cli-unit-testing"');
      });

    setUpTest([], { commandClass: ThrowingClientCommand })
      .exit(1)
      .it('should catch unhandled errors', ctx => {
        expect(ctx.stderr).to.contain('unexpected error');
      });

    describe('parseProperties', () => {
      setUpTest().it('should ignore empty PropertyFlags', ctx => {
        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties).to.be.null;
      });

      setUpTest().it('should ignore missing command flags', ctx => {
        ctx.testCmd.constructor.PropertyFlags = {
          'friendly-name': {},
          'sms-url': {}
        };

        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties).to.be.null;
      });

      setUpTest().it('should parse options into API resource properties', ctx => {
        ctx.testCmd.constructor.PropertyFlags = {
          'friendly-name': {},
          'sms-url': {}
        };
        ctx.testCmd.flags = {
          'friendly-name': 'Casper',
          'sms-url': 'https://localhost:5000/sms'
        };

        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties.friendlyName).to.equal('Casper');
        expect(updatedProperties.smsUrl).to.equal('https://localhost:5000/sms');
      });

      setUpTest().it('should parse empty command flags', ctx => {
        ctx.testCmd.constructor.PropertyFlags = { 'sms-url': {} };
        ctx.testCmd.flags = { 'sms-url': '' };

        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties.smsUrl).to.be.empty;
      });
    });

    describe('updateResource', () => {
      setUpTest().it('should return nothing to update if no properties passed', async ctx => {
        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const results = await ctx.testCmd.updateResource(null, resourceSid);
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Nothing to update');
        expect(ctx.stderr).to.contain('Nothing to update');
      });

      setUpTest().it('should return success if resource was updated', async ctx => {
        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const updatedProperties = {
          friendlyName: 'Casper'
        };

        const fakeResource = sid => {
          expect(sid).to.equal(resourceSid);
          return {
            async update(props) {
              expect(props).to.eql(updatedProperties);
            }
          };
        };

        const results = await ctx.testCmd.updateResource(fakeResource, resourceSid, updatedProperties);
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Success');
      });

      setUpTest().it('should return success if resource was updated from flags', async ctx => {
        ctx.testCmd.constructor.PropertyFlags = {
          'friendly-name': {},
          'sms-url': {}
        };
        ctx.testCmd.flags = {
          'friendly-name': 'Casper',
          'sms-url': 'https://localhost:5000/sms'
        };

        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const fakeResource = sid => {
          expect(sid).to.equal(resourceSid);
          return {
            async update(props) {
              expect(props.friendlyName).to.equal('Casper');
              expect(props.smsUrl).to.equal('https://localhost:5000/sms');
            }
          };
        };

        const results = await ctx.testCmd.updateResource(fakeResource, resourceSid);
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Success');
      });

      setUpTest().it('should report an error if API call fails', async ctx => {
        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const fakeResource = sid => {
          expect(sid).to.equal(resourceSid);
          return {
            async update() {
              const err = { message: 'A fake API error' };
              throw err;
            }
          };
        };

        const results = await ctx.testCmd.updateResource(fakeResource, resourceSid, {});
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Error');
        expect(ctx.stderr).to.contain('A fake API error');
      });
    });
  });
});
