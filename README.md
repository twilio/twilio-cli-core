# twilio-cli-core

This module contains core functionality for the twilio-cli.

## Base commands

### BaseCommand

The base command class for _all_ twilio-cli commands. Includes support for configuration management, logging, and output formatting.

### TwilioClientCommand

A base command class for commands that need a Twilio client to make API requests. Handles loading credentials from the project configuration.

## Services

### Output formats

Formatters to take a JSON array and write to the stdout. Current formatters include:

- Columns (default, human readable)
- JSON (raw API output)
- TSV

### CLIRequestClient

A custom http client for the Twilio helper library to allow us to log API requests as well as modify the User-Agent header.

### Config

Manages the CLI configuration options, such as Twilio projects and credentials.

### Logger

Standardizes logging output of debug, info, warning, and error messages to stderr (all go to stderr to allow differentiation between command output and logging messages).

### SecureStorage

An abstraction around the keytar npm package which further abstracts platform-level data encryption services for storing Twilio credentials securely.
