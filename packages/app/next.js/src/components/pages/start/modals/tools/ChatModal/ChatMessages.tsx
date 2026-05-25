import { GeminiModel } from '@hieudoanm/clients/gemini/gemini.enums';
import { OpenRouterModel } from '@hieudoanm/clients/openrouter/openrouter.enums';
import { Counter } from './ChatCounter';
import { MODELS } from '@hieudoanm/constants/models';
import { copy } from '@hieudoanm/utils/copy';
import { scrollToBottom } from '@hieudoanm/utils/scroll';
import { marked } from 'marked';
import { FC, useEffect } from 'react';

type Role = 'ai' | 'user';

export type Message = {
  role: Role;
  text: string;
  loading: boolean;
  model: GeminiModel | OpenRouterModel;
};

export const Messages: FC<{ messages: Message[] }> = ({ messages = [] }) => {
  useEffect(() => {
    scrollToBottom('messages');
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="flex grow items-center justify-center">
        <p className="text-neutral-500">
          No messages yet. Start the conversation with {MODELS.length} free AI
          Models
        </p>
      </div>
    );
  }

  return (
    <div
      id="messages"
      className="flex grow scrollbar-none flex-col space-y-4 overflow-y-auto">
      {messages.map(({ role, text, loading = false, model }, index) => {
        const key = `${role}-${index}`;
        if (role === 'user')
          return (
            <div key={key} className="flex justify-end">
              <div className="flex flex-col items-end space-y-1">
                <div className="max-w-md rounded-2xl bg-neutral-800 px-4 py-2 text-right">
                  <p>{text}</p>
                </div>
                <p className="px-4 text-xs text-neutral-500">{model}</p>
              </div>
            </div>
          );
        if (role === 'ai') {
          const html = marked(text);
          return (
            <div key={key}>
              {loading ? (
                <div className="flex flex-col items-start space-y-1">
                  <p className="text-xs text-neutral-500">{model}</p>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 animate-bounce rounded-full bg-neutral-100 [animation-delay:0s]"></div>
                    <div className="h-3 w-3 animate-bounce rounded-full bg-neutral-100 [animation-delay:0.2s]"></div>
                    <div className="h-3 w-3 animate-bounce rounded-full bg-neutral-100 [animation-delay:0.4s]"></div>
                    <div className="grow pb-2">
                      <Counter />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start space-y-1">
                  <div className="flex items-center space-x-1 text-neutral-500">
                    <p className="text-xs">{model}</p>
                    <button
                      className="cursor-pointer text-lg"
                      onClick={() => copy(text)}>
                      Copy
                    </button>
                  </div>
                  <div
                    className="prose prose-invert markdown-body bg-neutral-900!"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              )}
            </div>
          );
        }
        return <span key={key}></span>;
      })}
    </div>
  );
};
