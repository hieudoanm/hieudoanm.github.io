import { ComponentType, lazy } from 'react';

const loadjson_schema = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/editors/JSONSchemaModal').then(
    (m) => ({ default: m.JSONSchemaModal })
  );

const loadword_counter = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/editors/WordCounterModal').then(
    (m) => ({ default: m.WordCounterModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'json-schema': loadjson_schema,
  'word-counter': loadword_counter,
};
