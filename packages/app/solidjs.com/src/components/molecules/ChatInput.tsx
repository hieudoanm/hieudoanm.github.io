import { createEffect } from 'solid-js';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = (props: ChatInputProps) => {
  let textareaRef: HTMLTextAreaElement | undefined;

  createEffect(() => {
    props.value;
    if (textareaRef) {
      textareaRef.style.height = 'auto';
      textareaRef.style.height = Math.min(textareaRef.scrollHeight, 160) + 'px';
    }
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!props.value.trim() || props.disabled) return;
    props.onSubmit(props.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="flex items-end gap-3 px-6 py-4">
      <div class="relative flex-1">
        <textarea
          ref={(el) => {
            textareaRef = el;
          }}
          value={props.value}
          onChange={(e) => props.onChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder={props.placeholder ?? 'Type a message...'}
          rows={1}
          disabled={props.disabled}
          class="textarea textarea-bordered border-base-300 bg-base-200 text-base-content placeholder:text-base-content/30 w-full resize-none scrollbar-none rounded-2xl px-5 py-3 pr-12 text-sm leading-relaxed focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={props.disabled || !props.value.trim()}
        class="btn btn-primary btn-square flex h-11 w-11 shrink-0 items-center justify-center rounded-xl disabled:opacity-40">
        {props.disabled ? (
          <span class="loading loading-spinner loading-sm" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        )}
      </button>
    </form>
  );
};
