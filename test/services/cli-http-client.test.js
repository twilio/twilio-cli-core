const { expect, test } = require('@twilio/cli-test');
const CLIRequestClient = require('../../src/services/cli-http-client');
const { Logger, LoggingLevel } = require('../../src/services/messaging/logging');

describe('services', () => {
  describe('cli-http-client', () => {
    const logger = new Logger({
      level: LoggingLevel.none
    });

    test.it('should make an http request', async () => {
      const client = new CLIRequestClient('blah', logger, (options, callback) => {
        expect(options.url).to.equal('https://foo.com/bar');
        callback(null, { statusCode: 200, body: '{}' });
      });
      expect(client.commandName).to.equal('blah');
      const response = await client.request({
        method: 'POST',
        uri: 'https://foo.com/bar',
        username: 'AC1234',
        password: 'aaaaaaaaa',
        headers: { 'User-Agent': 'test' },
        params: { x: 1, y: 2 },
        data: { foo: 'bar' }
      });

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal('{}');
    });
  });
});
