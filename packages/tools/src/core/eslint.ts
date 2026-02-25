import { ESLint } from 'eslint';

export const runLint = async (
  patterns: string[],
  fix = false
): Promise<number> => {
  const eslint = new ESLint({ fix });

  const results = await eslint.lintFiles(patterns);

  if (fix) {
    await ESLint.outputFixes(results);
  }

  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);

  if (resultText) {
    console.log(resultText);
  }

  const errorCount = results.reduce((sum, r) => sum + r.errorCount, 0);

  return errorCount > 0 ? 1 : 0;
};
