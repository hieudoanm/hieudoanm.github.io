import { Config } from '@oclif/core';
import { runLint } from '../core/eslint.js';
import { runFormat } from '../core/prettier.js';
import Check from './check.js';

jest.mock('../core/eslint.js', () => ({
  runLint: jest.fn(),
}));

jest.mock('../core/prettier.js', () => ({
  runFormat: jest.fn(),
}));

const mockedRunLint = runLint as jest.MockedFunction<typeof runLint>;
const mockedRunFormat = runFormat as jest.MockedFunction<typeof runFormat>;

describe('Check command', () => {
  let exitSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createCommand = () => {
    const cmd = new Check([], {} as Config);
    exitSpy = jest.spyOn(cmd, 'exit').mockImplementation(() => {
      throw new Error('process.exit');
    });
    return cmd;
  };

  it('exits 0 when both lint and format pass', async () => {
    mockedRunLint.mockResolvedValue(0);
    mockedRunFormat.mockResolvedValue(0);

    const cmd = createCommand();

    await expect(cmd.run()).rejects.toThrow('process.exit');

    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  it('exits 1 when lint fails', async () => {
    mockedRunLint.mockResolvedValue(1);
    mockedRunFormat.mockResolvedValue(0);

    const cmd = createCommand();

    await expect(cmd.run()).rejects.toThrow('process.exit');

    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('exits 1 when format fails', async () => {
    mockedRunLint.mockResolvedValue(0);
    mockedRunFormat.mockResolvedValue(1);

    const cmd = createCommand();

    await expect(cmd.run()).rejects.toThrow('process.exit');

    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('exits 1 when both fail', async () => {
    mockedRunLint.mockResolvedValue(1);
    mockedRunFormat.mockResolvedValue(1);

    const cmd = createCommand();

    await expect(cmd.run()).rejects.toThrow('process.exit');

    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
