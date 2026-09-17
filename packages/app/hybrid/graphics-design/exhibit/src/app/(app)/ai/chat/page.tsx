'use client';

import { type FC, Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/ai/Providers';
import { useData } from '@/providers/ai/DataProvider';
import { Sidebar } from '@/components/ai/organisms/Sidebar';
import { ChatHeader } from '@/components/ai/organisms/ChatHeader';
import { ChatInput } from '@/components/ai/molecules/ChatInput';
import { MessageBubble } from '@/components/ai/atoms/MessageBubble';
import { PageTransition } from '@/components/ai/templates/PageTransition';
import { useStreaming } from '@/hooks/ai/useStreaming';
import { useKeyboard } from '@/hooks/ai/useKeyboard';
import { FiMenu } from 'react-icons/fi';

const ChatContent: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams?.get('id');
  const {
    conversations,
    currentConversation,
    currentMessages,
    setCurrentConversation,
    sendMessage,
    isLoading,
    createConversation,
  } = useData();
  const { text: streamingText } = useStreaming();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const conv = conversations.find((c) => c.id === id);
      if (conv) {
        setCurrentConversation(conv);
      } else if (!isLoading && conversations.length > 0) {
        router.push('/ai');
      }
    }
  }, [id, conversations, setCurrentConversation, isLoading, router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, streamingText]);

  const handleSend = async (content: string) => {
    setIsGenerating(true);
    await sendMessage(content);
    setIsGenerating(false);
  };

  const handleNewChat = async () => {
    const conv = await createConversation();
    router.push(`/ai/chat?id=${conv.id}`);
  };

  useKeyboard({
    'ctrl+k': () => {
      const input = document.querySelector('textarea') as HTMLTextAreaElement;
      input?.focus();
    },
    'ctrl+n': handleNewChat,
  });

  if (!currentConversation && !isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-base-content/50">Conversation not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex flex-1 flex-col">
        <div className="border-base-300 flex items-center border-b px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="btn btn-ghost btn-circle">
            <FiMenu className="size-5" />
          </button>
        </div>

        {currentConversation && (
          <ChatHeader conversation={currentConversation} />
        )}

        <PageTransition>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton h-20 w-3/4 rounded-lg" />
                  ))}
                </div>
              ) : (
                <>
                  {currentMessages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))}
                  {isGenerating && streamingText && (
                    <div className="chat chat-start">
                      <div className="chat-bubble chat-bubble-neutral">
                        {streamingText}
                        <span className="ml-0.5 inline-block animate-pulse">
                          |
                        </span>
                      </div>
                    </div>
                  )}
                  {isGenerating && !streamingText && (
                    <div className="chat chat-start">
                      <div className="chat-bubble chat-bubble-neutral">
                        <span className="inline-flex gap-1">
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: '0ms' }}>
                            •
                          </span>
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: '150ms' }}>
                            •
                          </span>
                          <span
                            className="animate-bounce"
                            style={{ animationDelay: '300ms' }}>
                            •
                          </span>
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </PageTransition>

        <ChatInput onSend={handleSend} disabled={isGenerating} />
      </main>
    </div>
  );
};

const ChatPage: FC = () => (
  <Providers>
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      }>
      <ChatContent />
    </Suspense>
  </Providers>
);

export default ChatPage;
