'use client';

import { AuthType, RequestConfig } from '@/types/api-client';
import { type FC } from 'react';

interface AuthEditorProps {
  request: RequestConfig;
  onChange: (next: RequestConfig) => void;
}

const AUTH_OPTIONS: readonly { value: AuthType; label: string }[] = [
  { value: 'none', label: 'No Auth' },
  { value: 'bearer', label: 'Bearer Token' },
  { value: 'basic', label: 'Basic Auth' },
];

export const AuthEditor: FC<AuthEditorProps> = ({ request, onChange }) => {
  const update = (patch: Partial<RequestConfig>): void =>
    onChange({ ...request, ...patch });

  return (
    <div className="flex flex-col gap-3">
      <select
        value={request.authType}
        onChange={(e) => update({ authType: e.target.value as AuthType })}
        aria-label="Auth type"
        className="select select-bordered select-sm w-48">
        {AUTH_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {request.authType === 'bearer' && (
        <input
          type="text"
          value={request.token}
          onChange={(e) => update({ token: e.target.value })}
          placeholder="Your access token"
          aria-label="Bearer token"
          className="input input-bordered input-sm max-w-md font-mono"
        />
      )}

      {request.authType === 'basic' && (
        <div className="flex max-w-md flex-col gap-2">
          <input
            type="text"
            value={request.username}
            onChange={(e) => update({ username: e.target.value })}
            placeholder="Username"
            aria-label="Basic username"
            className="input input-bordered input-sm font-mono"
          />
          <input
            type="password"
            value={request.password}
            onChange={(e) => update({ password: e.target.value })}
            placeholder="Password"
            aria-label="Basic password"
            className="input input-bordered input-sm font-mono"
          />
        </div>
      )}
    </div>
  );
};

AuthEditor.displayName = 'AuthEditor';
