twilio-cli-core changelog
=====================

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
