'use client';

import { saveEntry } from '@/lib/collections';
import { openApiToCollection } from '@/lib/openapi';
import { METHOD_COLORS } from '@/lib/format';
import { readTextFile } from '@/lib/request-file';
import { ExamplesEditor } from '@/components/molecules/ExamplesEditor';
import {
  RequestCollection,
  RequestConfig,
  ResponseMeta,
} from '@/types/api-client';
import { type ChangeEvent, type FC, useState } from 'react';
import { FiFolder, FiPlus, FiTrash2, FiUpload } from 'react-icons/fi';

interface CollectionsPanelProps {
  collections: RequestCollection[];
  request: RequestConfig;
  activeEntryId: string | null;
  response?: ResponseMeta | null;
  onLoad: (request: RequestConfig, entryId: string) => void;
  onUpdate: (next: RequestCollection[]) => void;
}

const NEW_COLLECTION = '__new__';
const NEW_GROUP = '__new__';

export const CollectionsPanel: FC<CollectionsPanelProps> = ({
  collections,
  request,
  activeEntryId,
  response,
  onLoad,
  onUpdate,
}) => {
  const [entryName, setEntryName] = useState('');
  const [collectionId, setCollectionId] = useState<string>(NEW_COLLECTION);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [groupId, setGroupId] = useState<string>(NEW_GROUP);
  const [newGroupName, setNewGroupName] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  const selectedCollection =
    collectionId === NEW_COLLECTION
      ? null
      : (collections.find((collection) => collection.id === collectionId) ??
        null);

  const handleSave = (): void => {
    const name = entryName.trim() || request.url || 'Untitled';
    onUpdate(
      saveEntry(
        collections,
        request,
        name,
        collectionId,
        newCollectionName.trim() || 'My Collection',
        groupId,
        newGroupName.trim() || 'Requests'
      )
    );
    setEntryName('');
  };

  const onImportFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    void readTextFile(file)
      .then((text) => {
        const collection = openApiToCollection(text);
        if (collection) {
          onUpdate([...collections, collection]);
          setImportError(null);
        } else {
          setImportError('Invalid or empty OpenAPI spec');
        }
      })
      .catch(() => setImportError('Failed to read file'));
    event.target.value = '';
  };

  const removeCollection = (id: string): void =>
    onUpdate(collections.filter((collection) => collection.id !== id));

  const removeGroup = (collectionId: string, groupId: string): void =>
    onUpdate(
      collections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              groups: collection.groups.filter((group) => group.id !== groupId),
            }
          : collection
      )
    );

  const removeEntry = (
    collectionId: string,
    groupId: string,
    entryId: string
  ): void =>
    onUpdate(
      collections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              groups: collection.groups.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      entries: group.entries.filter(
                        (entry) => entry.id !== entryId
                      ),
                    }
                  : group
              ),
            }
          : collection
      )
    );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-2">
        <span className="text-base-content/40 text-xs font-bold uppercase">
          Collections
        </span>
        <label className="btn btn-ghost btn-xs gap-1">
          <FiUpload className="size-3" />
          <span>OpenAPI</span>
          <input
            type="file"
            accept=".json,application/json"
            onChange={onImportFile}
            aria-label="Import OpenAPI spec"
            className="hidden"
          />
        </label>
      </div>

      <div className="border-base-300 flex flex-col gap-2 rounded-lg border p-2">
        <span className="text-base-content/40 text-xs font-bold uppercase">
          Save current request
        </span>
        <input
          type="text"
          value={entryName}
          onChange={(e) => setEntryName(e.target.value)}
          placeholder="Entry name"
          aria-label="Collection entry name"
          className="input input-bordered input-xs"
        />
        <select
          value={collectionId}
          onChange={(e) => {
            setCollectionId(e.target.value);
            setGroupId(NEW_GROUP);
          }}
          aria-label="Collection"
          className="select select-bordered select-xs">
          <option value={NEW_COLLECTION}>New collection</option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
        {!selectedCollection && (
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Collection name"
            aria-label="New collection name"
            className="input input-bordered input-xs"
          />
        )}
        <select
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          aria-label="Group"
          className="select select-bordered select-xs">
          <option value={NEW_GROUP}>
            {selectedCollection && selectedCollection.groups.length > 0
              ? 'New group'
              : 'Group'}
          </option>
          {(selectedCollection?.groups ?? []).map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        {groupId === NEW_GROUP && (
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Group name"
            aria-label="New group name"
            className="input input-bordered input-xs"
          />
        )}
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-primary btn-xs w-fit gap-1">
          <FiPlus className="size-3" />
          <span>Save</span>
        </button>
      </div>

      {importError && (
        <div role="alert" className="alert alert-error py-1 text-xs">
          <span>{importError}</span>
        </div>
      )}

      {collections.length === 0 && (
        <div className="text-base-content/40 flex flex-col items-center gap-2 py-6">
          <FiFolder className="size-6" />
          <p className="text-sm">No collections yet</p>
        </div>
      )}

      <ul className="menu w-full gap-0.5 p-1">
        {collections.map((collection) => (
          <li key={collection.id}>
            <details>
              <summary className="flex items-center gap-1">
                <span className="flex-1 font-medium">{collection.name}</span>
                <button
                  type="button"
                  onClick={() => removeCollection(collection.id)}
                  aria-label={`Delete collection ${collection.name}`}
                  className="btn btn-ghost btn-xs">
                  <FiTrash2 className="size-3" />
                </button>
              </summary>
              <ul>
                {collection.groups.map((group) => (
                  <li key={group.id}>
                    <details>
                      <summary className="flex items-center gap-1">
                        <span className="flex-1 text-sm">{group.name}</span>
                        <button
                          type="button"
                          onClick={() => removeGroup(collection.id, group.id)}
                          aria-label={`Delete group ${group.name}`}
                          className="btn btn-ghost btn-xs">
                          <FiTrash2 className="size-3" />
                        </button>
                      </summary>
                      <ul>
                        {group.entries.map((entry) => (
                          <li key={entry.id}>
                            <span
                              className={`flex items-center gap-1 ${
                                activeEntryId === entry.id ? 'menu-active' : ''
                              }`}>
                              <button
                                type="button"
                                onClick={() => onLoad(entry.request, entry.id)}
                                className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
                                <span
                                  className={`badge ${
                                    METHOD_COLORS[entry.request.method]
                                  } badge-xs`}>
                                  {entry.request.method}
                                </span>
                                <span className="truncate text-xs">
                                  {entry.name}
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  removeEntry(collection.id, group.id, entry.id)
                                }
                                aria-label={`Delete entry ${entry.name}`}
                                className="btn btn-ghost btn-xs">
                                <FiTrash2 className="size-3" />
                              </button>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>

      <ExamplesEditor
        collections={collections}
        entryId={activeEntryId}
        response={response ?? null}
        onUpdate={onUpdate}
      />
    </div>
  );
};

CollectionsPanel.displayName = 'CollectionsPanel';
