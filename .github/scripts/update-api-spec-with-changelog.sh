#!/bin/bash
#
# Copies the latest spec in from the twilio-oai repo, folds the new
# OAI changelog entries into CHANGES.md, and proposes the result as a PR.
#
# This used to push straight to main. That is now rejected by the org-level
# "Twilio default branch protections" ruleset, so the spec update lands as a PR
# and the release itself runs afterwards, off the merge commit (see
# release-on-spec-merge.yml).
#
# Emits to $GITHUB_OUTPUT: change-log, version-type, spec-pr-opened.
set -euo pipefail

echo "Copying api-definitions"
cp -R ~/oai_definitions/json/. src/services/twilio-api/

echo "Running update changelog script"
node .github/scripts/update-change-log.js
changeLog=''
versionType=2
if [ -f changeLog.md ]; then
  changeLog=$(cat changeLog.md)
  rm -rf changeLog.md
  if [ "$changeLog" != '' ]; then
    versionType=$(node .github/scripts/get-version-type.js | tail -n -1)
  fi
fi
echo "Changelog: $changeLog"
echo "Version type: $versionType"
rm -rf OAI_CHANGES.md

specPrOpened=false
if [ -n "$(git status --porcelain)" ]; then
  echo "There are changes to commit."
  case "$versionType" in
    0|1) commitMessage='oaiFeat: Updated api definitions' ;;
    2)   commitMessage='oaiFix: Updated api definitions' ;;
    *)   echo "Invalid versionType: $versionType"; exit 1 ;;
  esac
  echo "Commit message:$commitMessage"

  prBody=$(cat <<BODY
Automated api-definitions update from [twilio-oai](https://github.com/twilio/twilio-oai).

Merging this PR triggers the cli-core release for these changes.

<details><summary>Changelog</summary>

$changeLog

</details>

_Opened by the [Cli-core Release workflow](${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY:-twilio/twilio-cli-core}/actions/runs/${GITHUB_RUN_ID:-})._
BODY
)
  bash .github/scripts/open-pr.sh \
    "oai-spec-update-${GITHUB_RUN_ID:-manual}" \
    "$commitMessage" \
    "$commitMessage" \
    "$prBody"
  specPrOpened=true
else
  echo "No changes to commit"
fi

{
  echo "change-log<<__CLI_CORE_CHANGELOG_EOF__"
  echo "$changeLog"
  echo "__CLI_CORE_CHANGELOG_EOF__"
  echo "version-type=$versionType"
  echo "spec-pr-opened=$specPrOpened"
} >> "$GITHUB_OUTPUT"
