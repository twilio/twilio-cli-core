#!/bin/sh
echo "Copying api-definitions"
cp -R ~/oai_definitions/json/. src/services/twilio-api/
echo "Running update changelog script"
node scripts/update-change-log.js
changeLog=$(cat changeLog.md)
rm -rf changeLog.md
if [ "$changeLog" != '' ]; then
  changeLog="${changeLog//'%'/'%25'}"
  changeLog="${changeLog//$'\n'/'%0A'}"
  changeLog="${changeLog//$'\r'/'%0D'}"
fi
echo "Changelog: $changeLog"
versionType=$(node scripts/get-version-type.js | tail -n -1)
echo "Version type: $versionType"
rm -rf OAI_CHANGES.md
echo "Git configurations"
git config --global user.email "team_interfaces+github@twilio.com"
git config --global user.name "twilio-dx"
branch=$(git branch --show-current)
echo "Current branch: $branch"
git add -A
if [ -n "$(git status --porcelain)" ]; then
  echo "There are changes to commit.";
  commitMessage=''
  if [ "$versionType" == 0 ] || [ "$versionType" == 1 ]
  then
    commitMessage='feat: Updated api definitions'
  elif [ "$versionType" == 2 ]
  then
    commitMessage='fix: Updated api definitions'
  else
    echo "Invalid versionType: $versionType";
    exit
  fi
  echo "Commit message:$commitMessage"
  git commit -m "$commitMessage"
  git push origin "$branch"
else
  echo "No changes to commit";
fi
