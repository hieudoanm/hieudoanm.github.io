'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';

type Tab =
  | 'plan'
  | 'name'
  | 'slogan'
  | 'landing'
  | 'email'
  | 'press-release'
  | 'real-estate';

const TAB_LABELS: Record<Tab, string> = {
  plan: 'Business Plan',
  name: 'Business Name',
  slogan: 'Business Slogan',
  landing: 'Landing Page',
  email: 'Cold Email',
  'press-release': 'Press Release',
  'real-estate': 'Real Estate',
};

const SYSTEM_PROMPTS: Record<Tab, string> = {
  plan: 'You are a business plan writer. Write a professional business plan based on the description provided.',
  name: 'You are a business naming expert. Generate creative business name ideas based on the description.',
  slogan:
    'You are a branding expert. Generate catchy business slogans based on the business description.',
  landing:
    'You are a copywriter. Write compelling landing page copy based on the product/service description.',
  email:
    'You are a sales copywriter. Write professional cold emails based on the context provided.',
  'press-release':
    'You are a PR professional. Write a press release based on the news/event described.',
  'real-estate':
    'You are a real estate copywriter. Write compelling real estate listings based on the property description.',
};

export const WriteBusinessModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<Tab>('plan');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput('');
    try {
      const result = await trpcClient.openrouter.generate.mutate({
        messages: [
          { role: 'ai', text: SYSTEM_PROMPTS[tab] },
          { role: 'user', text: input },
        ],
        model: 'openrouter/free',
      });
      setOutput(result.text);
    } catch (err) {
      setOutput(
        'Error: ' + (err instanceof Error ? err.message : 'Unknown error')
      );
    }
    setLoading(false);
  }, [input, tab]);

  return (
    <ModalWrapper onClose={onClose} title="Business Writing">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered min-h-[120px]"
          placeholder="Describe your business, product, or service..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn btn-primary btn-sm"
          disabled={!input.trim() || loading}
          onClick={handleGenerate}>
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            `Generate ${TAB_LABELS[tab]}`
          )}
        </button>
        {output && (
          <div className="bg-base-200 rounded p-4">
            <pre className="text-sm whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
WriteBusinessModal.displayName = 'WriteBusinessModal';
