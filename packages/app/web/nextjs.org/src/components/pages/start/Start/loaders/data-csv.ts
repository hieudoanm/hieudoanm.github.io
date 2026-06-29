import { ComponentType, lazy } from 'react';

const loadcsv_to_excel = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/csv/CsvToExcelModal').then(
    (m) => ({ default: m.CsvToExcelModal })
  );
const loadcsv_to_json = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/csv/CsvToJsonModal').then(
    (m) => ({ default: m.CsvToJsonModal })
  );
const loadcsv_to_xml = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/csv/CsvToXmlModal').then(
    (m) => ({ default: m.CsvToXmlModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'csv-to-excel': loadcsv_to_excel,
  'csv-to-json': loadcsv_to_json,
  'csv-to-xml': loadcsv_to_xml,
};
