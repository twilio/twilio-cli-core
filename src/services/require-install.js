const path = require('path');
const semver = require('semver');
const Plugins = require('@oclif/plugin-plugins').default;
const corePJSON = require('../../package.json');
const { logger } = require('./messaging/logging');

/**
 * Retrieves the plugin for a given command.
 */
const getCommandPlugin = command => {
  for (let plugin of command.config.plugins || []) {
    for (let pluginCommand of plugin.commands) {
      if (pluginCommand.id === command.id || pluginCommand.aliases.includes(command.id)) {
        // Check the plugin options/config name first. This will contain the
        // name of the top-level plugin in the case of "dynamic" plugins. All
        // such plugins should really use the same dependency location.
        if (plugin.options.name) {
          plugin = command.config.plugins.find(p => p.name === plugin.options.name);
        }

        logger.debug(`Found command "${command.id}" plugin: ${plugin.name}`);
        return command.config.plugins.find(p => p.name === plugin.name);
      }
    }
  }
};

/**
 * Retrieves the package version given a path.
 */
const getPackageVersion = packagePath => {
  const pjsonPath = path.join(packagePath, 'package.json');

  try {
    return require(pjsonPath).version;
  } catch (error) {
    // Failure to read the version is non-fatal.
    logger.debug(`Could not determine package version: ${error}`);
  }
};

/**
 * Retrieves the dependency version given a dependency name and package JSON.
 */
const getDependencyVersion = (packageName, pluginPJSON) => {
  for (const pjson of [pluginPJSON, corePJSON]) { // Check the plugin first.
    for (const location of ['dependencies', 'optionalDependencies']) {
      const version = pjson && pjson[location] && pjson[location][packageName];

      if (version) {
        logger.debug(`Found ${packageName} version in "${pjson.name}" ${location}: ${version}`);
        return version;
      }
    }
  }
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
  // First, try to load the package the old-fashioned way.
  try {
    return require(packageName);
  } catch (error) {
    logger.debug(`Error loading ${packageName}: ${error}`);
  }

  const plugin = getCommandPlugin(command);

  // Use a plugin-scoped module directory.
  const pluginPath = path.join(command.config.dataDir, 'runtime_modules', plugin.name);
  const packagePath = path.join(pluginPath, 'node_modules', packageName);

  const currentVersion = getPackageVersion(packagePath);
  const targetVersion = getDependencyVersion(packageName, plugin.pjson);

  // Then, try to load the package from the plugin's runtime modules path.
  try {
    checkVersion(currentVersion, targetVersion);

    return require(packagePath);
  } catch (error) {
    logger.debug(`Error loading ${packageName}: ${error}`);
  }

  // If we're here, attempt to install the package in the plugin's runtime modules path.
  try {
    logger.warn(`Installing ${packageName} ...`);
    const packageTag = targetVersion ? `${packageName}@${targetVersion}` : packageName;
    const plugins = new Plugins({ dataDir: pluginPath, cacheDir: pluginPath });

    // Init the PJSON in case it doesn't exist. This is required by yarn or it
    // moves up the dir tree until it finds one.
    await plugins.createPJSON();

    // Force install the package in case it's a native module that needs rebuilding.
    await plugins.yarn.exec(['add', '--force', packageTag], { cwd: pluginPath, verbose: false });
  } catch (error) {
    logger.debug(`Error installing ${packageName}: ${error}`);
  }

  // Finally, re-attempt loading the package from the plugin's runtime modules path.
  return require(packagePath);
};

module.exports = {
  getCommandPlugin,
  getPackageVersion,
  getDependencyVersion,
  checkVersion,
  requireInstall
};
