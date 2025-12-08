const { spawn } = require('child_process');

const triggerAndWait = async () => {
  const scriptPath = '.github/scripts/trigger-and-wait.sh';
  const child = spawn('bash', [scriptPath]);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  child.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

  child.on('data', (data) => {
    console.log(`error: ${data}`)
  })

  child.on('exit', (code, signal) => {
    if (code) console.log(`Process exit with code: ${code}`)
    if (signal) console.log(`Process killed with signal: ${signal}`)
  })
}

module.exports = {
  triggerAndWait
};
