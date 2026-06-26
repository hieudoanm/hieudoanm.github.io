'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { tryCatch } from '@lodashx/ts';

type Tab =
  | 'grammar'
  | 'improve'
  | 'rewrite'
  | 'paraphrase'
  | 'title'
  | 'summarize'
  | 'shorten'
  | 'translate';

const TAB_LABELS: Record<Tab, string> = {
  grammar: 'Grammar',
  improve: 'Improve',
  rewrite: 'Rewrite',
  paraphrase: 'Paraphrase',
  title: 'Title',
  summarize: 'Summarize',
  shorten: 'Shorten',
  translate: 'Translate',
};

const LANGUAGES = [
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Dutch',
  'Russian',
  'Japanese',
  'Chinese',
  'Korean',
  'Arabic',
  'Vietnamese',
];

export const WriteImproveModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('grammar');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('Vietnamese');

  const getSystemPrompt = (): string => {
    switch (tab) {
      case 'grammar':
        return 'Fix all grammar, spelling, and punctuation errors in the following text. Return only the corrected text.';
      case 'improve':
        return 'Improve the following text to make it more engaging, clear, and professional. Enhance vocabulary and sentence structure.';
      case 'rewrite':
        return 'Rewrite the following sentences in multiple different ways while preserving the original meaning.';
      case 'paraphrase':
        return 'Paraphrase the following paragraph while preserving its meaning. Use different vocabulary and sentence structures.';
      case 'title':
        return 'Rewrite the following title to make it more compelling and clickable. Provide 5 different options.';
      case 'summarize':
        return 'Summarize the following text concisely while preserving all key points and main ideas.';
      case 'shorten':
        return 'Shorten the following text to about half its length while preserving the essential meaning.';
      case 'translate':
        return `Translate the following text to ${language}. Detect the source language automatically. Return only the translated text.`;
    }
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
        {tab === 'translate' && (
          <select
            className="select select-bordered"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        )}
        <textarea
          className="textarea textarea-bordered h-32 font-mono text-sm"
          placeholder={
            tab === 'grammar'
              ? 'Enter text with grammar errors...'
              : tab === 'improve'
                ? 'Enter text to improve...'
                : tab === 'rewrite'
                  ? 'Enter text to rewrite...'
                  : tab === 'paraphrase'
                    ? 'Enter text to paraphrase...'
                    : tab === 'title'
                      ? 'Enter a title to rewrite...'
                      : tab === 'summarize'
                        ? 'Enter text to summarize...'
                        : tab === 'shorten'
                          ? 'Enter text to shorten...'
                          : 'Enter text to translate...'
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
              <span className="loading loading-spinner" /> Processing...
            </>
          ) : (
            'Process'
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
