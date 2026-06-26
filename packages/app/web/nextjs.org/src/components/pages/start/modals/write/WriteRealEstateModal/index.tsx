'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { tryCatch } from '@lodashx/ts';

const TABS = ['listing', 'description', 'bio'] as const;
type Tab = (typeof TABS)[number];

const SYSTEM_PROMPTS: Record<Tab, string> = {
  listing:
    'Write a compelling real estate listing for the following property. Include key features, location highlights, and a call to action. Use descriptive, engaging language that sells.',
  description:
    'Write a detailed property description for a real estate website or brochure. Cover architecture, interiors, outdoor spaces, and neighborhood amenities.',
  bio: 'Write a professional real estate agent biography. Highlight experience, specialties, local market knowledge, and a personal touch to build trust with potential clients.',
};

const TAB_LABELS: Record<Tab, string> = {
  listing: 'Property Listing',
  description: 'Description',
  bio: 'Agent Bio',
};

export const WriteRealEstateModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<Tab>('listing');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    const { data } = await tryCatch(
      trpcClient.openrouter.generate.mutate({
        messages: [
          { role: 'ai', text: SYSTEM_PROMPTS[tab] },
          { role: 'user', text: input },
        ],
        model: 'openrouter/free',
      })
    );
    setResult(data?.text ?? 'No response generated.');
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="Real Estate" size="max-w-2xl">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab flex-1 ${tab === t ? 'tab-active' : ''}`}
            onClick={() => {
              setTab(t);
              setResult('');
            }}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered h-32 font-mono text-sm"
          placeholder={
            tab === 'listing'
              ? 'Describe the property (location, bedrooms, amenities)...'
              : tab === 'description'
                ? 'Enter property details for a full description...'
                : 'Enter your experience, specialties, and background...'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn btn-primary"
          disabled={!input.trim() || loading}
          onClick={handleGenerate}>
          {loading ? (
            <>
              <span className="loading loading-spinner" /> Generating...
            </>
          ) : (
            'Generate'
          )}
        </button>
        {result && (
          <div className="bg-base-200 rounded p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold">Result:</span>
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => navigator.clipboard.writeText(result)}>
                Copy
              </button>
            </div>
            <pre className="font-sans text-sm whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
