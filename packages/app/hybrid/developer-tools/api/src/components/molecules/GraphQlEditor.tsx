'use client';

import { prettyPrint } from '@/lib/format';
import { graphqlVariablesObject, introspectSchema } from '@/lib/graphql';
import { EnvironmentVariable } from '@/types/api-client';
import { type FC, useState } from 'react';
import { FiAlignLeft, FiSearch } from 'react-icons/fi';

interface GraphQlEditorProps {
  query: string;
  variables: string;
  url: string;
  env?: EnvironmentVariable[];
  onQueryChange: (query: string) => void;
  onVariablesChange: (variables: string) => void;
}

export const GraphQlEditor: FC<GraphQlEditorProps> = ({
  query,
  variables,
  url,
  env = [],
  onQueryChange,
  onVariablesChange,
}) => {
  const [introspection, setIntrospection] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onIntrospect = async (): Promise<void> => {
    setBusy(true);
    const result = await introspectSchema(url, env);
    setIntrospection(
      result.error
        ? `Introspection failed (mock schema shown): ${result.error}`
        : `Query: ${result.queryType ?? '—'}  ·  Mutation: ${
            result.mutationType ?? '—'
          }\n\nTypes:\n${result.types.join('\n')}`
    );
    setBusy(false);
  };

  const validVariables = graphqlVariablesObject(variables) !== undefined;

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="query { viewer { id name } }"
        aria-label="GraphQL query"
        rows={5}
        spellCheck={false}
        className="textarea textarea-bordered w-full font-mono"
      />
      <textarea
        value={variables}
        onChange={(e) => onVariablesChange(e.target.value)}
        placeholder='{"id": 42}'
        aria-label="GraphQL variables"
        rows={3}
        spellCheck={false}
        className="textarea textarea-bordered w-full font-mono"
      />
      {variables.trim() !== '' && !validVariables && (
        <span role="alert" className="text-error text-xs">
          Variables must be valid JSON
        </span>
      )}
      <div className="flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => onQueryChange(prettyPrint(query))}
          className="btn btn-ghost btn-xs gap-1">
          <FiAlignLeft className="size-4" />
          <span>Beautify</span>
        </button>
        <button
          type="button"
          onClick={() => void onIntrospect()}
          disabled={busy}
          className="btn btn-ghost btn-xs gap-1">
          <FiSearch className="size-4" />
          <span>{busy ? 'Introspecting…' : 'Introspect Schema'}</span>
        </button>
      </div>
      {introspection && (
        <pre className="bg-base-200 overflow-x-auto rounded-lg p-3 font-mono text-xs whitespace-pre-wrap">
          {introspection}
        </pre>
      )}
    </div>
  );
};

GraphQlEditor.displayName = 'GraphQlEditor';
