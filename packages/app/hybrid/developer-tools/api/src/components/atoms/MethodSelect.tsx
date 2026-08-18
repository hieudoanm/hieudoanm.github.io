'use client';

import { METHOD_COLORS } from '@/lib/format';
import { HTTP_METHODS, HttpMethod } from '@/types/api-client';
import { type FC } from 'react';

interface MethodSelectProps {
  method: HttpMethod;
  onChange: (method: HttpMethod) => void;
}

export const MethodSelect: FC<MethodSelectProps> = ({ method, onChange }) => (
  <select
    value={method}
    onChange={(e) => onChange(e.target.value as HttpMethod)}
    aria-label="HTTP method"
    className={`select select-bordered select-sm w-28 ${METHOD_COLORS[method]} border-transparent`}>
    {HTTP_METHODS.map((m) => (
      <option key={m} value={m}>
        {m}
      </option>
    ))}
  </select>
);

MethodSelect.displayName = 'MethodSelect';
