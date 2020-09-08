@sapling/cli
============

CLI for setting up and managing Sapling projects

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@sapling/cli.svg)](https://npmjs.org/package/@sapling/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@sapling/cli.svg)](https://npmjs.org/package/@sapling/cli)
[![License](https://img.shields.io/npm/l/@sapling/cli.svg)](https://github.com/SaplingJS/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @sapling/cli
$ sapling COMMAND
running command...
$ sapling (-v|--version|version)
@sapling/cli/0.1.0 darwin-x64 node-v13.14.0
$ sapling --help [COMMAND]
USAGE
  $ sapling COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sapling hello [FILE]`](#sapling-hello-file)
* [`sapling help [COMMAND]`](#sapling-help-command)

## `sapling hello [FILE]`

describe the command here

```
USAGE
  $ sapling hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ sapling hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/SaplingJS/cli/blob/v0.1.0/src/commands/hello.ts)_

## `sapling help [COMMAND]`

display help for sapling

```
USAGE
  $ sapling help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
