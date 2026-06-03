import { FC } from 'react';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
}

export const ChatBubble: FC<ChatBubbleProps> = ({ role, content, model }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] flex-col gap-1`}>
        {model && !isUser && (
          <p className="text-base-content/40 px-1 text-xs">{model}</p>
        )}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-primary text-primary-content rounded-br-md'
              : 'bg-base-200 border-base-300 rounded-bl-md border'
          }`}>
          <p className="break-words whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
};
