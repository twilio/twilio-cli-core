--------------------------
**Memory**
- # Memory API Changes
- Added initial Memory API endpoints with darkseagreen badge status


### [8.2.2](https://github.com/twilio/twilio-cli-core/compare/8.2.1...8.2.2) (2025-11-11)

--------------------------
**Twiml**
- Add new noun `<ConversationRelaySession>`
- Add support for `<Recording>` noun under `<Start>` verb


--------------------------
**Ai**
- Add `error` as possible transcript status
- Add `error` as possible transcript status

**Chat**
- Updated v2 UserChannel `channel_status` from `not_participating` to `notParticipating`

**Intelligence**
- Make intelligence work with RestProxy
- Add additional enums to better represent the possible states
- Add `error` enum to transcription status to better align with possible outputs
- Add `json` output type to text classification

**Trusthub**
- Remove required parameter Primary Profile Sid from compliance_inquiry and compliance_inquiry_individual

**Accounts**
- Add Messaging GeoPermissions API changes


--------------------------
**Api**
- Updated description for property `CallerDisplayName` for participant create request


--------------------------
**Insights**
- Replace `field` with `key` in Request Filters and Response Metadata Filters and  for Reports API


### [8.2.1](https://github.com/twilio/twilio-cli-core/compare/8.2.0...8.2.1) (2025-09-25)


### Library - Chores

