'use client';

import { copyText } from '@/lib/clipboard';
import { inferSchema, schemaToJson, validateSchema } from '@/lib/schema';
import { isJson } from '@/lib/format';
import { type FC, useMemo, useState } from 'react';
import { FiCheckCircle, FiCopy, FiXCircle } from 'react-icons/fi';

interface SchemaCheckProps {
  body: string;
}

export const SchemaCheck: FC<SchemaCheckProps> = ({ body }) => {
  const [schemaText, setSchemaText] = useState('');
  const [copied, setCopied] = useState(false);

  const parsed = useMemo<unknown>(() => {
    if (!isJson(body)) return undefined;
    try {
      return JSON.parse(body);
    } catch {
      return undefined;
    }
  }, [body]);

  if (parsed === undefined) return null;

  const inferred = schemaToJson(inferSchema(parsed));
  const initial = schemaText === '' ? inferred : schemaText;

  const result = useMemo<{
    valid: boolean;
    errors: string[];
    error?: string;
  }>(() => {
    try {
      const schema: unknown = JSON.parse(initial);
      if (typeof schema !== 'object' || schema === null) {
        return { valid: false, errors: [], error: 'Schema must be an object' };
      }
      return validateSchema(
        schema as Parameters<typeof validateSchema>[0],
        parsed
      );
    } catch {
      return { valid: false, errors: [], error: 'Schema is not valid JSON' };
    }
  }, [initial, parsed]);

  const onCopy = (): void => {
    void copyText(initial).then((ok) => {
      if (ok) setCopied(true);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-base-content/50 text-sm font-medium">
          JSON Schema
        </span>
        {result.valid ? (
          <span className="badge badge-success badge-sm gap-1">
            <FiCheckCircle className="size-3" />
            Valid
          </span>
        ) : (
          <span className="badge badge-error badge-sm gap-1">
            <FiXCircle className="size-3" />
            Invalid
          </span>
        )}
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy schema"
          className="btn btn-ghost btn-xs gap-1">
          <FiCopy className="size-3" />
          <span>{copied ? 'Copied' : 'Copy schema'}</span>
        </button>
      </div>
      <textarea
        value={initial}
        onChange={(e) => setSchemaText(e.target.value)}
        aria-label="JSON schema"
        spellCheck={false}
        className="textarea textarea-bordered bg-base-200 h-32 font-mono text-xs"
      />
      {result.error ? (
        <p className="text-error text-xs" role="alert">
          {result.error}
        </p>
      ) : (
        !result.valid && (
          <ul className="text-error text-xs" role="alert">
            {result.errors.slice(0, 5).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
            {result.errors.length > 5 && (
              <li>… and {result.errors.length - 5} more</li>
            )}
          </ul>
        )
      )}
    </div>
  );
};

SchemaCheck.displayName = 'SchemaCheck';
