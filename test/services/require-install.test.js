const tmp = require('tmp');
const { expect, test } = require('@twilio/cli-test');

const { TwilioCliError } = require('../../src/services/error');
const {
  getCommandPlugin,
  getPackageVersion,
  getDependencyVersion,
  checkVersion,
  requireInstall,
} = require('../../src/services/require-install');
const { logger, LoggingLevel } = require('../../src/services/messaging/logging');
const corePJSON = require('../../package.json');

const TOP_PLUGIN = {
  name: 'top-plugin',
  options: {},
  commands: [
    {
      id: 'top-command',
      aliases: [],
    },
  ],
};

const DYNAMIC_PLUGIN = {
  name: 'dynamic-plugin',
  options: { name: 'top-plugin' },
  commands: [
    {
      id: 'dynamic-command',
      aliases: [],
    },
  ],
};

const INSTALLED_PLUGIN = {
  name: 'installed-plugin',
  options: { name: 'installed-plugin' },
  commands: [
    {
      id: 'installed-command',
      aliases: ['alias-installed-command'],
    },
  ],
};

const config = {
  plugins: [TOP_PLUGIN, DYNAMIC_PLUGIN, INSTALLED_PLUGIN],
  dataDir: tmp.dirSync({ unsafeCleanup: true }).name,
};

/* eslint-disable max-nested-callbacks */
describe('services', () => {
  describe('require-install', () => {
    describe('getCommandPlugin', () => {
      test.it('can find a plugin', () => {
        const command = { id: 'top-command', config };
        expect(getCommandPlugin(command)).to.equal(TOP_PLUGIN);
      });

      test.it('can find commands under dynamic plugin', () => {
        const command = { id: 'dynamic-command', config };
        expect(getCommandPlugin(command)).to.equal(TOP_PLUGIN);
      });

      test.it('can find commands under installed plugin', () => {
        const command = { id: 'installed-command', config };
        expect(getCommandPlugin(command)).to.equal(INSTALLED_PLUGIN);
      });

      test.it('can find plugins for command aliases', () => {
        const command = { id: 'alias-installed-command', config };
        expect(getCommandPlugin(command)).to.equal(INSTALLED_PLUGIN);
      });

      test.it('handles unknown commands', () => {
        const command = { id: 'what-command', config };
        expect(() => getCommandPlugin(command)).to.throw(TwilioCliError);
      });
    });

    describe('package-versions', () => {
      test.it('can retrieve and check package versions', () => {
        const packageVersion = getPackageVersion('chai');
        const dependencyVersion = corePJSON.devDependencies.chai;

        expect(packageVersion).to.not.be.undefined;
        expect(dependencyVersion).to.not.be.undefined;
        expect(checkVersion(packageVersion, dependencyVersion)).to.not.throw;
      });

      test.it('handles unknown packages', () => {
        expect(getPackageVersion('chai-dai')).to.be.undefined;
      });

      test.it('throws for invalid versions', () => {
        expect(() => checkVersion('1.0.0', '^2.0.0')).to.throw(Error);
      });

      test.it('can retrieve dependency versions', () => {
        const pjson = {
          dependencies: { keytar: '1.2.3' },
          optionalDependencies: { tartar: '4.5.6' },
        };

        expect(getDependencyVersion('keytar', pjson)).to.equal('1.2.3');
        expect(getDependencyVersion('tartar', pjson)).to.equal('4.5.6');
      });
    });

    describe('requireInstall', () => {
      before(() => {
        logger.config.level = LoggingLevel.debug;
      });

      after(() => {
        logger.config.level = LoggingLevel.info;
      });

      test.it('can load existing packages', () => {
        expect(requireInstall('chai')).to.not.be.undefined;
      });

      test.stderr().it('will attempt to install packages', async (ctx) => {
        const command = { id: 'top-command', config };
        await expect(requireInstall('chai-dai', command)).to.be.rejected;
        expect(ctx.stderr).to.contain('Installing chai-dai');
        expect(ctx.stderr).to.contain('Error loading/installing chai-dai');
      });
    });
  });
});