* update axios ([#290](https://github.com/twilio/twilio-cli-core/issues/290)) ([f666826](https://github.com/twilio/twilio-cli-core/commit/f6668260d940ae6da2f6e23b7d8c9c3aad6d90bd))

--------------------------
**Api**
- Added optional parameter `CallerDisplayName` for conference participant outbound
- Updated description for property `to` in the participant create request


--------------------------
**Api**
- Add `date_created` property to media resource and date_created filtering parameters for read action
- Updated the Recordings Resource `channels` property to clarify channels = # of channels in the recording resource and how to specify the # of channels in recording download

**Intelligence**
- Add encryption_credential_sid field in transcripts and services in v2

**Trusthub**
- Remove beta feature flag for all TH APIs
- Remove beta feature flag for ComplianceInquiries API to support OneConsole traffic

**Twiml**
- Add new noun `<AiSession>`


## [8.2.0](https://github.com/twilio/twilio-cli-core/compare/8.1.1...8.2.0) (2025-09-04)

--------------------------
**Api**
- Remove usage category enum from usage record and usage triggers API **(breaking change)**


### [8.1.1](https://github.com/twilio/twilio-cli-core/compare/8.1.0...8.1.1) (2025-08-28)


### Library - Chores

* skip twilio_voice_oneconsole.json due to missing components ([#295](https://github.com/twilio/twilio-cli-core/issues/295)) ([b1eb402](https://github.com/twilio/twilio-cli-core/commit/b1eb402c23ddfadb4be45660c19f71ad9f4a54d8))

--------------------------
**Studio**
- Add `type` to Step resource APIs

**Verify**
- Allow to update all passkeys parameters in the service update


--------------------------
**Accounts**
- Update beta feature flag for consent and contact bulk upsert APIs

**Api**
- Add multiple missing usage categories to usage records and usage triggers api
- Add `channels-whatsapp-template-marketing` and `channels-whatsapp-template-utility` to usage categories

**Conversations**
- Fix `state` spelling for `initializing` enum value
- Update `state` to include `intializing` for ServiceConversationWithParticipants and ConversationWithParticipants

**Flex**
- Adding new optional parameter `identity` to `web_channels` API in version `v2`

**Trusthub**
- Add required Permissions to the ComplianceInquiries API

**Verify**
- Add passkeys support to Verify API creating and updating services.
- Update `ienum` type for Factor creation
- Add passkeys as challenge and factor type


## [8.1.0](https://github.com/twilio/twilio-cli-core/compare/8.0.3...8.1.0) (2025-07-24)


### Library - Chores

* test cli-core released version before triggering cli release ([#293](https://github.com/twilio/twilio-cli-core/issues/293)) ([6535e6e](https://github.com/twilio/twilio-cli-core/commit/6535e6ebca43263a468515963a41ee7d989d65c9))
* upgrade axios version ([#294](https://github.com/twilio/twilio-cli-core/issues/294)) ([ce88e95](https://github.com/twilio/twilio-cli-core/commit/ce88e95b156d0e2576a5eb3f79a109c5486f5055))

--------------------------
**Events**
- Remove `SinkSid` parameter when updating subscriptions. **(breaking change)**

**Twiml**
- Remove Duplicates.
- Add Polly Generative voices.
- Add Latest Google (Chirp3-HD) voices.


### [8.0.3](https://github.com/twilio/twilio-cli-core/compare/8.0.2...8.0.3) (2025-07-10)

### [8.0.2](https://github.com/twilio/twilio-cli-core/compare/8.0.1...8.0.2) (2025-07-10)


### Library - Chores

* take default minor versiontype ([#292](https://github.com/twilio/twilio-cli-core/issues/292)) ([55ead22](https://github.com/twilio/twilio-cli-core/commit/55ead222380f8586cc0abb668cac687c6273a973))

### [8.0.1](https://github.com/twilio/twilio-cli-core/compare/8.0.0...8.0.1) (2025-07-03)

--------------------------
**Bulkexports**
- Changed the type of 'details' field to be a list of objects instead of a single object

**Conversations**
- Updates to `method` casing for ConfgurationAddress, ConversationScopedWebhook, and ServiceConversationScopedWebhook for RestProxy compatibility

**Proxy**
- remove shortcodes resource as its no longer used

**Serverless**
- Change log field level from type `ienum` to `string` in Logs api

**Taskrouter**
- Remove `URL-encoded` from attributes param definition in tasks

**Trunking**
- Added `symmetric_rtp_enabled` property on Trunks.

**Twiml**
- Add support for `<WhatsApp>` noun under `<Dial>` verb


## [8.0.0](https://github.com/twilio/twilio-cli-core/compare/7.27.2...8.0.0) (2025-06-24)


### ⚠ BREAKING CHANGES

* node 20 update
* Node 18 is no longer supported. From version 8.0.0, only Node 20 and later version is supported. (#278)

### Library - Chores

* Cli integration test ([#272](https://github.com/twilio/twilio-cli-core/issues/272)) ([1e3760d](https://github.com/twilio/twilio-cli-core/commit/1e3760d868133b93b41ba460630de0e95541733e))
* Mvr release prep ([#279](https://github.com/twilio/twilio-cli-core/issues/279)) ([55fd171](https://github.com/twilio/twilio-cli-core/commit/55fd171997da8b389eb19b219c4e85bd3e298560))


### Library - Features

* Node 18 is no longer supported. From version 8.0.0, only Node 20 and later version is supported. ([#278](https://github.com/twilio/twilio-cli-core/issues/278)) ([1a6cb09](https://github.com/twilio/twilio-cli-core/commit/1a6cb090b2c6ec3cd6a56e2744df38561a4e04a8))
* Update README.md ([#288](https://github.com/twilio/twilio-cli-core/issues/288)) ([5995ad4](https://github.com/twilio/twilio-cli-core/commit/5995ad432c85199c0d8e04e9f922226f817c7696))

--------------------------
**Api**
- Change DependentPhoneNumber `capabilities` type `object` and `date_created`, `date_updated` to `date_time<rfc2822>`
- Updated the `Default` value from 0 to 1 in the Recordings Resource `channels` property

**Serverless**
- Update `ienum` type level in Logs api

**Verify**
- Update Channel list in Verify Attempst API
- Update `ienum` type for Conversion_Status in Verify Attempts API

**Twiml**
- Add `us2` to the list of supported values for the region attribute in the `<Conference>` TwiML noun.


--------------------------
**Api**
- Added several usage category enums to `usage_record` API

**Numbers**
- Update the porting documentation

**Verify**
- Update `ienum` type for Channels in Verify Attempts API


--------------------------
**Accounts**
- Changes to add date_of_consent param in Bulk Consent API

**Api**
- Change `friendly_name`, `date_created` and `date_updated` properties to type `string`.

**Twiml**
- Update twiml definition for `<ConversationRelay>` and `<Assistant>`


--------------------------
**Api**
- Add `response_key` for `Usage Triggers` fetch endpoint.

**Flex**
- Add Update Interaction API
- Adding `webhook_ttid` as optional parameter in Interactions API

**Serverless**
- Add node22 as a valid Build runtime
- Add node20 as a valid Build runtime

**Video**
- removed `transcribe_participants_on_connect` and `transcriptions_configuration` from the room resource **(breaking change)**
- Added `transcribe_participants_on_connect` and `transcriptions_configuration` to the room resource


--------------------------
**Library - Chore**
- [PR #131](https://github.com/twilio/twilio-oai/pull/131): Trigger cli core release. Thanks to [@sbansla](https://github.com/sbansla)!

**Library - Fix**
- [PR #130](https://github.com/twilio/twilio-oai/pull/130): added a commit to trigger cli-core release. Thanks to [@sbansla](https://github.com/sbansla)!

**Studio**
- Add documentation for parent_step_sid field in Step resource


### [7.27.2](https://github.com/twilio/twilio-cli-core/compare/7.27.1...7.27.2) (2025-03-26)


### Library - Fixes

* revert use node 18 to update api specs ([#264](https://github.com/twilio/twilio-cli-core/issues/264)) ([3efc9ab](https://github.com/twilio/twilio-cli-core/commit/3efc9abc997d9bc351ade1e66de306bd307478c0)), closes [#262](https://github.com/twilio/twilio-cli-core/issues/262)
* reverting dependencies to previous version ([#265](https://github.com/twilio/twilio-cli-core/issues/265)) ([f3da929](https://github.com/twilio/twilio-cli-core/commit/f3da9298145fe3d1e57db454f064028b86740763))


### Library - Chores

* point to node 18 for release job ([#267](https://github.com/twilio/twilio-cli-core/issues/267)) ([4ae9ef1](https://github.com/twilio/twilio-cli-core/commit/4ae9ef128e74a18f1252cffbc129645bd65c7ac5))

### [7.27.1](https://github.com/twilio/twilio-cli-core/compare/7.27.0...7.27.1) (2025-03-26)


### Library - Fixes

* package.json & package-lock.json to reduce vulnerabilities ([#256](https://github.com/twilio/twilio-cli-core/issues/256)) ([a40c963](https://github.com/twilio/twilio-cli-core/commit/a40c9635398da49cce55c259cf5b926e62a21e08))


### Library - Chores

* fix mock-fs version to fix test failure ([#257](https://github.com/twilio/twilio-cli-core/issues/257)) ([b3da940](https://github.com/twilio/twilio-cli-core/commit/b3da940e444f960928ed069e2e071020a41c46bb))
* upgrade mockfs version ([#255](https://github.com/twilio/twilio-cli-core/issues/255)) ([b9ba996](https://github.com/twilio/twilio-cli-core/commit/b9ba99665e73f07890405e80fc0e77e68f2f0636))
* use node 18 to release ([009bf5c](https://github.com/twilio/twilio-cli-core/commit/009bf5cfe5adbed0a735ac0a07e6bd293fcd1ed2))
* use node 18 to update api specs ([#262](https://github.com/twilio/twilio-cli-core/issues/262)) ([c23135b](https://github.com/twilio/twilio-cli-core/commit/c23135b7c45668b1e95aa3e6dafb9e5f6e7986dd))

--------------------------
**Accounts**
- Update Safelist API docs as part of prefix supoort

**Flex**
- Removing `first_name`, `last_name`, and `friendly_name` from the Flex User API

**Messaging**
- Add missing tests under transaction/phone_numbers and transaction/short_code


## [7.27.0](https://github.com/twilio/twilio-cli-core/compare/7.26.12...7.27.0) (2025-03-11)

--------------------------
**Api**
- Add the missing `emergency_enabled` field for `Address Service` endpoints

**Messaging**
- Add missing enums for A2P and TF

**Numbers**
- add missing enum values to hosted_number_order_status

**Twiml**
- Convert Twiml Attribute `speechModel` of type enum to string **(breaking change)**


### [7.26.12](https://github.com/twilio/twilio-cli-core/compare/7.26.11...7.26.12) (2025-02-20)

---------------------------
**Flex**
- Adding Digital Transfers APIs under v1/Interactions

**Numbers**
- Convert webhook_type to ienum type in v1/Porting/Configuration/Webhook/{webhook_type}

**Trusthub**
- Changing TrustHub SupportingDocument status enum from lowercase to uppercase since kyc-orch returns status capitalized and rest proxy requires strict casing


### [7.26.11](https://github.com/twilio/twilio-cli-core/compare/7.26.10...7.26.11) (2025-02-11)

---------------------------
**Api**
- Change downstream url and change media type for file `base/api/v2010/validation_request.json`.

**Intelligence**
- Add json_results for Generative JSON operator results

**Messaging**
- Add DestinationAlphaSender API to support Country-Specific Alpha Senders

**Video**
- Change codec type from enum to case-insensitive enum in recording and room_recording apis


### [7.26.10](https://github.com/twilio/twilio-cli-core/compare/7.26.9...7.26.10) (2025-01-28)

---------------------------
**Api**
- Add open-api file tag to `conference/call recordings` and `recording_transcriptions`.

**Events**
- Add support for subaccount subscriptions (beta)

**Insights**
- add new region to conference APIs

**Lookups**
- Add new `parnter_sub_id` query parameter to the lookup request


### [7.26.9](https://github.com/twilio/twilio-cli-core/compare/7.26.8...7.26.9) (2025-01-13)

---------------------------
**Messaging**
- Adds validity period Default value in service resource documentation


### [7.26.8](https://github.com/twilio/twilio-cli-core/compare/7.26.7...7.26.8) (2025-01-10)


### Library - Chores

* bump mock-fs version to fix test failure ([#253](https://github.com/twilio/twilio-cli-core/issues/253)) ([4bbcc66](https://github.com/twilio/twilio-cli-core/commit/4bbcc664965a586e71728d66d12cb814c37670da))

--------------------------
**Numbers**
- Change beta feature flag to use v2/BulkHostedNumberOrders


--------------------------
**Library - Chore**
- [PR #126](https://github.com/twilio/twilio-oai/pull/126): release twilio-oai. Thanks to [@tiwarishubham635](https://github.com/tiwarishubham635)!


### [7.26.7](https://github.com/twilio/twilio-cli-core/compare/7.26.6...7.26.7) (2024-12-05)

--------------------------
**Api**
- Add optional parameter `intelligence_service` to `transcription`
- Updated `phone_number_sid` to be populated for sip trunking terminating calls.

**Numbers**
- Add Update Hosted Number Order V2 API endpoint
- Update Port in docs

**Twiml**
- Add optional parameter `intelligence_service` to `<Transcription>`
- Add support for new `<ConversationRelay>` and `<Assistant>` noun
- Add `events` attribute to `<Dial>` verb


### [7.26.6](https://github.com/twilio/twilio-cli-core/compare/7.26.5...7.26.6) (2024-11-15)

--------------------------
**Api**
- Added `ivr-virtual-agent-custom-voices` and `ivr-virtual-agent-genai` to `usage_record` API.
- Add open-api file tag to realtime_transcriptions

**Taskrouter**
- Add `api-tag` property to workers reservation
- Add `api-tag` property to task reservation


### [7.26.5](https://github.com/twilio/twilio-cli-core/compare/7.26.4...7.26.5) (2024-10-24)


### Library - Chores

* update twilio version to use patched axios version ([#251](https://github.com/twilio/twilio-cli-core/issues/251)) ([6554866](https://github.com/twilio/twilio-cli-core/commit/65548666636927573de8bbc6ee737d5424abcc34))

--------------------------
**Conversations**
- Expose ConversationWithParticipants resource that allows creating a conversation with participants


### [7.26.4](https://github.com/twilio/twilio-cli-core/compare/7.26.3...7.26.4) (2024-10-17)


### Library - Chores

* bump axios version ([#250](https://github.com/twilio/twilio-cli-core/issues/250)) ([eb69532](https://github.com/twilio/twilio-cli-core/commit/eb695321dac6837b4caa29f45692b4744350898d))

--------------------------
**Api**
- Add response key `country` to fetch AvailablePhoneNumber resource by specific country.

**Messaging**
- Make library and doc public for requestManagedCert Endpoint


### [7.26.3](https://github.com/twilio/twilio-cli-core/compare/7.26.2...7.26.3) (2024-10-03)

--------------------------
**Messaging**
- Add A2P external campaign CnpMigration flag

**Numbers**
- Add address sid to portability API

**Verify**
- Add `SnaClientToken` optional parameter on Verification check.
- Add `EnableSnaClientToken` optional parameter for Verification creation.


### [7.26.2](https://github.com/twilio/twilio-cli-core/compare/7.26.1...7.26.2) (2024-09-25)

--------------------------
**Library - Chore**
- [PR #121](https://github.com/twilio/twilio-oai/pull/121): content sdk changes moved to content v1 in internal open api repo. Thanks to [@sbansla](https://github.com/sbansla)!

**Accounts**
- Update docs and mounts.
- Change library visibility to public
- Enable consent and contact bulk upsert APIs in prod.

**Serverless**
- Add is_plugin parameter in deployments api to check if it is plugins deployment


### [7.26.1](https://github.com/twilio/twilio-cli-core/compare/7.26.0...7.26.1) (2024-09-18)

--------------------------
**Intelligence**
- Remove public from operator_type
- Update operator_type to include general-availablity and deprecated

**Numbers**
- Remove beta flag for bundle clone API


## [7.26.0](https://github.com/twilio/twilio-cli-core/compare/7.25.2...7.26.0) (2024-09-05)

--------------------------
**Iam**
- updated library_visibility public for new public apikeys

**Numbers**
- Add new field in Error Codes for Regulatory Compliance.
- Change typing of Port In Request date_created field to date_time instead of date **(breaking change)**


### [7.25.2](https://github.com/twilio/twilio-cli-core/compare/7.25.1...7.25.2) (2024-08-26)

--------------------------
**Library - Fix**
- [PR #116](https://github.com/twilio/twilio-oai/pull/116): Removing pascal case rule for query and path params. Changing the spec files for orgs api. Thanks to [@AsabuHere](https://github.com/AsabuHere)!

**Api**
- Update documentation of `error_code` and `error_message` on the Message resource.
- Remove generic parameters from `transcription` resource
- Added public documentation for Payload Data retrieval API

**Flex**
- Adding update Flex User api

**Insights**
- Added 'branded', 'business_profile' and 'voice_integrity' fields in List Call Summary

**Intelligence**
- Add `words` array information to the Sentences v2 entity.
- Add `X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `X-Rate-Limit-Config` headers for Operator Results.
- Change the path parameter when fetching an `/OperatorType/{}` from `sid<EY>` to `string` to support searching by SID or by name
- Add `X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `X-Rate-Limit-Config` headers for Transcript and Service endpoints.

**Messaging**
- Adds two new channel senders api to add/remove channel senders to/from a messaging service
- Extend ERC api to accept an optional attribute in request body to indicate CNP migration for an ERC

**Numbers**
- Modify visibility to public in bundle clone API
- Add `port_date` field to Port In Request and Port In Phone Numbers Fetch APIs
- Change properties docs for port in phone numbers api
- Add is_test body param to the Bundle Create API
- Change properties docs for port in api

**Trusthub**
- Add new field in themeSetId in compliance_inquiry.

**Verify**
- Update `custom_code_enabled` description on verification docs


--------------------------
**Library - Chore**
- [PR #114](https://github.com/twilio/twilio-oai/pull/114): remove empty models. Thanks to [@tiwarishubham635](https://github.com/tiwarishubham635)!

**Intelligence**
- Deprecate account flag api.twilio-intelligence.v2


### [7.25.1](https://github.com/twilio/twilio-cli-core/compare/7.25.0...7.25.1) (2024-06-27)

--------------------------
**Library - Chore**
- [PR #113](https://github.com/twilio/twilio-oai/pull/113): regenerated from open-api. Thanks to [@sbansla](https://github.com/sbansla)!
- [PR #112](https://github.com/twilio/twilio-oai/pull/112): disable example validation. Thanks to [@sbansla](https://github.com/sbansla)!

**Api**
- Add `transcription` resource
- Add beta feature request managed cert

**Flex**
- Changed mount name for flex_team v2 api

**Intelligence**
- Add `X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `X-Rate-Limit-Config` as Response Headers to Operator resources

**Numbers**
- Added include_constraints query parameter to the Regulations API

**Twiml**
- Add support for `<Transcription>` noun


## [7.25.0](https://github.com/twilio/twilio-cli-core/compare/7.24.1...7.25.0) (2024-06-18)

--------------------------

**Library - Feature**
- [PR #111](https://github.com/twilio/twilio-oai/pull/111): Merge branch '2.0.0-rc' into main. Thanks to [@tiwarishubham635](https://github.com/tiwarishubham635)! **(breaking change)**
- [PR #110](https://github.com/twilio/twilio-oai/pull/110): Merge branch '2.0.0-rc' into main. Thanks to [@tiwarishubham635](https://github.com/tiwarishubham635)! **(breaking change)**

**Events**
- Add `status` and `documentation_url` to Event Types

**Lookups**
- Removed unused `fraud` lookups in V1 only to facilitate rest proxy migration

**Numbers**
- Add date_created field to the Get Port In Request API
- Rename the `status_last_time_updated_timestamp` field to `last_updated` in the Get Port In Phone Number API **(breaking change)**
- Add Rejection reason and rejection reason code to the Get Port In Phone Number API
- Remove the carrier information from the Portability API

**Proxy**
- Change property `type` from enum to ienum

**Trusthub**
- Add skipMessagingUseCase field in compliance_tollfree_inquiry.


### [7.24.1](https://github.com/twilio/twilio-cli-core/compare/7.24.0...7.24.1) (2024-06-06)

---------------------------
**Api**
- Mark MaxPrice as obsolete

**Lookups**
- Update examples for `phone_number_quality_score`

**Messaging**
- List tollfree verifications on parent account and all sub-accounts


## [7.24.0](https://github.com/twilio/twilio-cli-core/compare/7.23.4...7.24.0) (2024-05-24)


### Library - Chores

* fixed path level server and description requirement in spec file ([#247](https://github.com/twilio/twilio-cli-core/issues/247)) ([fe3db94](https://github.com/twilio/twilio-cli-core/commit/fe3db9452e802645ba098201f671bb95801c3def))
* fixing kebab-case error ([#248](https://github.com/twilio/twilio-cli-core/issues/248)) ([31b1e31](https://github.com/twilio/twilio-cli-core/commit/31b1e31ecdb2fb555f72bbec235d9323be4ed726))

---------------------------
**Api**
- Add ie1 as supported region for UserDefinedMessage and UserDefinedMessageSubscription.

**Flex**
- Adding validated field to `plugin_versions`
- Corrected the data type for `runtime_domain`, `call_recording_webhook_url`, `crm_callback_url`, `crm_fallback_url`, `flex_url` in Flex Configuration
- Making `routing` optional in Create Interactions endpoint

**Intelligence**
- Expose operator authoring apis to public visibility
- Deleted `language_code` parameter from updating service in v2 **(breaking change)**
- Add read_only_attached_operator_sids to v2 services

**Numbers**
- Add API endpoint for GET Porting Webhook Configurations By Account SID
- Remove bulk portability api under version `/v1`. **(breaking change)**
- Removed porting_port_in_fetch.json files and move the content into porting_port_in.json files
- Add API endpoint to deleting Webhook Configurations
- Add Get Phone Number by Port in request SID and Phone Number SID api
- Add Create Porting webhook configuration API
- Added bundle_sid and losing_carrier_information fields to Create PortInRequest api to support Japan porting

**Taskrouter**
- Add back `routing_target` property to tasks
- Add back `ignore_capacity` property to tasks
- Removing `routing_target` property to tasks due to revert
- Removing `ignore_capacity` property to tasks due to revert
- Add `routing_target` property to tasks
- Add `ignore_capacity` property to tasks

**Trusthub**
- Add new field errors to bundle as part of public API response in customer_profile.json and trust_product.json **(breaking change)**
- Add themeSetId field in compliance_tollfree_inquiry.

**Verify**
- Update `friendly_name` description on service docs


### [7.23.4](https://github.com/twilio/twilio-cli-core/compare/7.23.3...7.23.4) (2024-04-18)


### Library - Fixes

* corrected kebabCase for parameters with numbers ([#246](https://github.com/twilio/twilio-cli-core/issues/246)) ([fc4861e](https://github.com/twilio/twilio-cli-core/commit/fc4861ef6a2f1866088ee24adedee47516a7dcb0))

---------------------------
**Flex**
- Add header `ui_version` to `web_channels` API

**Messaging**
- Redeploy after failed pipeline

**Numbers**
- Add Delete Port In request phone number api and Add Delete Port In request api


### [7.23.3](https://github.com/twilio/twilio-cli-core/compare/7.23.2...7.23.3) (2024-04-04)

---------------------------
**Api**
- Correct conference filtering by date_created and date_updated documentation, clarifying that times are UTC.

**Flex**
- Remove optional parameter from `plugins` and it to `plugin_versions`

**Lookups**
- Add new `pre_fill` package to the lookup response

**Messaging**
- Cleanup api.messaging.next-gen from Messaging Services endpoints
- Readd Sending-Window after fixing test failure

**Verify**
- Add `whatsapp.msg_service_sid` and `whatsapp.from` parameters to create, update, get and list of services endpoints

**Voice**
- Correct conference filtering by date_created and date_updated documentation, clarifying that times are UTC.

**Twiml**
- Add new `token_type` value `payment-method` for `Pay` verb


### [7.23.2](https://github.com/twilio/twilio-cli-core/compare/7.23.1...7.23.2) (2024-04-01)

---------------------------
**Api**
- Add property `queue_time` to conference participant resource
- Update RiskCheck documentation
- Correct call filtering by start and end time documentation, clarifying that times are UTC.

**Flex**
- Adding optional parameter to `plugins`

**Media**
- Remove API: MediaProcessor

**Messaging**
- Remove Sending-Window due to test failure
- Add Sending-Window as a response property to Messaging Services, gated by a beta feature flag

**Numbers**
- Correct valid_until_date field to be visible in Bundles resource
- Adding port_in_status field to the Port In resource and phone_number_status and sid fields to the Port In Phone Number resource

**Oauth**
- Modified token endpoint response
- Added refresh_token and scope as optional parameter to token endpoint

**Trusthub**
- Add update inquiry endpoint in compliance_registration.
- Add new field in themeSetId in compliance_registration.

**Voice**
- Correct call filtering by start and end time documentation, clarifying that times are UTC.

**Twiml**
- Add support for new Google voices (Q1 2024) for `Say` verb - gu-IN voices
- Add support for new Amazon Polly and Google voices (Q1 2024) for `Say` verb - Niamh (en-IE) and Sofie (da-DK) voices


---------------------------
**Oauth**
- Add new APIs for vendor authorize and token endpoints


### [7.23.1](https://github.com/twilio/twilio-cli-core/compare/7.23.0...7.23.1) (2024-03-12)

---------------------------
**Api**
- Correct precedence documentation for application_sid vs status_callback in message creation
- Mark MaxPrice as deprecated

**Flex**
- Making `plugins` visibility to public

**Messaging**
- Add new `errors` attribute to the Brand Registration resource.
- Mark `brand_feedback` attribute as deprecated.
- Mark `failure_reason` attribute as deprecated.
- The new `errors` attribute is expected to provide additional information about Brand registration failures and feedback (if any has been provided by The Campaign Registry). Consumers should use this attribute instead of `brand_feedback` and `failure_reason`.

**Numbers**
- Correcting mount_name for porting port in fetch API

**Trusthub**
- Add new field in statusCallbackUrl in compliance_registration.
- Add new field in isvRegisteringForSelfOrTenant in compliance_registration.

**Twiml**
- Expanded description of Action parameter for Message verb


## [7.23.0](https://github.com/twilio/twilio-cli-core/compare/7.22.0...7.23.0) (2024-02-27)

---------------------------
**Api**
- remove feedback and feedback summary from call resource

**Flex**
- Adding `routing_properties` to Interactions Channels Participant

**Lookups**
- Add new `line_status` package to the lookup response
- Remove `live_activity` package from the lookup response **(breaking change)**

**Messaging**
- Add tollfree multiple rejection reasons response array

**Trusthub**
- Add ENUM for businessRegistrationAuthority in compliance_registration. **(breaking change)**
- Add new field in isIsvEmbed in compliance_registration.
- Add additional optional fields in compliance_registration for Individual business type.

**Twiml**
- Add support for new Amazon Polly and Google voices (Q1 2024) for `Say` verb


## [7.22.0](https://github.com/twilio/twilio-cli-core/compare/7.21.0...7.22.0) (2024-02-09)

---------------------------
**Library - Chore**
- [PR #103](https://github.com/twilio/twilio-oai/pull/103): initiate cli release commit. Thanks to [@sbansla](https://github.com/sbansla)!

**Api**
- Updated service base url for connect apps and authorized connect apps APIs **(breaking change)**
- Update documentation to reflect RiskCheck GA
- Added optional parameter `CallToken` for create participant api

**Events**
- Marked as GA

**Flex**
- Adding `flex_instance_sid` to Flex Configuration
- Adding `provisioning_status` for Email Manager
- Adding `offline_config` to Flex Configuration

**Insights**
- add flag to restrict access to unapid customers
- decommission voice-qualitystats-endpoint role

**Intelligence**
- Add text-generation operator (for example conversation summary) results to existing OperatorResults collection.

**Lookups**
- Remove `carrier` field from `sms_pumping_risk` and leave `carrier_risk_category` **(breaking change)**
- Remove carrier information from call forwarding package **(breaking change)**

**Messaging**
- Add update instance endpoints to us_app_to_person api
- Add tollfree edit_allowed and edit_reason fields
- Update Phone Number, Short Code, Alpha Sender, US A2P and Channel Sender documentation
- Add DELETE support to Tollfree Verification resource

**Numbers**
- Add Get Port In request api

**Push**
- Migrated to new Push API V4 with Resilient Notification Delivery.

**Serverless**
- Add node18 as a valid Build runtime

**Taskrouter**
- Add `jitter_buffer_size` param in update reservation
- Add container attribute to task_queue_bulk_real_time_statistics endpoint
- Remove beta_feature check on task_queue_bulk_real_time_statistics endpoint

**Trusthub**
- Add optional field NotificationEmail to the POST /v1/ComplianceInquiries/Customers/Initialize API
- Add additional optional fields in compliance_tollfree_inquiry.json
- Rename did to tollfree_phone_number in compliance_tollfree_inquiry.json
- Add new optional field notification_email to compliance_tollfree_inquiry.json

**Verify**
- `Tags` property added again to Public Docs **(breaking change)**
- Remove `Tags` from Public Docs **(breaking change)**
- Add `VerifyEventSubscriptionEnabled` parameter to service create and update endpoints.
- Add `Tags` optional parameter on Verification creation.
- Update Verify TOTP maturity to GA.


## [7.21.0](https://github.com/twilio/twilio-cli-core/compare/7.20.0...7.21.0) (2024-01-30)

---------------------------
**Oauth**
- updated openid discovery endpoint uri **(breaking change)**
- Added device code authorization endpoint
- added oauth JWKS endpoint
- Get userinfo resource
- OpenID discovery resource
- Add new API for token endpoint


## [7.20.0](https://github.com/twilio/twilio-cli-core/compare/7.19.1...7.20.0) (2024-01-24)


### Library - Fixes

* added fix for preview domain ([e158bd6](https://github.com/twilio/twilio-cli-core/commit/e158bd604228f8157685f609adceef8b345fd9d2))


### Library - Chores

* disable notification ([67f71ed](https://github.com/twilio/twilio-cli-core/commit/67f71edfb571a85f8deb46dbe8502537bf8e756a))

---------------------------


### [7.19.1](https://github.com/twilio/twilio-cli-core/compare/7.19.0...7.19.1) (2024-01-17)


### Library - Chores

* skip healthcheck api ([#236](https://github.com/twilio/twilio-cli-core/issues/236)) ([0f52d2b](https://github.com/twilio/twilio-cli-core/commit/0f52d2b0b8cbcbdd5623c48c8e21abf6f08d0566))
* **deps:** bump axios from 0.25.0 to 1.6.0 ([#232](https://github.com/twilio/twilio-cli-core/issues/232)) ([caf0f9e](https://github.com/twilio/twilio-cli-core/commit/caf0f9e2a89798dde91e4cfa68ef23ff8431804e))

---------------------------
**Push**
- Migrated to new Push API V4 with Resilient Notification Delivery.


## [7.19.0](https://github.com/twilio/twilio-cli-core/compare/7.18.3...7.19.0) (2023-12-14)

---------------------------
**Api**
- Updated service base url for connect apps and authorized connect apps APIs **(breaking change)**

**Events**
- Marked as GA

**Insights**
- decommission voice-qualitystats-endpoint role

**Numbers**
- Add Get Port In request api

**Taskrouter**
- Add `jitter_buffer_size` param in update reservation

**Trusthub**
- Add additional optional fields in compliance_tollfree_inquiry.json

**Verify**
- Remove `Tags` from Public Docs **(breaking change)**


### [7.18.3](https://github.com/twilio/twilio-cli-core/compare/7.18.2...7.18.3) (2023-12-01)

---------------------------
**Verify**
- Add `VerifyEventSubscriptionEnabled` parameter to service create and update endpoints.


### [7.18.2](https://github.com/twilio/twilio-cli-core/compare/7.18.1...7.18.2) (2023-11-17)

---------------------------
**Library - Chore**
- [PR #98](https://github.com/twilio/twilio-oai/pull/98): removing oauth. Thanks to [@sbansla](https://github.com/sbansla)!

**Api**
- Update documentation to reflect RiskCheck GA

**Messaging**
- Add tollfree edit_allowed and edit_reason fields
- Update Phone Number, Short Code, Alpha Sender, US A2P and Channel Sender documentation

**Taskrouter**
- Add container attribute to task_queue_bulk_real_time_statistics endpoint

**Trusthub**
- Rename did to tollfree_phone_number in compliance_tollfree_inquiry.json
- Add new optional field notification_email to compliance_tollfree_inquiry.json

**Verify**
- Add `Tags` optional parameter on Verification creation.


### [7.18.1](https://github.com/twilio/twilio-cli-core/compare/7.18.0...7.18.1) (2023-11-06)

---------------------------
**Flex**
- Adding `provisioning_status` for Email Manager

**Intelligence**
- Add text-generation operator (for example conversation summary) results to existing OperatorResults collection.

**Messaging**
- Add DELETE support to Tollfree Verification resource

**Serverless**
- Add node18 as a valid Build runtime

**Verify**
- Update Verify TOTP maturity to GA.


## [7.18.0](https://github.com/twilio/twilio-cli-core/compare/7.17.0...7.18.0) (2023-10-19)

---------------------------
**Accounts**
- Updated Safelist metadata to correct the docs.
- Add Global SafeList API changes

**Api**
- Added optional parameter `CallToken` for create participant api

**Flex**
- Adding `offline_config` to Flex Configuration

**Intelligence**
- Deleted `redacted` parameter from fetching transcript in v2 **(breaking change)**

**Lookups**
- Add new `phone_number_quality_score` package to the lookup response
- Remove `disposable_phone_number_risk` package **(breaking change)**

**Messaging**
- Update US App To Person documentation with current `message_samples` requirements

**Taskrouter**
- Remove beta_feature check on task_queue_bulk_real_time_statistics endpoint
- Add `virtual_start_time` property to tasks
- Updating `task_queue_data` format from `map` to `array` in the response of bulk get endpoint of TaskQueue Real Time Statistics API **(breaking change)**


---------------------------
**Lookups**
- Add test api support for Lookup v2


## [7.17.0](https://github.com/twilio/twilio-cli-core/compare/7.16.0...7.17.0) (2023-09-21)

---------------------------
**Conversations**
- Enable conversation email bindings, email address configurations and email message subjects

**Flex**
- Adding `console_errors_included` to Flex Configuration field `debugger_integrations`
- Introducing new channel status as `inactive` in modify channel endpoint for leave functionality **(breaking change)**
- Adding `citrix_voice_vdi` to Flex Configuration

**Taskrouter**
- Add Update Queues, Workers, Workflow Real Time Statistics API to flex-rt-data-api-v2 endpoint
- Add Update Workspace Real Time Statistics API to flex-rt-data-api-v2 endpoint


## [7.16.0](https://github.com/twilio/twilio-cli-core/compare/7.15.0...7.16.0) (2023-09-08)

---------------------------
**Api**
- Make message tagging parameters public **(breaking change)**

**Flex**
- Adding `agent_conv_end_methods` to Flex Configuration

**Messaging**
- Mark Mesasging Services fallback_to_long_code feature obsolete

**Numbers**
- Add Create Port In request api
- Renaming sid for bulk_hosting_sid and remove account_sid response field in numbers/v2/BulkHostedNumberOrders **(breaking change)**

**Pricing**
- gate resources behind a beta_feature


## [7.15.0](https://github.com/twilio/twilio-cli-core/compare/7.14.0...7.15.0) (2023-08-24)

---------------------------
**Api**
- Add new property `RiskCheck` for SMS pumping protection feature only (public beta to be available soon): Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request

**Flex**
- Changing `sid<UO>` path param to `sid<UT>` in interaction channel participant update endpoint **(breaking change)**

**Messaging**
- Add Channel Sender api
- Fixing country code docs and removing Zipwhip references

**Numbers**
- Request status changed in numbers/v2/BulkHostedNumberOrders **(breaking change)**
- Add bulk hosting orders API under version `/v2


## [7.14.0](https://github.com/twilio/twilio-cli-core/compare/7.13.0...7.14.0) (2023-08-14)

---------------------------
**Insights**
- Normalize annotations parameters in list summary api to be prefixed

**Numbers**
- Change Bulk_hosted_sid from BHR to BH prefix in HNO and dependent under version `/v2` API's. **(breaking change)**
- Added parameter target_account_sid to portability and account_sid to response body

**Verify**
- Remove beta feature flag to list attempts API.
- Remove beta feature flag to verifications summary attempts API.


---------------------------
**Api**
- Added `voice-intelligence`, `voice-intelligence-transcription` and `voice-intelligence-operators` to `usage_record` API.
- Added `tts-google` to `usage_record` API.

**Lookups**
- Add new `disposable_phone_number_risk` package to the lookup response

**Verify**
- Documentation of list attempts API was improved by correcting `date_created_after` and `date_created_before` expected date format.
- Documentation was improved by correcting `date_created_after` and `date_created_before` expected date format parameter on attempts summary API.
- Documentation was improved by adding `WHATSAPP` as optional valid parameter on attempts summary API.

**Twiml**
- Added support for he-il inside of ssm_lang.json that was missing
- Added support for he-il language in say.json that was missing
- Add `statusCallback` and `statusCallbackMethod` attributes to `<Siprec>`.


## [7.13.0](https://github.com/twilio/twilio-cli-core/compare/7.12.0...7.13.0) (2023-07-13)

---------------------------
**Flex**
- Adding `interaction_context_sid` as optional parameter in Interactions API

**Messaging**
- Making visiblity public for tollfree_verification API

**Numbers**
- Remove Sms capability property from HNO creation under version `/v2` of HNO API. **(breaking change)**
- Update required properties in LOA creation under version `/v2` of Authorization document API. **(breaking change)**

**Taskrouter**
- Add api to fetch task queue statistics for multiple TaskQueues

**Verify**
- Add `RiskCheck` optional parameter on Verification creation.

**Twiml**
- Add Google Voices and languages


## [7.12.0](https://github.com/twilio/twilio-cli-core/compare/7.11.0...7.12.0) (2023-06-28)

---------------------------
**Lookups**
- Add `reassigned_number` package to the lookup response

**Numbers**
- Add hosted_number_order under version `/v2`.
- Update properties in Porting and Bulk Porting APIs. **(breaking change)**
- Added bulk Portability API under version `/v1`.
- Added Portability API under version `/v1`.


## [7.11.0](https://github.com/twilio/twilio-cli-core/compare/7.10.2...7.11.0) (2023-06-15)

---------------------------
**Api**
- Added `content_sid` as conditional parameter
- Removed `content_sid` as optional field **(breaking change)**

**Insights**
- Added `annotation` to list summary output


### [7.10.2](https://github.com/twilio/twilio-cli-core/compare/7.10.1...7.10.2) (2023-06-01)


### Library - Fixes

* Update Dockerfile base to be consistent with twilio-cli ([#226](https://github.com/twilio/twilio-cli-core/issues/226)) ([73a3c09](https://github.com/twilio/twilio-cli-core/commit/73a3c091ad8c23d98dc8e54311ab27c9502e6965))

---------------------------
**Api**
- Add `Trim` to create Conference Participant API

**Intelligence**
- First public beta release for Voice Intelligence APIs with client libraries

**Messaging**
- Add new `errors` attribute to us_app_to_person resource. This attribute will provide additional information about campaign registration errors.


### [7.10.1](https://github.com/twilio/twilio-cli-core/compare/7.10.0...7.10.1) (2023-05-18)

---------------------------
**Conversations**
- Added  `AddressCountry` parameter to Address Configuration endpoint, to support regional short code addresses
- Added query parameters `start_date`, `end_date` and `state` in list Conversations resource for filtering

**Insights**
- Added annotations parameters to list summary api

**Messaging**
- Add GET domainByMessagingService endpoint to linkShortening service
- Add `disable_https` to link shortening domain_config properties

**Numbers**
- Add bulk_eligibility api under version `/v1`.


## [7.10.0](https://github.com/twilio/twilio-cli-core/compare/7.9.0...7.10.0) (2023-05-04)

---------------------------
**Conversations**
- Remove `start_date`, `end_date` and `state` query parameters from list operation on Conversations resource **(breaking change)**

**Twiml**
- Add support for new Amazon Polly voices (Q1 2023) for `Say` verb


## [7.9.0](https://github.com/twilio/twilio-cli-core/compare/7.8.0...7.9.0) (2023-04-20)


### Library - Fixes

* Move make install step after node setup tp fix npm failures ([#222](https://github.com/twilio/twilio-cli-core/issues/222)) ([1a37412](https://github.com/twilio/twilio-cli-core/commit/1a37412dd39844728d9803838de4b34ed8f42e73))

---------------------------
**Messaging**
- Remove `messaging_service_sids` and `messaging_service_sid_action` from domain config endpoint **(breaking change)**
- Add error_code and rejection_reason properties to tollfree verification API response

**Numbers**
- Added the new Eligibility API under version `/v1`.


## [7.8.0](https://github.com/twilio/twilio-cli-core/compare/7.7.0...7.8.0) (2023-04-06)

---------------------------
**Conversations**
- Expose query parameters `start_date`, `end_date` and `state` in list operation on Conversations resource for sorting and filtering

**Insights**
- Added answered by filter in Call Summaries

**Lookups**
- Remove `disposable_phone_number_risk` package **(breaking change)**

**Messaging**
- Add support for `SOLE_PROPRIETOR` brand type and `SOLE_PROPRIETOR` campaign use case.
- New Sole Proprietor Brands should be created with `SOLE_PROPRIETOR` brand type. Brand registration requests with `STARTER` brand type will be rejected.
- New Sole Proprietor Campaigns should be created with `SOLE_PROPRIETOR` campaign use case. Campaign registration requests with `STARTER` campaign use case will be rejected.
- Add Brand Registrations OTP API


## [7.7.0](https://github.com/twilio/twilio-cli-core/compare/7.6.2...7.7.0) (2023-03-23)

---------------------------
**Api**
- Revert Corrected the data type for `friendly_name` in Available Phone Number Local, Mobile and TollFree resources
- Corrected the data type for `friendly_name` in Available Phone Number Local, Mobile and TollFree resources **(breaking change)**

**Messaging**
- Add `linkshortening_messaging_service` resource
- Add new endpoint for GetDomainConfigByMessagingServiceSid
- Remove `validated` parameter and add `cert_in_validation` parameter to Link Shortening API **(breaking change)**


### [7.6.2](https://github.com/twilio/twilio-cli-core/compare/7.6.1...7.6.2) (2023-03-14)

---------------------------
**Api**
- Add new categories for whatsapp template

**Lookups**
- Remove `validation_results` from the `default_output_properties`

**Supersim**
- Add ESimProfile's `matching_id` and `activation_code` parameters to libraries


### [7.6.1](https://github.com/twilio/twilio-cli-core/compare/7.6.0...7.6.1) (2023-02-23)


### Library - Chores

* update twilio node mvr version ([#218](https://github.com/twilio/twilio-cli-core/issues/218)) ([71c5a98](https://github.com/twilio/twilio-cli-core/commit/71c5a98eacbf5f3867bfdfd5a2bc18afd299beb7))


### Library - Fixes

* using npx instead of npm bin ([#220](https://github.com/twilio/twilio-cli-core/issues/220)) ([b3d59e9](https://github.com/twilio/twilio-cli-core/commit/b3d59e9abd7e1c43008993ac9b76576323e037f9))

---------------------------
**Api**
- Remove `scheduled_for` property from message resource
- Add `scheduled_for` property to message resource


## [7.6.0](https://github.com/twilio/twilio-cli-core/compare/7.5.3...7.6.0) (2023-02-09)

---------------------------
**Library - Feature**
- [PR #88](https://github.com/twilio/twilio-oai/pull/88): add Page and PageToken parameters to read operations. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Lookups**
- Add `disposable_phone_number_risk` package to the lookup response
- Add `sms_pumping_risk` package to the lookup response


### [7.5.3](https://github.com/twilio/twilio-cli-core/compare/7.5.2...7.5.3) (2023-01-26)

---------------------------
**Library - Fix**
- [PR #87](https://github.com/twilio/twilio-oai/pull/87): use long property descriptions if available. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #85](https://github.com/twilio/twilio-oai/pull/85): Nullable Page URLs. Thanks to [@claudiachua](https://github.com/claudiachua)!

**Api**
- Add `public_application_connect_enabled` param to Application resource

**Messaging**
- Add new tollfree verification API property (ExternalReferenceId)]

**Verify**
- Add `device_ip` parameter and channel `auto` for sna/sms orchestration

**Twiml**
- Add support for `<Application>` noun and `<ApplicationSid>` noun, nested `<Parameter>` to `<Hangup>` and `<Leave>` verb


### [7.5.2](https://github.com/twilio/twilio-cli-core/compare/7.5.1...7.5.2) (2023-01-12)

---------------------------
**Conversations**
- Add support for creating Multi-Channel Rich Content Messages

**Lookups**
- Changed the no data message for match postal code from `no_data` to `data_not_available` in identity match package

**Messaging**
- Add update/edit tollfree verification API


### [7.5.1](https://github.com/twilio/twilio-cli-core/compare/7.5.0...7.5.1) (2022-12-29)

---------------------------
**Library - Fix**
- [PR #83](https://github.com/twilio/twilio-oai/pull/83): singularize ice-server. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


## [7.5.0](https://github.com/twilio/twilio-cli-core/compare/7.4.3...7.5.0) (2022-12-15)

---------------------------
**Api**
- Add `street_secondary` param to address create and update
- Make `method` optional for user defined message subscription **(breaking change)**

**Flex**
- Flex Conversations is now Generally Available
- Adding the ie1 mapping for authorization api, updating service base uri and base url response attribute **(breaking change)**
- Change web channels to GA and library visibility to public
- Changing the uri for authorization api from using Accounts to Insights **(breaking change)**

**Media**
- Gate Twilio Live endpoints behind beta_feature for EOS

**Messaging**
- Mark `MessageFlow` as a required field for Campaign Creation **(breaking change)**

**Oauth**
- updated openid discovery endpoint uri **(breaking change)**
- Added device code authorization endpoint

**Supersim**
- Allow filtering the SettingsUpdates resource by `status`

**Twiml**
- Add new Polly Neural voices
- Add tr-TR, ar-AE, yue-CN, fi-FI languages to SSML `<lang>` element.
- Add x-amazon-jyutping, x-amazon-pinyin, x-amazon-pron-kana, x-amazon-yomigana alphabets to SSML `<phoneme>` element.
- Rename `character` value for SSML `<say-as>` `interpret-as` attribute to `characters`. **(breaking change)**
- Rename `role` attribute to `format` in SSML `<say-as>` element. **(breaking change)**


### [7.4.3](https://github.com/twilio/twilio-cli-core/compare/7.4.2...7.4.3) (2022-12-01)


### Library - Chores

* Update package.json ([2b2fbe6](https://github.com/twilio/twilio-cli-core/commit/2b2fbe634b1640b880d8757fb94bdddc857d4727))

---------------------------
**Flex**
- Adding new `assessments` api in version `v1`

**Lookups**
- Add `identity_match` package to the lookup response

**Messaging**
- Added `validated` parameter to Link Shortening API

**Serverless**
- Add node16 as a valid Build runtime
- Add ie1 and au1 as supported regions for all endpoints.


### [7.4.2](https://github.com/twilio/twilio-cli-core/compare/7.4.1...7.4.2) (2022-11-17)

---------------------------
**Api**
- Set the Content resource to have public visibility as Preview

**Flex**
- Adding new parameter `base_url` to 'gooddata' response in version `v1`

**Insights**
- Added `answered_by` field in List Call Summary
- Added `answered_by` field in call summary


---------------------------
**Library - Fix**
- [PR #81](https://github.com/twilio/twilio-oai/pull/81): add mount names when they cannot be derived from the path. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Flex**
- Adding two new authorization API 'user_roles' and 'gooddata' in version `v1`

**Messaging**
- Add new Campaign properties (MessageFlow, OptInMessage, OptInKeywords, OptOutMessage, OptOutKeywords, HelpMessage, HelpKeywords)

**Twiml**
- Add new speech models to `Gather`.


### [7.4.1](https://github.com/twilio/twilio-cli-core/compare/7.4.0...7.4.1) (2022-11-02)

---------------------------
**Library - Fix**
- [PR #80](https://github.com/twilio/twilio-oai/pull/80): update parent logic for handling of parents vs. containers. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added `contentSid` and `contentVariables` to Message resource with public visibility as Beta
- Add `UserDefinedMessageSubscription` and `UserDefinedMessage` resource

**Proxy**
- Remove FailOnParticipantConflict param from Proxy Session create and update and Proxy Participant create

**Supersim**
- Update SettingsUpdates resource to remove PackageSid

**Taskrouter**
- Add `Ordering` query parameter to Workers and TaskQueues for sorting by
- Add `worker_sid` query param for list reservations endpoint

**Twiml**
- Add `url` and `method` attributes to `<Conversation>`


## [7.4.0](https://github.com/twilio/twilio-cli-core/compare/7.3.0...7.4.0) (2022-10-19)

---------------------------
**Library - Chore**
- [PR #79](https://github.com/twilio/twilio-oai/pull/79): update mountName and className extensions. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Fix**
- [PR #78](https://github.com/twilio/twilio-oai/pull/78): updating property order for yaml files. Thanks to [@kridai](https://github.com/kridai)!

**Api**
- Make link shortening parameters public **(breaking change)**

**Oauth**
- added oauth JWKS endpoint
- Get userinfo resource
- OpenID discovery resource
- Add new API for token endpoint

**Supersim**
- Add SettingsUpdates resource

**Verify**
- Update Verify Push endpoints to `ga` maturity
- Verify BYOT add Channels property to the Get Templates response

**Twiml**
- Add `requireMatchingInputs` attribute and `input-matching-failed` errorType to `<Prompt>`


## [7.3.0](https://github.com/twilio/twilio-cli-core/compare/7.2.1...7.3.0) (2022-10-06)

---------------------------
**Library - Feature**
- [PR #77](https://github.com/twilio/twilio-oai/pull/77): add helper libs semantic types configuration. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added `virtual-agent` to `usage_record` API.
- Add AMD attributes to participant create request

**Twiml**
- Add AMD attributes to `Number` and `Sip`


### [7.2.1](https://github.com/twilio/twilio-cli-core/compare/7.2.0...7.2.1) (2022-09-19)


### Library - Chores

* Update package.json ([41a1498](https://github.com/twilio/twilio-cli-core/commit/41a149890b713fa6f137dda341286d08ca70db31))

## [7.2.0](https://github.com/twilio/twilio-cli-core/compare/7.1.0...7.2.0) (2022-09-08)


### ⚠ BREAKING CHANGES

* update description (#207)

### Library - Fixes

* cleanup keytar ([#209](https://github.com/twilio/twilio-cli-core/issues/209)) ([9f1c2d9](https://github.com/twilio/twilio-cli-core/commit/9f1c2d9b4607c6bc83b80bfde5cf3eb1ce558fe7))
* Fixing ocktokit api calls ([#211](https://github.com/twilio/twilio-cli-core/issues/211)) ([b5150dd](https://github.com/twilio/twilio-cli-core/commit/b5150dd84c4a9fec036666c5c1b63b55ebfcb969))
* update description ([#207](https://github.com/twilio/twilio-cli-core/issues/207)) ([80ae344](https://github.com/twilio/twilio-cli-core/commit/80ae3443ed5c0b40d3ba5ec73c47ccd9caf2376a))

---------------------------
**Flex**
- Removed redundant `close` status from Flex Interactions flow **(breaking change)**
- Adding `debugger_integration` and `flex_ui_status_report` to Flex Configuration

**Messaging**
- Add create, list and get tollfree verification API

**Verify**
- Verify SafeList API endpoints added.

**Video**
- Add `Anonymize` API

**Twiml**
- Update `event` value `call-in-progress` to `call-answered`


## [7.1.0](https://github.com/twilio/twilio-cli-core/compare/7.0.0...7.1.0) (2022-08-25)

---------------------------
**Library - Test**
- [PR #73](https://github.com/twilio/twilio-oai/pull/73): add test-docker rule. Thanks to [@beebzz](https://github.com/beebzz)!

**Api**
- Remove `beta feature` from scheduling params and remove optimize parameters. **(breaking change)**

**Routes**
- Remove Duplicate Create Method - Update Method will work even if Inbound Processing Region is currently empty/404. **(breaking change)**

**Twiml**
- Add new Polly Neural voices
- Add new languages to SSML `<lang>`.


## [7.0.0](https://github.com/twilio/twilio-cli-core/compare/6.8.1...7.0.0) (2022-08-11)


### ⚠ BREAKING CHANGES

* unlocking oclif v2

Co-authored-by: sr010 <87780745+sr010@users.noreply.github.com>
Co-authored-by: sburman <sburman@twilio.com>
Co-authored-by: shrutiburman <87537688+shrutiburman@users.noreply.github.com>

### Library - Fixes

* Replace oclif-v1 dependencies with oclif-v2 version ([#212](https://github.com/twilio/twilio-cli-core/issues/212)) ([d87c83a](https://github.com/twilio/twilio-cli-core/commit/d87c83aca231ace8d58c12cad7b6b34c528cce6a)), closes [#207](https://github.com/twilio/twilio-cli-core/issues/207) [#211](https://github.com/twilio/twilio-cli-core/issues/211)

### [6.8.1](https://github.com/twilio/twilio-cli-core/compare/6.8.0...6.8.1) (2022-08-11)


### Library - Fixes

* Octokit changes reversed ([#213](https://github.com/twilio/twilio-cli-core/issues/213)) ([e66838c](https://github.com/twilio/twilio-cli-core/commit/e66838c5d256267f9508c76054eac0df75540690))

## [6.8.0](https://github.com/twilio/twilio-cli-core/compare/6.7.0...6.8.0) (2022-08-10)


### Library - Fixes

* cleanup keytar ([#209](https://github.com/twilio/twilio-cli-core/issues/209)) ([7a37f0b](https://github.com/twilio/twilio-cli-core/commit/7a37f0b859c445fbdc803267200912301493cccd))
* Fixing ocktokit api calls ([#211](https://github.com/twilio/twilio-cli-core/issues/211)) ([b025ba2](https://github.com/twilio/twilio-cli-core/commit/b025ba2eec6aba0f3bd5a59847aabcb87a9211ad))
* update description ([#207](https://github.com/twilio/twilio-cli-core/issues/207)) ([79c1cc5](https://github.com/twilio/twilio-cli-core/commit/79c1cc5f281f62f94314763f356a8ec94a0b0d3b))

---------------------------
**Library - Feature**
- [PR #72](https://github.com/twilio/twilio-oai/pull/72): Addition of spec files for preview domain. Thanks to [@AsabuHere](https://github.com/AsabuHere)!

**Routes**
- Inbound Proccessing Region API - Public GA

**Supersim**
- Allow updating `DataLimit` on a Fleet


## [6.7.0](https://github.com/twilio/twilio-cli-core/compare/6.6.0...6.7.0) (2022-07-28)


### ⚠ BREAKING CHANGES

* add node engine support from 14.x+ (#204)

### Library - Chores

* add node engine support from 14.x+ ([#204](https://github.com/twilio/twilio-cli-core/issues/204)) ([7b81cb2](https://github.com/twilio/twilio-cli-core/commit/7b81cb2199e255197c144c43d4cd2ca952b5e06d))
* update vulnerabilities dependencies ([#205](https://github.com/twilio/twilio-cli-core/issues/205)) ([105be81](https://github.com/twilio/twilio-cli-core/commit/105be81767ebbc13fc35db7cf076729cd9dee935))

---------------------------
**Flex**
- Add `status`, `error_code`, and `error_message` fields to Interaction `Channel`
- Adding `messenger` and `gbm` as supported channels for Interactions API

**Messaging**
- Update alpha_sender docs with new valid characters

**Verify**
- Reorder Verification Check parameters so `code` stays as the first parameter **(breaking change)**
- Rollback List Attempts API V2 back to pilot stage.


## [6.6.0](https://github.com/twilio/twilio-cli-core/compare/6.5.0...6.6.0) (2022-07-14)

---------------------------
**Library - Test**
- [PR #67](https://github.com/twilio/twilio-oai/pull/67): Adding misc as PR type. Thanks to [@rakatyal](https://github.com/rakatyal)!

**Library - Fix**
- [PR #63](https://github.com/twilio/twilio-oai/pull/63): move the className extension to the operation when necessary. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Conversations**
- Allowed to use `identity` as part of Participant's resource **(breaking change)**

**Lookups**
- Remove `enhanced_line_type` from the lookup response **(breaking change)**

**Supersim**
- Add support for `sim_ip_addresses` resource to helper libraries

**Verify**
- Changed summary param `service_sid` to `verify_service_sid` to be consistent with list attempts API **(breaking change)**
- Make `code` optional on Verification check to support `sna` attempts.


## [6.5.0](https://github.com/twilio/twilio-cli-core/compare/6.4.2...6.5.0) (2022-06-30)

---------------------------
**Library - Chore**
- [PR #64](https://github.com/twilio/twilio-oai/pull/64): adding the preview spec back. Thanks to [@shrutiburman](https://github.com/shrutiburman)!
- [PR #61](https://github.com/twilio/twilio-oai/pull/61): drop unneeded class names. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added `amazon-polly` to `usage_record` API.

**Insights**
- Added `annotation` field in call summary
- Added new endpoint to fetch/create/update Call Annotations

**Verify**
- Remove `api.verify.totp` beta flag and set maturity to `beta` for Verify TOTP properties and parameters. **(breaking change)**
- Changed summary param `verify_service_sid` to `service_sid` to be consistent with list attempts API **(breaking change)**

**Twiml**
- Add `maxQueueSize` to `Enqueue`


### [6.4.2](https://github.com/twilio/twilio-cli-core/compare/6.4.1...6.4.2) (2022-06-16)

---------------------------
**Lookups**
- Adding support for Lookup V2 API

**Studio**
- Corrected PII labels to be 30 days and added context to be PII

**Twiml**
- Add `statusCallbackMethod` attribute, nested `<Config` and `<Parameter>` elements to `<VirtualAgent>` noun.
- Add support for new Amazon Polly voices (Q2 2022) for `Say` verb
- Add support for `<Conversation>` noun


### [6.4.1](https://github.com/twilio/twilio-cli-core/compare/6.4.0...6.4.1) (2022-05-19)

---------------------------
**Library - Fix**
- [PR #57](https://github.com/twilio/twilio-oai/pull/57): add parent field to twilio vendor extensions. Thanks to [@charan678](https://github.com/charan678)!

**Api**
- Add property `media_url` to the recording resources

**Verify**
- Include `silent` as a channel type in the verifications API.


## [6.4.0](https://github.com/twilio/twilio-cli-core/compare/6.3.2...6.4.0) (2022-05-05)

---------------------------
**Library - Fix**
- [PR #56](https://github.com/twilio/twilio-oai/pull/56): add class_name property to twilio vendor extension. Thanks to [@charan678](https://github.com/charan678)!

**Conversations**
- Expose query parameter `type` in list operation on Address Configurations resource

**Supersim**
- Add `data_total_billed` and `billed_units` fields to Super SIM UsageRecords API response.
- Change ESimProfiles `Eid` parameter to optional to enable Activation Code download method support **(breaking change)**

**Verify**
- Deprecate `push.include_date` parameter in create and update service.


### [6.3.2](https://github.com/twilio/twilio-cli-core/compare/6.3.1...6.3.2) (2022-04-21)

---------------------------
**Library - Fix**
- [PR #54](https://github.com/twilio/twilio-oai/pull/54): switch api-def object types to open-api any types. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


### [6.3.1](https://github.com/twilio/twilio-cli-core/compare/6.3.0...6.3.1) (2022-04-07)


### Library - Chores

* remove outdated announcements ([960a478](https://github.com/twilio/twilio-cli-core/commit/960a478c9155e0f61b1e575f4aa0791162456800))

---------------------------
**Api**
- Updated `provider_sid` visibility to private

**Verify**
- Verify List Attempts API summary endpoint added.
- Update PII documentation for `AccessTokens` `factor_friendly_name` property.

**Voice**
- make annotation parameter from /Calls API private


## [6.3.0](https://github.com/twilio/twilio-cli-core/compare/6.2.1...6.3.0) (2022-03-24)

---------------------------
**Api**
- Change `stream` url parameter to non optional
- Add `verify-totp` and `verify-whatsapp-conversations-business-initiated` categories to `usage_record` API

**Chat**
- Added v3 Channel update endpoint to support Public to Private channel migration

**Flex**
- Private Beta release of the Interactions API to support the upcoming release of Flex Conversations at the end of Q1 2022.
- Adding `channel_configs` object to Flex Configuration

**Media**
- Add max_duration param to PlayerStreamer

**Supersim**
- Remove Commands resource, use SmsCommands resource instead **(breaking change)**

**Taskrouter**
- Add limits to `split_by_wait_time` for Cumulative Statistics Endpoint

**Video**
- Change recording `status_callback_method` type from `enum` to `http_method` **(breaking change)**
- Add `status_callback` and `status_callback_method` to composition
- Add `status_callback` and `status_callback_method` to recording


### [6.2.1](https://github.com/twilio/twilio-cli-core/compare/6.2.0...6.2.1) (2022-03-10)


### Library - Chores

* Add node v12 support ([#200](https://github.com/twilio/twilio-cli-core/issues/200)) ([ef09c7c](https://github.com/twilio/twilio-cli-core/commit/ef09c7c866f5f399a3343df3cd0a3ec0cbcc28d2))

---------------------------
**Library - Chore**
- [PR #52](https://github.com/twilio/twilio-oai/pull/52): push Datadog Release Metric upon deploy success. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Api**
- Add optional boolean include_soft_deleted parameter to retrieve soft deleted recordings

**Chat**
- Add `X-Twilio-Wehook-Enabled` header to `delete` method in UserChannel resource

**Numbers**
- Expose `failure_reason` in the Supporting Documents resources

**Verify**
- Add optional `metadata` parameter to "verify challenge" endpoint, so the SDK/App can attach relevant information from the device when responding to challenges.
- remove beta feature flag to list atempt api operations.
- Add `ttl` and `date_created` properties to `AccessTokens`.


## [6.2.0](https://github.com/twilio/twilio-cli-core/compare/6.1.0...6.2.0) (2022-02-24)

---------------------------
**Api**
- Add `uri` to `stream` resource
- Add A2P Registration Fee category (`a2p-registration-fee`) to usage records

**Verify**
- Remove outdated documentation commentary to contact sales. Product is already in public beta.


---------------------------
**Api**
- Detected a bug and removed optional boolean include_soft_deleted parameter to retrieve soft deleted recordings. **(breaking change)**
- Add optional boolean include_soft_deleted parameter to retrieve soft deleted recordings.

**Numbers**
- Unrevert valid_until and sort filter params added to List Bundles resource
- Revert valid_until and sort filter params added to List Bundles resource
- Update sorting params added to List Bundles resource in the previous release

**Preview**
- Moved `web_channels` from preview to beta under `flex-api` **(breaking change)**

**Taskrouter**
- Add `ETag` as Response Header to List of Task, Reservation & Worker

**Verify**
- Add optional `metadata` to factors.

**Twiml**
- Add new Polly Neural voices


## [6.1.0](https://github.com/twilio/twilio-cli-core/compare/6.0.1...6.1.0) (2022-02-10)


### Library - Fixes

* added support for default output prop in operation ([#192](https://github.com/twilio/twilio-cli-core/issues/192)) ([8ae4ba5](https://github.com/twilio/twilio-cli-core/commit/8ae4ba5a418521d5877c7fc753ed08cee2a43f22))
* Cleaning travis code ([#193](https://github.com/twilio/twilio-cli-core/issues/193)) ([ecb2ae5](https://github.com/twilio/twilio-cli-core/commit/ecb2ae5e61774c4aca577517f5acf1932f192be8))


### Library - Chores

* Add Npm Audit workflow ([#196](https://github.com/twilio/twilio-cli-core/issues/196)) ([5dd1887](https://github.com/twilio/twilio-cli-core/commit/5dd1887f03468c902691eac17546a02c59fefbcb))

---------------------------
**Api**
- Add `stream` resource

**Conversations**
- Fixed DELETE request to accept "sid_like" params in Address Configuration resources **(breaking change)**
- Expose Address Configuration resource for `sms` and `whatsapp`

**Fax**
- Removed deprecated Programmable Fax Create and Update methods **(breaking change)**

**Insights**
- Rename `call_state` to `call_status` and remove `whisper` in conference participant summary **(breaking change)**

**Numbers**
- Expose valid_until filters as part of provisionally-approved compliance feature on the List Bundles resource

**Supersim**
- Fix typo in Fleet resource docs
- Updated documentation for the Fleet resource indicating that fields related to commands have been deprecated and to use sms_command fields instead.
- Add support for setting and reading `ip_commands_url` and `ip_commands_method` on Fleets resource for helper libraries
- Changed `sim` property in requests to create an SMS Command made to the /SmsCommands to accept SIM UniqueNames in addition to SIDs

**Verify**
- Update list attempts API to include new filters and response fields.


### [6.0.1](https://github.com/twilio/twilio-cli-core/compare/6.0.0...6.0.1) (2022-01-27)


### Library - Chores

* bump dependency axios ([#190](https://github.com/twilio/twilio-cli-core/issues/190)) ([3836cbf](https://github.com/twilio/twilio-cli-core/commit/3836cbf5e14d12b134dceb6772b00c6db1a6109d))

---------------------------
**Insights**
- Added new endpoint to fetch Conference Participant Summary
- Added new endpoint to fetch Conference Summary

**Messaging**
- Add government_entity parameter to brand apis

**Verify**
- Add Access Token fetch endpoint to retrieve a previously created token.
- Add Access Token payload to the Access Token creation endpoint, including a unique Sid, so it's addressable while it's TTL is valid.


## [6.0.0](https://github.com/twilio/twilio-cli-core/compare/5.33.0...6.0.0) (2022-01-18)


### ⚠ BREAKING CHANGES

* Storing profiles in config file instead of keytar.

### Library - Chores

* Update LICENSE ([#189](https://github.com/twilio/twilio-cli-core/issues/189)) ([5b6a3a5](https://github.com/twilio/twilio-cli-core/commit/5b6a3a527251ef595cda317bae12b6de79bcc500))


### Library - Features

* Release feature branch ([#188](https://github.com/twilio/twilio-cli-core/issues/188)) ([4380dac](https://github.com/twilio/twilio-cli-core/commit/4380dac7725511f10d0bc8b5d9925bafafc69253))

---------------------------
**Library - Feature**
- [PR #51](https://github.com/twilio/twilio-oai/pull/51): add GitHub release step during deploy. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Make fixed time scheduling parameters public **(breaking change)**

**Messaging**
- Add update brand registration API

**Numbers**
- Add API endpoint for List Bundle Copies resource

**Video**
- Enable external storage for all customers


## [5.33.0](https://github.com/twilio/twilio-cli-core/compare/5.32.2...5.33.0) (2021-12-16)


### Library - Features

* Add flag no header for list and fetch commands ([#182](https://github.com/twilio/twilio-cli-core/issues/182)) ([22f6ea9](https://github.com/twilio/twilio-cli-core/commit/22f6ea9262e3874a2b9d46cb97e4df14648c0f78))


### Library - Chores

* github workflow update ([#183](https://github.com/twilio/twilio-cli-core/issues/183)) ([a96ebc3](https://github.com/twilio/twilio-cli-core/commit/a96ebc35249ce6dc8de424a5d98667a347a450f4))
* Remove audit run with posttest script ([#186](https://github.com/twilio/twilio-cli-core/issues/186)) ([ea5c744](https://github.com/twilio/twilio-cli-core/commit/ea5c744b6dc00b9aeceb85b45ddee7856bd057fd))
* revert updated oclif major dependencies ([#185](https://github.com/twilio/twilio-cli-core/issues/185)) ([aa74e0e](https://github.com/twilio/twilio-cli-core/commit/aa74e0e8899fd244995ede6624baf65ccd973ebd))
* update version of vulnerable dependencies ([#184](https://github.com/twilio/twilio-cli-core/issues/184)) ([b8de6f6](https://github.com/twilio/twilio-cli-core/commit/b8de6f611e53b232edbad1865e26e726f442478d))


### Library - Fixes

* Update semantic-release via npm bin ([#187](https://github.com/twilio/twilio-cli-core/issues/187)) ([b35a2ac](https://github.com/twilio/twilio-cli-core/commit/b35a2acbd6032f7cd71ecf01d7f18da190138d97))

---------------------------
**Api**
- Add optional boolean send_as_mms parameter to the create action of Message resource **(breaking change)**
- Change team ownership for `call` delete

**Conversations**
- Change wording for `Service Webhook Configuration` resource fields

**Insights**
- Added new APIs for updating and getting voice insights flags by accountSid.

**Media**
- Add max_duration param to MediaProcessor

**Video**
- Add `EmptyRoomTimeout` and `UnusedRoomTimeout` properties to a room; add corresponding parameters to room creation

**Voice**
- Add endpoint to delete archived Calls


### [5.32.2](https://github.com/twilio/twilio-cli-core/compare/5.32.1...5.32.2) (2021-12-02)


### Library - Fixes

* update vulnerable dependencies packages ([#180](https://github.com/twilio/twilio-cli-core/issues/180)) ([0e5c492](https://github.com/twilio/twilio-cli-core/commit/0e5c492961991be0eb7d8f1a9113a3afacc7f316))

---------------------------
**Conversations**
- Add `Service Webhook Configuration` resource

**Flex**
- Adding `flex_insights_drilldown` and `flex_url` objects to Flex Configuration

**Messaging**
- Update us_app_to_person endpoints to remove beta feature flag based access

**Supersim**
- Add IP Commands resource

**Verify**
- Add optional `factor_friendly_name` parameter to the create access token endpoint.

**Video**
- Add maxParticipantDuration param to Rooms

**Twiml**
- Unrevert Add supported SSML children to `<emphasis>`, `<lang>`, `<p>`, `<prosody>`, `<s>`, and `<w>`.
- Revert Add supported SSML children to `<emphasis>`, `<lang>`, `<p>`, `<prosody>`, `<s>`, and `<w>`.


### [5.32.1](https://github.com/twilio/twilio-cli-core/compare/5.32.0...5.32.1) (2021-11-18)


### Library - Fixes

* Added changes to fix the lcov issue ([#170](https://github.com/twilio/twilio-cli-core/issues/170)) ([a3aaa7b](https://github.com/twilio/twilio-cli-core/commit/a3aaa7b1b02b18c586fe35a15a6fbafa3c92e4eb))
* Modified flag description to eliminate new line indentation issue ([#174](https://github.com/twilio/twilio-cli-core/issues/174)) ([d8dd071](https://github.com/twilio/twilio-cli-core/commit/d8dd071345e0c5287504caddf807d449481c0baa))


### Library - Chores

* update slack alerts color ([#179](https://github.com/twilio/twilio-cli-core/issues/179)) ([c96bbfb](https://github.com/twilio/twilio-cli-core/commit/c96bbfb2ddfc3ec636c92a69b1fedaf2f735fc4a))

---------------------------
**Frontline**
- Added `is_available` to User's resource

**Messaging**
- Added GET vetting API

**Verify**
- Add `WHATSAPP` to the attempts API.
- Allow to update `config.notification_platform` from `none` to `apn` or `fcm` and viceversa for Verify Push
- Add `none` as a valid `config.notification_platform` value for Verify Push

**Twiml**
- Add supported SSML children to `<emphasis>`, `<lang>`, `<p>`, `<prosody>`, `<s>`, and `<w>`.


## [5.32.0](https://github.com/twilio/twilio-cli-core/compare/5.31.1...5.32.0) (2021-11-04)


### Library - Chores

* Added tests and sonarcloud scan while adding the PR's ([#169](https://github.com/twilio/twilio-cli-core/issues/169)) ([a26d6ee](https://github.com/twilio/twilio-cli-core/commit/a26d6ee81e2a49057581ce0d76b9636295d42f1e))

---------------------------
**Library - Chore**
- [PR #46](https://github.com/twilio/twilio-oai/pull/46): migrate from travis over to gh actions. Thanks to [@shwetha-manvinkurke](https://github.com/shwetha-manvinkurke)!

**Api**
- Updated `media_url` property to be treated as PII

**Messaging**
- Added a new enum for brand registration status named DELETED **(breaking change)**
- Add a new K12_EDUCATION use case in us_app_to_person_usecase api transaction
- Added a new enum for brand registration status named IN_REVIEW

**Serverless**
- Add node14 as a valid Build runtime

**Verify**
- Fix typos in Verify Push Factor documentation for the `config.notification_token` parameter.
- Added `TemplateCustomSubstitutions` on verification creation
- Make `TemplateSid` parameter public for Verification resource and `DefaultTemplateSid` parameter public for Service resource. **(breaking change)**


### [5.31.1](https://github.com/twilio/twilio-cli-core/compare/5.31.0...5.31.1) (2021-10-19)


### Library - Fixes

* Revert "Resolve sec vulnerability ([#166](https://github.com/twilio/twilio-cli-core/issues/166))" ([#168](https://github.com/twilio/twilio-cli-core/issues/168)) ([7d2a374](https://github.com/twilio/twilio-cli-core/commit/7d2a374b4f5f42106c976616a88d029b2f3bea0a))

## [5.31.0](https://github.com/twilio/twilio-cli-core/compare/5.30.0...5.31.0) (2021-10-19)


### Library - Chores

* [Snyk] Security upgrade @oclif/plugin-help from 2.2.3 to 3.2.0 ([#165](https://github.com/twilio/twilio-cli-core/issues/165)) ([188120a](https://github.com/twilio/twilio-cli-core/commit/188120a3e323ea07f2e7f26909ec83ac5a03461d))


### Library - Features

* Added the github actions to send the slack notifications ([#164](https://github.com/twilio/twilio-cli-core/issues/164)) ([06e2cb1](https://github.com/twilio/twilio-cli-core/commit/06e2cb1e3a8a6eb2486d8575a5da6c5dcbe3708e))

---------------------------
**Api**
- Corrected enum values for `emergency_address_status` values in `/IncomingPhoneNumbers` response. **(breaking change)**
- Clarify `emergency_address_status` values in `/IncomingPhoneNumbers` response.

**Messaging**
- Add PUT and List brand vettings api
- Removes beta feature flag based visibility for us_app_to_person_registered and usecase field.Updates test cases to add POLITICAL usecase. **(breaking change)**
- Add brand_feedback as optional field to BrandRegistrations

**Video**
- Add `AudioOnly` to create room


### [5.27.1-rc.1](https://github.com/twilio/twilio-cli-core/compare/5.25.0-rc.1...5.27.1-rc.1) (2021-11-12)


### Library - Fixes

* Removed change to stop publish from npm. ([#175](https://github.com/twilio/twilio-cli-core/issues/175)) ([a819b6c](https://github.com/twilio/twilio-cli-core/commit/a819b6c98cbfe99e77664a2efdac28c63e9218cc))

## [5.25.0-rc.1](https://github.com/twilio/twilio-cli-core/compare/5.24.0...5.25.0-rc.1) (2021-11-03)


### Library - Chores

* CLI Profile Remove - Check and Use config file before checking system keychain. ([#126](https://github.com/twilio/twilio-cli-core/issues/126)) ([e326a31](https://github.com/twilio/twilio-cli-core/commit/e326a3195ff9bab2437671f61a4dcdfba15c6100))
* Refactor profiles usage to projects ([#122](https://github.com/twilio/twilio-cli-core/issues/122)) ([782f6c5](https://github.com/twilio/twilio-cli-core/commit/782f6c50dfb7d2e00df52ef75dfd3e94bc45581c))
* refactor the Twilio vendor extensions into single object ([#125](https://github.com/twilio/twilio-cli-core/issues/125)) ([a2e0fca](https://github.com/twilio/twilio-cli-core/commit/a2e0fca112eccf954d86095af4809445042d1bb6))
* Store API Keys in Config File ([#124](https://github.com/twilio/twilio-cli-core/issues/124)) ([9fb9dd3](https://github.com/twilio/twilio-cli-core/commit/9fb9dd394b85dba6185b4a2033bf822c72d5c94a))


### Library - Fixes

* Removed the comment. ([95d4fa4](https://github.com/twilio/twilio-cli-core/commit/95d4fa487886cc05efa75effc38e315d0393ef7c))
* Update release-feature-branch with main ([#137](https://github.com/twilio/twilio-cli-core/issues/137)) ([46c4156](https://github.com/twilio/twilio-cli-core/commit/46c415631e74ab1bcac460299a65532211cb2347)), closes [#130](https://github.com/twilio/twilio-cli-core/issues/130)


### Library - Features

*  Added support to make profile input mandatory based on config property ([#135](https://github.com/twilio/twilio-cli-core/issues/135)) ([fbdc36b](https://github.com/twilio/twilio-cli-core/commit/fbdc36ba99be611dcaf5d08e8697a42e2256b59e))
* Merging master into release-feature-branch ([#172](https://github.com/twilio/twilio-cli-core/issues/172)) ([48313d2](https://github.com/twilio/twilio-cli-core/commit/48313d27844d1cf6f5435150deb1e777314cba04)), closes [#130](https://github.com/twilio/twilio-cli-core/issues/130) [#136](https://github.com/twilio/twilio-cli-core/issues/136) [#139](https://github.com/twilio/twilio-cli-core/issues/139) [#138](https://github.com/twilio/twilio-cli-core/issues/138) [#140](https://github.com/twilio/twilio-cli-core/issues/140) [#142](https://github.com/twilio/twilio-cli-core/issues/142) [#145](https://github.com/twilio/twilio-cli-core/issues/145) [#150](https://github.com/twilio/twilio-cli-core/issues/150) [#154](https://github.com/twilio/twilio-cli-core/issues/154) [#156](https://github.com/twilio/twilio-cli-core/issues/156) [#150](https://github.com/twilio/twilio-cli-core/issues/150) [#157](https://github.com/twilio/twilio-cli-core/issues/157) [#158](https://github.com/twilio/twilio-cli-core/issues/158) [#155](https://github.com/twilio/twilio-cli-core/issues/155) [#161](https://github.com/twilio/twilio-cli-core/issues/161) [#157](https://github.com/twilio/twilio-cli-core/issues/157) [#155](https://github.com/twilio/twilio-cli-core/issues/155) [#165](https://github.com/twilio/twilio-cli-core/issues/165) [#166](https://github.com/twilio/twilio-cli-core/issues/166) [#164](https://github.com/twilio/twilio-cli-core/issues/164) [#165](https://github.com/twilio/twilio-cli-core/issues/165) [#164](https://github.com/twilio/twilio-cli-core/issues/164) [#166](https://github.com/twilio/twilio-cli-core/issues/166) [#168](https://github.com/twilio/twilio-cli-core/issues/168) [#166](https://github.com/twilio/twilio-cli-core/issues/166) [#166](https://github.com/twilio/twilio-cli-core/issues/166) [#168](https://github.com/twilio/twilio-cli-core/issues/168) [#169](https://github.com/twilio/twilio-cli-core/issues/169) [#135](https://github.com/twilio/twilio-cli-core/issues/135) [#164](https://github.com/twilio/twilio-cli-core/issues/164) [#150](https://github.com/twilio/twilio-cli-core/issues/150) [#165](https://github.com/twilio/twilio-cli-core/issues/165) [#155](https://github.com/twilio/twilio-cli-core/issues/155) [#169](https://github.com/twilio/twilio-cli-core/issues/169) [#145](https://github.com/twilio/twilio-cli-core/issues/145) [#126](https://github.com/twilio/twilio-cli-core/issues/126) [#122](https://github.com/twilio/twilio-cli-core/issues/122) [#150](https://github.com/twilio/twilio-cli-core/issues/150) [#157](https://github.com/twilio/twilio-cli-core/issues/157) [#155](https://github.com/twilio/twilio-cli-core/issues/155) [#165](https://github.com/twilio/twilio-cli-core/issues/165) [#164](https://github.com/twilio/twilio-cli-core/issues/164) [#166](https://github.com/twilio/twilio-cli-core/issues/166) [#168](https://github.com/twilio/twilio-cli-core/issues/168) [#124](https://github.com/twilio/twilio-cli-core/issues/124) [#157](https://github.com/twilio/twilio-cli-core/issues/157) [#166](https://github.com/twilio/twilio-cli-core/issues/166) [#168](https://github.com/twilio/twilio-cli-core/issues/168) [#130](https://github.com/twilio/twilio-cli-core/issues/130)

## [5.29.0-rc.1](https://github.com/shamantraghav/twilio-cli-core/compare/5.28.0...5.29.0-rc.1) (2021-10-27)


### Library - Features

*  Added support to make profile input mandatory based on config property ([#135](https://github.com/shamantraghav/twilio-cli-core/issues/135)) ([fbdc36b](https://github.com/shamantraghav/twilio-cli-core/commit/fbdc36ba99be611dcaf5d08e8697a42e2256b59e))
* Added the github actions to send the slack notifications ([#164](https://github.com/shamantraghav/twilio-cli-core/issues/164)) ([06e2cb1](https://github.com/shamantraghav/twilio-cli-core/commit/06e2cb1e3a8a6eb2486d8575a5da6c5dcbe3708e))
* Enable GitHub actions. ([#150](https://github.com/shamantraghav/twilio-cli-core/issues/150)) ([002dd1f](https://github.com/shamantraghav/twilio-cli-core/commit/002dd1f9593187cd580d7c139609420e5a33317f))


### Library - Chores

* [Snyk] Security upgrade @oclif/plugin-help from 2.2.3 to 3.2.0 ([#165](https://github.com/shamantraghav/twilio-cli-core/issues/165)) ([188120a](https://github.com/shamantraghav/twilio-cli-core/commit/188120a3e323ea07f2e7f26909ec83ac5a03461d))
* Added changes to use scripts instead of community Github actions ([#155](https://github.com/shamantraghav/twilio-cli-core/issues/155)) ([27bd508](https://github.com/shamantraghav/twilio-cli-core/commit/27bd508171b16eaf0036bdff7e0d21117570bf5f))
* Added tests and sonarcloud scan while adding the PR's ([#169](https://github.com/shamantraghav/twilio-cli-core/issues/169)) ([a26d6ee](https://github.com/shamantraghav/twilio-cli-core/commit/a26d6ee81e2a49057581ce0d76b9636295d42f1e))
* Cache processing step for Travis builds ([#145](https://github.com/shamantraghav/twilio-cli-core/issues/145)) ([33cc65d](https://github.com/shamantraghav/twilio-cli-core/commit/33cc65d82412c30f6c9aec40b2c79e43a80d459b))
* CLI Profile Remove - Check and Use config file before checking system keychain. ([#126](https://github.com/shamantraghav/twilio-cli-core/issues/126)) ([e326a31](https://github.com/shamantraghav/twilio-cli-core/commit/e326a3195ff9bab2437671f61a4dcdfba15c6100))
* Refactor profiles usage to projects ([#122](https://github.com/shamantraghav/twilio-cli-core/issues/122)) ([782f6c5](https://github.com/shamantraghav/twilio-cli-core/commit/782f6c50dfb7d2e00df52ef75dfd3e94bc45581c))
* **release:** set `package.json` to 5.29.0 [skip ci] ([8e5a785](https://github.com/shamantraghav/twilio-cli-core/commit/8e5a7851fc12a9ef06683ef9d82284485166b333)), closes [#150](https://github.com/shamantraghav/twilio-cli-core/issues/150)
* **release:** set `package.json` to 5.30.0 [skip ci] ([26e4594](https://github.com/shamantraghav/twilio-cli-core/commit/26e459440a4668903d9593538e637f8726c10525)), closes [#157](https://github.com/shamantraghav/twilio-cli-core/issues/157) [#155](https://github.com/shamantraghav/twilio-cli-core/issues/155)
* **release:** set `package.json` to 5.31.0 [skip ci] ([ad437be](https://github.com/shamantraghav/twilio-cli-core/commit/ad437be6870126db141ddefee9f10a4cb7528728)), closes [#165](https://github.com/shamantraghav/twilio-cli-core/issues/165) [#164](https://github.com/shamantraghav/twilio-cli-core/issues/164)
* **release:** set `package.json` to 5.31.1 [skip ci] ([dc18140](https://github.com/shamantraghav/twilio-cli-core/commit/dc181406a2583d543c719379cc68dafd818efd07)), closes [#166](https://github.com/shamantraghav/twilio-cli-core/issues/166) [#168](https://github.com/shamantraghav/twilio-cli-core/issues/168)
* Store API Keys in Config File ([#124](https://github.com/shamantraghav/twilio-cli-core/issues/124)) ([9fb9dd3](https://github.com/shamantraghav/twilio-cli-core/commit/9fb9dd394b85dba6185b4a2033bf822c72d5c94a))


### Library - Fixes

* fix naming ([#157](https://github.com/shamantraghav/twilio-cli-core/issues/157)) ([d454b81](https://github.com/shamantraghav/twilio-cli-core/commit/d454b811344ae11283e32c13f14e01d9946bfabf))
* Merger main into release feature branch ([fbcd3e8](https://github.com/shamantraghav/twilio-cli-core/commit/fbcd3e82c4a480578a6d2b8561cd0f280ad5cb0d))
* Removed the comment. ([95d4fa4](https://github.com/shamantraghav/twilio-cli-core/commit/95d4fa487886cc05efa75effc38e315d0393ef7c))
* Revert "Resolve sec vulnerability ([#166](https://github.com/shamantraghav/twilio-cli-core/issues/166))" ([#168](https://github.com/shamantraghav/twilio-cli-core/issues/168)) ([7d2a374](https://github.com/shamantraghav/twilio-cli-core/commit/7d2a374b4f5f42106c976616a88d029b2f3bea0a))
* Update release-feature-branch with main ([#137](https://github.com/shamantraghav/twilio-cli-core/issues/137)) ([46c4156](https://github.com/shamantraghav/twilio-cli-core/commit/46c415631e74ab1bcac460299a65532211cb2347)), closes [#130](https://github.com/shamantraghav/twilio-cli-core/issues/130)
* Updated api definitions ([906518f](https://github.com/shamantraghav/twilio-cli-core/commit/906518f5fbdfa154604c5288f4ebd9eaf46a48b3))

---------------------------
**Api**
- Corrected enum values for `emergency_address_status` values in `/IncomingPhoneNumbers` response. **(breaking change)**
- Clarify `emergency_address_status` values in `/IncomingPhoneNumbers` response.

**Messaging**
- Add PUT and List brand vettings api
- Removes beta feature flag based visibility for us_app_to_person_registered and usecase field.Updates test cases to add POLITICAL usecase. **(breaking change)**
- Add brand_feedback as optional field to BrandRegistrations

**Video**
- Add `AudioOnly` to create room


## [5.30.0](https://github.com/twilio/twilio-cli-core/compare/5.29.0...5.30.0) (2021-10-07)


### Library - Fixes

* fix naming ([#157](https://github.com/twilio/twilio-cli-core/issues/157)) ([d454b81](https://github.com/twilio/twilio-cli-core/commit/d454b811344ae11283e32c13f14e01d9946bfabf))


### Library - Chores

* Added changes to use scripts instead of community Github actions ([#155](https://github.com/twilio/twilio-cli-core/issues/155)) ([27bd508](https://github.com/twilio/twilio-cli-core/commit/27bd508171b16eaf0036bdff7e0d21117570bf5f))

---------------------------
**Library - Fix**
- [PR #44](https://github.com/twilio/twilio-oai/pull/44): fix naming of params. Thanks to [@shwetha-manvinkurke](https://github.com/shwetha-manvinkurke)!

**Api**
- Add `emergency_address_status` attribute to `/IncomingPhoneNumbers` response.
- Add `siprec` resource

**Conversations**
- Added attachment parameters in configuration for `NewMessage` type of push notifications

**Flex**
- Adding `flex_insights_hr` object to Flex Configuration

**Numbers**
- Add API endpoint for Bundle ReplaceItems resource
- Add API endpoint for Bundle Copies resource

**Serverless**
- Add domain_base field to Service response

**Taskrouter**
- Add `If-Match` Header based on ETag for Worker Delete **(breaking change)**
- Add `If-Match` Header based on Etag for Reservation Update
- Add `If-Match` Header based on ETag for Worker Update
- Add `If-Match` Header based on ETag for Worker Delete
- Add `ETag` as Response Header to Worker

**Trunking**
- Added `transfer_caller_id` property on Trunks.

**Verify**
- Document new pilot `whatsapp` channel.


## [5.29.0](https://github.com/twilio/twilio-cli-core/compare/5.28.3...5.29.0) (2021-09-23)


### Library - Features

* Enable GitHub actions. ([#150](https://github.com/twilio/twilio-cli-core/issues/150)) ([002dd1f](https://github.com/twilio/twilio-cli-core/commit/002dd1f9593187cd580d7c139609420e5a33317f))


### Library - Fixes

* Updated api definitions ([906518f](https://github.com/twilio/twilio-cli-core/commit/906518f5fbdfa154604c5288f4ebd9eaf46a48b3))

---------------------------
**Events**
- Add segment sink

**Messaging**
- Add post_approval_required attribute in GET us_app_to_person_usecase api response
- Add Identity Status, Russell 3000, Tax Exempt Status and Should Skip SecVet fields for Brand Registrations
- Add Should Skip Secondary Vetting optional flag parameter to create Brand API


twilio-cli-core changelog
=====================

[2021-09-09] Version 5.28.3
---------------------------
**Messaging**
- Add Identity Status, Russell 3000, Tax Exempt Status and Should Skip SecVet fields for Brand Registrations
- Add Should Skip Secondary Vetting optional flag parameter to create Brand API


[2021-09-09] Version 5.28.2
---------------------------
**Api**
- Revert adding `siprec` resource
- Add `siprec` resource

**Messaging**
- Add 'mock' as an optional field to brand_registration api
- Add 'mock' as an optional field to us_app_to_person api
- Adds more Use Cases in us_app_to_person_usecase api transaction and updates us_app_to_person_usecase docs

**Verify**
- Verify List Templates API endpoint added.


[2021-08-26] Version 5.28.1
---------------------------
**Library - Fix**
- [PR #145](https://github.com/twilio/twilio-cli-core/pull/145): Cache processing step for Travis builds. Thanks to [@shrutiburman](https://github.com/shrutiburman)!

**Library - Chore**
- [PR #142](https://github.com/twilio/twilio-cli-core/pull/142): Fixes exit codes. Thanks to [@shamantraghav](https://github.com/shamantraghav)!

**Api**
- Add Programmabled Voice SIP Refer call transfers (`calls-transfers`) to usage records
- Add Flex Voice Usage category (`flex-usage`) to usage records

**Conversations**
- Add `Order` query parameter to Message resource read operation

**Insights**
- Added `partial` to enum processing_state_request
- Added abnormal session filter in Call Summaries

**Messaging**
- Add brand_registration_sid as an optional query param for us_app_to_person_usecase api

**Pricing**
- add trunking_numbers resource (v2)
- add trunking_country resource (v2)

**Verify**
- Changed to private beta the `TemplateSid` optional parameter on Verification creation.
- Added the optional parameter `Order` to the list Challenges endpoint to define the list order.


[2021-08-12] Version 5.28.0
---------------------------
**Library - Chore**
- [PR #140](https://github.com/twilio/twilio-cli-core/pull/140): standardize User-Agent string: format and include more details. Thanks to [@shrutiburman](https://github.com/shrutiburman)!
- [PR #139](https://github.com/twilio/twilio-cli-core/pull/139): Add none output and silent flag. Thanks to [@onuzbee](https://github.com/onuzbee)!
- [PR #136](https://github.com/twilio/twilio-cli-core/pull/136): Integrate with Sonarcloud. Thanks to [@onuzbee](https://github.com/onuzbee)!

**Library - Fix**
- [PR #138](https://github.com/twilio/twilio-cli-core/pull/138): Added condition to deploy specific regex match tags. Thanks to [@ravali-rimmalapudi](https://github.com/ravali-rimmalapudi)!

**Api**
- Corrected the `price`, `call_sid_to_coach`, and `uri` data types for Conference, Participant, and Recording **(breaking change)**
- Made documentation for property `time_limit` in the call api public. **(breaking change)**

**Insights**
- Added new endpoint to fetch Call Summaries

**Messaging**
- Revert brand registration api update to add brand_type field
- Add brand_type field to a2p brand_registration api

**Taskrouter**
- Add `X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `X-Rate-Limit-Config` as Response Headers to all TaskRouter endpoints

**Verify**
- Add `TemplateSid` optional parameter on Verification creation.
- Include `whatsapp` as a channel type in the verifications API.


[2021-07-29] Version 5.27.1
---------------------------
**Messaging**
- Add brand_type field to a2p brand_registration api


[2021-07-29] Version 5.27.0
---------------------------
**Api**
- Added `domain_sid` in sip_credential_list_mapping and sip_ip_access_control_list_mapping APIs **(breaking change)**

**Conversations**
- Expose ParticipantConversations resource

**Taskrouter**
- Adding `links` to the activity resource

**Verify**
- Added a `Version` to Verify Factors `Webhooks` to add new fields without breaking old Webhooks.


[2021-07-15] Version 5.26.0
---------------------------
**Library - Feature**
- [PR #130](https://github.com/twilio/twilio-cli-core/pull/130): add keytar word to user agent. Thanks to [@Sindhura3](https://github.com/Sindhura3)!

**Conversations**
- Changed `last_read_message_index` and `unread_messages_count` type in User Conversation's resource **(breaking change)**
- Expose UserConversations resource

**Messaging**
- Add brand_score field to brand registration responses

**Supersim**
- Add Billing Period resource for the Super Sim Pilot
- Add List endpoint to Billing Period resource for Super Sim Pilot
- Add Fetch endpoint to Billing Period resource for Super Sim Pilot

**Taskrouter**
- Update `transcribe` & `transcription_configuration` form params in Reservation update endpoint to have private visibility **(breaking change)**


[2021-06-22] Version 5.25.0
---------------------------
**Library - Chore**
- [PR #125](https://github.com/twilio/twilio-cli-core/pull/125): refactor the Twilio vendor extensions into single object. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Update `status` enum for Messages to include 'canceled'
- Update `update_status` enum for Messages to include 'canceled'

**Conversations**
- Read-only Conversation Email Binding property `binding`

**Events**
- join Sinks and Subscriptions service

**Taskrouter**
- Add `transcribe` & `transcription_configuration` form params to Reservation update endpoint

**Trusthub**
- Corrected the sid for policy sid in customer_profile_evaluation.json and trust_product_evaluation.json **(breaking change)**

**Verify**
- Improved the documentation of `challenge` adding the maximum and minimum expected lengths of some fields.
- Improve documentation regarding `notification` by updating the documentation of the field `ttl`.


[2021-05-19] Version 5.24.0
---------------------------
**Events**
- add query param to return types filtered by Schema Id
- Add query param to return sinks filtered by status
- Add query param to return sinks used/not used by a subscription

**Messaging**
- Add fetch and delete instance endpoints to us_app_to_person api **(breaking change)**
- Remove delete list endpoint from us_app_to_person api **(breaking change)**
- Update read list endpoint to return a list of us_app_to_person compliance objects **(breaking change)**
- Add `sid` field to Preregistered US App To Person response

**Supersim**
- Mark `unique_name` in Sim, Fleet, NAP resources as not PII

**Video**
- [Composer] GA maturity level


[2021-05-05] Version 5.23.0
---------------------------
**Library - Fix**
- [PR #121](https://github.com/twilio/twilio-cli-core/pull/121): need to use the plugin name, not the plugin object. Thanks to [@philnash](https://github.com/philnash)!

**Api**
- Corrected the data types for feedback summary fields **(breaking change)**
- Update the conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address

**Bulkexports**
- promoting API maturity to GA

**Events**
- Add endpoint to update description in sink
- Remove beta-feature account flag

**Messaging**
- Update `status` field in us_app_to_person api to `campaign_status` **(breaking change)**

**Verify**
- Improve documentation regarding `push` factor and include extra information about `totp` factor.


[2021-04-21] Version 5.22.0
---------------------------
**Library - Feature**
- [PR #118](https://github.com/twilio/twilio-cli-core/pull/118): allow plugins to use the userConfig object to set arbitrary data. Thanks to [@philnash](https://github.com/philnash)!

**Api**
- Revert Update the conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address
- Update the conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address

**Bulkexports**
- moving enum to doc root for auto generating documentation
- adding status enum and default output properties

**Events**
- Change schema_versions prop and key to versions **(breaking change)**

**Messaging**
- Add `use_inbound_webhook_on_number` field in Service API for fetch, create, update, read

**Taskrouter**
- Add `If-Match` Header based on ETag for Task Delete

**Verify**
- Add `AuthPayload` parameter to support verifying a `Challenge` upon creation. This is only supported for `totp` factors.
- Add support to resend the notifications of a `Challenge`. This is only supported for `push` factors.


[2021-04-07] Version 5.21.0
---------------------------
**Library - Fix**
- [PR #120](https://github.com/twilio/twilio-cli-core/pull/120): npm audit vulnerabilities. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Api**
- Added `announcement` event to conference status callback events
- Removed optional property `time_limit` in the call create request. **(breaking change)**

**Messaging**
- Add rate_limits field to Messaging Services US App To Person API
- Add usecase field in Service API for fetch, create, update, read
- Add us app to person api and us app to person usecase api as dependents in service
- Add us_app_to_person_registered field in service api for fetch, read, create, update
- Add us app to person api
- Add us app to person usecase api
- Add A2P external campaign api
- Add Usecases API

**Supersim**
- Add Create endpoint to Sims resource

**Verify**
- The `Binding` field is now returned when creating a `Factor`. This value won't be returned for other endpoints.

**Video**
- [Rooms] max_concurrent_published_tracks has got GA maturity


[2021-03-24] Version 5.20.0
---------------------------
**Api**
- Added optional parameter `CallToken` for create calls api
- Add optional property `time_limit` in the call create request.

**Bulkexports**
- adding two new fields with job api queue_position and estimated_completion_time

**Events**
- Add new endpoints to manage subscribed_events in subscriptions

**Numbers**
- Remove feature flags for RegulatoryCompliance endpoints

**Supersim**
- Add SmsCommands resource
- Add fields `SmsCommandsUrl`, `SmsCommandsMethod` and `SmsCommandsEnabled` to a Fleet resource

**Taskrouter**
- Add `If-Match` Header based on ETag for Task Update
- Add `ETag` as Response Headers to Tasks and Reservations

**Video**
- Recording rule beta flag **(breaking change)**
- [Rooms] Add RecordingRules param to Rooms


[2021-03-15] Version 5.19.0
---------------------------
**Library - Feature**
- [PR #117](https://github.com/twilio/twilio-cli-core/pull/117): add property descriptions to OAI. Thanks to [@JenniferMah](https://github.com/JenniferMah)!

**Library - Chore**
- [PR #116](https://github.com/twilio/twilio-cli-core/pull/116): remove deprecated preview domain. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Events**
- Set maturity to beta

**Messaging**
- Adjust A2P brand registration status enum **(breaking change)**

**Studio**
- Remove internal safeguards for Studio V2 API usage now that it's GA

**Verify**
- Add support for creating and verifying totp factors. Support for totp factors is behind the `api.verify.totp` beta feature.


[2021-02-24] Version 5.18.0
---------------------------
**Library - Fix**
- [PR #115](https://github.com/twilio/twilio-cli-core/pull/115): add support for null response fields. Thanks to [@eshanholtz](https://github.com/eshanholtz)!
- [PR #114](https://github.com/twilio/twilio-cli-core/pull/114): remove duplicate enum values. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Events**
- Update description of types in the create sink resource

**Messaging**
- Add WA template header and footer
- Remove A2P campaign and use cases API **(breaking change)**
- Add number_registration_status field to read and fetch campaign responses

**Trusthub**
- Make all resources public

**Verify**
- Verify List Attempts API endpoints added.


[2021-02-10] Version 5.17.0
---------------------------
**Library - Chore**
- [PR #113](https://github.com/twilio/twilio-cli-core/pull/113): update oai specs. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Library - Fix**
- [PR #112](https://github.com/twilio/twilio-cli-core/pull/112): add titles to inline schemas. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #109](https://github.com/twilio/twilio-cli-core/pull/109): Add http agent to axios to work with proxy. Thanks to [@david-amores-anz](https://github.com/david-amores-anz)!

**Api**
- Revert change that conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address
- Update the conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address

**Events**
- Documentation should state that no fields are PII

**Flex**
- Adding `notifications` and `markdown` to Flex Configuration

**Messaging**
- Add A2P use cases API
- Add Brand Registrations API
- Add Campaigns API

**Serverless**
- Add runtime field to Build response and as an optional parameter to the Build create endpoint.
- Add @twilio/runtime-handler dependency to Build response example.

**Sync**
- Remove If-Match header for Document **(breaking change)**


[2021-01-27] Version 5.16.1
---------------------------
**Library - Fix**
- [PR #111](https://github.com/twilio/twilio-cli-core/pull/111): Outputting entire error response w/ JSON format flag enabled. Thanks to [@alecnicolas](https://github.com/alecnicolas)!

**Studio**
- Studio V2 API is now GA

**Supersim**
- Allow updating `CommandsUrl` and `CommandsMethod` on a Fleet


[2021-01-13] Version 5.16.0
---------------------------
**Library - Feature**
- [PR #108](https://github.com/twilio/twilio-cli-core/pull/108): Support detailed error objects in cli. Thanks to [@alecnicolas](https://github.com/alecnicolas)!

**Api**
- Add 'Electric Imp v1 Usage' to usage categories

**Conversations**
- Changed `last_read_message_index` type in Participant's resource **(breaking change)**

**Insights**
- Added `created_time` to call summary.

**Sync**
- Remove HideExpired query parameter for filtering Sync Documents with expired **(breaking change)**

**Video**
- [Rooms] Expose maxConcurrentPublishedTracks property in Room resource


[2021-01-06] Version 5.15.1
---------------------------
**Library - Chore**
- [PR #110](https://github.com/twilio/twilio-cli-core/pull/110): bump axios version. Thanks to [@eshanholtz](https://github.com/eshanholtz)!


[2020-12-16] Version 5.15.0
---------------------------
**Library - Feature**
- [PR #107](https://github.com/twilio/twilio-cli-core/pull/107): add operation IDs. Thanks to [@JenniferMah](https://github.com/JenniferMah)!

**Api**
- Updated `call_event` default_output_properties to request and response.

**Conversations**
- Added `last_read_message_index` and `last_read_timestamp` to Participant's resource update operation
- Added `is_notifiable` and `is_online` to User's resource
- Added `reachability_enabled` parameters to update method for Conversation Service Configuration resource

**Messaging**
- Added WA template quick reply, URL, and phone number buttons


[2020-12-08] Version 5.14.0
---------------------------
**Library - Chore**
- [PR #105](https://github.com/twilio/twilio-cli-core/pull/105): replace tags with vendor extension. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Library - Fix**
- [PR #106](https://github.com/twilio/twilio-cli-core/pull/106): fixing semantic errors in the openAPI specs. Thanks to [@shwetha-manvinkurke](https://github.com/shwetha-manvinkurke)!

**Api**
- Added optional `RecordingTrack` parameter for create calls, create participants, and create call recordings
- Removed deprecated Programmable Chat usage record categories **(breaking change)**


[2020-12-02] Version 5.13.0
---------------------------
**Library - Feature**
- [PR #104](https://github.com/twilio/twilio-cli-core/pull/104): splitting openAPI specs by version. Thanks to [@shwetha-manvinkurke](https://github.com/shwetha-manvinkurke)!

**Library - Fix**
- [PR #103](https://github.com/twilio/twilio-cli-core/pull/103): getParams when operation parameters is absent. Thanks to [@sergiofbsilva](https://github.com/sergiofbsilva)!

**Api**
- Remove `RecordingTrack` parameter for create calls, create participants, and create call recordings **(breaking change)**
- Added `RecordingTrack` parameter for create calls and create call recordings
- Add optional property `recording_track` in the participant create request

**Lookups**
- Changed `caller_name` and `carrier` properties type to object **(breaking change)**

**Trunking**
- Added dual channel recording options for Trunks.


[2020-11-18] Version 5.12.0
---------------------------
**Api**
- Add new call events resource - GET /2010-04-01/Accounts/{account_sid}/Calls/{call_sid}/Events.json

**Conversations**
- Fixed default response property issue for Service Notifications Configuration

**Insights**
- Removing call_sid from participant summary. **(breaking change)**

**Serverless**
- Allow Service unique name to be used in path (in place of SID) in Service update request

**Sync**
- Added HideExpired query parameter for filtering Sync Documents with expired

**Verify**
- Challenge `Details` and `HiddenDetails` properties are now marked as `PII`
- Challenge `expiration_date` attribute updated to set a default value of five (5) minutes and to allow max dates of one (1) hour after creation.
- Entity `identity` attribute updated to allow values between 8 and 64 characters.
- Verify Service frinedly_name attribute updated from 64 max lenght to 30 characters.


[2020-11-05] Version 5.11.0
---------------------------
**Api**
- Added `verify-push` to `usage_record` API

**Bulkexports**
- When creating a custom export the StartDay, EndDay, and FriendlyName fields were required but this was not reflected in the API documentation.  The API itself failed the request without these fields. **(breaking change)**
- Added property descriptions for Custom Export create method
- Clarified WebhookUrl and WebhookMethod must be provided together for Custom Export

**Insights**
- Added video room and participant summary apis.

**Ip_messaging**
- Create separate definition for ip-messaging
- Restore v2 endpoints for ip-messaging

**Verify**
- Verify Push madurity were updated from `preview` to `beta`
- `twilio_sandbox_mode` header was removed from Verify Push resources **(breaking change)**

**Video**
- [Rooms] Add Recording Rules API


[2020-10-14] Version 5.10.0
---------------------------
**Ai**
- Add `Annotation Project` and `Annotation Task` endpoints
- Add `Primitives` endpoints
- Add `meta.total` to the search endpoint

**Conversations**
- Mutable Conversation Unique Names

**Insights**
- Added `trust` to summary.

**Preview**
- Simplified `Channels` resource. The path is now `/BrandedChannels/branded_channel_sid/Channels` **(breaking change)**

**Verify**
- Changed parameters (`config` and `binding`) to use dot notation instead of JSON string (e.i. Before: `binding={"alg":"ES256", "public_key": "xxx..."}`, Now: `Binding.Alg="ES256"`, `Binding.PublicKey="xxx..."`). **(breaking change)**
- Changed parameters (`details` and `hidden_details`) to use dot notation instead of JSON string (e.i. Before: `details={"message":"Test message", "fields": "[{\"label\": \"Action 1\", \"value\":\"value 1\"}]"}`, Now: `details.Message="Test message"`, `Details.Fields=["{\"label\": \"Action 1\", \"value\":\"value 1\"}"]`). **(breaking change)**
- Removed `notify_service_sid` from `push` service configuration object. Add `Push.IncludeDate`, `Push.ApnCredentialSid` and `Push.FcmCredentialSid` service configuration parameters. **(breaking change)**


[2020-09-30] Version 5.9.5
--------------------------
**Library - Chore**
- updating api spec


[2020-09-28] Version 5.9.4
--------------------------
**Api**
- Add optional property `call_reason` in the participant create request
- Make sip-domain-service endpoints available in stage-au1 and prod-au1

**Messaging**
- Removed beta feature gate from WhatsApp Templates API

**Serverless**
- Add Build Status endpoint

**Video**
- [Rooms] Add new room type "go" for WebRTC Go


[2020-09-21] Version 5.9.3
--------------------------
**Accounts**
- Add Auth Token rotation API

**Conversations**
- Change resource path for Webhook Configuration

**Events**
- Schemas API get all Schemas names and versions


[2020-09-16] Version 5.9.2
--------------------------
**Conversations**
- Expose Configuration and Service Configuration resources
- Add Unique Name support for Conversations
- Add Services Push Notification resource
- Add Service scoped Conversation resources
- Support Identity in Users resource endpoint

**Messaging**
- GA Deactivation List API
- Add domain cert API's(fetch, update, create) for link tracker

**Numbers**
- Add API endpoint for Supporting Document deletion

**Proxy**
- Updated usage of FailOnParticipantConflict param to apply only to accounts with ProxyAllowParticipantConflict account flag

**Supersim**
- Add `AccountSid` parameter to Sim resource update request
- Add `ready` status as an available status for a Sim resource


[2020-09-02] Version 5.9.1
--------------------------
**Ai**
- Initial release

**Bulkexports**
- removing public beta feature flag from BulkExports Jobs API

**Messaging**
- Add Deactivation List API
- Added page token parameter for fetch in WhatsApp Templates API

**Numbers**
- Add API endpoint for End User deletion

**Routes**
- Add Resource Route Configurations API
- Add Route Configurations API
- Initial Release

**Trunking**
- Added `transfer_mode` property on Trunks.


[2020-08-19] Version 5.9.0
--------------------------
**Conversations**
- Allow Identity addition to Participants

**Events**
- Sinks API Get all Sinks

**Proxy**
- Clarified usage of FailOnParticipantConflict param as experimental
- Add FailOnParticipantConflict param to Proxy Session create and Proxy Participant create

**Supersim**
- Add fleet, network, and isoCountryCode to the UsageRecords resource
- Change sort order of UsageRecords from ascending to descending with respect to start time field, records are now returned newest to oldest

**Wireless**
- Removed `Start` and `End` parameters from the Data Sessions list endpoint. **(breaking change)**


[2020-08-05] Version 5.8.1
--------------------------
**Library - Fix**
- [PR #101](https://github.com/twilio/twilio-cli-core/pull/101): allow API redirect responses. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Chore**
- [PR #100](https://github.com/twilio/twilio-cli-core/pull/100): lint using twilio-style. Thanks to [@ktalebian](https://github.com/ktalebian)!

**Messaging**
- Add rejection reason support to WhatsApp API
- Removed status parameter for create and update in WhatsApp Templates API

**Proxy**
- Add FailOnParticipantConflict param to Proxy Session update

**Verify**
- Add `CustomFriendlyName` optional parameter on Verification creation.
- Changes in `Challenge` resource to update documentation of both `details` and `hidden_details` properties.


[2020-07-22] Version 5.8.0
--------------------------
**Library - Fix**
- [PR #99](https://github.com/twilio/twilio-cli-core/pull/99): use new 'instanceOf' in the catch blocks. Thanks to [@ktalebian](https://github.com/ktalebian)!

**Library - Feature**
- [PR #98](https://github.com/twilio/twilio-cli-core/pull/98): add custom header param support. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Api**
- Add optional Click Tracking and Scheduling parameters to Create action of Message resource

**Supersim**
- Add callback_url and callback_method parameters to Sim resource update request


[2020-07-08] Version 5.7.0
--------------------------
**Library - Fix**
- [PR #96](https://github.com/twilio/twilio-cli-core/pull/96): don't get so fancy with the font color scheme. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #97](https://github.com/twilio/twilio-cli-core/pull/97): upgrade dependencies and drop tslib pinning. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Feature**
- [PR #95](https://github.com/twilio/twilio-cli-core/pull/95): improve 'access denied' error messaging. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #93](https://github.com/twilio/twilio-cli-core/pull/93): update the env var message to use the proper OS syntax. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Conversations**
- Allow Address updates for Participants
- Message delivery receipts

**Events**
- Add account_sid to subscription and subscribed_events resources

**Flex**
- Changed `wfm_integrations` Flex Configuration key to private **(breaking change)**

**Messaging**
- Add error states to WhatsApp Sender status with failed reason **(breaking change)**
- Delete WhatsApp Template API
- Update WhatsApp Template API
- Add WhatsApp Template Get Api (fetch and read)

**Numbers**
- Add `valid_until` in the Bundles resource
- Add API for Bundle deletion

**Verify**
- Removed support for `sms`, `totp` and `app-push` factor types in Verify push **(breaking change)**


[2020-06-25] Version 5.6.0
--------------------------
**Library - Fix**
- [PR #94](https://github.com/twilio/twilio-cli-core/pull/94): encode URL path params. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #92](https://github.com/twilio/twilio-cli-core/pull/92): don't display "undefined" when no profiles exists. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added optional `JitterBufferSize` parameter for creating conference participant
- Added optional `label` property for conference participants
- Added optional parameter `caller_id` for creating conference participant endpoint.

**Autopilot**
- Remove Export resource from Autopilot Assistant

**Conversations**
- Expose Conversation timers

**Monitor**
- Update start/end date filter params to support date-or-time format **(breaking change)**

**Numbers**
- Add `provisionally-approved` as a Supporting Document status

**Preview**
- Removed `Authy` resources. **(breaking change)**

**Supersim**
- Add ready state to the allowed transitions in the sim update call behind the feature flag supersim.ready-state.v1

**Verify**
- Webhook resources added to Verify services and put behind the `api.verify.push` beta feature


[2020-06-10] Version 5.5.0
--------------------------
**Library - Fix**
- [PR #91](https://github.com/twilio/twilio-cli-core/pull/91): increase Node minimum version requirement to 10.12.0. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added `pstnconnectivity` to `usage_record` API

**Notify**
- delivery_callback_url and delivery_callback_enabled added

**Preview**
- `BrandsInformation` endpoint now returns a single `BrandsInformation`

**Supersim**
- Require a Network Access Profile when creating a Fleet **(breaking change)**


[2020-06-04] Version 5.4.0
--------------------------
**Autopilot**
- Add dialogue_sid param to Query list resource

**Contacts**
- Added AccountSID to CFD CREATE and GET Responses

**Numbers**
- Add `provisionally-approved` as a Bundle status

**Preview**
- Deleted phone number required field in the brand phone number endpoint from `kyc-api`
- Removed insights `preview API` from API Definitions **(breaking change)**
- Added `BrandsInformation` endpoint to query brands information stored in KYC


[2020-05-27] Version 5.3.0
--------------------------
**Api**
- Added `reason_conference_ended` and `call_sid_ending_conference` to Conference read/fetch/update
- Fixed some examples to use the correct "TK" SID prefix for Trunk resources.

**Authy**
- Renamed `twilio_authy_sandbox_mode` headers to `twilio_sandbox_mode` **(breaking change)**
- Renamed `Twilio-Authy-*` headers to `Twilio-Veriry-*` **(breaking change)**

**Flex**
- Adding `flex_service_instance_sid` to Flex Configuration

**Preview**
- Removed insights preview API from API Definitions **(breaking change)**
- Added `Channels` endpoint to brand a phone number for BrandedCalls

**Serverless**
- Add Build Sid to Log results

**Supersim**
- Add Network Access Profile resource Networks subresource
- Allow specifying a Data Limit on Fleets

**Trunking**
- Fixed some examples to use the correct "TK" SID prefix for Trunk resources.


[2020-05-20] Version 5.2.0
--------------------------
**Library - Fix**
- [PR #89](https://github.com/twilio/twilio-cli-core/pull/89): delay module-loading error logs until all locations have been exhausted. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #88](https://github.com/twilio/twilio-cli-core/pull/88): pin 'tslib' to avoid issues when interacting with plugin-plugins. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Feature**
- [PR #87](https://github.com/twilio/twilio-cli-core/pull/87): look through plugin pjson for an issue URL. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2020-05-13] Version 5.1.0
--------------------------
**Library - Feature**
- [PR #86](https://github.com/twilio/twilio-cli-core/pull/86): add regional and edge support. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Api**
- Add optional `emergency_caller_sid` parameter to SIP Domain
- Updated `call_reason` optional property to be treated as PII
- Added optional BYOC Trunk Sid property to Sip Domain API resource

**Autopilot**
- Add Restore resource to Autopilot Assistant

**Contacts**
- Added contacts Create API definition

**Events**
- Subscriptions API initial release

**Numbers**
- Add Evaluations API

**Supersim**
- Allow filtering the Fleets resource by Network Access Profile
- Allow assigning a Network Access Profile when creating and updating a Fleet
- Add Network Access Profiles resource

**Verify**
- Add `CustomCode` optional parameter on Verification creation.
- Add delete action on Service resource.

**Voice**
- Added endpoints for BYOC trunks, SIP connection policies and source IP mappings


[2020-04-29] Version 5.0.1
--------------------------
**Library - Fix**
- [PR #85](https://github.com/twilio/twilio-cli-core/pull/85): properly describe request bodies and add response descriptions. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Preview**
- Added `Dispatch` version to `preview`

**Studio**
- Reroute Create Execution for V2 to the V2 downstream

**Supersim**
- Add Networks resource


[2020-04-15] Version 5.0.0
--------------------------
**Library - Chore**
- [PR #84](https://github.com/twilio/twilio-cli-core/pull/84): raise Node requirement to v10 and upgrade dependencies. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**

**Library - Fix**
- [PR #83](https://github.com/twilio/twilio-cli-core/pull/83): only camelCase object keys when a schema is specified for the value. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**

**Api**
- Updated description for property `call_reason` in the call create request

**Contacts**
- Added Read, Delete All, and Delete by SID docs
- Initial Release

**Studio**
- Rename `flow_valid` to `flow_validate`
- Removed `errors` and `warnings` from flows error response and added new property named `details`
- Add Update Execution endpoints to v1 and v2 to end execution via API
- Add new `warnings` attribute v2 flow POST api


[2020-04-01] Version 4.6.0
--------------------------
**Library - Fix**
- [PR #82](https://github.com/twilio/twilio-cli-core/pull/82): axios expects paramsSerializer. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Api**
- Add optional 'secure' parameter to SIP Domain

**Authy**
- Added an endpoint to list the challenges of a factor
- Added optional parameter `Push` when updating a service to send the service level push factor configuration

**Bulkexports**
- exposing bulk exports (vault/slapchop) API as public beta API

**Flex**
- Adding `queue_stats_configuration` and `wfm_integrations` to Flex Configuration

**Serverless**
- Add Function Version Content endpoint
- Allow build_sid to be optional for deployment requests

**Supersim**
- Remove `deactivated` status for Super SIM which is replaced by `inactive` **(breaking change)**


[2020-03-18] Version 4.5.0
--------------------------
**Library - Feature**
- [PR #81](https://github.com/twilio/twilio-cli-core/pull/81): migrate from deprecated request package to axios. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Api**
- Add optional `emergency_calling_enabled` parameter to SIP Domain
- Add optional property `call_reason` in the call create request

**Authy**
- Added `friendly_name` and `config` as optional params to Factor update
- Added `config` param to Factor creation **(breaking change)**

**Preview**
- Renamed `SuccessRate` endpoint to `ImpressionsRate` for Branded Calls (fka. Verified by Twilio) **(breaking change)**


[2020-03-04] Version 4.4.7
--------------------------
**Library - Fix**
- [PR #80](https://github.com/twilio/twilio-cli-core/pull/80): update the wording for the env vars help message. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Authy**
- Added the `configuration` property to services to return the service level configurations
- Added optional parameter `Push` when creating a service to send the service level push factor configuration
- Remove FactorStrength support for Factors and Challenges **(breaking change)**

**Messaging**
- Correct the alpha sender capabilities property type **(breaking change)**

**Preview**
- Removed `/Devices` register Branded Calls endpoint, as per iOS sample app deprecation **(breaking change)**
- Removed `Twilio-Sandbox-Mode` request header from the Branded Calls endpoints, as not officially supported **(breaking change)**
- Removed `Verify` version from `preview` subdomain in favor to `verify` subdomain. **(breaking change)**

**Serverless**
- Add UI-Editable field to Services

**Supersim**
- Add `inactive` status for Super SIM which is an alias for `deactivated`

**Taskrouter**
- Adding value range to `priority` in task endpoint

**Verify**
- Fix `SendCodeAttempts` type. It's an array of objects instead of a unique object. **(breaking change)**


[2020-02-19] Version 4.4.6
--------------------------
**Library - Chore**
- [PR #79](https://github.com/twilio/twilio-cli-core/pull/79): Bump yarn from 1.21.1 to 1.22.0. Thanks to [@dependabot](https://github.com/dependabot)!

**Api**
- Make call create parameters `async_amd`, `async_amd_status_callback`, and `async_amd_status_callback_method` public
- Add `trunk_sid` as an optional field to Call resource fetch/read responses
- Add property `queue_time` to successful response of create, fetch, and update requests for Call
- Add optional parameter `byoc` to conference participant create.

**Authy**
- Added support for challenges associated to push factors

**Flex**
- Adding `ui_dependencies` to Flex Configuration

**Messaging**
- Deprecate Session API **(breaking change)**

**Numbers**
- Add Regulations API

**Studio**
- Add Execution and Step endpoints to v2 API
- Add webhook_url to Flow response and add new /TestUsers endpoint to v2 API

**Taskrouter**
- Adding `longest_relative_task_age_in_queue` and `longest_relative_task_sid_in_queue` to TaskQueue Real Time Statistics API.
- Add `wait_duration_in_queue_until_accepted` aggregations to TaskQueues Cumulative Statistics endpoint
- Add TaskQueueEnteredDate property to Tasks.

**Video**
- [Composer] Clarification for the composition hooks creation documentation: one source is mandatory, either the `audio_sources` or the `video_layout`, but one of them has to be provided
- [Composer] `audio_sources` type on the composer HTTP POST command, changed from `sid[]` to `string[]` **(breaking change)**
- [Composer] Clarification for the composition creation documentation: one source is mandatory, either the `audio_sources` or the `video_layout`, but one of them has to be provided


[2020-02-05] Version 4.4.5
--------------------------
**Library - Docs**
- [PR #78](https://github.com/twilio/twilio-cli-core/pull/78): baseline all the templated markdown docs. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Making content retention and address retention public
- Update `status` enum for Messages to include 'partially_delivered'

**Authy**
- Added support for push factors

**Autopilot**
- Add one new property in Query i.e dialogue_sid

**Verify**
- Add `SendCodeAttempts` to create verification response.

**Video**
- Clarification in composition creation documentation: one source is mandatory, either `audio_sources` or `video_layout`, but on of them has to be provided


[2020-01-23] Version 4.4.4
--------------------------
**Library - Fix**
- [PR #77](https://github.com/twilio/twilio-cli-core/pull/77): travis deploy config. Thanks to [@eshanholtz](https://github.com/eshanholtz)!


[2020-01-23] Version 4.4.3
--------------------------
**Library - Fix**
- [PR #76](https://github.com/twilio/twilio-cli-core/pull/76): update travis deploy. Thanks to [@thinkingserious](https://github.com/thinkingserious)!


[2020-01-23] Version 4.4.3
--------------------------
**Api**
- Add payments public APIs
- Add optional parameter `byoc` to call create request.

**Flex**
- Updating a Flex Flow `creation_on_message` parameter documentation

**Preview**
-
- Removed Verify v2 from preview in favor of its own namespace as GA **(breaking change)**

**Studio**
- Flow definition type update from string to object

**Verify**
- Add `AppHash` parameter when creating a Verification.
- Add `DoNotShareWarningEnabled` parameter to the Service resource.


[2020-01-08] Version 4.4.2
--------------------------
**Numbers**
- Add Regulatory Compliance CRUD APIs

**Studio**
- Add parameter validation for Studio v2 Flows API


[2019-12-18] Version 4.4.1
--------------------------
**Preview**
- Add `/Insights/SuccessRate` endpoint for Businesses Branded Calls (Verified by Twilio)

**Studio**
- StudioV2 API in beta

**Verify**
- Add `MailerSid` property to Verify Service resource.

**Wireless**
- Added `data_limit_strategy` to Rate Plan resource.


[2019-12-12] Version 4.4.0
--------------------------
**Api**
- Make `twiml` conditional for create. One of `url`, `twiml`, or `application_sid` is now required.
- Add `bundle_sid` parameter to /IncomingPhoneNumbers API
- Removed discard / obfuscate parameters from ContentRetention, AddressRetention **(breaking change)**

**Chat**
- Added `last_consumed_message_index` and `last_consumption_timestamp` parameters in update method for UserChannel resource **(breaking change)**

**Conversations**
- Add Participant SID to Message properties

**Messaging**
- Fix incorrectly typed capabilities property for ShortCodes. **(breaking change)**


[2019-12-04] Version 4.3.4
--------------------------
**Conversations**
- Allow Messaging Service update


[2019-11-21] Version 4.3.3
--------------------------
**Library**
- [PR #75](https://github.com/twilio/twilio-cli-core/pull/75): fix: add keytar sanity-check during install. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Chat**
- Added `delete` method in UserChannel resource


[2019-11-19] Version 4.3.2
--------------------------
**Library**
- [PR #74](https://github.com/twilio/twilio-cli-core/pull/74): fix: dynamically install keytar if it fails to load. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Add optional `twiml` parameter for call create

**Taskrouter**
- Support ReEvaluateTasks parameter on Workflow update


[2019-11-13] Version 4.3.1
--------------------------
**Api**
- Make `persistent_action` parameter public
- Add `twiml` optional private parameter for call create

**Autopilot**
- Add Export resource to Autopilot Assistant.

**Flex**
- Added Integration.RetryCount attribute to Flex Flow
- Updating a Flex Flow `channel_type` options documentation

**Insights**
- Added edges to events and metrics
- Added new endpoint definitions for Events and Metrics

**Messaging**
- **create** support for sender registration
- **fetch** support for fetching a sender
- **update** support for sender verification

**Supersim**
- Add `Direction` filter parameter to list commands endpoint
- Allow filtering commands list by Sim Unique Name
- Add `Iccid` filter parameter to list sims endpoint


[2019-10-30] Version 4.3.0
--------------------------
**Library**
- [PR #73](https://github.com/twilio/twilio-cli-core/pull/73): Include TQ badge for potential contributors. Thanks to [@kwhinnery](https://github.com/kwhinnery)!
- [PR #72](https://github.com/twilio/twilio-cli-core/pull/72): Update Open API definitions. Thanks to [@maylonpedroso](https://github.com/maylonpedroso)!

**Api**
- Add new usage categories to the public api `sms-messages-carrierfees` and `mms-messages-carrierfees`

**Conversations**
- Add ProjectedAddress to Conversations Participant resource

**Preview**
- Implemented different `Sid` for Current Calls (Verified by Twilio), instead of relying in `Call.Sid` from Voice API team **(breaking change)**

**Supersim**
- Add List endpoint to Commands resource for Super Sim Pilot
- Add UsageRecords resource for the Super Sim Pilot
- Add List endpoint to UsageRecords resource for the Super Sim Pilot
- Allow assigning a Sim to a Fleet by Fleet SID or Unique Name for Super SIM Pilot
- Add Update endpoint to Fleets resource for Super Sim Pilot
- Add Fetch endpoint to Commands resource for Super Sim Pilot
- Allow filtering the Sims resource List endpoint by Fleet
- Add List endpoint to Fleets resource for Super Sim Pilot

**Wireless**
- Added `account_sid` to Sim update parameters.


[2019-10-17] Version 4.2.1
--------------------------
**Library**
- [PR #71](https://github.com/twilio/twilio-cli-core/pull/71): Update npm key. Thanks to [@thinkingserious](https://github.com/thinkingserious)!


[2019-10-17] Version 4.2.0
--------------------------
**Library**
- [PR #70](https://github.com/twilio/twilio-cli-core/pull/70): Rename 'profiles:add' to 'profiles:create'. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #69](https://github.com/twilio/twilio-cli-core/pull/69): Auto-deploy using Travis CI upon tagged commit to master. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Api**
- Add new property `attempt` to sms_messages
- Fixed a typo in the documentation for Feedback outcome enum **(breaking change)**
- Update the call price to be optional for deserializing **(breaking change)**

**Flex**
- Added `JanitorEnabled` attribute to Flex Flow
- Change `features_enabled` Flex Configuration key to private **(breaking change)**

**Supersim**
- Add Fetch endpoint to Fleets resource for Super Sim Pilot
- Allow assigning a Sim to a Fleet for Super Sim Pilot
- Add Create endpoint to Fleets resource for Super Sim Pilot


[2019-10-02] Version 4.1.1
--------------------------
**Library**
- [PR #68](https://github.com/twilio/twilio-cli-core/pull/68): Handle command errors before logger initialization. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Conversations**
- Add media to Conversations Message resource

**Supersim**
- Add List endpoint to Sims resource for Super Sim Pilot


[2019-09-18] Version 4.1.0
---------------------------
**Library**
- [PR #66](https://github.com/twilio/twilio-cli-core/pull/66): Change 'sid_like' parameters to not enforce SID pattern-matching. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #65](https://github.com/twilio/twilio-cli-core/pull/65): Simplify the 'TwilioClientCommand' constructor to match the parent. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Numbers**
- Add v2 of the Identites API

**Preview**
- Changed authentication method for SDK Trusted Comms endpoints: `/CPS`, `/CurrentCall`, and `/Devices`. Please use `Authorization: Bearer <xCNAM JWT>` **(breaking change)**

**Voice**
- Add Recordings endpoints


[2019-09-06] Version 4.0.2
---------------------------
**Library**
- [PR #64](https://github.com/twilio/twilio-cli-core/pull/64): Remove implicit test dependency on keytar presence. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-09-04] Version 4.0.1
---------------------------
**Api**
-  Pass Twiml in call update request


[2019-09-03] Version 4.0.0
---------------------------
**Library**
- [PR #62](https://github.com/twilio/twilio-cli-core/pull/62): Move keytar to an optional dependency. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #58](https://github.com/twilio/twilio-cli-core/pull/58): breaking: Remove parameter key translating from OpenAPI client. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**
- [PR #63](https://github.com/twilio/twilio-cli-core/pull/63): Add limit flags and apply limit when listing resources. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #60](https://github.com/twilio/twilio-cli-core/pull/60): Add util for recursively translating object values. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #61](https://github.com/twilio/twilio-cli-core/pull/61): breaking: Move command exception logic to base command. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**
- [PR #59](https://github.com/twilio/twilio-cli-core/pull/59): Add 'PageSize' parameter to all 'read' actions. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #57](https://github.com/twilio/twilio-cli-core/pull/57): Allow empty flag values when updating resources. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Conversations**
- Add attributes to Conversations resources

**Flex**
- Adding `features_enabled` and `serverless_service_sids` to Flex Configuration

**Messaging**
- Message API required params updated **(breaking change)**

**Preview**
- Added support for the optional `CallSid` to `/BrandedCalls` endpoint


[2019-08-21] Version 3.0.3
---------------------------
**Library**
- [PR #56](https://github.com/twilio/twilio-cli-core/pull/56): Trim whitespace from profile attributes. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #54](https://github.com/twilio/twilio-cli-core/pull/54): Drop specific properties from 'phone_number_capabilities' types. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #41](https://github.com/twilio/twilio-cli-core/pull/41): Add date inequality support. Thanks to [@JenniferMah](https://github.com/JenniferMah)!
- [PR #52](https://github.com/twilio/twilio-cli-core/pull/52): OpenAPI spec changes to add date inequality parameters. Thanks to [@JenniferMah](https://github.com/JenniferMah)!

**Conversations**
- Add Chat Conversation SID to conversation default output properties

**Flex**
- Adding `outbound_call_flows` object to Flex Configuration
- Adding read and fetch to channels API

**Supersim**
- Add Sims and Commands resources for the Super Sim Pilot

**Sync**
- Added configuration option for enabling webhooks from REST.

**Wireless**
- Added `usage_notification_method` and `usage_notification_url` properties to `rate_plan`.


[2019-08-05] Version 3.0.2
---------------------------
**Conversations**
- Switch library_visibility to public for Conversations Resources


[2019-08-02] Version 3.0.1
---------------------------
**Library**
- [PR #51](https://github.com/twilio/twilio-cli-core/pull/51): Add user prompt config storage and utils. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #50](https://github.com/twilio/twilio-cli-core/pull/50): Change 'Twilio profile' to just 'profile' for the flag description. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-08-02] Version 3.0.0
---------------------------
**Library**
- [PR #49](https://github.com/twilio/twilio-cli-core/pull/49): breaking: Switch naming from 'project(s)' to 'profile(s)'. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**

**Preview**
- Added support for the header `Twilio-Sandbox-Mode` to mock all Voice dependencies


[2019-07-31] Version 2.0.5
---------------------------
**Library**
- [PR #48](https://github.com/twilio/twilio-cli-core/pull/48): Make the account-sid flag an add-on flag that custom commands can use. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #47](https://github.com/twilio/twilio-cli-core/pull/47): Add prompt message utility to base command. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #46](https://github.com/twilio/twilio-cli-core/pull/46): Add support for next page links that are relative or absolute. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #45](https://github.com/twilio/twilio-cli-core/pull/45): Handle dot-separated strings when converting to camelCase (or PascalCase). Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #44](https://github.com/twilio/twilio-cli-core/pull/44): Update dot-separated parameter names. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-07-24] Version 2.0.4
---------------------------
**Library**
- [PR #42](https://github.com/twilio/twilio-cli-core/pull/42): Bump lodash.template from 4.4.0 to 4.5.0. Thanks to [@dependabot[bot]](https://github.com/dependabot[bot])!
- [PR #37](https://github.com/twilio/twilio-cli-core/pull/37): Bump lodash from 4.17.11 to 4.17.14. Thanks to [@dependabot[bot]](https://github.com/dependabot[bot])!
- [PR #39](https://github.com/twilio/twilio-cli-core/pull/39): Debug log on null response values if nullable not allowed. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Insights**
- Added `properties` to summary.


[2019-07-12] Version 2.0.3
---------------------------
**Library**
- [PR #38](https://github.com/twilio/twilio-cli-core/pull/38): Move the non-2XX error handling down to the CliRequestClient. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Preview**
- Added endpoint to brand a call without initiating it, so it can be initiated manually by the Customer


[2019-07-10] Version 2.0.2
---------------------------
**Library**
- [PR #36](https://github.com/twilio/twilio-cli-core/pull/36): Look for keytar in the CLI dependency tree first. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #35](https://github.com/twilio/twilio-cli-core/pull/35): Switch from using short descriptions by default to long. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #34](https://github.com/twilio/twilio-cli-core/pull/34): Drop non-public components. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #33](https://github.com/twilio/twilio-cli-core/pull/33): Drop non-public domains and paths. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #32](https://github.com/twilio/twilio-cli-core/pull/32): Add better error message for network issues. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #31](https://github.com/twilio/twilio-cli-core/pull/31): Add pre-commit hook to execute tests. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #30](https://github.com/twilio/twilio-cli-core/pull/30): Convert boolean request parameter values to strings. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #28](https://github.com/twilio/twilio-cli-core/pull/28): Print 'No results' when outputting an empty result. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #29](https://github.com/twilio/twilio-cli-core/pull/29): Debug log the HTTP response status code and headers. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Make `friendly_name` optional for applications create


[2019-07-05] Version 2.0.1
---------------------------
**Library**
- [PR #27](https://github.com/twilio/twilio-cli-core/pull/27): Add a TwilioAPI client based on the Twilio OpenAPI spec. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-07-05] Version 2.0.0
---------------------------
**Library**
- [PR #24](https://github.com/twilio/twilio-cli-core/pull/24): breaking: Make the API browser more generic. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**


[2019-07-05] Version 1.6.1
---------------------------
**Api**
- Add new property `as_of` date to Usage Record API calls

**Wireless**
- Added Usage Records resource.


[2019-07-02] Version 1.6.0
----------------------------
**Library**
- [PR #22](https://github.com/twilio/twilio-cli-core/pull/22): Add x-path-type (list or instance) to all OAS paths. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #21](https://github.com/twilio/twilio-cli-core/pull/21): Drop unsupported null-type object, patternProperties, and add RFC 2822 date time format. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #17](https://github.com/twilio/twilio-cli-core/pull/17): Add some super rad utils. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #18](https://github.com/twilio/twilio-cli-core/pull/18): Move the Twilio OpenAPI spec and browser to core. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-06-27] Version 1.5.0
----------------------------
**Library**
- [PR #20](https://github.com/twilio/twilio-cli-core/pull/20): Update dependencies. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #16](https://github.com/twilio/twilio-cli-core/pull/16): Simplify the CLI request client. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #19](https://github.com/twilio/twilio-cli-core/pull/19): Temporarily pin keytar. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #15](https://github.com/twilio/twilio-cli-core/pull/15): Move naming and resource path utilities to core. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #14](https://github.com/twilio/twilio-cli-core/pull/14): Added removeCredentials function to secure-storage. Thanks to [@Jennifer-Mah](https://github.com/Jennifer-Mah)!
- [PR #13](https://github.com/twilio/twilio-cli-core/pull/13): Remove project. Thanks to [@Jennifer-Mah](https://github.com/Jennifer-Mah)!
