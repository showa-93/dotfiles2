import { $ } from 'bun';
import { HomePath, replaceConfigFile, replaceFile } from './utils';

const CONFIG_PATH = 'config.toml';

export const setupMise = async (backupKey: string) => {
  await replaceFile(backupKey, `${HomePath}/.config/mise`, 'mise', CONFIG_PATH);
  await $`mise install`;
};

export const dumpMise = async () => {
  await replaceConfigFile(`${HomePath}/.config/mise`, 'mise', CONFIG_PATH);
};

export const applyMise = async (backupKey: string) => {
  await replaceFile(backupKey, `${HomePath}/.config/mise`, 'mise', CONFIG_PATH);
  await $`mise install`;
};
