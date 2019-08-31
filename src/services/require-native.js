const { logger } = require('./messaging/logging');

/**
 * Loads a module by first checking in the command execution path and falling
 * back to the standard modules path.
 */
const requireNative = id => {
  // Since native modules are compiled for the specific version of Node they
  // were installed with, we don't want plugins that depend on us to depend on
  // them. Otherwise, they'd need to reinstall each time Node changes since it
  // requires the native module to be reinstalled. For this reason, we don't
  // expect to find native modules under the normal dependency tree. They
  // should exist with the CLI's dependencies. We'll attempt to find out
  // where that is based on the location of the script that kicked off the
  // process. Resolve any symlinks along the way to find the "real" path
  // and then load up the module.
  try {
    const realAppPath = require('fs').realpathSync(process.argv[1]);
    const realModulePath = require.resolve(id, { paths: [realAppPath] });

    return require(realModulePath);
  } catch (error) {
    logger.debug(`Failed to find the ${id} module with the CLI: ` + error.message);
  }

  // If the above fails for whatever reason, fallback to the standard location
  // since some lib is better than no lib.
  try {
    return require(id);
  } catch (error) {
    logger.debug(`Failed to find the ${id} module anywhere: ` + error.message);
  }
};

module.exports = { requireNative };
