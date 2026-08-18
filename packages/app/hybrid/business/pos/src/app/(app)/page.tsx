import Link from 'next/link';
import { NextPage } from 'next';

const HomePage: NextPage = () => (
  <div className="flex h-screen flex-col">
    <header className="border-base-300 flex items-center justify-between gap-2 border-b px-4 py-2">
      <nav className="flex items-center gap-1">
        <div>
          <h1 className="text-sm font-bold">POS</h1>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/about" className="btn btn-ghost btn-xs">
            About
          </Link>
          <Link href="/downloads" className="btn btn-ghost btn-xs">
            Downloads
          </Link>
          <Link href="/version" className="btn btn-ghost btn-xs">
            Version
          </Link>
        </div>
      </nav>
    </header>
    <main className="min-h-0 flex-1 p-4">
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-base-content/50 text-sm">
          Point of Sale client coming soon.
        </p>
      </div>
    </main>
  </div>
);

export default HomePage;
