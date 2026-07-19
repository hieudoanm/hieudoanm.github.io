'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

interface NotFoundTemplateProps {
  code?: number;
  message?: string;
}

export const NotFoundTemplate: FC<NotFoundTemplateProps> = ({
  code = 404,
  message = 'Page not found',
}) => (
  <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 text-center">
    <div>
      <p className="text-primary mb-2 text-xs tracking-[0.2em] uppercase">
        Error {code}
      </p>
      <h1 className="mb-3 text-6xl font-black tracking-tight md:text-8xl">
        {code}
      </h1>
      <p className="text-base-content/50 text-sm">{message}</p>
    </div>
    <div className="flex flex-wrap justify-center gap-3">
      <Link href="/" className="btn btn-primary gap-2">
        <FiHome className="h-4 w-4" />
        Go home
      </Link>
      <button
        onClick={() => window.history.back()}
        className="btn btn-ghost gap-2">
        <FiArrowLeft className="h-4 w-4" />
        Go back
      </button>
    </div>
  </div>
);

NotFoundTemplate.displayName = 'NotFoundTemplate';
