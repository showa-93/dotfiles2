import { replaceHomeFile } from './utils';

const CONFIG_PATH = '.gitconfig';

export const setupGit = async (backupKey: string) => {
  await replaceHomeFile(backupKey, 'git', CONFIG_PATH);
};
