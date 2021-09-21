const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');

/**
 * Functionality from benc-uk/workflow-dispatch.
 * Link: https://github.com/benc-uk/workflow-dispatch
 */
const run = async () => {
  try {
    const octokit = new Octokit({
      auth: process.env.REPO_WORKFLOW_TOKEN
    });
    const workflowRef = process.env.WORKFLOW_NAME;
    const ref = process.env.BRANCH_NAME;
    const [owner, repo] = process.env.REPO_NAME
      ? process.env.REPO_NAME.split('/')
      : [null, null];

    // Decode inputs, this MUST be a valid JSON string
    let inputs = {}
    const inputsJson = process.env.INPUTS;
    if(inputsJson) {
      inputs = JSON.parse(inputsJson)
    }

    const workflow = await octokit.rest.actions.getWorkflow({
      owner,
      repo,
      workflow_id: workflowRef
    });

    core.info(`Workflow id is: ${workflow.data.id}`)

    const dispatchResp = await octokit.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: workflow.data.id,
      ref,
      inputs
    });
    core.info(`API response status: ${dispatchResp.status} 🚀`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

(async () => {
  await run();
})();
