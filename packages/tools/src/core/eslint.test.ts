import { ESLint } from 'eslint';
import { runLint } from './eslint.js';

jest.mock('eslint', () => {
  return {
    ESLint: jest.fn(),
  };
});

describe('runLint', () => {
  const mockLintFiles = jest.fn();
  const mockLoadFormatter = jest.fn();
  const mockFormat = jest.fn();
  const mockOutputFixes = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (ESLint as unknown as jest.Mock).mockImplementation(() => ({
      lintFiles: mockLintFiles,
      loadFormatter: mockLoadFormatter,
    }));

    mockLoadFormatter.mockResolvedValue({
      format: mockFormat,
    });

    // mock static method
    ESLint.outputFixes = mockOutputFixes;
  });

  it('returns 0 when no errors', async () => {
    mockLintFiles.mockResolvedValue([{ errorCount: 0 }]);
    mockFormat.mockReturnValue('');

    const result = await runLint(['file.ts']);

    expect(result).toBe(0);
  });

  it('returns 1 when errors exist', async () => {
    mockLintFiles.mockResolvedValue([{ errorCount: 2 }]);
    mockFormat.mockReturnValue('');

    const result = await runLint(['file.ts']);

    expect(result).toBe(1);
  });

  it('calls outputFixes when fix=true', async () => {
    mockLintFiles.mockResolvedValue([{ errorCount: 0 }]);
    mockFormat.mockReturnValue('');

    await runLint(['file.ts'], true);

    expect(mockOutputFixes).toHaveBeenCalled();
  });

  it('logs formatted output if present', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    mockLintFiles.mockResolvedValue([{ errorCount: 1 }]);
    mockFormat.mockReturnValue('formatted output');

    await runLint(['file.ts']);

    expect(consoleSpy).toHaveBeenCalledWith('formatted output');

    consoleSpy.mockRestore();
  });
});
