'use client';

import { type FC, useState } from 'react';
import { Providers } from '@/providers/Providers';
import { Sidebar } from '@/components/organisms/Sidebar';
import { PageTransition } from '@/components/templates/PageTransition';
import { FiMenu } from 'react-icons/fi';

const HomePage: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Providers>
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
            <span className="ml-2 text-lg font-bold">Chats</span>
          </div>
          <PageTransition>
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h1 className="text-base-content/30 mb-4 text-6xl font-bold">
                  Chat
                </h1>
                <p className="text-base-content/50 text-lg">
                  Select a conversation or start a new one
                </p>
              </div>
            </div>
          </PageTransition>
        </main>
      </div>
    </Providers>
  );
};

export default HomePage;
