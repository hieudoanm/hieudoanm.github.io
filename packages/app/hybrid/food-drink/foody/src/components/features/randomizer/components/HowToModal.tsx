'use client';

import type { FC } from 'react';

interface HowToModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  steps: string[];
}

export const HowToModal: FC<HowToModalProps> = ({
  open,
  onClose,
  title,
  steps,
}) => {
  if (!open) return null;

  return (
    <div
      data-testid="how-to-modal"
      className="bg-base-100/10 fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-12 backdrop-blur-sm">
      <div className="rounded-box border-base-300 bg-base-200 relative w-full max-w-xl border shadow-2xl">
        <div className="border-base-300 flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-base-content m-0 text-lg font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="btn btn-ghost btn-sm btn-square text-base-content/60 hover:text-base-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ol className="text-base-content m-0 flex list-decimal flex-col gap-3 p-6 pl-10">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

HowToModal.displayName = 'HowToModal';
