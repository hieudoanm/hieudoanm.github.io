import { Command } from '@oclif/core';
import { runLint } from '../core/eslint.js';
import { runFormat } from '../core/prettier.js';

export default class Check extends Command {
  static description = 'Run lint and format in check mode';

  async run() {
    const lintExit = await runLint(['.'], false);
    const formatExit = await runFormat(['.'], { cache: false, write: false });

    const finalExit = lintExit || formatExit;

    this.exit(finalExit);
  }
}
