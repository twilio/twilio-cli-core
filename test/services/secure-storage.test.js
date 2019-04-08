const { expect, test } = require('@twilio/cli-test');
const { SecureStorage } = require('../../src/services/secure-storage');

describe('services', () => {
  describe('secure-storage', () => {
    test.it('platformDescription (Native)', () => {
      const secureStorage = new SecureStorage();
      expect(secureStorage.platformDescription).to.not.eq(undefined);
    });

    test.it('platformDescription (Mac)', () => {
      const secureStorage = new SecureStorage('darwin');
      expect(secureStorage.platformDescription).to.eq('in your keychain');
    });

    test.it('platformDescription (Windows)', () => {
      const secureStorage = new SecureStorage('win32');
      expect(secureStorage.platformDescription).to.eq('in the Windows Credential Vault');
    });

    test.it('platformDescription (Linux)', () => {
      const secureStorage = new SecureStorage('linux');
      expect(secureStorage.platformDescription).to.eq('using libsecret');
    });

    test.it('platformDescription (OpenBSD)', () => {
      const secureStorage = new SecureStorage('openbsd');
      expect(secureStorage.platformDescription).to.eq(undefined);
    });
  });
});
