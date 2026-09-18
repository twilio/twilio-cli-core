#!/bin/bash
#
# Reconstructs the release changelog and version type from an already-merged
# api-definitions commit.
#
# The spec update and the release no longer happen in one run: the specs land
# via PR first, so by the time the release runs, CHANGES.md on main already
# contains the new entries. Recomputing the changelog the normal way (diffing
# the OAI changelog against CHANGES.md) would therefore yield nothing. Instead:
#
#   * changelog    = the lines the spec commit itself added to CHANGES.md
#   * version type = computed against CHANGES.md as of the commit's *parent*
#
# Requires OAI_CHANGES.md (the twilio-oai changelog) in the working directory.
# Emits to $GITHUB_OUTPUT: change-log, version-type.
set -euo pipefail

sha="${1:-HEAD}"
echo "Deriving changelog from commit $sha"

changeLog=$(git diff "$sha^" "$sha" -- CHANGES.md | grep '^+' | grep -v '^+++' | sed 's/^+//' || true)
versionType=2

if [ -n "$changeLog" ]; then
  git show "$sha^:CHANGES.md" > CHANGES.prev.md
  versionType=$(CLI_CORE_CHANGELOG=CHANGES.prev.md node .github/scripts/get-version-type.js | tail -n -1)
  rm -f CHANGES.prev.md
else
  echo "::warning::No CHANGES.md additions found in $sha; releasing with an empty changelog."
fi

echo "Changelog: $changeLog"
echo "Version type: $versionType"

{
  echo "change-log<<__CLI_CORE_CHANGELOG_EOF__"
  echo "$changeLog"
  echo "__CLI_CORE_CHANGELOG_EOF__"
  echo "version-type=$versionType"
} >> "$GITHUB_OUTPUT"
