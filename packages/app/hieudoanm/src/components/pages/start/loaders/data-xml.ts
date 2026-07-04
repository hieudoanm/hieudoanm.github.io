import { ComponentType } from 'react';

const loadXmlToCsv = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/data-xml/XmlToCsvModal').then(
    (m) => ({ default: m.XmlToCsvModal })
  );

const loadXmlToExcel = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/data-xml/XmlToExcelModal').then(
    (m) => ({ default: m.XmlToExcelModal })
  );

const loadXmlToJson = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/data-xml/XmlToJsonModal').then(
    (m) => ({ default: m.XmlToJsonModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'xml-to-csv': loadXmlToCsv,
  'xml-to-excel': loadXmlToExcel,
  'xml-to-json': loadXmlToJson,
};
