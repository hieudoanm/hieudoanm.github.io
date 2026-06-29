import { ComponentType, lazy } from 'react';

const loadexcel_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/excel/ExcelToPdfModal').then(
    (m) => ({ default: m.ExcelToPdfModal })
  );

const loadexcel_to_xml = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/excel/ExcelToXmlModal').then(
    (m) => ({ default: m.ExcelToXmlModal })
  );

const loadsplit_excel = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/excel/SplitExcelModal').then(
    (m) => ({ default: m.SplitExcelModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'excel-to-pdf': loadexcel_to_pdf,
  'excel-to-xml': loadexcel_to_xml,
  'split-excel': loadsplit_excel,
};
