import { ComponentType } from 'react';

const loadWriteComplete = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteCompleteModal').then(
    (m) => ({ default: m.WriteCompleteModal })
  );

const loadWriteGrammar = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteGrammarModal').then(
    (m) => ({ default: m.WriteGrammarModal })
  );

const loadWriteHumanizer = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteHumanizerModal').then(
    (m) => ({ default: m.WriteHumanizerModal })
  );

const loadWriteImproveText = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteImproveTextModal').then(
    (m) => ({ default: m.WriteImproveTextModal })
  );

const loadWriteParaphrase = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteParaphraseModal').then(
    (m) => ({ default: m.WriteParaphraseModal })
  );

const loadWriteRewrite = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteRewriteModal').then(
    (m) => ({ default: m.WriteRewriteModal })
  );

const loadWriteShorten = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteShortenModal').then(
    (m) => ({ default: m.WriteShortenModal })
  );

const loadWriteSummarize = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteSummarizeModal').then(
    (m) => ({ default: m.WriteSummarizeModal })
  );

const loadWriteTone = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteToneModal').then(
    (m) => ({ default: m.WriteToneModal })
  );

const loadWriteTranslate = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-edit/WriteTranslateModal').then(
    (m) => ({ default: m.WriteTranslateModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-complete': loadWriteComplete,
  'write-grammar': loadWriteGrammar,
  'write-humanizer': loadWriteHumanizer,
  'write-improve-text': loadWriteImproveText,
  'write-paraphrase': loadWriteParaphrase,
  'write-rewrite': loadWriteRewrite,
  'write-shorten': loadWriteShorten,
  'write-summarize': loadWriteSummarize,
  'write-tone': loadWriteTone,
  'write-translate': loadWriteTranslate,
};
