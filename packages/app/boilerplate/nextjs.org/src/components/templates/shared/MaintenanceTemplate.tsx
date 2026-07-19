'use client';

import type { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { FiTool, FiBell, FiMail, FiCheck } from 'react-icons/fi';

export const MaintenanceTemplate: FC = () => {
  const [notified, setNotified] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="bg-primary/10 text-primary flex h-20 w-20 items-center justify-center rounded-2xl">
        <FiTool className="h-10 w-10" />
      </div>
      <div>
        <p className="badge badge-neutral mb-4 rounded-full">
          Scheduled maintenance
        </p>
        <h1 className="mb-3 text-4xl md:text-5xl">
          We&apos;ll be back shortly
        </h1>
        <p className="text-base-content/50 mx-auto max-w-md text-sm leading-relaxed">
          We&apos;re performing scheduled maintenance to improve your
          experience. We appreciate your patience.
        </p>
      </div>

      <div className="border-base-content/10 bg-base-200 flex flex-col items-center gap-4 rounded-2xl border p-6">
        {notified ? (
          <div className="flex items-center gap-2 text-sm">
            <FiCheck className="text-success h-4 w-4" />
            <span>We&apos;ll email you when we&apos;re back.</span>
          </div>
        ) : (
          <>
            <p className="text-base-content/50 text-xs">
              Get notified when we&apos;re back online
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered input-sm w-56"
              />
              <button
                onClick={() => setNotified(true)}
                className="btn btn-primary btn-sm gap-1">
                <FiBell className="h-3.5 w-3.5" />
                Notify me
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex gap-4">
        <Link href="/" className="btn btn-ghost btn-sm gap-2">
          <FiMail className="h-4 w-4" />
          Contact support
        </Link>
      </div>
    </div>
  );
};

MaintenanceTemplate.displayName = 'MaintenanceTemplate';
