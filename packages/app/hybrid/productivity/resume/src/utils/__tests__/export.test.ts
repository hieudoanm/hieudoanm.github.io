import { seedResumeData } from '../../data/seed';
import {
  downloadResumeFile,
  downloadResumeHtml,
  injectPrintStyles,
  printResume,
} from '../export';

describe('export utils', () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const originalRevokeObjectURL = URL.revokeObjectURL;

  afterEach(() => {
    jest.restoreAllMocks();
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
    document.getElementById('resume-print-style')?.remove();
    document.getElementById('resume-sheet')?.remove();
  });

  it('injects a print style element with the page size', () => {
    injectPrintStyles(210, 297);
    const style = document.getElementById(
      'resume-print-style'
    ) as HTMLStyleElement | null;
    expect(style).not.toBeNull();
    expect(style?.textContent).toContain('@page { size: 210mm 297mm');
  });

  it('replaces the existing print style on re-injection', () => {
    injectPrintStyles(210, 297);
    injectPrintStyles(148, 210);
    const style = document.getElementById(
      'resume-print-style'
    ) as HTMLStyleElement | null;
    expect(style?.textContent).toContain('size: 148mm 210mm');
  });

  it('calls window.print', () => {
    const printSpy = jest
      .spyOn(window, 'print')
      .mockImplementation(() => undefined);
    printResume(210, 297);
    expect(printSpy).toHaveBeenCalled();
  });

  it('downloads a self-contained HTML file', () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    const revokeObjectURL = jest.fn();
    URL.createObjectURL = createObjectURL as typeof URL.createObjectURL;
    URL.revokeObjectURL = revokeObjectURL as typeof URL.revokeObjectURL;
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    const sheet = document.createElement('div');
    sheet.id = 'resume-sheet';
    sheet.innerHTML = '<p>Hello</p>';

    downloadResumeHtml(sheet, 'test-resume.html', 210, 297);

    expect(createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalled();
  });

  it('downloads the rendered sheet as resume HTML with a dated name', () => {
    const createObjectURL = jest.fn(() => 'blob:mock');
    const revokeObjectURL = jest.fn();
    URL.createObjectURL = createObjectURL as typeof URL.createObjectURL;
    URL.revokeObjectURL = revokeObjectURL as typeof URL.revokeObjectURL;
    const clickSpy = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    const sheet = document.createElement('div');
    sheet.id = 'resume-sheet';
    sheet.innerHTML = '<p>Rendered</p>';
    document.body.appendChild(sheet);

    const ok = downloadResumeFile(seedResumeData, {
      id: 'a4',
      label: 'A4',
      widthMm: 210,
      heightMm: 297,
    });

    expect(ok).toBe(true);
    expect(clickSpy).toHaveBeenCalled();
    expect(createObjectURL).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalled();
  });

  it('reports failure when the sheet is not rendered yet', () => {
    expect(
      downloadResumeFile(seedResumeData, {
        id: 'a4',
        label: 'A4',
        widthMm: 210,
        heightMm: 297,
      })
    ).toBe(false);
  });
});
