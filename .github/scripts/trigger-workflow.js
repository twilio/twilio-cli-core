const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');

/**
 * Functionality from benc-uk/workflow-dispatch.
 * Link: https://github.com/benc-uk/workflow-dispatch
 */
const triggerWorkflow = async () => {
  try {
    const octokit = new Octokit({
      auth: process.env.REPO_ACCESS_TOKEN,
    });
    const workflowRef = process.env.WORKFLOW_NAME;
    const ref = process.env.BRANCH_NAME;
    const [owner, repo] = process.env.REPO_NAME ? process.env.REPO_NAME.split('/') : [null, null];

    // Decode inputs, this MUST be a valid JSON string
    let inputs = {};
    const inputsJson = process.env.INPUTS;
    console.log("1: ", inputsJson);
    // console.log("2: ", inputsJson['change-log']);
    // if(inputsJson['change-log'] === null){
    //   inputsJson['change-log'] == "No new OAI changes";
    //   console.log("3: ", inputsJson['change-log']);
    // }
    if (inputsJson) {
      inputs = JSON.parse(inputsJson);
    }
    console.log("2: ", inputs);

    const workflow = await octokit.rest.actions.getWorkflow({
      owner,
      repo,
      workflow_id: workflowRef,
    });

    core.info(`Workflow id is: ${workflow.data.id}`);

    const dispatchResp = await octokit.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id: workflow.data.id,
      ref,
      inputs,
    });
    core.info(`API response status: ${dispatchResp.status}.`);
  } catch (error) {
    core.setFailed(error.message);
  }
};

module.exports = {
  triggerWorkflow,
};
