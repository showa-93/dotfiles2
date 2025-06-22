import type { Command } from 'commander';
import { dumpBrew } from '../configs/brew';
import { dumpClaude } from '../configs/claude';
import { dumpGit } from '../configs/git';
import { dumpMise } from '../configs/mise';
import { dumpOhMyPosh } from '../configs/oh_my_posh';
import { dumpVSCode } from '../configs/vscode';
import { dumpZsh } from '../configs/zsh';

interface DumpOptions {
  target?: string[];
  exclude?: string[];
}

const dumpCommand = (program: Command) => {
  program
    .command('dump')
    .description('Dump PC with dotfiles')
    .option('-t, --target [targets...]', '出力するセットアップを指定')
    .option('-e, --exclude [targets...]', '除外するセットアップを指定')
    .action(async (options: DumpOptions) => {
      let targets = [
        'brew',
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

      if (targets.includes('brew')) await dumpBrew();
      if (targets.includes('git')) await dumpGit();
      if (targets.includes('oh-my-posh')) await dumpOhMyPosh();
      if (targets.includes('vscode')) await dumpVSCode();
      if (targets.includes('mise')) await dumpMise();
      if (targets.includes('zsh')) await dumpZsh();
      if (targets.includes('claude')) await dumpClaude();
    });
};

export default dumpCommand;
