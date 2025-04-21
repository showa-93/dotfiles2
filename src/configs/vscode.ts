import { $ } from 'bun';
import {
  HomePath,
  getConfigPath,
  replaceConfigFile,
  replaceFile,
} from './utils';

const SETTINGS_PATH = 'settings.json';

export const setupVSCode = async (backupKey: string) => {
  await replaceFile(
    backupKey,
    `${HomePath}/Library/Application Support/Code/User`,
    'vscode',
    SETTINGS_PATH,
  );
  await $`cat ${getConfigPath('vscode/extensions.txt')} | xargs -I {} code --install-extension {}`;
};

export const dumpVSCode = async () => {
  await replaceConfigFile(
    `${HomePath}/Library/Application Support/Code/User`,
    'vscode',
    SETTINGS_PATH,
  );
  await $`code --list-extensions > ./configs/vscode/extensions.txt`;
};

export const applyVSCode = async (backupKey: string) => {
  await replaceFile(
    backupKey,
    `${HomePath}/Library/Application Support/Code/User`,
    'vscode',
    SETTINGS_PATH,
  );
  await $`cat ${getConfigPath('vscode/extensions.txt')} | xargs -I {} code --install-extension {}`;
};
