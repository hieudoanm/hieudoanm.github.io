import { scrollToBottom } from '@frontend/native';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { tryCatch } from '@lodashx/ts';
import { ChangeEvent, FC, SubmitEvent, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import { Message, Messages } from './ChatMessages';
import { ChatModels } from './ChatModels';

export const ChatModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [
    {
      message = 'Explain GenAI in a few words',
      messages = [],
      model = 'openrouter/free',
    },
    setState,
  ] = useState<{
    message: string;
    messages: Message[];
    model: string;
  }>({
    message: 'Explain GenAI in a few words',
    messages: [],
    model: 'openrouter/free',
  });

  const loading: boolean = messages.some((message) => message.loading);

  const onInputPaste = () => {
    const ta = textareaRef.current!;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  };

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (loading || !message) return;

    const oldMessages = [
      ...messages,
      { text: message, role: 'user', loading: false },
    ]
      .filter(({ loading }) => !loading)
      .map(({ role, text }) => ({ role: role as 'user' | 'ai', text }));

    setState((previous) => {
      const newUserMessage: Message = {
        text: previous.message,
        role: 'user',
        loading: false,
        model,
      };
      const newAiMessage: Message = {
        text: '',
        role: 'ai',
        loading: true,
        model,
      };
      const newMessages = [...previous.messages, newUserMessage, newAiMessage];
      return { ...previous, message: '', messages: newMessages };
    });

    const { data, error } = await tryCatch(
      trpcClient.genai.generate.mutate({ messages: oldMessages, model })
    );

    let text = 'An error occurred while generating content.';
    if (data?.text) {
      text = data.text;
    } else if (error) {
      console.error('Error generating content:', error);
    }

    setState((previous) => {
      const newMessages = previous.messages.map((message) => {
        if (message.role === 'ai' && message.loading) {
          return { ...message, text, loading: false };
        }
        return message;
      });
      return { ...previous, messages: newMessages };
    });
  };

  return (
    <ModalWrapper onClose={onClose} title="Chat" size="max-w-5xl" fullHeight>
      <div className="flex min-h-0 flex-1">
        <div className="border-base-300 flex w-72 shrink-0 flex-col border-r">
          <div className="border-base-300 flex items-center gap-2 border-b px-3 py-2.5">
            <span className="text-xs font-bold tracking-widest uppercase opacity-40">
              Models
            </span>
            {messages.length > 0 && (
              <button
                className="ml-auto text-[10px] tracking-wider uppercase opacity-30 transition-opacity hover:opacity-60"
                onClick={() => {
                  setState((previous) => ({
                    ...previous,
                    message: '',
                    messages: [],
                  }));
                  scrollToBottom('messages');
                }}>
                Clear
              </button>
            )}
          </div>
          <div className="min-h-0 flex-1">
            <ChatModels
              selectedModelId={model}
              onSelect={(modelId) =>
                setState((previous) => ({
                  ...previous,
                  model: modelId,
                }))
              }
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <Messages messages={messages} />
          </div>

          <div className="border-base-300 border-t px-4 py-3">
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-x-2 rounded-2xl border border-neutral-700 bg-neutral-800/50 px-3 py-1.5 transition-colors focus-within:border-neutral-600">
              <textarea
                autoComplete="off"
                placeholder="Ask anything ..."
                className="flex-1 resize-none overflow-hidden bg-transparent py-1.5 text-sm focus:outline-none"
                ref={textareaRef}
                onInput={onInputPaste}
                onPaste={onInputPaste}
                rows={1}
                value={message}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  const message = event.target.value;
                  setState((previous) => ({ ...previous, message }));
                }}
              />
              <label className="cursor-pointer px-1 text-sm opacity-40 transition-opacity hover:opacity-70">
                <input
                  type="file"
                  className="hidden"
                  disabled={loading}
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      const {
                        data: { text },
                      } = await Tesseract.recognize(file, 'eng');
                      setState((previous) => ({ ...previous, message: text }));
                      onInputPaste();
                    }
                  }}
                />
                📎
              </label>
              <button
                type="submit"
                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-xs text-neutral-900 transition-opacity disabled:opacity-30"
                disabled={loading}>
                ➤
              </button>
            </form>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
