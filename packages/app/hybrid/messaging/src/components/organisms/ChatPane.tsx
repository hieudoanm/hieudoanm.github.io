'use client';

import { type FC, useEffect, useMemo, useRef } from 'react';
import { FaLock } from 'react-icons/fa';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { ChatHeader } from '@/components/molecules/ChatHeader';
import { MessageBubble } from '@/components/molecules/MessageBubble';
import { Composer } from '@/components/molecules/Composer';
import { DateDivider } from '@/components/molecules/DateDivider';
import { EmptyState } from '@/components/atoms/EmptyState';
import { getChatMessages } from '@/lib/selectors';

interface ChatPaneProps {
  chatId: string | null;
  onNewChat: () => void;
  onBack?: () => void;
}

export const ChatPane: FC<ChatPaneProps> = ({ chatId, onNewChat, onBack }) => {
  const { chats, contacts, messages, sendMessage, addReaction, markChatRead } =
    useData();
  const { showToast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  const chat = chats.find((c) => c.id === chatId) ?? null;
  const chatMessages = useMemo(
    () => (chatId ? getChatMessages(messages, chatId) : []),
    [messages, chatId]
  );

  useEffect(() => {
    if (chatId) {
      void markChatRead(chatId);
    }
  }, [chatId, chatMessages.length, markChatRead]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages.length]);

  const otherContact = chat
    ? contacts.find((c) => chat.memberIds.includes(c.id))
    : undefined;

  const handleSend = (text: string): void => {
    if (!chat) return;
    void sendMessage(chat.id, text);
  };

  const handleReact = (messageId: string, emoji: string): void => {
    if (!chat) return;
    void addReaction(chat.id, messageId, emoji);
    showToast(`Reaction added`, 'info');
  };

  if (!chat) {
    return (
      <section className="bg-base-200/40 flex h-full flex-1 flex-col items-center justify-center">
        <EmptyState
          icon={FaLock}
          title="Select a chat"
          description="Choose a conversation from the list or start a new one."
        />
      </section>
    );
  }

  let lastDay = '';
  const grouped = chatMessages.map((message) => {
    const day = new Date(message.createdAt).toDateString();
    const isNewDay = day !== lastDay;
    lastDay = day;
    return { message, isNewDay };
  });

  return (
    <section className="bg-base-200/40 flex h-full min-w-0 flex-1 flex-col">
      <ChatHeader
        title={chat.title}
        avatarColor={chat.avatarColor}
        kind={chat.kind}
        online={otherContact?.online ?? false}
        lastSeenAt={otherContact?.lastSeenAt ?? Date.now()}
        memberCount={chat.memberIds.length}
        muted={chat.muted}
        secret={chat.isSecret}
        onNewChat={onNewChat}
        onBack={onBack}
      />
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
        {grouped.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-base-content/50 text-sm">
              No messages yet — say hello!
            </p>
          </div>
        ) : (
          grouped.map(({ message, isNewDay }) => (
            <div key={message.id} className="flex flex-col gap-1.5">
              {isNewDay && <DateDivider timestamp={message.createdAt} />}
              <MessageBubble
                message={message}
                mine={message.authorId === 'me'}
                authorName={
                  message.authorId !== 'me'
                    ? contacts.find((c) => c.id === message.authorId)?.name
                    : undefined
                }
                onReact={(emoji) => handleReact(message.id, emoji)}
              />
            </div>
          ))
        )}
      </div>
      <Composer onSend={handleSend} />
    </section>
  );
};
