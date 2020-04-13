const { expect, test } = require('@twilio/cli-test');
const TwilioSchemaConverter = require('../../src/services/api-schema/twilio-converter');
const { logger, LoggingLevel } = require('../../src/services/messaging/logging');

describe('services', () => {
  describe('api-schema', () => {
    describe('twilio-converter', () => {
      before(() => {
        logger.config.level = LoggingLevel.debug;
      });

      after(() => {
        logger.config.level = LoggingLevel.info;
      });

      test.stderr().it('handles dates, objects, and strings', ctx => {
        /* eslint-disable camelcase */
        const schema = {
          type: 'object', properties: {
            date_created: { type: 'string', format: 'date-time' },
            date_updated: { type: 'string', format: 'date-time-rfc-2822' },
            message_type: { type: 'array', items: { type: 'string' } },
            free_form_obj: { type: 'object' },
            some_uri: { type: 'string', format: 'uri' }
          }
        };

        const input = {
          date_created: '2008-09-15T15:53:00+05:00',
          date_updated: 'Mon, 15 Sep 2008 15:53:00 +0500',
          message_type: ['not', 'a', 'message'],
          free_form_obj: { first_key: 'first_value', second_key: 'second_value' },
          some_uri: '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json'
        };

        const expected = {
          dateCreated: new Date('September 15, 2008 15:53 GMT+0500'),
          dateUpdated: new Date('September 15, 2008 15:53 GMT+0500'),
          messageType: ['not', 'a', 'message'],
          freeFormObj: { first_key: 'first_value', second_key: 'second_value' },
          someUri: '/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json'
        };

        const actual = new TwilioSchemaConverter().convertSchema(schema, input);

        expect(actual).to.eql(expected);
        expect(ctx.stderr).to.be.empty;
      });

      test.stderr().it('handles unknown string formats', ctx => {
        const schema = { type: 'string', format: 'price' };
        const input = '$1.23';
        const expected = input;

        const actual = new TwilioSchemaConverter().convertSchema(schema, input);

        expect(actual).to.eql(expected);
        expect(ctx.stderr).to.contain('price');
      });

      test.stderr().it('handles poorly formatted dates', ctx => {
        const schema = { type: 'string', format: 'date-time' };
        const input = 'abc123';
        const expected = input;

        const actual = new TwilioSchemaConverter().convertSchema(schema, input);

        expect(actual).to.eql(expected);
        expect(ctx.stderr).to.contain('date-time');
      });

      test.stderr().it('handles unknown schemas', ctx => {
        const schema = { type: 'bugs' };
        const input = ['insects'];
        const expected = input;

        const actual = new TwilioSchemaConverter().convertSchema(schema, input);

        expect(actual).to.eql(expected);
        expect(ctx.stderr).to.contain('bugs');
      });

      test.stderr().it('handles null values when nullable not allowed', ctx => {
        const schema = { type: 'object' };
        const input = null;
        const expected = input;

        const actual = new TwilioSchemaConverter().convertSchema(schema, input);

        expect(actual).to.eql(expected);
        expect(ctx.stderr).to.contain('nullable');
      });

      test.stderr().it('handles null values when nullable is allowed', ctx => {
        const schema = { type: 'array', nullable: true };
        const input = null;
        const expected = input;

        const actual = new TwilioSchemaConverter().convertSchema(schema, input);

        expect(actual).to.eql(expected);
        expect(ctx.stderr).to.be.empty;
      });
    });
  });
});
