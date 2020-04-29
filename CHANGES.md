twilio-cli-core changelog
=====================

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
