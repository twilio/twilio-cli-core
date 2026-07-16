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

      test.it('resolves $ref parameters at path level and merges into operations', () => {
        const browser = new TwilioApiBrowser({
          memory: {
            paths: {
              '/v1/Stores/{StoreId}/Items/{ItemId}': {
                servers: [{ url: 'https://memory.twilio.com' }],
                parameters: [
                  { $ref: '#/components/parameters/StoreId' },
                  { $ref: '#/components/parameters/ItemId' },
                ],
                get: { description: 'Fetch item' },
                delete: { description: 'Remove item' },
                description: 'An item resource',
                'x-twilio': { defaultOutputProperties: ['sid'] },
              },
            },
            components: {
              parameters: {
                StoreId: { name: 'StoreId', in: 'path', required: true, schema: { type: 'string' } },
                ItemId: { name: 'ItemId', in: 'path', required: true, schema: { type: 'string' } },
              },
            },
          },
        });

        const path = browser.domains.memory.paths['/v1/Stores/{StoreId}/Items/{ItemId}'];
        expect(path.operations.get.parameters).to.have.lengthOf(2);
        expect(path.operations.get.parameters[0].name).to.equal('StoreId');
        expect(path.operations.get.parameters[1].name).to.equal('ItemId');
        expect(path.operations.delete.parameters).to.have.lengthOf(2);
        expect(path.operations.delete.parameters[0].name).to.equal('StoreId');
      });

      test.it('resolves $ref parameters at operation level', () => {
        const browser = new TwilioApiBrowser({
          memory: {
            paths: {
              '/v1/Things/{ThingId}': {
                servers: [{ url: 'https://memory.twilio.com' }],
                delete: {
                  description: 'Remove thing',
                  parameters: [{ $ref: '#/components/parameters/ThingId' }],
                },
                description: 'A thing resource',
                'x-twilio': { defaultOutputProperties: ['sid'] },
              },
            },
            components: {
              parameters: {
                ThingId: { name: 'ThingId', in: 'path', required: true, schema: { type: 'string' } },
              },
            },
          },
        });

        const path = browser.domains.memory.paths['/v1/Things/{ThingId}'];
        expect(path.operations.delete.parameters).to.have.lengthOf(1);
        expect(path.operations.delete.parameters[0].name).to.equal('ThingId');
      });

      test.it('operation-level params take precedence over path-level params on name conflict', () => {
        const browser = new TwilioApiBrowser({
          memory: {
            paths: {
              '/v1/Items/{ItemId}': {
                servers: [{ url: 'https://memory.twilio.com' }],
                parameters: [
                  { name: 'ItemId', in: 'path', required: true, description: 'path-level', schema: { type: 'string' } },
                ],
                get: {
                  description: 'Fetch item',
                  parameters: [
                    { name: 'ItemId', in: 'path', required: true, description: 'operation-level', schema: { type: 'string' } },
                  ],
                },
                description: 'Item resource',
                'x-twilio': { defaultOutputProperties: ['sid'] },
              },
            },
          },
        });

        const path = browser.domains.memory.paths['/v1/Items/{ItemId}'];
        expect(path.operations.get.parameters).to.have.lengthOf(1);
        expect(path.operations.get.parameters[0].description).to.equal('operation-level');
      });

      test.it('handles unresolvable $ref gracefully', () => {
        const browser = new TwilioApiBrowser({
          memory: {
            paths: {
              '/v1/Broken/{Id}': {
                servers: [{ url: 'https://memory.twilio.com' }],
                parameters: [{ $ref: '#/components/parameters/DoesNotExist' }],
                get: { description: 'Fetch broken' },
                description: 'Broken resource',
                'x-twilio': { defaultOutputProperties: ['sid'] },
              },
            },
          },
        });

        const path = browser.domains.memory.paths['/v1/Broken/{Id}'];
        expect(path.operations.get.parameters || []).to.have.lengthOf(0);
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
