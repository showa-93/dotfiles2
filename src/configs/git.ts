import { replaceHomeConfigFile, replaceHomeFile } from './utils';

const CONFIG_PATH = '.gitconfig';

export const setupGit = async (backupKey: string) => {
  await replaceHomeFile(backupKey, 'git', CONFIG_PATH);
};

export const dumpGit = async () => {
  await replaceHomeConfigFile('git', CONFIG_PATH);
};

export const applyGit = async (backupKey: string) => {
  await replaceHomeFile(backupKey, 'git', CONFIG_PATH);
};
