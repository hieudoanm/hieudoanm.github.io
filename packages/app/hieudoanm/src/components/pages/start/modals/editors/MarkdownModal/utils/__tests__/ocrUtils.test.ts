import { recognizeTextFromImage } from '../ocrUtils';

jest.mock('tesseract.js', () => ({
  recognize: jest.fn(),
}));

jest.mock('@lodashx/ts', () => ({
  tryCatch: jest.fn((promise: Promise<unknown>) =>
    promise.then(
      (data) => ({ data, error: null }),
      (error) => ({ data: null, error })
    )
  ),
}));

import Tesseract from 'tesseract.js';

describe('recognizeTextFromImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns recognized text on success', async () => {
    const mockResult = { data: { text: 'Hello World\n' } };
    (Tesseract.recognize as jest.Mock).mockResolvedValue(mockResult);

    const file = new File([''], 'test.png', { type: 'image/png' });
    const result = await recognizeTextFromImage(file);

    expect(result).toBe('Hello World');
    expect(Tesseract.recognize).toHaveBeenCalledWith(
      file,
      'eng',
      expect.any(Object)
    );
  });

  it('calls onProgress when provided', async () => {
    const mockResult = { data: { text: 'test' } };
    (Tesseract.recognize as jest.Mock).mockImplementation(
      (
        _file: File,
        _lang: string,
        { logger }: { logger: (m: unknown) => void }
      ) => {
        logger({ status: 'recognizing', progress: 0.5 });
        return Promise.resolve(mockResult);
      }
    );

    const onProgress = jest.fn();
    const file = new File([''], 'test.png', { type: 'image/png' });
    await recognizeTextFromImage(file, onProgress);

    expect(onProgress).toHaveBeenCalledWith(
      expect.stringContaining('recognizing')
    );
  });

  it('returns empty string on error', async () => {
    (Tesseract.recognize as jest.Mock).mockRejectedValue(
      new Error('OCR failed')
    );

    const file = new File([''], 'test.png', { type: 'image/png' });
    const result = await recognizeTextFromImage(file);

    expect(result).toBe('');
  });
});
