import fs from 'node:fs/promises';
import prettier from 'prettier';

export const runFormat = async (
  patterns: string[],
  write = false
): Promise<number> => {
  let hasError = false;

  for (const file of patterns) {
    const content = await fs.readFile(file, 'utf8');
    const config = await prettier.resolveConfig(file);

    const formatted = await prettier.format(content, {
      ...config,
      filepath: file,
    });

    if (write) {
      await fs.writeFile(file, formatted);
    } else if (formatted !== content) {
      console.log(`✖ ${file} is not formatted`);
      hasError = true;
    }
  }

  return hasError ? 1 : 0;
};
