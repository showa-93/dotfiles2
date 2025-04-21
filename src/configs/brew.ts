import { $ } from 'bun';
import { getConfigPath } from './utils';

export const setupBrew = async () => {
  await $`brew bundle --file=${getConfigPath('brew/Brewfile')}`;
};

// dump brewfile
// brew bundle dump --no-vscode --file configs/brew/Brewfile --force
