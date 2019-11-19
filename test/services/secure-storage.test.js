const { expect, test } = require('@twilio/cli-test');
const { SecureStorage, STORAGE_LOCATIONS } = require('../../src/services/secure-storage');
const { TwilioCliError } = require('../../src/services/error');

describe('services', () => {
  describe('secure-storage', () => {
    test.it('storageLocation (Native)', () => {
      const secureStorage = new SecureStorage();
      expect(secureStorage.storageLocation).to.not.eq(undefined);
    });

    test.it('storageLocation (Mac)', () => {
      const secureStorage = new SecureStorage({ platform: 'darwin' });
      expect(secureStorage.storageLocation).to.eq(STORAGE_LOCATIONS.KEYCHAIN);
    });

    test.it('storageLocation (Windows)', () => {
      const secureStorage = new SecureStorage({ platform: 'win32' });
      expect(secureStorage.storageLocation).to.eq(STORAGE_LOCATIONS.WIN_CRED_VAULT);
    });

    test.it('storageLocation (Linux)', () => {
      const secureStorage = new SecureStorage({ platform: 'linux' });
      expect(secureStorage.storageLocation).to.eq(STORAGE_LOCATIONS.LIBSECRET);
    });

    test.it('storageLocation (OpenBSD)', () => {
      const secureStorage = new SecureStorage({ platform: 'openbsd' });
      expect(secureStorage.storageLocation).to.eq(undefined);
    });

    describe('getCredentials', () => {
      const setup = getPassword => test
        .do(ctx => {
          ctx.secureStorage = new SecureStorage();
          Object.defineProperty(ctx.secureStorage, 'keytar', {
            get: () => ({ getPassword })
          });
        });

      setup(async () => 'key|password')
        .it('handles a key-password pair', async ctx => {
          const expected = { apiKey: 'key', apiSecret: 'password' };
          expect(await ctx.secureStorage.getCredentials('Pro File')).to.eql(expected);
        });

      setup(async () => {
        throw new Error('WHOA!');
      })
        .it('handles a keytar error', async ctx => {
          const expected = { apiKey: 'error', apiSecret: 'WHOA!' };
          expect(await ctx.secureStorage.getCredentials('No File')).to.eql(expected);
        });

      setup(async () => {
        throw new TwilioCliError('WOE!');
      })
        .do(ctx => ctx.secureStorage.getCredentials('Woe File'))
        .catch(/WOE!/)
        .it('passes a TwilioCliError error through');
    });
  });
});
