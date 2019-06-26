const { TwilioApiBrowser } = require('../../src/services/twilio-api');

const { expect, test } = require('@twilio/cli-test');

describe('services', () => {
  describe('twilio-api', () => {
    describe('TwilioApiBrowser', () => {
      test.it('loads the JSON from disk', () => {
        const browser = new TwilioApiBrowser();
        // Check some known api endpoints that should be relatively stable
        expect(browser.domains.api.versions.v2010.resources['/Accounts/{AccountSid}/Calls'].actions.create).to.exist;
        expect(browser.domains.api.versions.v2010.resources['/Accounts/{AccountSid}/Calls/{Sid}'].actions.fetch).to.exist;
      });

      test.it('loads a specific api spec', () => {
        const browser = new TwilioApiBrowser([{
          paths: {
            '/2010-04-01/Widgets.json': {
              servers: [
                {
                  url: 'https://api.twilio.com'
                }
              ],
              description: 'Widgets here\nsecond line of text',
              'x-default-output-properties': ['sid']
            },
            '/v1/Gadgets.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              description: 'v1 Gadgets here',
              'x-default-output-properties': ['sid']
            },
            '/v2/Gadgets.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              post: { createStuff: '' },
              get: { listStuff: '' },
              description: 'v2 list Gadgets here',
              'x-default-output-properties': ['sid', 'name']
            },
            '/v2/Gadgets/{Sid}.json': {
              servers: [
                {
                  url: 'https://neato.twilio.com'
                }
              ],
              post: { updateStuff: '' },
              get: { fetchStuff: '' },
              delete: { removeStuff: '' },
              description: 'v2 instance Gadgets here',
              'x-default-output-properties': ['sid', 'description']
            }
          },
          tags: [
            {
              name: 'GA',
              description: 'Generally Available!'
            }
          ]
        }]);

        expect(browser.domains).to.deep.equal({
          api: {
            tags: [
              {
                name: 'GA',
                description: 'Generally Available!'
              }
            ],
            versions: {
              v2010: {
                resources: {
                  '/Widgets': {
                    actions: {},
                    description: 'Widgets here second line of text',
                    defaultOutputProperties: ['sid']
                  }
                }
              }
            }
          },
          neato: {
            tags: [
              {
                name: 'GA',
                description: 'Generally Available!'
              }
            ],
            versions: {
              v1: {
                resources: {
                  '/Gadgets': {
                    actions: {},
                    description: 'v1 Gadgets here',
                    defaultOutputProperties: ['sid']
                  }
                }
              },
              v2: {
                resources: {
                  '/Gadgets': {
                    actions: {
                      create: { createStuff: '' },
                      list: { listStuff: '' }
                    },
                    description: 'v2 list Gadgets here',
                    defaultOutputProperties: ['sid', 'name']
                  },
                  '/Gadgets/{Sid}': {
                    actions: {
                      fetch: { fetchStuff: '' },
                      update: { updateStuff: '' },
                      remove: { removeStuff: '' }
                    },
                    description: 'v2 instance Gadgets here',
                    defaultOutputProperties: ['sid', 'description']
                  }
                }
              }
            }
          }
        });
      });
    });
  });
});
