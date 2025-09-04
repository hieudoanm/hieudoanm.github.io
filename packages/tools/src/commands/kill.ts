import { Command, Args } from '@oclif/core';
import killPort from 'kill-port';

export default class Kill extends Command {
  static description = 'Kill a process running on a given port';

  static args = {
    port: Args.string({
      required: true,
      description: 'Port number to kill',
    }),
  };

  async run() {
    const { args } = await this.parse(Kill);

    const port = parseInt(args.port, 10);

    if (Number.isNaN(port)) {
      this.log(`Invalid port: ${args.port}`);
      return;
    }

    try {
      await killPort(port);
      this.log(`Killed port ${port}`);
    } catch (error) {
      // ✅ Log error normally
      this.log((error as Error).message);
    }
  }
}
