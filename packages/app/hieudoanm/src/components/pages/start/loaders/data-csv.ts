import { ComponentType } from 'react';

const loadCsvToExcel = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/data-csv/CsvToExcelModal').then(
    (m) => ({ default: m.CsvToExcelModal })
  );

const loadCsvToJson = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/data-csv/CsvToJsonModal').then(
    (m) => ({ default: m.CsvToJsonModal })
  );

const loadCsvToXml = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/data-csv/CsvToXmlModal').then(
    (m) => ({ default: m.CsvToXmlModal })
  );

const loadSplitCsv = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/data-csv/SplitCsvModal').then(
    (m) => ({ default: m.SplitCsvModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'csv-to-excel': loadCsvToExcel,
  'csv-to-json': loadCsvToJson,
  'csv-to-xml': loadCsvToXml,
  'split-csv': loadSplitCsv,
};
