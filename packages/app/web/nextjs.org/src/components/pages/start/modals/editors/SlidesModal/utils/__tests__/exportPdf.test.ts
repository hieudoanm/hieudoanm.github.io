jest.mock('file-saver', () => ({ saveAs: jest.fn() }));

jest.mock('html2canvas-pro', () =>
  jest.fn(() =>
    Promise.resolve({
      toDataURL: jest.fn(() => 'data:image/png;base64,iVBOR'),
    })
  )
);

jest.mock('pdf-lib', () => ({
  PDFDocument: {
    create: jest.fn(() =>
      Promise.resolve({
        addPage: jest.fn(() => ({ drawImage: jest.fn() })),
        embedPng: jest.fn(() => Promise.resolve({})),
        save: jest.fn(() => Promise.resolve(new Uint8Array(10))),
      })
    ),
  },
}));

jest.mock('../colors', () => ({
  applyExportSafeColors: jest.fn(() => jest.fn()),
  inlineTailwindStyles: jest.fn(),
  labToHex: jest.fn(() => '#000000'),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({ arrayBuffer: () => Promise.resolve(new ArrayBuffer(10)) })
) as jest.Mock;

import { exportPdf } from '../exportPdf';

describe('exportPdf', () => {
  const data: any = { title: { product: 'Test' } };

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('throws when #pitch-preview is not found', async () => {
    await expect(
      exportPdf(data, jest.fn(), jest.fn(), jest.fn())
    ).rejects.toThrow('#pitch-preview not found');
  });

  it('throws when no slides found', async () => {
    const preview = document.createElement('div');
    preview.id = 'pitch-preview';
    document.body.appendChild(preview);
    await expect(
      exportPdf(data, jest.fn(), jest.fn(), jest.fn())
    ).rejects.toThrow('No slides found');
  });

  it('creates PDF from slides', async () => {
    const preview = document.createElement('div');
    preview.id = 'pitch-preview';
    const slide = document.createElement('div');
    slide.className = 'aspect-video';
    preview.appendChild(slide);
    document.body.appendChild(preview);
    document.documentElement.style.backgroundColor = '';
    document.body.style.backgroundColor = '';

    const onProgress = jest.fn();
    const onError = jest.fn();
    const onSuccess = jest.fn();
    await exportPdf(data, onProgress, onError, onSuccess);
    expect(onProgress).toHaveBeenCalledWith('Generating PDF…');
    expect(onSuccess).toHaveBeenCalledWith('PDF exported successfully');
  });

  it('handles lab background color on html element', async () => {
    const preview = document.createElement('div');
    preview.id = 'pitch-preview';
    const slide = document.createElement('div');
    slide.className = 'aspect-video';
    preview.appendChild(slide);
    document.body.appendChild(preview);
    document.documentElement.style.backgroundColor = 'lab(50 20 -30)';
    document.body.style.backgroundColor = '';

    const { labToHex } = require('../colors');

    const onProgress = jest.fn();
    const onError = jest.fn();
    const onSuccess = jest.fn();
    await exportPdf(data, onProgress, onError, onSuccess);
    expect(labToHex).toHaveBeenCalledWith('lab(50 20 -30)');
  });

  it('handles lab background color on body element', async () => {
    const preview = document.createElement('div');
    preview.id = 'pitch-preview';
    const slide = document.createElement('div');
    slide.className = 'aspect-video';
    preview.appendChild(slide);
    document.body.appendChild(preview);
    document.documentElement.style.backgroundColor = '';
    document.body.style.backgroundColor = 'lab(40 15 -10)';

    const { labToHex } = require('../colors');

    const onProgress = jest.fn();
    const onError = jest.fn();
    const onSuccess = jest.fn();
    await exportPdf(data, onProgress, onError, onSuccess);
    expect(labToHex).toHaveBeenCalledWith('lab(40 15 -10)');
  });
});
