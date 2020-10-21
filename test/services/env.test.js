const os = require('os');
const path = require('path');

const { expect, test } = require('@twilio/cli-test');

const configureEnv = require('../../src/services/env');

const ORIGINAL_ENV = { ...process.env };
const DEFAULT_DIR =
  process.platform === 'win32' ? path.join('appdata', 'twilio-cli') : path.join('home', '.twilio-cli');

describe('services', () => {
  describe('env', () => {
    describe('configureEnv', () => {
      beforeEach(() => {
        process.env.HOME = 'home';
        process.env.APPDATA = 'appdata';
      });

      afterEach(() => {
        process.env = ORIGINAL_ENV;
      });

      test.it('should default all dir vars', () => {
        configureEnv();

        expect(process.env.TWILIO_CACHE_DIR).to.equal(DEFAULT_DIR);
        expect(process.env.TWILIO_CONFIG_DIR).to.equal(DEFAULT_DIR);
        expect(process.env.TWILIO_DATA_DIR).to.equal(DEFAULT_DIR);
      });

      test.it('should not screw with user-configured vars', () => {
        process.env.TWILIO_CACHE_DIR = 'cache-dir';
        process.env.TWILIO_CONFIG_DIR = 'config-dir';
        process.env.TWILIO_DATA_DIR = 'data-dir';

        configureEnv();

        expect(process.env.TWILIO_CACHE_DIR).to.equal('cache-dir');
        expect(process.env.TWILIO_CONFIG_DIR).to.equal('config-dir');
        expect(process.env.TWILIO_DATA_DIR).to.equal('data-dir');
      });

      test.it('should only default unset vars', () => {
        process.env.TWILIO_CACHE_DIR = 'uh-dur';

        configureEnv();

        expect(process.env.TWILIO_CACHE_DIR).to.equal('uh-dur');
        expect(process.env.TWILIO_CONFIG_DIR).to.equal(DEFAULT_DIR);
        expect(process.env.TWILIO_DATA_DIR).to.equal(DEFAULT_DIR);
      });

      test.it('should use the AppData directory on Windows', () => {
        process.platform = 'win32';

        configureEnv();

        expect(process.env.TWILIO_CACHE_DIR).to.equal(path.join('appdata', 'twilio-cli'));
      });

      test.it('should fallback to the OS home dir if no home or AppData found', () => {
        delete process.env.HOME;
        delete process.env.APPDATA;

        configureEnv();

        expect(process.env.TWILIO_CACHE_DIR).to.equal(path.join(os.homedir(), '.twilio-cli'));
      });
    });
  });
});
