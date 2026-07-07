export const recognizeTextFromImage = async (file: File): Promise<string> => {
  try {
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('eng');
    const {
      data: { text },
    } = await worker.recognize(file);
    await worker.terminate();
    return text;
  } catch {
    return '';
  }
};
