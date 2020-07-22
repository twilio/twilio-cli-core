const path = require('path');

const semver = require('semver');
const Plugins = require('@oclif/plugin-plugins').default;

const { TwilioCliError } = require('../services/error');
const corePJSON = require('../../package.json');
const { logger } = require('./messaging/logging');

/**
 * Retrieves the plugin for a given command.
 */
const getCommandPlugin = (command) => {
  for (const plugin of command.config.plugins || []) {
    for (const pluginCommand of plugin.commands) {
      if (pluginCommand.id === command.id || pluginCommand.aliases.includes(command.id)) {
        /*
         * Check the plugin options/config name first. This will contain the
         * name of the top-level plugin in the case of "dynamic" plugins. All
         * such plugins should really use the same dependency location.
         */
        const match = plugin.options.name ? command.config.plugins.find((p) => p.name === plugin.options.name) : plugin;

        logger.debug(`Found command "${command.id}" plugin: ${match.name}`);
        return command.config.plugins.find((p) => p.name === match.name);
      }
    }
  }

  throw new TwilioCliError('No plugin was found');
};

/**
 * Retrieves the package version given a path.
 */
const getPackageVersion = (packagePath, errors = null) => {
  const pjsonPath = path.join(packagePath, 'package.json');

  try {
    return require(pjsonPath).version;
  } catch (error) {
    // Failure to read the version is non-fatal.
    if (errors === null) {
      logger.debug(`Could not determine package version: ${error}`);
    } else {
      errors.push(error);
    }

    return undefined;
  }
};

/**
 * Retrieves the dependency version given a dependency name and package JSON.
 */
const getDependencyVersion = (packageName, pluginPJSON) => {
  for (const pjson of [pluginPJSON, corePJSON]) {
    // Check the plugin first.
    for (const location of ['dependencies', 'optionalDependencies']) {
      const version = pjson && pjson[location] && pjson[location][packageName];

      if (version) {
        logger.debug(`Found ${packageName} version in "${pjson.name}" ${location}: ${version}`);
        return version;
      }
    }
  }

  return undefined;
};

/**
 * Checks the given version is in the target version range. Throws an error if the check fails.
 */
const checkVersion = (currentVersion, targetVersion) => {
  if (currentVersion && targetVersion && !semver.satisfies(currentVersion, targetVersion)) {
    throw new Error(`Version ${currentVersion} does not meet requirement ${targetVersion}`);
  }
};

/**
 * Loads the given package and installs it if missing or not the proper version.
 */
const requireInstall = async (packageName, command) => {
  const errors = [];

  // First, try to load the package the old-fashioned way.
  try {
    return require(packageName);
  } catch (error) {
    errors.push(error);
  }

  const plugin = getCommandPlugin(command);

  // Use a plugin-scoped module directory.
  const pluginPath = path.join(command.config.dataDir, 'runtime_modules', plugin.name);
  const packagePath = path.join(pluginPath, 'node_modules', packageName);

  const currentVersion = getPackageVersion(packagePath, errors);
  const targetVersion = getDependencyVersion(packageName, plugin.pjson);

  // Then, try to load the package from the plugin's runtime modules path.
  try {
    checkVersion(currentVersion, targetVersion);

    return require(packagePath);
  } catch (error) {
    errors.push(error);
  }

  // If we're here, attempt to install the package in the plugin's runtime modules path.
  logger.warn(`Installing ${packageName} ...`);
  const plugins = new Plugins({ dataDir: pluginPath, cacheDir: pluginPath });

  try {
    /*
     * Init the PJSON in case it doesn't exist. This is required by yarn or it
     * moves up the dir tree until it finds one.
     */
    await plugins.createPJSON();

    // Force install the package in case it's a native module that needs rebuilding.
    const packageTag = targetVersion ? `${packageName}@${targetVersion}` : packageName;
    await plugins.yarn.exec(['add', '--force', packageTag], { cwd: pluginPath, verbose: false });
  } catch (error) {
    errors.push(error);
  }

  try {
    // Finally, re-attempt loading the package from the plugin's runtime modules path.
    return require(packagePath);
  } catch (error) {
    // Debug log any lazy errors we swallowed earlier.
    if (errors) {
      logger.debug(`Error loading/installing ${packageName}:`);
      errors.forEach((lazyError) => logger.debug(lazyError));
    }

    throw error;
  }
};

module.exports = {
  getCommandPlugin,
  getPackageVersion,
  getDependencyVersion,
  checkVersion,
  requireInstall,
};
