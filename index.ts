import { Command } from 'commander';
import setupCommand from './src/command/setup';

const program = new Command();

program.name('dotfiles').description('Dotfiles CLI').version('0.1.0');

setupCommand(program);

program.parse(process.argv);
