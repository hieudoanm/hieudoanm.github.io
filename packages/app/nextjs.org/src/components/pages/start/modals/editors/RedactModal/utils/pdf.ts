import { rgb } from 'pdf-lib';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { RedactionBox } from '../types';

export async function exportRedactedPdf(
  file: File,
  redactions: Record<number, RedactionBox[]>,
  scale: number
) {
  const buffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buffer);

  Object.entries(redactions).forEach(([pageIndexStr, boxes]) => {
    const pageIndex = Number(pageIndexStr);
    const page = pdfDoc.getPage(pageIndex);
    boxes.forEach(({ x, y, width, height }) => {
      page.drawRectangle({
        x,
        y: page.getHeight() - y - height,
        width,
        height,
        color: rgb(0, 0, 0),
      });
    });
  });

  const modifiedBytes = await pdfDoc.save();
  const arrayBuffer = modifiedBytes.slice().buffer;
  saveAs(new Blob([arrayBuffer], { type: 'application/pdf' }), 'redacted.pdf');
}
