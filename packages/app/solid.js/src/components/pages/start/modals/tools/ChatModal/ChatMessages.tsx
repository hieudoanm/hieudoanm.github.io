import { createEffect } from 'solid-js';
import type { JSX } from 'solid-js';
import { GeminiModel } from '@hieudoanm.github.io/clients/gemini/gemini.enums';
import { OpenRouterModel } from '@hieudoanm.github.io/clients/openrouter/openrouter.enums';
import { Counter } from './ChatCounter';
import { MODELS } from '@hieudoanm.github.io/constants/models';
import { copy } from '@hieudoanm.github.io/utils/copy';
import { scrollToBottom } from '@hieudoanm.github.io/utils/scroll';
import { marked } from 'marked';

type Role = 'ai' | 'user';

export type Message = {
  role: Role;
  text: string;
  loading: boolean;
  model: GeminiModel | OpenRouterModel;
};

export const Messages = (props: { messages: Message[] }) => {
  const messages = () => props.messages || [];

  createEffect(() => {
    scrollToBottom('messages');
  });

  if (!messages().length) {
    return (
      <div class="flex grow items-center justify-center">
        <p class="text-neutral-500">
          No messages yet. Start the conversation with {MODELS.length} free AI
          Models
        </p>
      </div>
    );
  }

  return (
    <div
      id="messages"
      class="flex grow scrollbar-none flex-col space-y-4 overflow-y-auto">
      {messages().map(({ role, text, loading = false, model }, index) => {
        const key = `${role}-${index}`;
        if (role === 'user')
          return (
            <div key={key} class="flex justify-end">
              <div class="flex flex-col items-end space-y-1">
                <div class="max-w-md rounded-2xl bg-neutral-800 px-4 py-2 text-right">
                  <p>{text}</p>
                </div>
                <p class="px-4 text-xs text-neutral-500">{model}</p>
              </div>
            </div>
          );
        if (role === 'ai') {
          const html = marked(text);
          return (
            <div key={key}>
              {loading ? (
                <div class="flex flex-col items-start space-y-1">
                  <p class="text-xs text-neutral-500">{model}</p>
                  <div class="flex items-center space-x-2">
                    <div class="h-3 w-3 animate-bounce rounded-full bg-neutral-100 [animation-delay:0s]"></div>
                    <div class="h-3 w-3 animate-bounce rounded-full bg-neutral-100 [animation-delay:0.2s]"></div>
                    <div class="h-3 w-3 animate-bounce rounded-full bg-neutral-100 [animation-delay:0.4s]"></div>
                    <div class="grow pb-2">
                      <Counter />
                    </div>
                  </div>
                </div>
              ) : (
                <div class="flex flex-col items-start space-y-1">
                  <div class="flex items-center space-x-1 text-neutral-500">
                    <p class="text-xs">{model}</p>
                    <button
                      class="cursor-pointer text-lg"
                      onClick={() => copy(text)}>
                      Copy
                    </button>
                  </div>
                  <div
                    class="prose prose-invert markdown-body bg-neutral-900!"
                    innerHTML={html}
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
