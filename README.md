roma
====

## Prerequisites

Install yarn
```
$ brew install yarn
```

Install [sfdx cli](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm)

## Setup

Install all project dependencies
```
$ yarn install
```

Compile project
```
$ yarn prepare
```

Link the repo to your cli
```
$ sfdx plugins:link roma 
```


Generate org shape config based on your project&#39;s metadata files

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
  -e, --edition=edition                           salesforce org edition you want to generate the definition for
  -p, --path=path                                 (required) file path to your project's metadata
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
