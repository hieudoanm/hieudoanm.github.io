'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { FiZap, FiBell, FiCheck, FiArrowRight } from 'react-icons/fi';

export const ComingSoonTemplate: FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-base-300 bg-base-100/80 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 backdrop-blur-sm">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Boilerplate
        </Link>
        <Link href="/sign-up" className="btn btn-primary btn-sm">
          Get early access
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <span className="badge badge-neutral mb-6 rounded-full">
          Coming soon
        </span>
        <h1 className="mb-6 text-5xl md:text-7xl">Something great is coming</h1>
        <p className="text-base-content/50 mb-10 max-w-xl text-sm leading-relaxed">
          We&apos;re building something amazing. Join the waitlist to be the
          first to know when we launch.
        </p>

        {subscribed ? (
          <div className="border-base-content/10 bg-base-200 flex items-center gap-3 rounded-xl border px-6 py-4">
            <FiCheck className="text-success h-5 w-5" />
            <span className="text-sm font-medium">
              You&apos;re on the list!
            </span>
          </div>
        ) : (
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={() => {
                if (email) setSubscribed(true);
              }}
              className="btn btn-primary gap-2">
              <FiBell className="h-4 w-4" />
              Notify me
            </button>
          </div>
        )}

        <div className="mt-16 flex items-center gap-8 text-xs">
          <span className="text-base-content/30">Launching soon</span>
          <span className="text-base-content/10">&middot;</span>
          <span className="text-base-content/30">Free tier available</span>
          <span className="text-base-content/10">&middot;</span>
          <span className="text-base-content/30">No spam, ever</span>
        </div>
      </main>

      <footer className="border-base-300 border-t px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-base-content/50 text-xs">
            &copy; {new Date().getFullYear()} Boilerplate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

ComingSoonTemplate.displayName = 'ComingSoonTemplate';
