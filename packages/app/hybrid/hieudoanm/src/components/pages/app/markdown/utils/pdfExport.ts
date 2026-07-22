export const exportPdf = async (
  html: string,
  setLoading: (v: boolean) => void
) => {
  try {
    const { default: html2canvas } = await import('html2canvas-pro');
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.cssText =
      'padding:40px;font-family:Georgia,serif;line-height:1.6;max-width:700px;background:white;color:black';
    document.body.appendChild(container);
    const canvas = await html2canvas(container, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
    });
    document.body.removeChild(container);
    const imgData = canvas.toDataURL('image/png');
    const { default: jsPDF } = await import('jspdf');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('output.pdf');
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};
