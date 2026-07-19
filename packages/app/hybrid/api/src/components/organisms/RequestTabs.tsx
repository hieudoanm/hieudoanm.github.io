'use client';

import { AuthEditor } from '@/components/molecules/AuthEditor';
import { BodyEditor } from '@/components/molecules/BodyEditor';
import { KeyValueEditor } from '@/components/molecules/KeyValueEditor';
import { RequestConfig } from '@/types/api-client';
import { type FC, useState } from 'react';

type TabId = 'params' | 'headers' | 'body' | 'auth';

const TABS: readonly { id: TabId; label: string }[] = [
  { id: 'params', label: 'Params' },
  { id: 'headers', label: 'Headers' },
  { id: 'body', label: 'Body' },
  { id: 'auth', label: 'Auth' },
];

interface RequestTabsProps {
  request: RequestConfig;
  onChange: (next: RequestConfig) => void;
}

export const RequestTabs: FC<RequestTabsProps> = ({ request, onChange }) => {
  const [active, setActive] = useState<TabId>('params');

  return (
    <div className="flex flex-col gap-3">
      <div className="tabs tabs-bordered tabs-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`tab ${active === tab.id ? 'tab-active' : ''}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {active === 'params' && (
        <KeyValueEditor
          rows={request.params}
          onChange={(params) => onChange({ ...request, params })}
          ariaLabel="Query parameter"
        />
      )}

      {active === 'headers' && (
        <KeyValueEditor
          rows={request.headers}
          onChange={(headers) => onChange({ ...request, headers })}
          keyPlaceholder="Header"
          ariaLabel="Header"
        />
      )}

      {active === 'body' && (
        <BodyEditor
          body={request.body}
          onChange={(body) => onChange({ ...request, body })}
        />
      )}

      {active === 'auth' && (
        <AuthEditor request={request} onChange={onChange} />
      )}
    </div>
  );
};

RequestTabs.displayName = 'RequestTabs';
