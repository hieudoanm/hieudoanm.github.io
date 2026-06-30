import { ComponentType } from 'react';

const loadJsonToCsv = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-json/JsonToCsvModal').then(
    (m) => ({ default: m.JsonToCsvModal })
  );

const loadJsonToXml = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/data-json/JsonToXmlModal').then(
    (m) => ({ default: m.JsonToXmlModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'json-to-csv': loadJsonToCsv,
  'json-to-xml': loadJsonToXml,
};
