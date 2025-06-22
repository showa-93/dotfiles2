import { $ } from 'bun';
import { HomePath, replaceConfigFile, replaceFile } from './utils';

const CLAUDE_PATH = 'claude.md';
const SETTINGS_PATH = 'settings.json';

export const setupClaude = async (backupKey: string) => {
  $`npm install -g @anthropic-ai/claude-code`;
  await replaceFile(backupKey, `${HomePath}/.claude`, 'claude', CLAUDE_PATH);
  await replaceFile(backupKey, `${HomePath}/.claude`, 'claude', SETTINGS_PATH);
};

export const dumpClaude = async () => {
  await replaceConfigFile(`${HomePath}/.claude`, 'claude', CLAUDE_PATH);
  await replaceConfigFile(`${HomePath}/.claude`, 'claude', SETTINGS_PATH);
};

export const applyClaude = async (backupKey: string) => {
  await replaceFile(backupKey, `${HomePath}/.claude`, 'claude', CLAUDE_PATH);
  await replaceFile(backupKey, `${HomePath}/.claude`, 'claude', SETTINGS_PATH);
};
