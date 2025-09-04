import { Command, Flags, Args } from '@oclif/core';
import { runLint } from '../core/eslint.js';

export default class Lint extends Command {
  static description = 'Run ESLint';

  static flags = {
    fix: Flags.boolean({
      char: 'f',
      description: 'Automatically fix problems',
      default: false,
    }),
  };

  static args = {
    patterns: Args.string({
      description: 'File patterns',
      multiple: true,
    }),
  };

  async run() {
    const { args, flags } = await this.parse(Lint);

    const patterns = Array.isArray(args.patterns)
      ? args.patterns
      : args.patterns
        ? [args.patterns]
        : ['.'];

    const exitCode = await runLint(patterns, flags.fix);

    this.exit(exitCode);
  }
}
