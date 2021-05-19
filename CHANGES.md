twilio-cli-core changelog
=====================

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
