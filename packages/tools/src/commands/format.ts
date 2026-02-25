import { Command, Flags, Args } from '@oclif/core';
import { runFormat } from '../core/prettier.js';

export default class Format extends Command {
  static description = 'Run Prettier';

  static flags = {
    cache: Flags.boolean({
      char: 'c',
      description: 'Enable cache',
    }),
    write: Flags.boolean({
      char: 'w',
      description: 'Write changes to files',
    }),
  };

  static args = {
    patterns: Args.string({
      description: 'File patterns to format',
      required: false,
      default: '.',
    }),
  };

  async run() {
    const { args, flags } = await this.parse(Format);

    const patterns = args.patterns ? [args.patterns] : ['.'];

    const exitCode = await runFormat(patterns, {
      cache: flags.cache ?? false,
      write: flags.write ?? false,
    });

    this.exit(exitCode);
  }
}
