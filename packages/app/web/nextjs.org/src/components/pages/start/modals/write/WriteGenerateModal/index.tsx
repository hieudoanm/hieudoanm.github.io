'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { tryCatch } from '@lodashx/ts';

type Tab =
  | 'paragraph'
  | 'essay'
  | 'article'
  | 'story'
  | 'blog-post'
  | 'youtube-script'
  | 'faq';

const SYSTEM_PROMPTS: Record<Tab, string> = {
  paragraph:
    'Write a coherent paragraph about the following topic. Keep it to one paragraph.',
  essay:
    'Write a well-structured essay on the following topic. Include an introduction, body paragraphs, and a conclusion.',
  article:
    'Write a complete article on the following topic with headings, subheadings, and engaging content.',
  story: 'Write a creative short story based on the following prompt or idea.',
  'blog-post':
    'Write an engaging blog post on the following topic. Include a catchy title, introduction, body with subheadings, and conclusion.',
  'youtube-script':
    'Write a YouTube video script for the following topic. Include intro, main content sections, and outro.',
  faq: 'Generate a list of frequently asked questions and answers about the following topic.',
};

const TAB_LABELS: Record<Tab, string> = {
  paragraph: 'Paragraph',
  essay: 'Essay',
  article: 'Article',
  story: 'Story',
  'blog-post': 'Blog Post',
  'youtube-script': 'YouTube Script',
  faq: 'FAQ',
};

export const WriteGenerateModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<Tab>('paragraph');
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
    <ModalWrapper onClose={onClose} title="Write" size="max-w-2xl">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
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
            tab === 'paragraph'
              ? 'Enter a topic for a paragraph...'
              : tab === 'essay'
                ? 'Enter an essay topic...'
                : tab === 'article'
                  ? 'Enter an article topic...'
                  : tab === 'story'
                    ? 'Enter a story prompt...'
                    : tab === 'blog-post'
                      ? 'Enter a blog post topic...'
                      : tab === 'youtube-script'
                        ? 'Enter a video topic...'
                        : 'Enter a topic for FAQ...'
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
WriteGenerateModal.displayName = 'WriteGenerateModal';
