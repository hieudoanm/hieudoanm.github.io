import { marked } from 'marked';
import { FC, useEffect, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { INITIAL } from './constants';
import { EditorTab } from './EditorTab';
import { Tab } from './types';
import { ViewTab } from './ViewTab';

export const Typoglycemia: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    <FullScreen onClose={onClose} title="Typoglycemia">
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
    </FullScreen>
  );
};
Typoglycemia.displayName = 'Typoglycemia';
