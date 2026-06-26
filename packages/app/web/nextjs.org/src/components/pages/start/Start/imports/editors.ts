import dynamic from 'next/dynamic';

export const RegexModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/RegexModal').then(
      (m) => m.RegexModal
    ),
  { ssr: false }
);
export const JSONSchemaModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/JSONSchemaModal').then(
      (m) => m.JSONSchemaModal
    ),
  { ssr: false }
);
export const ManifestModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ManifestModal').then(
      (m) => m.ManifestModal
    ),
  { ssr: false }
);
export const MarkdownModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/MarkdownModal').then(
      (m) => m.MarkdownModal
    ),
  { ssr: false }
);
export const ResumeModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/ResumeModal').then(
      (m) => m.ResumeModal
    ),
  { ssr: false }
);
export const SlidesModal = dynamic(
  () =>
    import('@hieudoanm.github.io/components/pages/start/modals/editors/SlidesModal').then(
      (m) => m.SlidesModal
    ),
  { ssr: false }
);
