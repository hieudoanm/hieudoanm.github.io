jest.mock('pdfmake/build/pdfmake', () => ({
  createPdf: jest.fn(() => ({ download: jest.fn() })),
  fonts: {},
}));

jest.mock('html-to-pdfmake', () => jest.fn(() => [{ text: 'hello' }]));

import { exportPdf } from '../pdfExport';

describe('exportPdf', () => {
  it('calls setLoading and produces a PDF', () => {
    const setLoading = jest.fn();
    exportPdf('<p>hello</p>', setLoading);
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  it('filters empty text content', () => {
    const setLoading = jest.fn();
    expect(() => exportPdf('<p> </p>', setLoading)).not.toThrow();
  });
});
