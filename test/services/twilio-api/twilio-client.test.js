const { expect, test, constants } = require('@twilio/cli-test');
const { logger } = require('../../../src/services/messaging/logging');
const { TwilioApiClient } = require('../../../src/services/twilio-api');
const CliRequestClient = require('../../../src/services/cli-http-client');

require('chai').use(require('chai-as-promised'));

const accountSid = constants.FAKE_ACCOUNT_SID;
const callSid = 'CA12345678901234567890123456789012';
const callStartTime = '2018-01-01';

describe('services', () => {
  describe('twilio-api', () => {
    describe('twilio-client', () => {
      const httpClient = new CliRequestClient('command-id', logger);
      const client = new TwilioApiClient(
        constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
        { accountSid, httpClient }
      );

      test
        .nock('https://api.twilio.com', api => {
          /* eslint-disable camelcase */
          api.get(`/2010-04-01/Accounts/${accountSid}/Calls.json?StartTime=${callStartTime}`).reply(200, {
            calls: [{
              sid: callSid
            }],
            next_page_uri: '/nextPageOfResults'
          });
          api.get('/nextPageOfResults').reply(200, {
            calls: [{
              sid: callSid
            }],
            next_page_uri: null
          });
          /* eslint-enable camelcase */
        })
        .it('can list resources', async () => {
          const response = await client.list({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Calls.json',
            data: { startTime: callStartTime }
          });

          expect(response).to.eql([{ sid: callSid }, { sid: callSid }]);
        });

      test
        .nock('https://api.twilio.com', api => {
          api.post(`/2010-04-01/Accounts/${accountSid}/Calls.json`).reply(201, {
            status: 'ringing'
          });
        })
        .it('can create resources', async () => {
          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Calls.json',
            data: { to: '123', from: '456', junk: 'disregard' }
          });

          expect(response).to.eql({ status: 'ringing' });
          expect(httpClient.lastRequest.formData).to.eql({ To: '123', From: '456' });
        });

      test
        .nock('https://api.twilio.com', api => {
          api.get(`/2010-04-01/Accounts/${accountSid}/Calls/${callSid}.json`).reply(200, {
            status: 'in-progress'
          });
        })
        .it('can fetch resources', async () => {
          const response = await client.fetch({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
            data: { sid: callSid }
          });

          expect(response).to.eql({ status: 'in-progress' });
        });

      test
        .nock('https://api.twilio.com', api => {
          api.post(`/2010-04-01/Accounts/${accountSid}/Calls/${callSid}.json`).reply(200, {
            status: 'canceled'
          });
        })
        .it('can update resources', async () => {
          const response = await client.update({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
            data: { sid: callSid, status: 'canceled' }
          });

          expect(response).to.eql({ status: 'canceled' });
          expect(httpClient.lastRequest.formData).to.eql({ Status: 'canceled' });
        });

      test
        .nock('https://api.twilio.com', api => {
          api.delete(`/2010-04-01/Accounts/${accountSid}/Calls/${callSid}.json`).reply(204);
        })
        .it('can remove resources', async () => {
          const response = await client.remove({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
            data: { sid: callSid }
          });

          expect(response).to.be.true;
        });

      test
        .nock('https://api.dev.twilio.com', api => {
          api.post(`/2010-04-01/Accounts/${accountSid}/Messages.json`).reply(201, {
            status: 'queued'
          });
        })
        .it('handles other regions', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient, region: 'dev' }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json'
          });

          expect(response).to.eql({ status: 'queued' });
        });

      test
        .nock('https://api.twilio.com', api => {
          api.post(`/2010-04-01/Accounts/${accountSid}/Messages.json`).reply(401,
            '{"code": 20003, "message": "Authenticate", "more_info": "https://www.twilio.com/docs/errors/20003"}'
          );
        })
        .it('handles request errors', async () => {
          await expect(client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json'
          })).to.be.rejectedWith('/docs/errors/20003');
        });

      test
        .it('handles bad domains', async () => {
          await expect(client.create({
            domain: 'super-rad-api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json'
          })).to.be.rejectedWith('not found');
        });

      test
        .it('handles bad domains', async () => {
          await expect(client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/AWESOME!!!!'
          })).to.be.rejectedWith('not found');
        });
    });
  });
});
