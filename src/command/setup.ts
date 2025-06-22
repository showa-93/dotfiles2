import type { Command } from 'commander';
import consola from 'consola';
import { setupBrew } from '../configs/brew';
import { setupClaude } from '../configs/claude';
import { setupGit } from '../configs/git';
import { setupMise } from '../configs/mise';
import { setupOhMyPosh } from '../configs/oh_my_posh';
import { setupSSH } from '../configs/ssh';
import { generateBackupKey, isUnlocked } from '../configs/utils';
import { setupVSCode } from '../configs/vscode';
import { setupZsh } from '../configs/zsh';

interface SetupOptions {
  target?: string[];
  exclude?: string[];
}

const setupCommand = (program: Command) => {
  program
    .command('setup')
    .description('Setup PC with dotfiles')
    .option('-t, --target [targets...]', '実行するセットアップを指定')
    .option('-e, --exclude [targets...]', '除外するセットアップを指定')
    .action(async (options: SetupOptions) => {
      consola.info('Start setup dotfiles...');
      if (!(await isUnlocked())) {
        consola.error('Bitwarden is locked. Please unlock it first.');
        return;
      }

      let targets = [
        'brew',
        'ssh',
        'git',
        'oh-my-posh',
        'vscode',
        'mise',
        'zsh',
        'claude',
      ];
      if (options.target && options.target.length > 0) {
        targets = targets.filter((target) => options.target?.includes(target));
      }
      if (options.exclude && options.exclude.length > 0) {
        targets = targets.filter(
          (target) => !options.exclude?.includes(target),
        );
      }

      const backupKey = generateBackupKey();

      if (targets.includes('brew')) await setupBrew();
      if (targets.includes('ssh')) await setupSSH(backupKey);
      if (targets.includes('git')) await setupGit(backupKey);
      if (targets.includes('oh-my-posh')) await setupOhMyPosh(backupKey);
      if (targets.includes('vscode')) await setupVSCode(backupKey);
      if (targets.includes('mise')) await setupMise(backupKey);
      if (targets.includes('zsh')) await setupZsh(backupKey);
      if (targets.includes('claude')) await setupClaude(backupKey);
    });
};

export default setupCommand;
