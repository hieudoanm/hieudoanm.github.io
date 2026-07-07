import { ComponentType } from 'react';

const loadJSONSchema = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/editors/JSONSchemaModal').then(
    (m) => ({ default: m.JSONSchemaModal })
  );

const loadManifest = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/editors/ManifestModal').then(
    (m) => ({ default: m.ManifestModal })
  );

const loadMarkdown = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/editors/MarkdownModal').then(
    (m) => ({ default: m.MarkdownModal })
  );

const loadRedact = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/pdf').then((m) => ({
    default: m.PdfModal,
  }));

const loadRegex = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/editors/RegexModal').then(
    (m) => ({ default: m.RegexModal })
  );

const loadResume = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/editors/ResumeModal').then(
    (m) => ({ default: m.ResumeModal })
  );

const loadSlides = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/editors/SlidesModal').then(
    (m) => ({ default: m.SlidesModal })
  );

const loadWordCounter = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/editors/WordCounterModal').then(
    (m) => ({ default: m.WordCounterModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'json-schema': loadJSONSchema,
  manifest: loadManifest,
  markdown: loadMarkdown,
  redact: loadRedact,
  regex: loadRegex,
  resume: loadResume,
  slides: loadSlides,
  'word-counter': loadWordCounter,
};
