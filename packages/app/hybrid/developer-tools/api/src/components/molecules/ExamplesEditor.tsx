'use client';

import { removeExample, upsertExample } from '@/lib/collections';
import { uid } from '@/lib/http';
import { prettyPrint } from '@/lib/format';
import { downloadFile } from '@/lib/request-file';
import { inferSchema, schemaToJson } from '@/lib/schema';
import { RequestCollection, ResponseMeta } from '@/types/api-client';
import { type FC, useState } from 'react';
import { FiDownload, FiPlus, FiTrash2 } from 'react-icons/fi';

interface ExamplesEditorProps {
  collections: RequestCollection[];
  entryId: string | null;
  response: ResponseMeta | null;
  onUpdate: (next: RequestCollection[]) => void;
}

export const ExamplesEditor: FC<ExamplesEditorProps> = ({
  collections,
  entryId,
  response,
  onUpdate,
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const match = collections.flatMap((collection) =>
    collection.groups.flatMap((group) =>
      group.entries.map((entry) => ({
        collection,
        groupName: group.name,
        entry,
      }))
    )
  );
  const found = match.find((item) => item.entry.id === entryId);
  if (!found) return null;
  const { collection, groupName, entry } = found;
  const examples = entry.examples ?? [];

  const saveResponse = (): void => {
    if (!response) return;
    const next = upsertExample(collection, entry.id, {
      id: uid(),
      name: `Example ${examples.length + 1}`,
      body: response.body,
    });
    onUpdate(
      collections.map((item) => (item.id === collection.id ? next : item))
    );
  };

  const remove = (exampleId: string): void => {
    const next = removeExample(collection, entry.id, exampleId);
    onUpdate(
      collections.map((item) => (item.id === collection.id ? next : item))
    );
  };

  const downloadSchema = (body: string): void => {
    try {
      const schema = inferSchema(JSON.parse(body));
      downloadFile(
        schemaToJson(schema),
        `${entry.name}.schema.json`,
        'application/json'
      );
    } catch {
      // non-JSON body — nothing to export
    }
  };

  return (
    <div className="border-base-300 flex flex-col gap-2 rounded-lg border p-2">
      <div className="flex items-center justify-between">
        <span className="text-base-content/40 text-xs font-bold uppercase">
          Examples · {groupName} / {entry.name}
        </span>
        <button
          type="button"
          onClick={saveResponse}
          disabled={!response}
          className="btn btn-ghost btn-xs gap-1">
          <FiPlus className="size-3" />
          <span>Save response</span>
        </button>
      </div>

      {examples.length === 0 && (
        <p className="text-base-content/40 text-xs">
          No examples yet. Save the current response to create one.
        </p>
      )}

      <ul className="flex flex-col gap-1">
        {examples.map((example) => {
          const open = openId === example.id;
          return (
            <li key={example.id} className="border-base-300 rounded border p-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : example.id)}
                  aria-label={`Toggle example ${example.name}`}
                  className="min-w-0 flex-1 truncate text-left text-xs font-medium">
                  {example.name}
                </button>
                <button
                  type="button"
                  onClick={() => downloadSchema(example.body)}
                  aria-label={`Download schema for ${example.name}`}
                  className="btn btn-ghost btn-xs">
                  <FiDownload className="size-3" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(example.id)}
                  aria-label={`Delete example ${example.name}`}
                  className="btn btn-ghost btn-xs">
                  <FiTrash2 className="size-3" />
                </button>
              </div>
              {open && (
                <div className="flex flex-col gap-1">
                  <pre className="bg-base-200 overflow-x-auto rounded p-2 font-mono text-xs break-all whitespace-pre-wrap">
                    {prettyPrint(example.body)}
                  </pre>
                  <span className="text-base-content/40 text-xs">Schema</span>
                  <pre className="bg-base-200 overflow-x-auto rounded p-2 font-mono text-xs">
                    {schemaPreview(example.body)}
                  </pre>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ExamplesEditor.displayName = 'ExamplesEditor';

const schemaPreview = (body: string): string => {
  try {
    return schemaToJson(inferSchema(JSON.parse(body)));
  } catch {
    return 'Not valid JSON';
  }
};
