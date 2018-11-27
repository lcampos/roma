import { core, flags, SfdxCommand } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Messages with the current plugin directory
core.Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = core.Messages.loadMessages('roma', 'def');

export default class Def extends SfdxCommand {

  public static description = messages.getMessage('commandDescription');

  public static examples = [
  `$ sfdx create:def -p /Users/myUser/mySFProject/src
  We\'ve successfully created a project-scratch-def.json for you!
  `,
  `$ sfdx create:def -p /Users/myUser/mySFProject/src -e developer
  We\'ve successfully created a project-scratch-def.json for you!
  `
  ];

  public static args = [{name: 'file'}];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    path: flags.string({
      char: 'p',
      description: messages.getMessage('pathFlagDescription'),
      required: true
    }),
    edition: flags.string({
      char: 'e',
      description: messages.getMessage('editionFlagDescription')
    })
  };

  // Comment this out if your command does not require an org username
  // protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  // protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  protected static getMdDefinitionJSON() {
    let pluginDir = __dirname;
    pluginDir = pluginDir.replace('/lib/commands/create', '');

    const mdDefinitionPath = path.join(pluginDir, 'config', 'metadata.json');
    let defFileContent;
    try {
      defFileContent = fs.readFileSync(mdDefinitionPath, 'utf8');
    } catch (e) {
      throw new Error('Error while reading metadata configuration file.');
    }
    return JSON.parse(defFileContent);
  }

  public async run(): Promise<AnyJson> {
    const pathFlag = this.flags.path;
    const editionFlag = this.flags.edition || 'enterprise';
    let outputString = '';
    const mdDefinition = Def.getMdDefinitionJSON();

    const data = {
      orgName: 'Sample Org',
      edition: editionFlag,
      settings: {
        orgPreferenceSettings: {
        }
      }
    };

    fs.readdirSync(pathFlag).forEach(file => {
      if (mdDefinition.pathMap.hasOwnProperty(file)) {
        const typeName = mdDefinition.pathMap[file];
        const orgPref = mdDefinition.types[typeName].scratchDefinitions[editionFlag].settings.orgPreferenceSettings;
        // copy preferences into data object
        Object.assign(data.settings.orgPreferenceSettings, orgPref);
      }
    });

    if (data) {
      const content = JSON.stringify(data, null, 2); // spacing level = 2

      try {
        fs.writeFileSync('project-scratch-def.json', content, 'utf8');
      } catch (e) {
        outputString = 'There was an error while creating a project-scratch-def.json';
        console.log('Cannot write file ', e);
      }
      outputString = 'We\'ve successfully created a project-scratch-def.json for you!';
    }

    this.ux.log(outputString);
    return { outputString };
  }
}
