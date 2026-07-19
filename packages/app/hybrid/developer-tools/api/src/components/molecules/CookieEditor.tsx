'use client';

import { addCookie, cookiesForDomain, hostForUrl } from '@/lib/cookies';
import { StoredCookie } from '@/types/api-client';
import { type FC, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

interface CookieEditorProps {
  cookies: StoredCookie[];
  url: string;
  onChange: (cookies: StoredCookie[]) => void;
}

export const CookieEditor: FC<CookieEditorProps> = ({
  cookies,
  url,
  onChange,
}) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const domainCookies = cookiesForDomain(cookies, url);
  const host = hostForUrl(url) || 'localhost';

  const onAdd = (): void => {
    const trimmed = name.trim();
    if (trimmed === '') return;
    onChange(
      addCookie(cookies, {
        domain: host,
        name: trimmed,
        value,
        path: '/',
        secure: false,
        enabled: true,
      })
    );
    setName('');
    setValue('');
  };

  const toggle = (id: string): void =>
    onChange(
      cookies.map((cookie) =>
        cookie.id === id ? { ...cookie, enabled: !cookie.enabled } : cookie
      )
    );

  const remove = (id: string): void =>
    onChange(cookies.filter((cookie) => cookie.id !== id));

  return (
    <div className="flex flex-col gap-2">
      <div className="text-base-content/60 text-xs">
        {domainCookies.length === 0
          ? 'No cookies for this host. Add one or receive Set-Cookie from a response.'
          : `${domainCookies.length} cookie${domainCookies.length === 1 ? '' : 's'} for ${host}`}
      </div>

      {domainCookies.map((cookie) => (
        <div key={cookie.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={cookie.enabled}
            onChange={() => toggle(cookie.id)}
            aria-label={`Toggle ${cookie.name}`}
            className="checkbox checkbox-xs"
          />
          <span className="w-40 truncate font-mono text-sm">{cookie.name}</span>
          <span className="text-base-content/60 flex-1 truncate font-mono text-sm">
            {cookie.value}
          </span>
          <button
            type="button"
            onClick={() => remove(cookie.id)}
            aria-label={`Remove ${cookie.name}`}
            className="btn btn-ghost btn-xs btn-square">
            <FiTrash2 className="size-4" />
          </button>
        </div>
      ))}

      <div className="border-base-300 flex items-center gap-1 border-t pt-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cookie name"
          aria-label="Cookie name"
          className="input input-bordered input-sm flex-1 font-mono"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
          aria-label="Cookie value"
          className="input input-bordered input-sm flex-1 font-mono"
        />
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add cookie"
          className="btn btn-ghost btn-xs gap-1">
          <FiPlus className="size-4" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

CookieEditor.displayName = 'CookieEditor';
