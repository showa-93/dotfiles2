import { Command } from 'commander';
import applyCommand from './src/command/apply';
import dumpCommand from './src/command/dump';
import setupCommand from './src/command/setup';

const program = new Command();

program.name('dotfiles').description('Dotfiles CLI').version('0.1.0');

setupCommand(program);
dumpCommand(program);
applyCommand(program);

program.parse(process.argv);
