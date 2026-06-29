import { ComponentType, lazy } from 'react';

const loadjson_to_csv = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/JsonToCsvModal').then(
    (m) => ({ default: m.JsonToCsvModal })
  );

const loadjson_to_xml = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/JsonToXmlModal').then(
    (m) => ({ default: m.JsonToXmlModal })
  );

const loadxml_to_csv = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/XmlToCsvModal').then(
    (m) => ({ default: m.XmlToCsvModal })
  );

const loadxml_to_excel = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/XmlToExcelModal').then(
    (m) => ({ default: m.XmlToExcelModal })
  );

const loadxml_to_json = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data/xml-json/XmlToJsonModal').then(
    (m) => ({ default: m.XmlToJsonModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'json-to-csv': loadjson_to_csv,
  'json-to-xml': loadjson_to_xml,
  'xml-to-csv': loadxml_to_csv,
  'xml-to-excel': loadxml_to_excel,
  'xml-to-json': loadxml_to_json,
};
