import { createEffect } from 'solid-js';
import { ChatMessage } from '../../data/chat';
import { ChatBubble } from '../atoms/ChatBubble';
import { ChatTimestamp } from '../atoms/ChatTimestamp';

interface ChatMessageListProps {
  messages: ChatMessage[];
  loading?: boolean;
}

export const ChatMessageList = (props: ChatMessageListProps) => {
  let bottomRef: HTMLDivElement | undefined;

  createEffect(() => {
    props.messages;
    props.loading;
    bottomRef?.scrollIntoView({ behavior: 'smooth' });
  });

  if (!props.messages.length) {
    return (
      <div class="flex grow items-center justify-center">
        <div class="text-center">
          <div class="mb-4 text-5xl opacity-20">💬</div>
          <p class="text-base-content/50 mb-2 text-sm">Start a conversation</p>
          <p class="text-base-content/30 text-xs">
            Send a message to begin chatting with AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div class="flex grow flex-col gap-4 overflow-y-auto px-6 py-6">
      {props.messages.map((msg) => (
        <div key={msg.id} class="flex flex-col gap-1">
          <ChatBubble role={msg.role} content={msg.content} model={msg.model} />
          <div
            class={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} px-1`}>
            <ChatTimestamp timestamp={msg.timestamp} />
          </div>
        </div>
      ))}
      {props.loading && (
        <div class="flex justify-start">
          <div class="bg-base-200 border-base-300 flex items-center gap-2 rounded-2xl border px-5 py-4">
            <div class="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:0s]" />
            <div class="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:0.15s]" />
            <div class="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:0.3s]" />
          </div>
        </div>
      )}
      <div
        ref={(el) => {
          bottomRef = el;
        }}
      />
    </div>
  );
};
