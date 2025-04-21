import { appendFile, readFile } from 'node:fs/promises';
import Bun, { $ } from 'bun';
import consola from 'consola';

const CONFIG_BASE_PATH = './configs';
const BACKUP_BASE_PATH = './.backup';

export const HomePath = process.env.HOME;
if (!HomePath) {
  throw new Error('HOME environment variable is not set.');
}

export const getConfigPath = (configName: string) => {
  return `${CONFIG_BASE_PATH}/${configName}`;
};

export const backupFile = async (backupKey: string, filePath: string) => {
  const file = Bun.file(filePath);
  if (!(await file.exists())) {
    return;
  }

  const relativePath = filePath.startsWith(HomePath)
    ? filePath.replace(HomePath, '')
    : filePath;
  await Bun.write(`${BACKUP_BASE_PATH}/${backupKey}/${relativePath}`, file);
};

export const appendContent = async (filePath: string, content: string) => {
  if (await containsString(filePath, content)) return;
  await appendFile(filePath, `\n${content}`);
};

const containsString = async (
  filePath: string,
  searchString: string,
): Promise<boolean> => {
  try {
    const content = await readFile(filePath, 'utf-8');
    return content.includes(searchString);
  } catch (error) {
    consola.error(`Error reading file ${filePath}:`, error);
    return false;
  }
};

export const generateBackupKey = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
};

export const isUnlocked = async () => {
  const status = await $`bw status`.text();
  return status.includes('unlocked');
};

export const replaceHomeFile = async (
  backupKey: string,
  configDir: string,
  fileName: string,
) => {
  await replaceFile(backupKey, HomePath, configDir, fileName);
};

export const replaceFile = async (
  backupKey: string,
  targetPath: string,
  configDir: string,
  fileName: string,
) => {
  consola.info(`Setting up ${fileName}...`);
  try {
    const configPath = getConfigPath(`${configDir}/${fileName}`);

    // Configファイルのバックアップ
    const targetFilePath = `${targetPath}/${fileName}`;
    await backupFile(backupKey, targetFilePath);

    // Configファイルの作成
    const file = Bun.file(configPath);
    await Bun.write(targetFilePath, file);
  } catch (error) {
    consola.error(`Error setting up ${fileName} config:`, error);
  }
};

export const replaceHomeConfigFile = async (
  configDir: string,
  fileName: string,
) => {
  await replaceConfigFile(HomePath, configDir, fileName);
};

export const replaceConfigFile = async (
  targetPath: string,
  configDir: string,
  fileName: string,
) => {
  consola.info(`Setting up ${fileName}...`);
  try {
    const configPath = getConfigPath(`${configDir}/${fileName}`);
    const targetFilePath = `${targetPath}/${fileName}`;

    const file = Bun.file(targetFilePath);
    await Bun.write(configPath, file);
  } catch (error) {
    consola.error(`Error setting up ${fileName} config:`, error);
  }
};
