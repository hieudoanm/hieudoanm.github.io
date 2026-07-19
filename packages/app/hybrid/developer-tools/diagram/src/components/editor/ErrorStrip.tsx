'use client';

import { FC } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import type { ParseError } from '@/lib/types';

interface ErrorStripProps {
  errors: ParseError[];
}

const ErrorStrip: FC<ErrorStripProps> = ({ errors }) => (
  <div className="border-base-300 bg-error/10 text-error border-b px-3 py-1.5 text-xs">
    <div className="flex items-center gap-2">
      <FiAlertTriangle size={14} />
      <span className="font-semibold">Parse errors</span>
    </div>
    <ul className="mt-1 space-y-0.5">
      {errors.map((error) => (
        <li key={`${error.line}:${error.message}`}>
          line {error.line}: {error.message}
        </li>
      ))}
    </ul>
  </div>
);

export default ErrorStrip;
