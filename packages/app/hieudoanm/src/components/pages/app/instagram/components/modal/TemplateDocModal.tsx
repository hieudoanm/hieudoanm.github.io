import 'github-markdown-css/github-markdown-dark.css';
import { marked } from 'marked';
import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { DOC } from '../../data/docContent';
import { ModalHeader } from './ModalHeader';
import { DocTab } from './ModalTabs';
import { PreviewTab } from './PreviewTab';
import { RawTab } from './RawTab';

export const TemplateDocModal: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [tab, setTab] = useState<DocTab>('preview');
  const [copied, setCopied] = useState(false);

  const html = useMemo(() => marked(DOC, { async: false }) as string, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(DOC);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob([DOC], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template-reference.md';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  if (!open) return null;

  return (
    <div className="bg-base-100/80 fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-12 backdrop-blur-sm">
      <div className="rounded-box border-base-300 bg-base-200 relative w-full max-w-3xl border shadow-2xl">
        <ModalHeader
          tab={tab}
          onTabChange={setTab}
          onCopy={handleCopy}
          copied={copied}
          onDownload={handleDownload}
          onClose={onClose}
        />
        {tab === 'raw' ? <RawTab content={DOC} /> : <PreviewTab html={html} />}
      </div>
    </div>
  );
};

TemplateDocModal.displayName = 'TemplateDocModal';
