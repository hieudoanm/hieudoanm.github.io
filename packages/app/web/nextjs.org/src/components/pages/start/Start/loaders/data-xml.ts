import { ComponentType, lazy } from 'react';

const loadxml_to_csv = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-xml/XmlToCsvModal').then(
    (m) => ({ default: m.XmlToCsvModal })
  );

const loadxml_to_excel = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-xml/XmlToExcelModal').then(
    (m) => ({ default: m.XmlToExcelModal })
  );

const loadxml_to_json = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-xml/XmlToJsonModal').then(
    (m) => ({ default: m.XmlToJsonModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'xml-to-csv': loadxml_to_csv,
  'xml-to-excel': loadxml_to_excel,
  'xml-to-json': loadxml_to_json,
};
