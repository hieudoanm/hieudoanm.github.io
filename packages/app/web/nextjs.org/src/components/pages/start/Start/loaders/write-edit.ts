import { ComponentType, lazy } from 'react';

const loadwrite_complete = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteCompleteModal').then(
    (m) => ({ default: m.WriteCompleteModal })
  );

const loadwrite_grammar = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteGrammarModal').then(
    (m) => ({ default: m.WriteGrammarModal })
  );

const loadwrite_humanizer = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteHumanizerModal').then(
    (m) => ({ default: m.WriteHumanizerModal })
  );

const loadwrite_improve_text = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteImproveTextModal').then(
    (m) => ({ default: m.WriteImproveTextModal })
  );

const loadwrite_paraphrase = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteParaphraseModal').then(
    (m) => ({ default: m.WriteParaphraseModal })
  );

const loadwrite_rewrite = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteRewriteModal').then(
    (m) => ({ default: m.WriteRewriteModal })
  );

const loadwrite_shorten = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteShortenModal').then(
    (m) => ({ default: m.WriteShortenModal })
  );

const loadwrite_summarize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteSummarizeModal').then(
    (m) => ({ default: m.WriteSummarizeModal })
  );

const loadwrite_tone = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteToneModal').then(
    (m) => ({ default: m.WriteToneModal })
  );

const loadwrite_translate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteTranslateModal').then(
    (m) => ({ default: m.WriteTranslateModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-complete': loadwrite_complete,
  'write-grammar': loadwrite_grammar,
  'write-humanizer': loadwrite_humanizer,
  'write-improve-text': loadwrite_improve_text,
  'write-paraphrase': loadwrite_paraphrase,
  'write-rewrite': loadwrite_rewrite,
  'write-shorten': loadwrite_shorten,
  'write-summarize': loadwrite_summarize,
  'write-tone': loadwrite_tone,
  'write-translate': loadwrite_translate,
};
