const { expect, test } = require('@twilio/cli-test');

const { TwilioApiBrowser } = require('../../../src/services/twilio-api');

describe('services', () => {
  describe('twilio-api', () => {
    describe('TwilioApiBrowser', () => {
      test.it('loads the JSON from disk', () => {
        const browser = new TwilioApiBrowser();
        // Check some known api endpoints that should be relatively stable
        expect(browser.domains.api.paths['/2010-04-01/Accounts/{AccountSid}/Calls.json'].operations.post).to.exist;
        expect(browser.domains.api.paths['/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json'].operations.get).to.exist;
      });
      /*
       * TODO: enable it after one build is done, and the path is loaded.
       * test.it('loads the JSON from disk except for preview', () => {
       *   const browser = new TwilioApiBrowser();
       *   expect(browser.domains.api.paths['/BulkExports/Exports/Jobs/{JobSid}']).to.not.exist;
       * });
       */

      test.it('loads JSONs split by version', () => {
        const browser = new TwilioApiBrowser();
        const spec = browser.loadApiSpecFromDisk();
        expect(spec).to.not.have.property('studio');
        expect(spec).to.have.property('studio_v1');
        expect(spec).to.have.property('studio_v2');
        expect(spec).to.have.property('api_v2010');
        expect(browser.domains.studio.paths['/v1/Flows'].operations.get).to.exist;
        expect(browser.domains.studio.paths['/v2/Flows'].operations.get).to.exist;
      });

      test.it('merges the domains into one', () => {
        const browser = new TwilioApiBrowser();
        let spec = browser.loadApiSpecFromDisk();
        expect(spec).to.have.property('studio_v1');
        spec = browser.mergeVersions(spec);
        expect(spec).to.not.have.property('studio_v1');
        expect(spec).to.have.property('studio');
      });

      test.it('loads a specific api spec', () => {
        const browser = new TwilioApiBrowser({
          api: {
            paths: {
              '/2010-04-01/Widgets.json': {
                servers: [
                  {
                    url: 'https://api.twilio.com',
                  },
                ],
                description: 'Widgets here\nsecond line of text',
                'x-twilio': { defaultOutputProperties: ['sid'] },
              },
            },
            tags: [
              {
                name: 'Beta',
                description: 'Betamax!',
              },
            ],
          },
          neato: {
            paths: {
              '/v1/Gadgets.json': {
                servers: [
                  {
                    url: 'https://neato.twilio.com',
                  },
                ],
                description: 'v1 Gadgets here',
                'x-twilio': { defaultOutputProperties: ['sid'] },
              },
              '/v2/Gadgets.json': {
                servers: [
                  {
                    url: 'https://neato.twilio.com',
                  },
                ],
                post: { createStuff: '' },
                get: { listStuff: '' },
                description: 'v2 list Gadgets here',
                'x-twilio': { defaultOutputProperties: ['sid', 'name'] },
              },
              '/v2/Gadgets/{Sid}.json': {
                servers: [
                  {
                    url: 'https://neato.twilio.com',
                  },
                ],
                post: { updateStuff: '' },
                get: { fetchStuff: '' },
                delete: { removeStuff: '' },
                description: 'v2 instance Gadgets here',
                'x-twilio': { defaultOutputProperties: ['sid', 'description'] },
              },
            },
            tags: [
              {
                name: 'GA',
                description: 'Generally Available!',
              },
            ],
          },
        });

        expect(browser.domains).to.deep.equal({
          api: {
            tags: [
              {
                name: 'Beta',
                description: 'Betamax!',
              },
            ],
            paths: {
              '/2010-04-01/Widgets.json': {
                operations: {},
                server: 'https://api.twilio.com',
                description: 'Widgets here second line of text',
                defaultOutputProperties: ['sid'],
              },
            },
          },
          neato: {
            tags: [
              {
                name: 'GA',
                description: 'Generally Available!',
              },
            ],
            paths: {
              '/v1/Gadgets.json': {
                operations: {},
                server: 'https://neato.twilio.com',
                description: 'v1 Gadgets here',
                defaultOutputProperties: ['sid'],
              },
              '/v2/Gadgets.json': {
                operations: {
                  post: { createStuff: '' },
                  get: { listStuff: '' },
                },
                server: 'https://neato.twilio.com',
                description: 'v2 list Gadgets here',
                defaultOutputProperties: ['sid', 'name'],
              },
              '/v2/Gadgets/{Sid}.json': {
                operations: {
                  get: { fetchStuff: '' },
                  post: { updateStuff: '' },
                  delete: { removeStuff: '' },
                },
                server: 'https://neato.twilio.com',
                description: 'v2 instance Gadgets here',
                defaultOutputProperties: ['sid', 'description'],
              },
            },
          },
        });
      });

      test.it('lift twilio vendor extension property', () => {
        const browser = new TwilioApiBrowser({
          api: {
            paths: {
              '/v2/Services/{ServiceSid}/Entities/{Identity}/Factors.json': {
                servers: [
                  {
                    url: 'https://api.twilio.com',
                  },
                ],
                get: {
                  listStuff: '',
                },
                post: {
                  createStuff: '',
                  'x-twilio': { defaultOutputProperties: ['sid', 'status', 'binding'] },
                },
                description: '',
                'x-twilio': { defaultOutputProperties: ['sid', 'status'] },
              },
            },
          },
        });

        expect(browser.domains).to.deep.equal({
          api: {
            paths: {
              '/v2/Services/{ServiceSid}/Entities/{Identity}/Factors.json': {
                operations: {
                  post: { createStuff: '', defaultOutputProperties: ['sid', 'status', 'binding'] },
                  get: { listStuff: '' },
                },
                server: 'https://api.twilio.com',
                description: '',
                defaultOutputProperties: ['sid', 'status'],
              },
            },
          },
        });
      });
    });
  });
});
