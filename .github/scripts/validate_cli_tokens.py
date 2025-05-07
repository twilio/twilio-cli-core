import requests
import time

time.sleep(60) #delay added as we need the CLI token validation workflow to complete

github_url="https://api.github.com/repos/twilio/twilio-cli/actions/workflows/release-token-validation.yml/runs"
response = requests.get(github_url)
output=response.json()
print("sddbdsfhfuvi", output)
print(output['workflow_runs'][0]['conclusion'])
