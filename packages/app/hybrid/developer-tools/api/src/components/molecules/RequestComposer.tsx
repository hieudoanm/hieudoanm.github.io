'use client';

import { MethodSelect } from '@/components/atoms/MethodSelect';
import { SendButton } from '@/components/atoms/SendButton';
import { UrlInput } from '@/components/atoms/UrlInput';
import { RequestConfig } from '@/types/api-client';
import { type FC } from 'react';

interface RequestComposerProps {
  request: RequestConfig;
  loading: boolean;
  onChange: (next: RequestConfig) => void;
  onSend: () => void;
}

export const RequestComposer: FC<RequestComposerProps> = ({
  request,
  loading,
  onChange,
  onSend,
}) => (
  <div className="flex items-center gap-2">
    <MethodSelect
      method={request.method}
      onChange={(method) => onChange({ ...request, method })}
    />
    <UrlInput
      url={request.url}
      onChange={(url) => onChange({ ...request, url })}
      onEnter={onSend}
    />
    <SendButton loading={loading} onClick={onSend} />
  </div>
);

RequestComposer.displayName = 'RequestComposer';
