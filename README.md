roma
====

Generate org shape config based on your project&#39;s metadata files

[![Version](https://img.shields.io/npm/v/roma.svg)](https://npmjs.org/package/roma)
[![CircleCI](https://circleci.com/gh/lcampos/roma/tree/master.svg?style=shield)](https://circleci.com/gh/lcampos/roma/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/lcampos/roma?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/roma/branch/master)
[![Codecov](https://codecov.io/gh/lcampos/roma/branch/master/graph/badge.svg)](https://codecov.io/gh/lcampos/roma)
[![Greenkeeper](https://badges.greenkeeper.io/lcampos/roma.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/lcampos/roma/badge.svg)](https://snyk.io/test/github/lcampos/roma)
[![Downloads/week](https://img.shields.io/npm/dw/roma.svg)](https://npmjs.org/package/roma)
[![License](https://img.shields.io/npm/l/roma.svg)](https://github.com/lcampos/roma/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g roma
$ roma COMMAND
running command...
$ roma (-v|--version|version)
roma/0.0.1 darwin-x64 node-v8.9.4
$ roma --help [COMMAND]
USAGE
  $ roma COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`roma create:def [FILE]`](#roma-createdef-file)

## `roma create:def [FILE]`

Creates a project-scratch-def.json file based on metadata scanned from your project

```
USAGE
  $ roma create:def [FILE]

OPTIONS
  -e, --edition                                   salesforce org edition you want to generate the definition for
  -p, --path=path                                 file path to your project's metadata
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLES
  $ sfdx create:def -p /Users/myUser/mySFProject/src
     We've successfully created a project-scratch-def.json for you!
  
  $ sfdx create:def -p /Users/myUser/mySFProject/src -e developer
     We've successfully created a project-scratch-def.json for you!
```

_See code: [src/commands/create/def.ts](https://github.com/lcampos/roma/blob/v0.0.1/src/commands/create/def.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
