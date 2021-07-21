const { expect, test } = require('@twilio/cli-test');

const CliRequestClient = require('../../src/services/cli-http-client');
const { TwilioCliError } = require('../../src/services/error');
const { Logger, LoggingLevel } = require('../../src/services/messaging/logging');

describe('services', () => {
  describe('cli-http-client', () => {
    const logger = new Logger({
      level: LoggingLevel.none,
    });

    test.it('should make an http request', async () => {
      const client = new CliRequestClient(
        'blah',
        logger,
        (options) => {
          expect(options.url).to.equal('https://foo.com/bar');
          return { status: 200, data: 'foo', headers: {} };
        },
        true,
      );
      expect(client.commandName).to.equal('blah');
      expect(client.keytarWord).to.equal('keytar');
      const response = await client.request({
        method: 'POST',
        uri: 'https://foo.com/bar',
        username: 'AC1234',
        password: 'aaaaaaaaa',
        headers: { 'User-Agent': 'test' },
        params: { x: 1, y: 2 },
        data: { foo: 'bar' },
      });

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.equal('foo');
    });

    test.it('should add the correct http agent for proxy', async () => {
      process.env.HTTP_PROXY = 'http://someproxy.com:8080';
      const client = new CliRequestClient('blah', logger, { defaults: {} }, false);
      const httpAgent = client.http.defaults.httpsAgent;
      expect(client.keytarWord).to.equal('');
      expect(httpAgent.proxy.host).to.equal('someproxy.com');
      expect(httpAgent.proxy.port).to.equal(8080);
    });

    test
      .nock('https://foo.com', (api) => {
        api.get('/bar').delay(100).reply(200);
      })
      .it('throws a TwilioCliError on response timeouts', async () => {
        const client = new CliRequestClient('bleh', logger);
        const request = client.request({ method: 'GET', uri: 'https://foo.com/bar', timeout: 1 });
        await expect(request).to.be.rejectedWith(TwilioCliError);
      });

    test
      .nock('https://foo.com', (api) => {
        api.get('/bar').replyWithError({ code: 'ETIMEDOUT' });
      })
      .it('throws a TwilioCliError on connection timeouts', async () => {
        const client = new CliRequestClient('bleh', logger);
        const request = client.request({ method: 'GET', uri: 'https://foo.com/bar' });
        await expect(request).to.be.rejectedWith(TwilioCliError);
      });

    test
      .nock('https://foo.com', (api) => {
        api.get('/bar?foo=bar&foo=baz').reply(200);
      })
      .it('correctly serializes array parameters', async () => {
        const client = new CliRequestClient('bleh', logger);
        const response = await client.request({
          method: 'GET',
          uri: 'https://foo.com/bar',
          params: {
            foo: ['bar', 'baz'],
          },
        });
        expect(response.statusCode).to.equal(200);
      });
  });
});
