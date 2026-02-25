import { execa } from 'execa';

export const runFormat = async (
  patterns: string[],
  { cache = false, write = false }: { cache: boolean; write: boolean }
) => {
  const args = [
    ...patterns,
    ...(cache ? ['--cache'] : []),
    ...(write ? ['--write'] : ['--check']),
  ];

  try {
    await execa('prettier', args, { stdio: 'inherit' });
    return 0;
  } catch {
    return 1;
  }
};
