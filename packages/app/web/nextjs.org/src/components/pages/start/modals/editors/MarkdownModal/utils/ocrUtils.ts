import { tryCatch } from '@lodashx/ts';
import Tesseract from 'tesseract.js';

export const recognizeTextFromImage = async (
  file: File,
  onProgress?: (m: string) => void
): Promise<string> => {
  const { data, error } = await tryCatch(
    Tesseract.recognize(file, 'eng', {
      logger: (m) => onProgress?.(JSON.stringify(m)),
    })
  );
  if (error) return '';
  return data?.data?.text?.trim() ?? '';
};
