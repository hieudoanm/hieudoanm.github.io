const PRINT_STYLE_ID = 'resume-print-style';

export const injectPrintStyles = (widthMm: number, heightMm: number): void => {
  let style = document.getElementById(
    PRINT_STYLE_ID
  ) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = PRINT_STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = `
    @page { size: ${widthMm}mm ${heightMm}mm; margin: 0; }
    @media print {
      body * { visibility: hidden; }
      #resume-sheet, #resume-sheet * { visibility: visible; }
      #resume-sheet { position: absolute; left: 0; top: 0; margin: 0; }
      [data-resume-scale] { transform: none !important; }
      html, body { height: auto !important; overflow: visible !important; }
    }
  `;
};

export const printResume = (widthMm: number, heightMm: number): void => {
  injectPrintStyles(widthMm, heightMm);
  window.print();
};

export const buildResumeHtml = (
  sheet: HTMLElement,
  widthMm: number,
  heightMm: number
): string => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Resume</title>
<style>
  @page { size: ${widthMm}mm ${heightMm}mm; margin: 0; }
  html, body { margin: 0; padding: 0; background: #ffffff; }
</style>
</head>
<body>
${sheet.outerHTML}
</body>
</html>`;

export const downloadResumeHtml = (
  sheet: HTMLElement,
  filename: string,
  widthMm: number,
  heightMm: number
): void => {
  const html = buildResumeHtml(sheet, widthMm, heightMm);

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
