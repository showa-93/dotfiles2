import { $ } from 'bun';
import { replaceHomeFile } from './utils';

const CONFIG_PATH = 'mise.toml';

export const setupMise = async (backupKey: string) => {
  await replaceHomeFile(backupKey, 'mise', CONFIG_PATH);
  await $`mise install`;
};
