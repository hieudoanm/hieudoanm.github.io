import { ApiClient } from '@/components/organisms/ApiClient';
import { PageTransition } from '@/components/templates/PageTransition';
import { NextPage } from 'next';
import Link from 'next/link';

const HomePage: NextPage = () => (
  <div className="flex h-screen flex-col">
    <header className="border-base-300 flex items-center justify-between gap-2 border-b px-4 py-2">
      <nav className="flex items-center gap-1">
        <div>
          <h1 className="text-sm font-bold">API Client</h1>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/about" className="btn btn-ghost btn-xs">
            About
          </Link>
          <Link href="/settings" className="btn btn-ghost btn-xs">
            Settings
          </Link>
          <Link href="/version" className="btn btn-ghost btn-xs">
            Version
          </Link>
        </div>
      </nav>
    </header>
    <main className="min-h-0 flex-1 p-4">
      <PageTransition>
        <ApiClient />
      </PageTransition>
    </main>
  </div>
);

export default HomePage;
