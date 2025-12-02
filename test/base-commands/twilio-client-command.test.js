/* eslint-disable max-classes-per-file */
const { expect, test, constants } = require('@twilio/cli-test');

const TwilioClientCommand = require('../../src/base-commands/twilio-client-command');
const { Config, ConfigData } = require('../../src/services/config');
const { TwilioCliError } = require('../../src/services/error');

describe('base-commands', () => {
  describe('twilio-client-command', () => {
    class TestClientCommand extends TwilioClientCommand {}

    class ThrowingUnknownClientCommand extends TwilioClientCommand {
      async run() {
        await super.run();

        throw new Error('We were so wrong!');
      }
    }

    class Throwing20003ClientCommand extends TwilioClientCommand {
      async run() {
        await super.run();

        throw new TwilioCliError('Access Denied!', 20003);
      }
    }

    class AccountSidClientCommand extends TwilioClientCommand {}

    TestClientCommand.flags = TwilioClientCommand.flags;
    ThrowingUnknownClientCommand.flags = TwilioClientCommand.flags;
    Throwing20003ClientCommand.flags = TwilioClientCommand.flags;
    AccountSidClientCommand.flags = { ...TwilioClientCommand.flags, ...TwilioClientCommand.accountSidFlag };

    const setUpTest = (
      args = [],
      {
        setUpUserConfig = undefined,
        commandClass: CommandClass = TestClientCommand,
        envRegion,
        envEdge,
        configRegion = 'configRegion',
        configEdge,
        configRequireProfileInput,
      } = {},
    ) => {
      return test
        .do((ctx) => {
          ctx.userConfig = new ConfigData();
          ctx.userConfig.edge = configEdge;
          ctx.userConfig.requireProfileInput = configRequireProfileInput;

          if (envRegion) {
            process.env.TWILIO_REGION = envRegion;
            process.env.TWILIO_ACCOUNT_SID = constants.FAKE_ACCOUNT_SID;
            process.env.TWILIO_AUTH_TOKEN = constants.FAKE_API_SECRET;
          }

          if (envEdge) {
            process.env.TWILIO_EDGE = envEdge;
          }

          if (setUpUserConfig) {
            setUpUserConfig(ctx.userConfig);
          } else {
            ctx.userConfig.addProfile(
              'MyFirstProfile',
              constants.FAKE_ACCOUNT_SID,
              undefined,
              constants.FAKE_API_KEY,
              `${constants.FAKE_API_SECRET}MyFirstProfile`,
            );
            ctx.userConfig.addProfile(
              'region-edge-testing',
              constants.FAKE_ACCOUNT_SID,
              configRegion,
              constants.FAKE_API_KEY,
              `${constants.FAKE_API_SECRET}region-edge-testing`,
            );
            ctx.userConfig.addProfile('no-credentials-profile', constants.FAKE_ACCOUNT_SID, configRegion);
            ctx.userConfig.setActiveProfile('MyFirstProfile');
          }
        })
        .twilioCliEnv(Config)
        .stderr()
        .do(async (ctx) => {
          ctx.testCmd = new CommandClass(args, ctx.fakeConfig);
          // This is essentially what oclif does behind the scenes.
          try {
            await ctx.testCmd.run();
          } catch (error) {
            await ctx.testCmd.catch(error);
          }
        });
    };

    setUpTest([], { configRequireProfileInput: true })
      .exit(1)
      .it('should fail if requireProfileInput attribute in config is set but flag is not passed', (ctx) => {
        expect(ctx.stderr).to.contain('Error: Missing required flag:');
        expect(ctx.stderr).to.contain('-p, --profile PROFILE');
      });

    setUpTest(['-p', ''], { configRequireProfileInput: true })
      .exit(1)
      .it('should fail if requireProfileInput attribute in config is set but flag is passed as empty string', (ctx) => {
        expect(ctx.stderr).to.contain('Error: Missing required flag:');
        expect(ctx.stderr).to.contain('-p, --profile PROFILE');
      });

    setUpTest(['-p', 'region-edge-testing'], { configRequireProfileInput: true }).it(
      'should use the profile passed, when requireProfileInput flag is set in config and valid profile is passed',
      (ctx) => {
        expect(ctx.testCmd.currentProfile.id).to.equal('region-edge-testing');
      },
    );

    setUpTest(['-l', 'debug']).it('should create a client for the active profile', (ctx) => {
      expect(ctx.stderr).to.contain('MyFirstProfile');
      expect(ctx.testCmd.twilioClient.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
      expect(ctx.testCmd.twilioClient.username).to.equal(constants.FAKE_API_KEY);
      expect(ctx.testCmd.twilioClient.password).to.equal(`${constants.FAKE_API_SECRET}MyFirstProfile`);
      expect(ctx.testCmd.twilioClient.region).to.equal(undefined);
      expect(ctx.testCmd.twilioClient.edge).to.equal(undefined);
    });

    setUpTest(['-l', 'debug', '--account-sid', 'ACbaccbaccbaccbaccbaccbaccbaccbacc'], {
      commandClass: AccountSidClientCommand,
    }).it('should create a client for the active profile with a different account SID', (ctx) => {
      expect(ctx.stderr).to.contain('MyFirstProfile');
      expect(ctx.testCmd.twilioClient.accountSid).to.equal('ACbaccbaccbaccbaccbaccbaccbaccbacc');
      expect(ctx.testCmd.twilioClient.username).to.equal(constants.FAKE_API_KEY);
      expect(ctx.testCmd.twilioClient.password).to.equal(`${constants.FAKE_API_SECRET}MyFirstProfile`);
      expect(ctx.testCmd.twilioClient.region).to.equal(undefined);
      expect(ctx.testCmd.twilioClient.edge).to.equal(undefined);
    });

    setUpTest(['-l', 'debug'], { setUpUserConfig: () => 0 })
      .exit(1)
      .it('should fail for a non-existent active profile', (ctx) => {
        expect(ctx.stderr).to.contain('Could not find profile.');
        expect(ctx.stderr).to.contain('To create the profile, run:');
        expect(ctx.stderr).to.contain('twilio profiles:create');
        expect(ctx.stderr).to.contain('TWILIO_ACCOUNT_SID');
      });

    setUpTest(['-p', 'alt', '-l', 'debug'])
      .exit(1)
      .it('should fail for a non-existent profile', (ctx) => {
        expect(ctx.stderr).to.contain('Could not find profile "alt".');
        expect(ctx.stderr).to.contain('To create the profile, run:');
        expect(ctx.stderr).to.contain('twilio profiles:create --profile "alt"');
        expect(ctx.stderr).to.contain('TWILIO_ACCOUNT_SID');
      });

    setUpTest(['-l', 'debug'], {
      setUpUserConfig: (x) => {
        x.addProfile('profile1', constants.FAKE_ACCOUNT_SID);
      },
    })
      .exit(1)
      .it('should fail for a no active profile', (ctx) => {
        expect(ctx.stderr).to.contain('There is no active profile set.');
        expect(ctx.stderr).to.contain(' To activate the profile, run:');
        expect(ctx.stderr).to.contain('twilio profiles:use');
      });

    setUpTest(['-p', 'region-edge-testing']).it('should create a client for a non-default profile', (ctx) => {
      expect(ctx.testCmd.twilioClient.accountSid).to.equal(constants.FAKE_ACCOUNT_SID);
      expect(ctx.testCmd.twilioClient.username).to.equal(constants.FAKE_API_KEY);
      expect(ctx.testCmd.twilioClient.password).to.equal(`${constants.FAKE_API_SECRET}region-edge-testing`);
      expect(ctx.testCmd.twilioClient.region).to.equal('configRegion');
    });

    setUpTest(['-p', 'no-credentials-profile'])
      .exit(1)
      .it('should handle no profile error', (ctx) => {
        expect(ctx.stderr).to.contain('Could not get credentials for profile "no-credentials-profile"');
        expect(ctx.stderr).to.contain('To reconfigure the profile, run:');
        expect(ctx.stderr).to.contain('twilio profiles:create --profile "no-credentials-profile"');
      });

    setUpTest([], { commandClass: ThrowingUnknownClientCommand })
      .exit(1)
      .it('should catch unhandled errors', (ctx) => {
        expect(ctx.stderr).to.contain('unexpected error');
      });

    setUpTest([], { commandClass: Throwing20003ClientCommand })
      .exit(20)
      .it('should catch access denied errors and enhance the message', (ctx) => {
        expect(ctx.stderr).to.contain('Access Denied');
        expect(ctx.stderr).to.contain('Standard API Keys');
      });

    setUpTest([], { commandClass: Throwing20003ClientCommand, envRegion: 'region' })
      .exit(20)
      .it('should catch access denied errors but not enhance the message when using env var auth', (ctx) => {
        expect(ctx.stderr).to.contain('Access Denied');
        expect(ctx.stderr).to.not.contain('Standard API Keys');
      });

    describe('parseProperties', () => {
      setUpTest().it('should ignore empty PropertyFlags', (ctx) => {
        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties).to.be.null;
      });

      setUpTest().it('should ignore missing command flags', (ctx) => {
        ctx.testCmd.constructor.PropertyFlags = {
          'friendly-name': {},
          'sms-url': {},
        };

        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties).to.be.null;
      });

      setUpTest().it('should parse options into API resource properties', (ctx) => {
        ctx.testCmd.constructor.PropertyFlags = {
          'friendly-name': {},
          'sms-url': {},
        };
        ctx.testCmd.flags = {
          'friendly-name': 'Casper',
          'sms-url': 'https://localhost:5000/sms',
        };

        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties.friendlyName).to.equal('Casper');
        expect(updatedProperties.smsUrl).to.equal('https://localhost:5000/sms');
      });

      setUpTest().it('should parse empty command flags', (ctx) => {
        ctx.testCmd.constructor.PropertyFlags = { 'sms-url': {} };
        ctx.testCmd.flags = { 'sms-url': '' };

        const updatedProperties = ctx.testCmd.parseProperties();
        expect(updatedProperties.smsUrl).to.be.empty;
      });
    });

    describe('updateResource', () => {
      setUpTest().it('should return nothing to update if no properties passed', async (ctx) => {
        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const results = await ctx.testCmd.updateResource(null, resourceSid);
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Nothing to update');
        expect(ctx.stderr).to.contain('Nothing to update');
      });

      setUpTest().it('should return success if resource was updated', async (ctx) => {
        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const updatedProperties = {
          friendlyName: 'Casper',
        };

        const fakeResource = (sid) => {
          expect(sid).to.equal(resourceSid);
          return {
            async update(props) {
              expect(props).to.eql(updatedProperties);
            },
          };
        };

        const results = await ctx.testCmd.updateResource(fakeResource, resourceSid, updatedProperties);
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Success');
      });

      setUpTest().it('should return success if resource was updated from flags', async (ctx) => {
        ctx.testCmd.constructor.PropertyFlags = {
          'friendly-name': {},
          'sms-url': {},
        };
        ctx.testCmd.flags = {
          'friendly-name': 'Casper',
          'sms-url': 'https://localhost:5000/sms',
        };

        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const fakeResource = (sid) => {
          expect(sid).to.equal(resourceSid);
          return {
            async update(props) {
              expect(props.friendlyName).to.equal('Casper');
              expect(props.smsUrl).to.equal('https://localhost:5000/sms');
            },
          };
        };

        const results = await ctx.testCmd.updateResource(fakeResource, resourceSid);
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Success');
      });

      setUpTest().it('should report an error if API call fails', async (ctx) => {
        const resourceSid = constants.FAKE_ACCOUNT_SID;
        const fakeResource = (sid) => {
          expect(sid).to.equal(resourceSid);
          return {
            async update() {
              const err = { message: 'A fake API error' };
              throw err;
            },
          };
        };

        const results = await ctx.testCmd.updateResource(fakeResource, resourceSid, {});
        expect(results.sid).to.equal(resourceSid);
        expect(results.result).to.equal('Error');
        expect(ctx.stderr).to.contain('A fake API error');
      });
    });

    describe('regional and edge support', () => {
      setUpTest([], { configEdge: 'edge' }).it('should use the config edge when defined', (ctx) => {
        expect(ctx.testCmd.twilioApiClient.edge).to.equal('edge');
        expect(ctx.testCmd.twilioApiClient.region).to.be.undefined;
      });

      setUpTest(['-p', 'region-edge-testing']).it('should use the config region when defined', (ctx) => {
        expect(ctx.testCmd.twilioApiClient.region).to.equal('configRegion');
        expect(ctx.testCmd.twilioApiClient.edge).to.be.undefined;
      });

      setUpTest([], { envRegion: 'region' }).it('should use the env region over a config region', (ctx) => {
        expect(ctx.testCmd.twilioApiClient.region).to.equal('region');
        expect(ctx.testCmd.twilioApiClient.edge).to.be.undefined;
      });

      setUpTest([], { configEdge: 'configEdge', envEdge: 'edge', envRegion: 'region' }).it(
        'should use the env edge over a config edge',
        (ctx) => {
          expect(ctx.testCmd.twilioApiClient.edge).to.equal('edge');
          expect(ctx.testCmd.twilioApiClient.region).to.equal('region');
        },
      );
      setUpTest([], { envRegion: 'ie1' }).it('should use the set edge from region', (ctx) => {
        expect(ctx.testCmd.twilioApiClient.edge).to.equal('dublin');
        expect(ctx.testCmd.twilioApiClient.region).to.equal('ie1');
      });

      setUpTest(['-l', 'debug'], { configEdge: 'custom-edge' }).it(
        'should warn when both edge and region are set',
        (ctx) => {
          // Access twilioApiClient first to trigger buildClient
          expect(ctx.testCmd.twilioApiClient.edge).to.equal('custom-edge');
          // Now check for the warning
          expect(ctx.stderr).to.contain('Deprecation Warning');
          expect(ctx.stderr).to.contain('For regional processing, DNS is of format product.edge.region.twilio.com');
        },
      );

      setUpTest(['-l', 'debug'], { envRegion: 'ie1' }).it('should warn when both edge and region are set', (ctx) => {
        // Access twilioApiClient first to trigger buildClient
        expect(ctx.testCmd.twilioApiClient.edge).to.equal('dublin');
        expect(ctx.testCmd.twilioApiClient.region).to.equal('ie1');
        // Now check for the warning
        expect(ctx.stderr).to.contain('Deprecation Warning');
        expect(ctx.stderr).to.contain('For regional processing, DNS is of format product.edge.region.twilio.com');
      });

      setUpTest(['-l', 'debug'], { envRegion: 'ie1' }).it('should warn when setting default edge for region', (ctx) => {
        // Access twilioApiClient first to trigger buildClient
        expect(ctx.testCmd.twilioApiClient.edge).to.equal('dublin');
        expect(ctx.testCmd.twilioApiClient.region).to.equal('ie1');
        // Now check for the warning
        expect(ctx.stderr).to.contain('Deprecation Warning');
        expect(ctx.stderr).to.contain('Setting default `edge` for provided `region`');
      });

      setUpTest([], { envRegion: 'unknown-region' }).it('should not set edge for unmapped region', (ctx) => {
        expect(ctx.testCmd.twilioApiClient.edge).to.be.undefined;
        expect(ctx.testCmd.twilioApiClient.region).to.equal('unknown-region');
      });
    });
  });
});
