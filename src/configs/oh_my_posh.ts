import { replaceHomeFile } from './utils';

const CONFIG_PATH = '.theme.omp.json';

export const setupOhMyPosh = async (backupKey: string) => {
  await replaceHomeFile(backupKey, 'oh_my_posh', CONFIG_PATH);
};
