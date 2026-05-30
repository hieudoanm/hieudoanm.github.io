interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
}

export const ChatBubble = (props: ChatBubbleProps) => {
  const isUser = props.role === 'user';
  return (
    <div class={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div class={`flex max-w-[80%] flex-col gap-1`}>
        {props.model && !isUser && (
          <p class="text-base-content/40 px-1 text-xs">{props.model}</p>
        )}
        <div
          class={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-primary text-primary-content rounded-br-md'
              : 'bg-base-200 border-base-300 rounded-bl-md border'
          }`}>
          <p class="break-words whitespace-pre-wrap">{props.content}</p>
        </div>
      </div>
    </div>
  );
};
