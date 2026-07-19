'use client';

import { type FC } from 'react';

interface UrlInputProps {
  url: string;
  onChange: (url: string) => void;
  onEnter: () => void;
}

export const UrlInput: FC<UrlInputProps> = ({ url, onChange, onEnter }) => (
  <input
    type="text"
    value={url}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') onEnter();
    }}
    placeholder="https://api.example.com/users"
    aria-label="Request URL"
    className="input input-bordered input-sm flex-1 font-mono"
  />
);

UrlInput.displayName = 'UrlInput';
