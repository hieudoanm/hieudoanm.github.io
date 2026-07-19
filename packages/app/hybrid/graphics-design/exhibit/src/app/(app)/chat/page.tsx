'use client';

import { type FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/chat/templates/AppShell';
import { Providers } from '@/providers/chat/Providers';
import { useData } from '@/providers/chat/DataProvider';
import { getChatIdFromURL } from '@/lib/chat/url';

const HomePageContent: FC = () => {
  const { isLoading, session } = useData();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) router.replace('/sign-in');
  }, [isLoading, session, router]);

  useEffect(() => {
    const chatId = getChatIdFromURL();
    if (chatId) setSelectedChatId(chatId);
  }, []);

  if (isLoading || !session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <AppShell
      selectedChatId={selectedChatId}
      onSelectChat={setSelectedChatId}
    />
  );
};

const HomePage: FC = () => (
  <Providers>
    <HomePageContent />
  </Providers>
);

export default HomePage;
