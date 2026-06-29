import { ComponentType, lazy } from 'react';

const loadexcel_to_csv = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/csv/ExcelToCsvModal').then(
    (m) => ({ default: m.ExcelToCsvModal })
  );
const loadexcel_to_pdf = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/excel/ExcelToPdfModal').then(
    (m) => ({ default: m.ExcelToPdfModal })
  );
const loadexcel_to_xml = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/excel/ExcelToXmlModal').then(
    (m) => ({ default: m.ExcelToXmlModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'excel-to-csv': loadexcel_to_csv,
  'excel-to-pdf': loadexcel_to_pdf,
  'excel-to-xml': loadexcel_to_xml,
};
