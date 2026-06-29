import { ComponentType, lazy } from 'react';

const loadjson_to_csv = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-json/JsonToCsvModal').then(
    (m) => ({ default: m.JsonToCsvModal })
  );

const loadjson_to_xml = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-json/JsonToXmlModal').then(
    (m) => ({ default: m.JsonToXmlModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'json-to-csv': loadjson_to_csv,
  'json-to-xml': loadjson_to_xml,
};
