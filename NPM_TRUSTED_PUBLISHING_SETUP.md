# NPM Trusted Publishing Setup

This document explains how to configure NPM publishing with provenance (trusted publishing) for this repository.

## What is NPM Trusted Publishing?

NPM's trusted publishing feature (also called provenance) provides:
1. **Provenance Attestation** - Cryptographic proof that a package was built and published from a specific GitHub Actions workflow
2. **Enhanced Security** - Uses OIDC (OpenID Connect) to verify the source of packages
3. **Granular Access Tokens** - More secure, scoped tokens instead of classic tokens

## Important Note

⚠️ **NPM still requires an authentication token for publishing**, even with provenance enabled. The provenance feature adds attestation but does not replace token-based authentication.

The migration from "classic tokens" to "trusted publishing" means:
- **Remove**: Old classic NPM tokens (deprecated by npm)
- **Add**: New granular access tokens with limited scope
- **Enable**: Provenance attestation via OIDC (already configured in this repo)

## Setup Instructions

### 1. Create a Granular Access Token

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Navigate to **Access Tokens** in your account settings
3. Click "Generate New Token" and select **Granular Access Token**
4. Configure the token:
   - **Token name**: `twilio-cli-core-publisher`
   - **Expiration**: Set as needed (recommended: 1 year)
   - **Packages and scopes**: Select `@twilio/cli-core`
   - **Permissions**: 
     - ✅ Read and write (required for publishing)
   - **IP restrictions**: Optional (can restrict to GitHub Actions IPs)
5. Copy the generated token (you won't be able to see it again!)

### 2. Add Token to GitHub Secrets

1. Go to this repository's Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Paste the granular access token from step 1
5. Click "Add secret"

### 3. Verify Workflow Configuration

The workflow is already configured with:
- ✅ `id-token: write` permission (enables OIDC)
- ✅ `NPM_CONFIG_PROVENANCE: true` (enables provenance)
- ✅ `provenance: true` in `.releaserc.json`
- ✅ `NPM_TOKEN` reference in workflow (requires step 2 above)

### 4. Test the Release

Once the `NPM_TOKEN` secret is added:
1. Push a commit to the `main` branch or manually trigger the release workflow
2. The workflow should now successfully publish with provenance
3. Published packages will have provenance attestation visible on npmjs.com

## Provenance Verification

After publishing with provenance enabled, users can verify your package:

```bash
npm view @twilio/cli-core --json | jq .dist
```

The output will include provenance information showing the package was published from this GitHub repository.

## Troubleshooting

### Error: "Invalid npm token"
- **Cause**: NPM_TOKEN secret is missing or invalid
- **Solution**: Follow steps 1-2 above to create and add a valid granular access token

### Error: "401 Unauthorized"
- **Cause**: NPM_TOKEN not configured or expired
- **Solution**: Generate a new granular access token and update the GitHub secret

### Provenance not showing
- **Cause**: Publishing without proper OIDC configuration
- **Solution**: Verify `id-token: write` permission and `NPM_CONFIG_PROVENANCE: true` are set

## References

- [npm Provenance Documentation](https://docs.npmjs.com/generating-provenance-statements)
- [npm Granular Access Tokens](https://docs.npmjs.com/about-access-tokens#granular-access-tokens)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
