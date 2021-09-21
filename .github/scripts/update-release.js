const core = require('@actions/core');
const { GitHub } = require('@actions/github');

/**
 * Functionality from tubone24/update_release.
 * Link: https://github.com/tubone24/update_release
 */
const updateRelease = async () => {
  try {
    const github = new GitHub(process.env.GITHUB_TOKEN);
    const [owner, repo] = process.env.REPO_NAME
      ? process.env.REPO_NAME.split('/')
      : [null, null];
    const tag = process.env.TAG_NAME;
    const getReleaseResponse = await github.repos.getReleaseByTag({
      owner,
      repo,
      tag
    });

    const {
      data: {
        id: oldReleaseId,
        html_url: oldHtmlUrl,
        upload_url: oldUploadUrl,
        body: oldBody,
        draft: oldDraft,
        name: oldName,
        prerelease: oldPrerelease
      }
    } = getReleaseResponse;

    core.info(
      `Got release info: '${oldReleaseId}', ${oldName}, '${oldHtmlUrl}', '${oldUploadUrl},'`
    )
    core.info(`Body: ${oldBody}`)
    core.info(`Draft: ${oldDraft}, Prerelease: ${oldPrerelease}`)

    const newBody = process.env.RELEASE_BODY;
    const newPrerelease = process.env.PRE_RELEASE;

    let body
    if (newBody === '') {
      body = oldBody
    } else {
      body = `${oldBody}\n${newBody}`;
    }

    let prerelease
    if (newPrerelease !== '' && !!newPrerelease) {
      prerelease = newPrerelease === 'true'
    } else {
      prerelease = oldPrerelease
    }

    await github.repos.updateRelease({
      owner,
      release_id: oldReleaseId,
      repo,
      body,
      name: oldName,
      draft: oldDraft,
      prerelease
    })

    core.info(`Updated release with body: ${body}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}
(async () => {
  await updateRelease();
})();

module.exports = {
  updateRelease,
};
