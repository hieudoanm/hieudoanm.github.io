'use client';

import { FC } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

const SettingsPage: FC = () => (
  <div className="flex h-screen flex-col">
    <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center gap-3 border-b px-4">
      <Link href="/" className="btn btn-ghost btn-sm gap-1">
        <FiArrowLeft className="text-lg" />
        <span>Clipper</span>
      </Link>
      <span className="divider divider-horizontal mx-0" />
      <h1 className="text-sm font-semibold">Settings</h1>
    </header>
    <main className="flex flex-1 items-center justify-center p-6">
      <div className="text-base-content/50 text-center text-sm">
        <p>Settings coming soon</p>
      </div>
    </main>
  </div>
);

export default SettingsPage;
