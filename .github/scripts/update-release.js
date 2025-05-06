const core = require('@actions/core');
const { Octokit } = require("@octokit/core");
const path = require('path');
const fs = require('fs');

/**
 * Functionality from tubone24/update_release.
 * Link: https://github.com/tubone24/update_release
 */
const updateRelease = async () => {
  try {
    const octokit = new Octokit({
      auth: process.env.REPO_ACCESS_TOKEN
    })
    const [owner, repo] = process.env.REPO_NAME ? process.env.REPO_NAME.split('/') : [null, null];
    const tag = process.env.TAG_NAME;
    const githubWorkspace = process.env.GITHUB_WORKSPACE;

    if( !process.env.GITHUB_WORKSPACE.includes('twilio-cli-core') ) {
      updatePackageJson(process.env.CLI_CORE_TAG)
    }

    //https://docs.github.com/en/rest/releases/releases#get-a-release-by-tag-name
    const getReleaseResponse = await octokit.request('GET /repos/{owner}/{repo}/releases/tags/{tag}',{
      owner,
      repo,
      tag,
    });


    const {
      data: {
        id: oldReleaseId,
        html_url: oldHtmlUrl,
        upload_url: oldUploadUrl,
        body: oldBody,
        draft: oldDraft,
        name: oldName,
        prerelease: oldPrerelease,
      },
    } = getReleaseResponse;

    core.info(`Got release info: '${oldReleaseId}', ${oldName}, '${oldHtmlUrl}', '${oldUploadUrl},'`);
    core.info(`Body: ${oldBody}`);
    core.info(`Draft: ${oldDraft}, Prerelease: ${oldPrerelease}`);

    const newBody = process.env.RELEASE_BODY;
    const newPrerelease = process.env.PRE_RELEASE;

    let body;
    if (newBody === '') {
      body = oldBody;
    } else {
      body = `${oldBody}\n${newBody}`;
    }

    let prerelease;
    if (newPrerelease !== '' && Boolean(newPrerelease)) {
      prerelease = newPrerelease === 'true';
    } else {
      prerelease = oldPrerelease;
    }

    //https://docs.github.com/en/rest/releases/releases#update-a-release
    await octokit.request('PATCH /repos/{owner}/{repo}/releases/{release_id}', {
      owner,
      release_id: oldReleaseId,
      repo,
      body,
      name: oldName,
      draft: oldDraft,
      prerelease,
    });

    core.info(`Updated release with body: ${body}`);
  } catch (error) {
    core.setFailed(error.message);
  }
};

const updatePackageJson = (value) => {
  try {
    // Path to package.json
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');

    // Read and parse package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Update the desired key
    packageJson["dependencies"]["@twilio/cli-core"] = value;

    // Write the updated object back to package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

    console.info(`Updated package.json: Set twilio-cli-core to '${value}'`);
  } catch (error) {
    console.error(`Failed to update package.json: ${error.message}`);
  }
};

module.exports = {
  updateRelease,
};
