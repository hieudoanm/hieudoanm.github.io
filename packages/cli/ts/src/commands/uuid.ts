import { Command } from '@oclif/core';
import { v4 } from 'uuid';

export default class Uuid extends Command {
  static override readonly args = {};
  static override readonly description = 'describe the command here';
  static override readonly examples = ['<%= config.bin %> <%= command.id %>'];

  public async run(): Promise<void> {
    this.log(v4());
  }
}
