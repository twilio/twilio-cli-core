const path = require('path');

const { expect, test } = require('@twilio/cli-test');

const BaseCommand = require('../../src/base-commands/base-command');
const { Logger, LoggingLevel } = require('../../src/services/messaging/logging');
const { OutputFormats } = require('../../src/services/output-formats');
const { Config } = require('../../src/services/config');
const { TwilioCliError } = require('../../src/services/error');

const baseCommandTest = test.twilioCliEnv().do(async (ctx) => {
  ctx.testCmd = new BaseCommand([], ctx.fakeConfig);
  await ctx.testCmd.run();
});

const childCommandTest = test.twilioCliEnv().do(async (ctx) => {
  class ChildCommand extends BaseCommand {}

  ctx.testCmd = new ChildCommand([], ctx.fakeConfig);
  await ctx.testCmd.run();
});

describe('base-commands', () => {
  describe('base-command', () => {
    baseCommandTest.stderr().it('should initialize properly', (ctx) => {
      expect(ctx.testCmd.outputProcessor).to.equal(OutputFormats.columns);
      expect(ctx.testCmd.logger).to.be.an.instanceOf(Logger);
      expect(ctx.testCmd.logger.config.level).to.equal(LoggingLevel.info);
      expect(ctx.testCmd.inquirer).to.not.equal(undefined);
      expect(ctx.stderr).to.equal('');
    });

    childCommandTest.stderr().it('should initialize properly from children', (ctx) => {
      expect(ctx.testCmd.outputProcessor).to.equal(OutputFormats.columns);
      expect(ctx.testCmd.logger).to.be.an.instanceOf(Logger);
      expect(ctx.testCmd.logger.config.level).to.equal(LoggingLevel.info);
      expect(ctx.testCmd.inquirer).to.not.equal(undefined);
      expect(ctx.stderr).to.equal('');
    });

    test
      .twilioCliEnv(Config)
      .stderr()
      .do(async (ctx) => {
        ctx.testCmd = new BaseCommand(['-l', 'debug'], ctx.fakeConfig);
        await ctx.testCmd.run();
      })
      .it('should debug log the config file path', (ctx) => {
        expect(ctx.testCmd.logger.config.level).to.equal(LoggingLevel.debug);
        const expectedConfigFile = path.join(ctx.fakeConfig.configDir, 'config.json');
        expect(ctx.stderr).to.contain(`[DEBUG] Config File: ${expectedConfigFile}`);
      });

    baseCommandTest
      .stderr()
      .do((ctx) => ctx.testCmd.catch(new TwilioCliError('oy!')))
      .exit(1)
      .it('can catch errors and exit', (ctx) => {
        expect(ctx.stderr).to.contain('oy!');
      });

    test
      .twilioCliEnv()
      .do((ctx) => {
        ctx.testCmd = new BaseCommand([], ctx.fakeConfig);
      })
      .it('can catch errors before initialization', async (ctx) => {
        await expect(ctx.testCmd.catch(new TwilioCliError('hey-o!'))).to.be.rejectedWith(TwilioCliError);
      });

    describe('getIssueUrl', () => {
      baseCommandTest.it('follows the proper precedence order', (ctx) => {
        const pjson = {
          bugs: 'could be',
          homepage: 'maybe',
          repository: 'nope',
        };

        expect(ctx.testCmd.getIssueUrl({ pjson })).to.equal('could be');

        delete pjson.bugs;
        expect(ctx.testCmd.getIssueUrl({ pjson })).to.equal('maybe');

        delete pjson.homepage;
        expect(ctx.testCmd.getIssueUrl({ pjson })).to.equal('nope');
      });

      baseCommandTest.it('handles url properties', (ctx) => {
        expect(ctx.testCmd.getIssueUrl({ pjson: { bugs: { email: 'me', url: 'you' } } })).to.equal('you');
      });

      baseCommandTest.it('use the main repo when no url is found', (ctx) => {
        expect(ctx.testCmd.getIssueUrl({ pjson: { anything: 'nothing' } })).to.equal(
          'https://github.com/twilio/twilio-cli/issues',
        );
      });
    });

    describe('sanitizeDateString', () => {
      baseCommandTest.it('check date is sliced correctly', (ctx) => {
        expect(ctx.testCmd.sanitizeDateString('Fri May 24 2019 11:43:11 GMT-0600 (MDT)')).to.equal(
          'May 24 2019 11:43:11 GMT-0600',
        );
      });
      baseCommandTest.it('check other timezone date is sliced correctly', (ctx) => {
        expect(ctx.testCmd.sanitizeDateString('Fri May 24 2019 11:43:11 GMT-0700 (PDT)')).to.equal(
          'May 24 2019 11:43:11 GMT-0700',
        );
      });
      baseCommandTest.it('check output if timezone in parenthesis is not included', (ctx) => {
        expect(ctx.testCmd.sanitizeDateString('Fri May 24 2019 11:43:11 GMT-0700')).to.equal(
          'May 24 2019 11:43:11 GMT-0700',
        );
      });
      baseCommandTest.it('return empty string if the date is empty', (ctx) => {
        expect(ctx.testCmd.sanitizeDateString('')).to.equal('');
      });
    });

    describe('output', () => {
      const outputTest = baseCommandTest.stdout();

      outputTest.it('should output a single object', (ctx) => {
        ctx.testCmd.output({ foo: 'foo', bar: 'bar' });
        expect(ctx.stdout).to.contain('Foo  Bar\nfoo  bar');
      });

      outputTest.it('should output an array of objects', (ctx) => {
        ctx.testCmd.output([
          { foo: 'foo', bar: 'bar' },
          { foo: '2', bar: '2' },
        ]);
        expect(ctx.stdout).to.contain('Foo  Bar\nfoo  bar\n2    2');
      });

      outputTest.it('should output requested properties', (ctx) => {
        ctx.testCmd.output(
          [
            { foo: 'foo', bar: 'bar', baz: 'baz' },
            { foo: '2', bar: '2', baz: '2' },
          ],
          'foo, bar',
        );
        expect(ctx.stdout).to.contain('Foo  Bar\nfoo  bar\n2    2');
      });

      outputTest.stderr().it('should warn if invalid property name passed', (ctx) => {
        ctx.testCmd.output(
          [
            { foo: 'foo', bar: 'bar', baz: 'baz' },
            { foo: '2', bar: '2', baz: '2' },
          ],
          'foo, barn',
        );
        expect(ctx.stdout).to.contain('Foo\nfoo\n2');
        expect(ctx.stderr).to.contain('"barn" is not a valid property name.');
      });

      outputTest.it('should output requested object properties', (ctx) => {
        ctx.testCmd.output(
          [
            { foo: 'foo', bar: { baz: 1, boz: 2 } },
            { foo: '2', bar: { baz: 3, boz: 'four' } },
          ],
          'foo, bar',
        );
        expect(ctx.stdout).to.contain('foo  {"baz":1,"boz":2}');
        expect(ctx.stdout).to.contain('2    {"baz":3,"boz":"four"}');
      });

      outputTest.stderr().it('should output a message when the array is empty', (ctx) => {
        ctx.testCmd.output([]);
        expect(ctx.stdout).to.be.empty;
        expect(ctx.stderr).to.contain('No results');
      });

      test
        .twilioCliEnv(Config)
        .do(async (ctx) => {
          ctx.testCmd = new BaseCommand(['-o', 'json'], ctx.fakeConfig);
          await ctx.testCmd.run();
        })
        .stdout()
        .it('should output an array of objects as JSON', (ctx) => {
          const testData = [
            { foo: 'foo', bar: 'bar' },
            { foo: '2', bar: '2' },
          ];
          ctx.testCmd.output(testData);
          const outputObject = JSON.parse(ctx.stdout);
          expect(outputObject[0].foo).to.equal(testData[0].foo);
        });

      test
        .twilioCliEnv(Config)
        .do(async (ctx) => {
          ctx.testCmd = new BaseCommand(['-o', 'tsv'], ctx.fakeConfig);
          await ctx.testCmd.run();
        })
        .stdout()
        .it('should output an array of objects as TSV', (ctx) => {
          const testData = [
            { FOO: 'foo', BAR: 'bar' },
            { FOO: '2', BAR: '2' },
          ];
          ctx.testCmd.output(testData);
          expect(ctx.stdout).to.contain('FOO\tBAR\nfoo\tbar\n2\t2');
        });
    });

    describe('getPromptMessage', () => {
      baseCommandTest.it('adds a colon to the end of the message', (ctx) => {
        expect(ctx.testCmd.getPromptMessage('Name: ')).to.equal('Name:');
        expect(ctx.testCmd.getPromptMessage('Number.')).to.equal('Number:');
        expect(ctx.testCmd.getPromptMessage('  Address  ')).to.equal('Address:');
      });
    });
  });
});
