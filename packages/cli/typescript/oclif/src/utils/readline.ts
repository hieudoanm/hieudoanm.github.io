import readline from 'node:readline';

export const readlineSync = async (question: string): Promise<string> => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`${question}: `, (answer: string) => {
      resolve(answer);
      rl.close();
    });
  });
};
