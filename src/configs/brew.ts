import { $ } from 'bun';
import { getConfigPath } from './utils';

export const setupBrew = async () => {
  await $`brew bundle --file=${getConfigPath('brew/Brewfile')}`;
};

export const dumpBrew = async () => {
  await $`brew bundle dump --no-vscode --force --file=${getConfigPath('brew/Brewfile')}`;
};

export const applyBrew = async () => {
  await $`brew bundle --file=${getConfigPath('brew/Brewfile')}`;
};
