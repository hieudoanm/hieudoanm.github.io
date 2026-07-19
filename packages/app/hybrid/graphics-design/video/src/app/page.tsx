'use client';

import Link from 'next/link';
import { FiDownload } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Video Tools</h1>
      <p className="text-base-content/60 max-w-md text-center text-sm">
        Browser-based video and audio processing tools — convert, edit, extract,
        download.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/tools" className="btn btn-primary">
          Open Tools
        </Link>
        <Link href="/downloads" className="btn btn-ghost gap-1.5">
          <FiDownload className="size-4" /> Downloads
        </Link>
      </div>
    </div>
  );
}
