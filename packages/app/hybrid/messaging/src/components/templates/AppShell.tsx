'use client';

import { type FC, useState } from 'react';
import { ChatSidebar } from '@/components/organisms/ChatSidebar';
import { ChatPane } from '@/components/organisms/ChatPane';
import { NewChatModal } from '@/components/organisms/NewChatModal';

interface AppShellProps {
  selectedChatId: string | null;
  onSelectChat: (id: string | null) => void;
}

export const AppShell: FC<AppShellProps> = ({
  selectedChatId,
  onSelectChat,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const hasChat = selectedChatId !== null;

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      <div
        className={`${hasChat ? 'hidden md:flex' : 'flex'} h-full w-full md:w-auto`}>
        <ChatSidebar
          selectedChatId={selectedChatId}
          onSelectChat={onSelectChat}
          onNewChat={() => setModalOpen(true)}
        />
      </div>
      <div
        className={`${hasChat ? 'flex' : 'hidden md:flex'} h-full min-w-0 flex-1`}>
        <ChatPane
          chatId={selectedChatId}
          onNewChat={() => setModalOpen(true)}
          onBack={() => onSelectChat(null)}
        />
      </div>
      <NewChatModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onChatCreated={onSelectChat}
      />
    </div>
  );
};
