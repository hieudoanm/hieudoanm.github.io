import { ComponentType, lazy } from 'react';

const loadtext_case = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/developer/TextCaseModal').then(
    (m) => ({ default: m.TextCaseModal })
  );
const loadtext_diff = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/developer/TextDiffModal').then(
    (m) => ({ default: m.TextDiffModal })
  );
const loadtext_password = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/TextPasswordModal').then(
    (m) => ({ default: m.TextPasswordModal })
  );
const loadtext_url_tracer = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/developer/TextUrlTracerModal').then(
    (m) => ({ default: m.TextUrlTracerModal })
  );
const loadtext_word_count = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/utilities/TextWordCountModal').then(
    (m) => ({ default: m.TextWordCountModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'text-case': loadtext_case,
  'text-diff': loadtext_diff,
  'text-password': loadtext_password,
  'text-url-tracer': loadtext_url_tracer,
  'text-word-count': loadtext_word_count,
};
