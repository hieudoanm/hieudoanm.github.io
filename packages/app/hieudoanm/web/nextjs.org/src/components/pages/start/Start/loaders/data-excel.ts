import { ComponentType } from 'react';

const loadExcelToCsv = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-excel/ExcelToCsvModal').then(
    (m) => ({ default: m.ExcelToCsvModal })
  );

const loadExcelToPdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-excel/ExcelToPdfModal').then(
    (m) => ({ default: m.ExcelToPdfModal })
  );

const loadExcelToXml = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-excel/ExcelToXmlModal').then(
    (m) => ({ default: m.ExcelToXmlModal })
  );

const loadSplitExcel = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-excel/SplitExcelModal').then(
    (m) => ({ default: m.SplitExcelModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'excel-to-csv': loadExcelToCsv,
  'excel-to-pdf': loadExcelToPdf,
  'excel-to-xml': loadExcelToXml,
  'split-excel': loadSplitExcel,
};
