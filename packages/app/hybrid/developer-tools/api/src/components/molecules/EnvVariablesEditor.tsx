'use client';

import { newEnvironmentVariable } from '@/lib/variables';
import { EnvironmentVariable } from '@/types/api-client';
import { type FC } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

interface EnvVariablesEditorProps {
  env: EnvironmentVariable[];
  onChange: (next: EnvironmentVariable[]) => void;
}

export const EnvVariablesEditor: FC<EnvVariablesEditorProps> = ({
  env,
  onChange,
}) => {
  const update = (id: string, patch: Partial<EnvironmentVariable>): void =>
    onChange(
      env.map((variable) =>
        variable.id === id ? { ...variable, ...patch } : variable
      )
    );

  const remove = (id: string): void =>
    onChange(env.filter((variable) => variable.id !== id));

  const add = (): void => onChange([...env, newEnvironmentVariable()]);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base-content/50 text-xs">
        Define variables and reference them anywhere with {'{{name}}'}. Disabled
        variables are ignored during requests.
      </p>
      <div className="flex flex-col gap-2">
        {env.map((variable) => (
          <div key={variable.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={variable.enabled}
              onChange={(e) =>
                update(variable.id, { enabled: e.target.checked })
              }
              aria-label={`Enable variable ${variable.key || variable.id}`}
              className="checkbox checkbox-sm"
            />
            <input
              type="text"
              value={variable.key}
              onChange={(e) => update(variable.id, { key: e.target.value })}
              placeholder="Variable name"
              aria-label="Environment variable key"
              className="input input-bordered input-sm w-48 font-mono"
            />
            <input
              type="text"
              value={variable.value}
              onChange={(e) => update(variable.id, { value: e.target.value })}
              placeholder="Value"
              aria-label="Environment variable value"
              className="input input-bordered input-sm flex-1 font-mono"
            />
            <button
              type="button"
              onClick={() => remove(variable.id)}
              aria-label={`Remove variable ${variable.key || variable.id}`}
              className="btn btn-ghost btn-sm">
              <FiTrash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="btn btn-ghost btn-xs w-fit gap-1">
        <FiPlus className="size-4" />
        <span>Add variable</span>
      </button>
    </div>
  );
};

EnvVariablesEditor.displayName = 'EnvVariablesEditor';
