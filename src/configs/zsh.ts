import { replaceHomeFile } from './utils';

const ZSHRC_PATH = '.zshrc';
const ZPROFILE_PATH = '.zprofile';

export const setupZsh = async (backupKey: string) => {
  await replaceHomeFile(backupKey, 'zsh', ZSHRC_PATH);
  await replaceHomeFile(backupKey, 'zsh', ZPROFILE_PATH);
};
