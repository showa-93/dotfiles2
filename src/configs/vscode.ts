import { $ } from 'bun';
import { HomePath, getConfigPath, replaceFile } from './utils';

const SETTINGS_PATH = 'settings.json';

export const setupVSCode = async (backupKey: string) => {
  await replaceFile(
    backupKey,
    `${HomePath}/Library/Application Support/Code/User/`,
    'vscode',
    SETTINGS_PATH,
  );
  await $`cat ${getConfigPath('vscode/extensions.txt')} | xargs -I {} code --install-extension {}`;
};

// dump extensions
// code --list-extensions > configs/vscode/extensions.txt
