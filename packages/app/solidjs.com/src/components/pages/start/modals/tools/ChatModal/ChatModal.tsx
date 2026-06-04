import { createSignal } from 'solid-js';
import { GeminiModel } from '@hieudoanm.github.io/clients/gemini/gemini.enums';
import { OpenRouterModel } from '@hieudoanm.github.io/clients/openrouter/openrouter.enums';
import { Model, models } from '@hieudoanm.github.io/data/models';
import { trpcClient } from '@hieudoanm.github.io/utils/trpc';
import { tryCatch } from '@lodashx/ts';
import Tesseract from 'tesseract.js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { Message, Messages } from './ChatMessages';
import { scrollToBottom } from '@browser/native';

const groupModels = (models: Model[]) => {
  const ids: string[] = models.map(({ id }) => id);
  ids.sort((a, b) => (a > b ? 1 : -1));

  const groups: string[] = [
    ...new Set(
      ids.map((id) => id.split('/').at(0) ?? '').filter((group) => group !== '')
    ),
  ];
  groups.sort((a, b) => (a > b ? 1 : -1));

  const modelsByGroups = groups.map((group) => {
    const modelsByGroup = models.filter(({ id }) => id.includes(group));
    modelsByGroup.sort((a, b) => (a.name > b.name ? 1 : -1));
    return { group, models: modelsByGroup };
  });
  return modelsByGroups;
};

export const ChatModal = (props: { onClose: () => void }) => {
  let textareaRef: HTMLTextAreaElement | undefined;
  const [state, setState] = createSignal<{
    message: string;
    messages: Message[];
    model: GeminiModel | OpenRouterModel;
  }>({
    message: 'Explain GenAI in a few words',
    messages: [],
    model: OpenRouterModel.Deepseek_R1,
  });

  const message = () => state().message;
  const messages = () => state().messages;
  const model = () => state().model;

  const loading = () => messages().some((message) => message.loading);

  const onInputPaste = () => {
    const ta = textareaRef!;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  };

  const onSubmit = async (event: Event) => {
    event.preventDefault();
    if (loading() || !message()) return;

    const oldMessages = [
      ...messages(),
      { text: message(), role: 'user', loading: false },
    ]
      .filter(({ loading }) => !loading)
      .map(({ role, text }) => ({ role: role as 'user' | 'ai', text }));

    setState((previous) => {
      const newUserMessage: Message = {
        text: previous.message,
        role: 'user',
        loading: false,
        model: model(),
      };
      const newAiMessage: Message = {
        text: '',
        role: 'ai',
        loading: true,
        model: model(),
      };
      const newMessages = [...previous.messages, newUserMessage, newAiMessage];
      return { ...previous, message: '', messages: newMessages };
    });

    const { data, error } = await tryCatch(
      trpcClient.genai.generate.mutate({
        messages: oldMessages,
        model: model(),
      })
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
    <ModalWrapper
      onClose={props.onClose}
      title="Chat"
      size="max-w-4xl"
      fullHeight>
      <div class="flex items-center justify-between px-4 py-2">
        {messages().length > 0 && (
          <button
            class="btn btn-ghost btn-sm"
            onClick={() => {
              setState((previous) => ({
                ...previous,
                message: '',
                messages: [],
              }));
              scrollToBottom('messages');
            }}>
            New Chat
          </button>
        )}
        <div />
      </div>

      <div class="flex-1 overflow-y-auto">
        <Messages messages={messages()} />
      </div>

      <form
        onSubmit={onSubmit}
        class="mx-4 mb-4 flex flex-col items-center rounded-2xl bg-neutral-800 p-2">
        <textarea
          autoComplete="off"
          placeholder="Ask anything ..."
          class="w-full resize-none overflow-hidden bg-transparent p-2 focus:outline-none"
          ref={(el) => {
            textareaRef = el;
          }}
          onInput={onInputPaste}
          onPaste={onInputPaste}
          rows={1}
          value={message()}
          onChange={(event: Event) => {
            const value = (event.target as HTMLTextAreaElement).value;
            setState((previous) => ({ ...previous, message: value }));
          }}
        />
        <div class="flex w-full items-center justify-between gap-x-2 p-2">
          <select
            class="w-full max-w-sm appearance-none truncate bg-transparent font-black focus:outline-none"
            value={model()}
            onChange={(event: Event) => {
              setState((previous) => ({
                ...previous,
                model: (event.target as HTMLSelectElement).value as GeminiModel,
              }));
            }}>
            {groupModels(models).map(({ group, models }) => (
              <optgroup key={group} label={group}>
                {models.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <div class="flex items-center gap-x-4">
            <label class="cursor-pointer rounded-full text-neutral-100">
              <input
                type="file"
                class="hidden"
                disabled={loading()}
                onChange={async (event: Event) => {
                  const file = (event.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const {
                      data: { text },
                    } = await Tesseract.recognize(file, 'eng');
                    setState((previous) => ({ ...previous, message: text }));
                    onInputPaste();
                  }
                }}
              />
              Attach
            </label>
            <button
              type="submit"
              class="cursor-pointer rounded-full bg-neutral-100 p-2 text-neutral-900"
              disabled={loading()}>
              Send
            </button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};
