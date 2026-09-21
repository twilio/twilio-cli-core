#!/bin/bash
#
# Finds the api-definitions changelog belonging to the release being published.
#
# The release now happens on the release PR's merge commit, one or two commits
# after the api-definitions commit, so the changelog is not in the commit being
# released. It is recovered from the most recent oaiFeat:/oaiFix: commit since
# the previous tag:
#
#   * change-log   = the lines that commit added to CHANGES.md
#   * version-type = read off its subject (oaiFeat -> 1 minor, oaiFix -> 2 patch)
#
# version-type only ever decides twilio-cli's commit message prefix, which
# treats major and minor alike, so reading it off the subject is sufficient.
#
# Requires full history (fetch-depth: 0).
# Emits to $GITHUB_OUTPUT: change-log, version-type.
set -euo pipefail

prevTag=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || true)
range="HEAD"
if [ -n "$prevTag" ]; then
  range="${prevTag}..HEAD"
  echo "Looking for an api-definitions commit in ${range}"
else
  echo "No previous tag found; searching all history"
fi

sha=$(git log --format='%H %s' "$range" | grep -m1 -E '^[0-9a-f]+ oai(Feat|Fix):' | cut -d' ' -f1 || true)

changeLog=''
versionType=2
if [ -n "$sha" ]; then
  subject=$(git log -1 --format='%s' "$sha")
  echo "Found api-definitions commit $sha: $subject"
  changeLog=$(git diff "$sha^" "$sha" -- CHANGES.md | grep '^+' | grep -v '^+++' | sed 's/^+//' || true)
  case "$subject" in
    oaiFeat:*) versionType=1 ;;
    *)         versionType=2 ;;
  esac
else
  echo "No api-definitions commit in this release; release notes will come from the commit messages alone."
fi

echo "Version type: $versionType"

{
  echo "change-log<<__CLI_CORE_CHANGELOG_EOF__"
  echo "$changeLog"
  echo "__CLI_CORE_CHANGELOG_EOF__"
  echo "version-type=$versionType"
} >> "$GITHUB_OUTPUT"
