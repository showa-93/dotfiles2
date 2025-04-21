import type { Command } from 'commander';
import { applyBrew } from '../configs/brew';
import { applyGit } from '../configs/git';
import { applyMise } from '../configs/mise';
import { applyOhMyPosh } from '../configs/oh_my_posh';
import { generateBackupKey } from '../configs/utils';
import { applyVSCode } from '../configs/vscode';
import { applyZsh } from '../configs/zsh';

interface ApplyOptions {
  target?: string[];
  exclude?: string[];
}

const dumpCommand = (program: Command) => {
  program
    .command('apply')
    .description('Apply PC with dotfiles')
    .option('-t, --target [targets...]', '実行するセットアップを指定')
    .option('-e, --exclude [targets...]', '除外するセットアップを指定')
    .action(async (options: ApplyOptions) => {
      let targets = ['brew', 'git', 'oh-my-posh', 'vscode', 'mise', 'zsh'];
      if (options.target && options.target.length > 0) {
        targets = targets.filter((target) => options.target?.includes(target));
      }
      if (options.exclude && options.exclude.length > 0) {
        targets = targets.filter(
          (target) => !options.exclude?.includes(target),
        );
      }

      const backupKey = generateBackupKey();

      if (targets.includes('brew')) await applyBrew();
      if (targets.includes('git')) await applyGit(backupKey);
      if (targets.includes('oh-my-posh')) await applyOhMyPosh(backupKey);
      if (targets.includes('vscode')) await applyVSCode(backupKey);
      if (targets.includes('mise')) await applyMise(backupKey);
      if (targets.includes('zsh')) await applyZsh(backupKey);
    });
};

export default dumpCommand;
