import { createClipboard } from '@frontend/native';
import { MODELS } from '@hieudoanm.github.io/constants/models';
import { marked } from 'marked';
import { FC, useEffect, useRef } from 'react';
import { Counter } from './ChatCounter';

const clipboard = createClipboard();

type Role = 'ai' | 'user';

export type Message = {
  role: Role;
  text: string;
  loading: boolean;
  model: string;
};

export const Messages: FC<{ messages: Message[] }> = ({ messages = [] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-4xl">💬</p>
          <p className="mt-3 text-sm text-neutral-500">
            Pick a model from the left, then start chatting
          </p>
          <p className="mt-1 text-xs text-neutral-600">
            {MODELS.length} free models available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map(({ role, text, loading = false, model }, index) => {
        const key = `${role}-${index}`;
        if (role === 'user')
          return (
            <div key={key} className="flex justify-end">
              <div className="flex max-w-lg flex-col items-end gap-1">
                <div className="rounded-2xl bg-neutral-800 px-4 py-2.5 text-sm leading-relaxed">
                  <p>{text}</p>
                </div>
                <p className="px-1 text-[10px] text-neutral-600">{model}</p>
              </div>
            </div>
          );
        if (role === 'ai') {
          const html = marked(text);
          return (
            <div key={key}>
              {loading ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-[10px]">
                      AI
                    </span>
                    <p className="text-xs text-neutral-500">{model}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:0s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:0.2s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:0.4s]"></div>
                    </div>
                    <Counter />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-[10px]">
                      AI
                    </span>
                    <p className="text-xs text-neutral-500">{model}</p>
                    <button
                      className="ml-auto cursor-pointer text-xs text-neutral-600 transition-opacity hover:opacity-70"
                      onClick={() => clipboard.copy(text)}>
                      📋
                    </button>
                  </div>
                  <div
                    className="prose prose-invert markdown-body rounded-xl bg-neutral-900 px-4 py-3 text-sm leading-relaxed!"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              )}
            </div>
          );
        }
        return <span key={key}></span>;
      })}
      <div ref={bottomRef} />
    </div>
  );
};
