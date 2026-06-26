import { marked } from 'marked';
import { FC, useEffect, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { INITIAL } from './constants';
import { EditorTab } from './EditorTab';
import { Tab } from './types';
import { ViewTab } from './ViewTab';

export const TypoglycemiaModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('editor');
  const [input, setInput] = useState(INITIAL);
  const [output, setOutput] = useState('');

  useEffect(() => {
    const convert = async () => {
      const html = await marked(input, { gfm: true, breaks: true });
      setOutput(html);
    };
    convert();
  }, [input]);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Typoglycemia"
      size="max-w-2xl"
      fullHeight>
      <div className="border-base-300 flex items-center justify-between border-b px-4 py-3">
        <div className="tabs tabs-boxed">
          {(['editor', 'view'] as Tab[]).map((t) => (
            <a
              key={t}
              role="tab"
              className={`tab tab-sm capitalize ${tab === t ? 'tab-active' : ''}`}
              onClick={() => setTab(t)}>
              {t === 'editor' ? 'Editor' : 'View'}
            </a>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {tab === 'editor' && (
          <EditorTab value={input} onChange={(e) => setInput(e.target.value)} />
        )}
        {tab === 'view' && <ViewTab html={output} />}
      </div>
    </ModalWrapper>
  );
};
TypoglycemiaModal.displayName = 'TypoglycemiaModal';
