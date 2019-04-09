const { expect, test } = require('@twilio/cli-test');
const { SecureStorage, STORAGE_LOCATIONS } = require('../../src/services/secure-storage');

describe('services', () => {
  describe('secure-storage', () => {
    test.it('storageLocation (Native)', () => {
      const secureStorage = new SecureStorage();
      expect(secureStorage.storageLocation).to.not.eq(undefined);
    });

    test.it('storageLocation (Mac)', () => {
      const secureStorage = new SecureStorage('darwin');
      expect(secureStorage.storageLocation).to.eq(STORAGE_LOCATIONS.KEYCHAIN);
    });

    test.it('storageLocation (Windows)', () => {
      const secureStorage = new SecureStorage('win32');
      expect(secureStorage.storageLocation).to.eq(STORAGE_LOCATIONS.WIN_CRED_VAULT);
    });

    test.it('storageLocation (Linux)', () => {
      const secureStorage = new SecureStorage('linux');
      expect(secureStorage.storageLocation).to.eq(STORAGE_LOCATIONS.LIBSECRET);
    });

    test.it('storageLocation (OpenBSD)', () => {
      const secureStorage = new SecureStorage('openbsd');
      expect(secureStorage.storageLocation).to.eq(undefined);
    });
  });
});
