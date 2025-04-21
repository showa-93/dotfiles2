import { replaceHomeConfigFile, replaceHomeFile } from './utils';

const ZSHRC_PATH = '.zshrc';
const ZPROFILE_PATH = '.zprofile';

export const setupZsh = async (backupKey: string) => {
  await replaceHomeFile(backupKey, 'zsh', ZSHRC_PATH);
  await replaceHomeFile(backupKey, 'zsh', ZPROFILE_PATH);
};

export const dumpZsh = async () => {
  await replaceHomeConfigFile('zsh', ZSHRC_PATH);
  await replaceHomeConfigFile('zsh', ZPROFILE_PATH);
};

export const applyZsh = async (backupKey: string) => {
  await replaceHomeFile(backupKey, 'zsh', ZSHRC_PATH);
  await replaceHomeFile(backupKey, 'zsh', ZPROFILE_PATH);
};
