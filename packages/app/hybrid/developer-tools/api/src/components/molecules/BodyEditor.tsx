'use client';

import { bodyTypes, FormFiles } from '@/lib/body';
import { prettyPrint } from '@/lib/format';
import { EnvironmentVariable, RequestConfig } from '@/types/api-client';
import { type FC } from 'react';
import { FiAlignLeft } from 'react-icons/fi';
import { FormDataEditor } from '@/components/molecules/FormDataEditor';
import { GraphQlEditor } from '@/components/molecules/GraphQlEditor';
import { KeyValueEditor } from '@/components/molecules/KeyValueEditor';

interface BodyEditorProps {
  request: RequestConfig;
  env?: EnvironmentVariable[];
  files?: FormFiles;
  onChange: (next: RequestConfig) => void;
  onFilesChange?: (files: FormFiles) => void;
}

export const BodyEditor: FC<BodyEditorProps> = ({
  request,
  env = [],
  files,
  onChange,
  onFilesChange = () => undefined,
}) => (
  <div className="flex flex-col gap-2">
    <div className="tabs tabs-boxed tabs-sm w-fit">
      {bodyTypes.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onChange({ ...request, bodyType: type.id })}
          className={`tab ${request.bodyType === type.id ? 'tab-active' : ''}`}>
          {type.label}
        </button>
      ))}
    </div>

    {request.bodyType === 'raw' && (
      <>
        <textarea
          value={request.body}
          onChange={(e) => onChange({ ...request, body: e.target.value })}
          placeholder='{"name": "value"}'
          aria-label="Request body"
          rows={8}
          spellCheck={false}
          className="textarea textarea-bordered w-full font-mono"
        />
        <button
          type="button"
          onClick={() =>
            onChange({ ...request, body: prettyPrint(request.body) })
          }
          className="btn btn-ghost btn-xs w-fit gap-1">
          <FiAlignLeft className="size-4" />
          <span>Beautify JSON</span>
        </button>
      </>
    )}

    {(request.bodyType === 'form' || request.bodyType === 'urlencoded') &&
      (request.bodyType === 'form' ? (
        <FormDataEditor
          rows={request.formData}
          files={files}
          onChange={(formData) => onChange({ ...request, formData })}
          onFilesChange={onFilesChange}
        />
      ) : (
        <KeyValueEditor
          rows={request.formData}
          onChange={(formData) => onChange({ ...request, formData })}
          keyPlaceholder="Field"
          valuePlaceholder="Value"
          ariaLabel="URL encoded field"
        />
      ))}

    {request.bodyType === 'graphql' && (
      <GraphQlEditor
        query={request.graphqlQuery}
        variables={request.graphqlVariables}
        url={request.url}
        env={env}
        onQueryChange={(graphqlQuery) => onChange({ ...request, graphqlQuery })}
        onVariablesChange={(graphqlVariables) =>
          onChange({ ...request, graphqlVariables })
        }
      />
    )}
  </div>
);

BodyEditor.displayName = 'BodyEditor';
