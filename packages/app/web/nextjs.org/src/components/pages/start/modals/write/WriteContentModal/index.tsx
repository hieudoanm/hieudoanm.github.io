'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';

type Tab =
  | 'podcast'
  | 'trivia'
  | 'story-ideas'
  | 'content-brief'
  | 'content-planner'
  | 'listicle'
  | 'article';

const TAB_LABELS: Record<Tab, string> = {
  podcast: 'Podcast Script',
  trivia: 'Trivia Generator',
  'story-ideas': 'Story Ideas',
  'content-brief': 'Content Brief',
  'content-planner': 'Content Planner',
  listicle: 'Listicle Writer',
  article: 'Article Generator',
};

const SYSTEM_PROMPTS: Record<Tab, string> = {
  podcast:
    'You are a podcast script writer. Write an engaging podcast script based on the topic and format described.',
  trivia:
    'You are a trivia creator. Generate interesting trivia questions with answers based on the topic provided.',
  'story-ideas':
    'You are a creative writing coach. Generate unique story ideas based on the genre or theme described.',
  'content-brief':
    'You are a content strategist. Create a detailed content brief for a piece of content based on the topic and target audience.',
  'content-planner':
    'You are a content manager. Create a content plan/calendar based on the niche and goals described.',
  listicle:
    'You are a listicle writer. Write engaging list-style articles based on the topic provided.',
  article:
    'You are a long-form article writer. Write a comprehensive, well-researched article based on the topic and outline described.',
};

export const WriteContentModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('podcast');
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
    <ModalWrapper onClose={onClose} title="Content Writing">
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
            tab === 'article'
              ? 'Describe the article topic and key points...'
              : 'Describe your topic or requirements...'
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
