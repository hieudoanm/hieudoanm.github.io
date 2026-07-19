'use client';

import { type FC } from 'react';
import { FiSend } from 'react-icons/fi';

interface SendButtonProps {
  loading: boolean;
  onClick: () => void;
}

export const SendButton: FC<SendButtonProps> = ({ loading, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
    className="btn btn-primary btn-sm">
    {loading ? (
      <span className="loading loading-spinner loading-sm" />
    ) : (
      <FiSend className="size-4" />
    )}
    <span>{loading ? 'Sending' : 'Send'}</span>
  </button>
);

SendButton.displayName = 'SendButton';
