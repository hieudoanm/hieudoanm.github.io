'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { tryCatch } from '@lodashx/ts';

type Tab =
  | 'headline'
  | 'caption'
  | 'linkedin'
  | 'blog-outline'
  | 'blog-ideas'
  | 'business-name'
  | 'real-estate'
  | 'tone'
  | 'explain'
  | 'humanizer';

const TAB_LABELS: Record<Tab, string> = {
  headline: 'Headline',
  caption: 'Caption',
  linkedin: 'LinkedIn',
  'blog-outline': 'Outline',
  'blog-ideas': 'Blog Ideas',
  'business-name': 'Business Name',
  'real-estate': 'Real Estate',
  tone: 'Tone',
  explain: 'Explain',
  humanizer: 'Humanizer',
};

const TONES = [
  'Professional',
  'Casual',
  'Friendly',
  'Formal',
  'Humorous',
  'Empathetic',
  'Inspirational',
  'Authoritative',
];

const SYSTEM_PROMPTS: Record<Tab, string> = {
  headline:
    'Generate 10 engaging Facebook headline variations for the following topic or product.',
  caption:
    'Generate 5 creative Instagram caption ideas for the following topic or photo description. Include relevant hashtags.',
  linkedin:
    'Write a professional LinkedIn post about the following topic. Include a hook, personal insight, and call to action.',
  'blog-outline':
    'Create a detailed blog post outline with headings and subheadings for the following topic.',
  'blog-ideas':
    'Generate 10 blog post ideas about the following topic or niche. Include a brief description for each.',
  'business-name':
    'Generate 20 creative business name ideas for the following industry or description. Check that names are memorable and brandable.',
  'real-estate':
    'Write a compelling real estate listing description for the following property details.',
  tone: 'Rewrite the following text in a {tone} tone.',
  explain:
    'Explain the following concept in simple terms as if explaining to a 5-year-old. Use analogies and simple language.',
  humanizer:
    'Rewrite the following AI-generated text to sound more natural, human, and less robotic. Add personality and varied sentence structure.',
};

export const WriteSocialModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('headline');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState('Professional');

  const getSystemPrompt = (): string => {
    const base = SYSTEM_PROMPTS[tab];
    return tab === 'tone' ? base.replace('{tone}', tone) : base;
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    const { data } = await tryCatch(
      trpcClient.openrouter.generate.mutate({
        messages: [
          { role: 'ai', text: getSystemPrompt() },
          { role: 'user', text: input },
        ],
        model: 'openrouter/free',
      })
    );
    setResult(data?.text ?? 'No response generated.');
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="Social" size="max-w-2xl">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => {
              setTab(t);
              setResult('');
            }}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {tab === 'tone' && (
          <select
            className="select select-bordered"
            value={tone}
            onChange={(e) => setTone(e.target.value)}>
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
        <textarea
          className="textarea textarea-bordered h-32 font-mono text-sm"
          placeholder={
            tab === 'headline'
              ? 'Describe your topic or product...'
              : tab === 'caption'
                ? 'Describe your photo or topic...'
                : tab === 'linkedin'
                  ? 'Enter your LinkedIn post topic...'
                  : tab === 'blog-outline'
                    ? 'Enter your blog topic...'
                    : tab === 'blog-ideas'
                      ? 'Enter your blog niche...'
                      : tab === 'business-name'
                        ? 'Describe your business or industry...'
                        : tab === 'real-estate'
                          ? 'Describe the property...'
                          : tab === 'tone'
                            ? 'Enter text to rewrite...'
                            : tab === 'explain'
                              ? 'Enter a concept to explain...'
                              : 'Enter AI-generated text to humanize...'
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
WriteSocialModal.displayName = 'WriteSocialModal';
