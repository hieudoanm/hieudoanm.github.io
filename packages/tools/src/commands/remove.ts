import { Command, Args } from '@oclif/core';
import { rimraf } from 'rimraf';

export default class Remove extends Command {
  static description = 'Remove files or directories (comma-separated)';

  static args = {
    paths: Args.string({
      name: 'paths',
      required: true,
      description: 'Comma-separated list of paths (e.g. .next,dist,../../docs)',
    }),
  };

  async run() {
    const { args } = await this.parse(Remove);

    // 👇 split by comma + trim spaces
    const paths = args.paths
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    this.log('🧹 Starting cleanup...\n');

    for (const p of paths) {
      this.log(`• Removing: ${p}`);
    }

    try {
      await rimraf(paths);

      this.log('\n✅ Successfully removed:');
      for (const p of paths) {
        this.log(`   - ${p}`);
      }
    } catch (error) {
      this.error(`❌ Failed to remove paths: ${(error as Error).message}`);
    }
  }
}
