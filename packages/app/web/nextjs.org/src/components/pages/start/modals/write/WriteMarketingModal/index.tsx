'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';

type Tab =
  | 'caption'
  | 'linkedin'
  | 'headline'
  | 'blog-ideas'
  | 'blog-outline'
  | 'blog-post'
  | 'article-rewriter'
  | 'paraphraser';

const TAB_LABELS: Record<Tab, string> = {
  caption: 'Insta Caption',
  linkedin: 'LinkedIn Post',
  headline: 'FB Headline',
  'blog-ideas': 'Blog Ideas',
  'blog-outline': 'Blog Outline',
  'blog-post': 'Blog Post',
  'article-rewriter': 'Article Rewriter',
  paraphraser: 'Content Paraphraser',
};

const SYSTEM_PROMPTS: Record<Tab, string> = {
  caption:
    'You are a social media copywriter. Write engaging Instagram captions based on the topic or content described.',
  linkedin:
    'You are a LinkedIn content strategist. Write professional LinkedIn posts that drive engagement.',
  headline:
    'You are a Facebook ad copywriter. Write compelling Facebook headlines based on the product/service.',
  'blog-ideas':
    'You are a content strategist. Generate creative blog post ideas based on the topic or niche.',
  'blog-outline':
    'You are a content writer. Create detailed blog post outlines with sections and key points.',
  'blog-post':
    'You are a blog writer. Write a complete blog post based on the topic and outline provided.',
  'article-rewriter':
    'You are an editor. Rewrite the given article to improve clarity, flow, and quality while preserving the original meaning.',
  paraphraser:
    'You are a paraphrasing expert. Rewrite the given text in different words while maintaining the original meaning and tone.',
};

export const WriteMarketingModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<Tab>('caption');
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
    <ModalWrapper onClose={onClose} title="Marketing Writing">
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
          placeholder={
            tab === 'article-rewriter' || tab === 'paraphraser'
              ? 'Paste text to rewrite...'
              : 'Describe your topic or paste content...'
          }
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
