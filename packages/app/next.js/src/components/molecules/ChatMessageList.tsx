import { FC, useEffect, useRef } from 'react';
import { ChatMessage } from '../../data/chat';
import { ChatBubble } from '../atoms/ChatBubble';
import { ChatTimestamp } from '../atoms/ChatTimestamp';

interface ChatMessageListProps {
  messages: ChatMessage[];
  loading?: boolean;
}

export const ChatMessageList: FC<ChatMessageListProps> = ({
  messages,
  loading,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!messages.length) {
    return (
      <div className="flex grow items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-5xl opacity-20">💬</div>
          <p className="text-base-content/50 mb-2 text-sm">
            Start a conversation
          </p>
          <p className="text-base-content/30 text-xs">
            Send a message to begin chatting with AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex grow flex-col gap-4 overflow-y-auto px-6 py-6">
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col gap-1">
          <ChatBubble role={msg.role} content={msg.content} model={msg.model} />
          <div
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} px-1`}>
            <ChatTimestamp timestamp={msg.timestamp} />
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-base-200 border-base-300 flex items-center gap-2 rounded-2xl border px-5 py-4">
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:0s]" />
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:0.15s]" />
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:0.3s]" />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
