'use client';

import { AuthEditor } from '@/components/molecules/AuthEditor';
import { BodyEditor } from '@/components/molecules/BodyEditor';
import { CodegenPanel } from '@/components/molecules/CodegenPanel';
import { ConfigEditor } from '@/components/molecules/ConfigEditor';
import { EnvVariablesEditor } from '@/components/molecules/EnvVariablesEditor';
import { FormFiles } from '@/lib/body';
import { KeyValueEditor } from '@/components/molecules/KeyValueEditor';
import { EnvironmentVariable, RequestConfig } from '@/types/api-client';
import { type FC, useState } from 'react';

type TabId = 'params' | 'headers' | 'body' | 'auth' | 'env' | 'config' | 'code';

const TABS: readonly { id: TabId; label: string }[] = [
  { id: 'params', label: 'Params' },
  { id: 'headers', label: 'Headers' },
  { id: 'body', label: 'Body' },
  { id: 'auth', label: 'Auth' },
  { id: 'env', label: 'Env' },
  { id: 'config', label: 'Config' },
  { id: 'code', label: 'Code' },
];

interface RequestTabsProps {
  request: RequestConfig;
  onChange: (next: RequestConfig) => void;
  env?: EnvironmentVariable[];
  onEnvChange?: (next: EnvironmentVariable[]) => void;
  files?: FormFiles;
  onFilesChange?: (next: FormFiles) => void;
}

export const RequestTabs: FC<RequestTabsProps> = ({
  request,
  onChange,
  env = [],
  onEnvChange = () => undefined,
  files,
  onFilesChange = () => undefined,
}) => {
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
          request={request}
          env={env}
          files={files}
          onChange={onChange}
          onFilesChange={onFilesChange}
        />
      )}

      {active === 'auth' && (
        <AuthEditor request={request} onChange={onChange} />
      )}

      {active === 'env' && (
        <EnvVariablesEditor env={env} onChange={onEnvChange} />
      )}

      {active === 'config' && (
        <ConfigEditor request={request} onChange={onChange} />
      )}

      {active === 'code' && <CodegenPanel request={request} env={env} />}
    </div>
  );
};

RequestTabs.displayName = 'RequestTabs';
