#!/usr/bin/env node

import { Command } from 'commander';
import figlet from 'figlet';

console.log(figlet('HIEU DOAN'));

const program = new Command();

// Define the CLI version and description
const version = '0.0.1';
program
  .version(version)
  .description('A sample CLI built with TypeScript')
  .option('-i, --info', 'Get Info');

const options = program.opts();

if (options.i || options.info) {
  console.log(figlet('HIEU DOAN'));
}

program
  .command('hello')
  .description('Hello World!')
  .action(() => {
    console.log('Hello World!');
  });

program
  .command('date')
  .description('Get Date')
  .action(() => {
    const [date] = new Date().toISOString().split('T');
    console.log(date);
  });

program
  .command('time')
  .description('Get Time')
  .action(() => {
    const [, time] = new Date().toISOString().split('T');
    console.log(time);
  });

program
  .command('week')
  .description('Get Week')
  .action(() => {
    const weekdays: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const oneDay: number = 1000 * 60 * 60 * 24;
    const d = new Date();
    const currentWeekday: number = d.getDay();
    const currentTimestamp: number = d.getTime();
    const weekdaysTable = [];
    for (let index = 0; index < 7; index++) {
      const diffDays = currentWeekday - index;
      const diffTimestamp = currentTimestamp - diffDays * oneDay;
      const [date] = new Date(diffTimestamp).toISOString().split('T');
      weekdaysTable.push({ weekday: weekdays[index], date });
    }
    console.table(weekdaysTable);
  });

program.parse(process.argv);
