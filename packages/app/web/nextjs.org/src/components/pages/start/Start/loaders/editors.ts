import { ComponentType, lazy } from 'react';

const loadjson_schema = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/editors/JSONSchemaModal').then(
    (m) => ({ default: m.JSONSchemaModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'json-schema': loadjson_schema,
};
