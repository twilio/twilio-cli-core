const { expect, test, constants } = require('@twilio/cli-test');
const { logger } = require('../../../src/services/messaging/logging');
const { TwilioApiClient } = require('../../../src/services/twilio-api');
const CliRequestClient = require('../../../src/services/cli-http-client');
const qs = require('qs');

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
            data: { StartTime: callStartTime }
          });

          expect(response).to.eql([{ sid: callSid }, { sid: callSid }]);
        });

      test
        .nock('https://api.twilio.com', api => {
          /* eslint-disable camelcase */
          api.get(`/2010-04-01/Accounts/${accountSid}/Calls.json?PageSize=1`).reply(200, {
            calls: [{
              sid: callSid
            }],
            next_page_uri: '/nextPageOfResults'
          });
          api.get('/nextPageOfResults').reply(200, {
            calls: [{
              sid: callSid
            }],
            next_page_uri: '/nextPageOfResults'
          });
          /* eslint-enable camelcase */
        })
        .it('can list resources with page and limit restrictions', async () => {
          const response = await client.list({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Calls.json',
            data: { Limit: 2, PageSize: 1 }
          });

          expect(response).to.eql([{ sid: callSid }, { sid: callSid }]);
        });

      test
        .nock('https://studio.twilio.com', api => {
          /* eslint-disable camelcase */
          api.get('/v1/Flows').reply(200, {
            flows: [{
              friendly_name: 'drizzle'
            }],
            meta: {
              next_page_url: 'https://studio.twilio.com/nextPageOfResults'
            }
          });
          api.get('/nextPageOfResults').reply(200, {
            flows: [{
              friendly_name: 'trickle'
            }],
            meta: {
              next_page_url: null
            }
          });
          /* eslint-enable camelcase */
        })
        .it('can list resources with metadata', async () => {
          const response = await client.list({
            domain: 'studio',
            path: '/v1/Flows'
          });

          expect(response).to.eql([{ friendlyName: 'drizzle' }, { friendlyName: 'trickle' }]);
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
            data: { To: '123', From: '456', Junk: 'disregard' }
          });

          expect(response).to.eql({ status: 'ringing' });
          expect(httpClient.lastRequest.data).to.eql(qs.stringify({ From: '456', To: '123' }));
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
            pathParams: { Sid: callSid }
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
            pathParams: { Sid: callSid },
            data: { Status: 'canceled' }
          });

          expect(response).to.eql({ status: 'canceled' });
          expect(httpClient.lastRequest.data).to.eql(qs.stringify({ Status: 'canceled' }));
        });

      test
        .nock('https://api.twilio.com', api => {
          api.delete(`/2010-04-01/Accounts/${accountSid}/Calls/${callSid}.json`).reply(204);
        })
        .it('can remove resources', async () => {
          const response = await client.remove({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
            pathParams: { Sid: callSid }
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
        .it('handles bad paths', async () => {
          await expect(client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/AWESOME!!!!'
          })).to.be.rejectedWith('not found');
        });

      test
        .nock('https://api.twilio.com', api => {
          api.post(`/2010-04-01/Accounts/${accountSid}/Addresses.json`).reply(201, {
            verified: 'true'
          });
        })
        .it('handles boolean parameters', async () => {
          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Addresses.json',
            data: { EmergencyEnabled: true }
          });

          expect(response).to.eql({ verified: 'true' });
          expect(httpClient.lastRequest.data).to.eql(qs.stringify({ EmergencyEnabled: 'true' }));
        });

      /* eslint-disable max-nested-callbacks */
      describe('getLimit', () => {
        test.it('gets the limit', () => {
          const limit = client.getLimit({ Limit: 10 });
          expect(limit).to.equal(10);
        });

        test.it('drops the limit if no-limit is truthy', () => {
          const limit = client.getLimit({
            Limit: 10,
            NoLimit: true
          });
          expect(limit).to.be.undefined;
        });

        test.it('adjusts the page size if greater than the limit', () => {
          const options = {
            Limit: 10,
            PageSize: 20
          };

          const limit = client.getLimit(options);
          expect(limit).to.equal(10);
          expect(options.PageSize).to.equal(10);
        });

        test.it('does not set the page size if not provided', () => {
          const options = { Limit: 10 };
          const limit = client.getLimit(options);
          expect(limit).to.equal(10);
          expect(options.PageSize).to.be.undefined;
        });
      });

      describe('regional and edge support', () => {
        const defaultRegionTest = test
          .nock('https://api.edge.us1.twilio.com', api => {
            api.post(`/2010-04-01/Accounts/${accountSid}/Messages.json`).reply(201, {
              status: 'queued'
            });
          });

        defaultRegionTest
          .it('uses the default region if only edge is defined', async () => {
            const client = new TwilioApiClient(
              constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
              { accountSid, httpClient, edge: 'edge' }
            );

            const response = await client.create({
              domain: 'api',
              path: '/2010-04-01/Accounts/{AccountSid}/Messages.json'
            });
            expect(response).to.eql({ status: 'queued' });
          });

        defaultRegionTest
          .it('uses the default region if edge is provided', async () => {
            const client = new TwilioApiClient(
              constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
              { accountSid, httpClient }
            );

            const response = await client.create({
              domain: 'api',
              path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
              edge: 'edge'
            });
            expect(response).to.eql({ status: 'queued' });
          });

        const regionTest = test.nock('https://api.region.twilio.com', api => {
          api.post(`/2010-04-01/Accounts/${accountSid}/Messages.json`).reply(201, {
            status: 'queued'
          });
        });

        regionTest.it('uses the client region if defined', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient, region: 'region' }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
            // Should ignore the region in the uri
            uri: `https://api.uriRegion.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
          });
          expect(response).to.eql({ status: 'queued' });
        });

        regionTest.it('uses the provided region if client region defined and region is provided', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient, region: 'region2' }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
            region: 'region',
            // Should ignore the region in the uri
            uri: `https://api.uriRegion.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
          });
          expect(response).to.eql({ status: 'queued' });
        });

        regionTest.it('uses the provided region', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
            region: 'region',
            // Should ignore the region in the uri
            uri: `https://api.uriRegion.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
          });
          expect(response).to.eql({ status: 'queued' });
        });

        const edgeRegionTest =
          test.nock('https://api.edge.region.twilio.com', api => {
            api.post(`/2010-04-01/Accounts/${accountSid}/Messages.json`).reply(201, {
              status: 'queued'
            });
          });

        edgeRegionTest.it('should set the region and edge properly', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient, edge: 'edge', region: 'region' }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
            // Should ignore the edge and region in the uri
            uri: `https://api.uriEdge.uriRegion.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
          });
          expect(response).to.eql({ status: 'queued' });
        });

        edgeRegionTest.it('uses the client region and provided edge when edge provided', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient, edge: 'clientEdge', region: 'region' }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
            edge: 'edge',
            // Should ignore the edge and region in the uri
            uri: `https://api.uriEdge.uriRegion.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
          });
          expect(response).to.eql({ status: 'queued' });
        });

        edgeRegionTest.it('uses the provided region and client edge when region provided', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient, edge: 'edge', region: 'clientRegion' }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
            region: 'region',
            // Should ignore the edge and region in the uri
            uri: `https://api.uriEdge.uriRegion.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
          });
          expect(response).to.eql({ status: 'queued' });
        });

        edgeRegionTest.it('uses the provided region and edge', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
            edge: 'edge',
            region: 'region',
            // Should ignore the edge and region in the uri
            uri: `https://api.uriEdge.uriRegion.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
          });
          expect(response).to.eql({ status: 'queued' });
        });

        edgeRegionTest
          .it('uses the provided region if only edge is defined and region is provided', async () => {
            const client = new TwilioApiClient(
              constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
              { accountSid, httpClient, edge: 'edge' }
            );

            const response = await client.create({
              domain: 'api',
              path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
              region: 'region',
              // Should ignore the edge and region in the uri
              uri: `https://api.uriEdge.uriRegion.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
            });
            expect(response).to.eql({ status: 'queued' });
          });

        edgeRegionTest
          .it('uses the uri region and client edge', async () => {
            const client = new TwilioApiClient(
              constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
              { accountSid, httpClient, edge: 'edge' }
            );

            const response = await client.create({
              domain: 'api',
              path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
              // Should ignore the edge in the uri
              uri: `https://api.uriEdge.region.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
            });
            expect(response).to.eql({ status: 'queued' });
          });

        edgeRegionTest.it('uses the client region and uri edge', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient, region: 'region' }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
            // Should ignore the region in the uri
            uri: `https://api.edge.uriRegion.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
          });
          expect(response).to.eql({ status: 'queued' });
        });

        edgeRegionTest.it('uses the uri region and edge', async () => {
          const client = new TwilioApiClient(
            constants.FAKE_API_KEY, constants.FAKE_API_SECRET,
            { accountSid, httpClient }
          );

          const response = await client.create({
            domain: 'api',
            path: '/2010-04-01/Accounts/{AccountSid}/Messages.json',
            uri: `https://api.edge.region.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
          });
          expect(response).to.eql({ status: 'queued' });
        });
      });
    });
  });
});
