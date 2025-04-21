import { readdir } from 'node:fs/promises';
import Bun, { $ } from 'bun';
import consola from 'consola';
import { HomePath, appendContent, backupFile, getConfigPath } from './utils';

const dotSSHPath = `${HomePath}/.ssh`;
const confPath = `${dotSSHPath}/conf.d`;
const configFilePath = `${dotSSHPath}/config`;

export const setupSSH = async (backupKey: string) => {
  consola.info('Setting up SSH config...');
  try {
    const baseConfigPath = getConfigPath('ssh');
    const files = await readdir(baseConfigPath);
    for (const fileName of files) {
      consola.info(`Setting up SSH config: ${fileName}`);

      // Configファイルのバックアップ
      const targetFilePath = `${confPath}/${fileName}`;
      await backupFile(backupKey, targetFilePath);

      // Configファイルの作成
      const filePath = `${baseConfigPath}/${fileName}`;
      const file = Bun.file(filePath);
      await Bun.write(`${confPath}/${fileName}`, file);
      await $`chmod 600 ${targetFilePath}`;

      // 秘密鍵の作成
      const secretFilePath = `${dotSSHPath}/${fileName}`;
      const secret = await $`bw get item dot_ssh_${fileName}`.json();
      if (!('notes' in secret)) {
        consola.error(`Secret not found for ${fileName}`);
        return;
      }
      await Bun.write(secretFilePath, secret.notes);
      await $`chmod 600 ${secretFilePath}`;
    }

    // configファイルのバックアップ
    await backupFile(backupKey, configFilePath);
    await appendContent(configFilePath, `Include ${confPath}/*`);
  } catch (error) {
    consola.error('Error setting up SSH config:', error);
  }
};
