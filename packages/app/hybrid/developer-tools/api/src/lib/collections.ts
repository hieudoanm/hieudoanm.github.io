import {
  CollectionEntry,
  RequestCollection,
  RequestConfig,
  RequestExample,
  RequestGroup,
} from '@/types/api-client';

const uid = (): string => Math.random().toString(36).slice(2, 10);

export const newCollection = (name: string): RequestCollection => ({
  id: uid(),
  name,
  groups: [],
});

export const newGroup = (name: string): RequestGroup => ({
  id: uid(),
  name,
  entries: [],
});

export const newCollectionEntry = (
  name: string,
  request: RequestConfig
): CollectionEntry => ({
  id: uid(),
  name,
  request,
});

export const upsertEntry = (
  collection: RequestCollection,
  entry: CollectionEntry,
  groupId: string
): RequestCollection => {
  const target = collection.groups.find((group) => group.id === groupId);
  if (!target) return collection;
  const exists = target.entries.some((item) => item.id === entry.id);
  const groups = collection.groups.map((group) =>
    group.id === groupId
      ? {
          ...group,
          entries: exists
            ? group.entries.map((item) => (item.id === entry.id ? entry : item))
            : [...group.entries, entry],
        }
      : group
  );
  return { ...collection, groups };
};

export const saveEntry = (
  collections: RequestCollection[],
  request: RequestConfig,
  entryName: string,
  collectionId: string,
  newCollectionName: string,
  groupId: string,
  newGroupName: string
): RequestCollection[] => {
  const entry = newCollectionEntry(entryName, request);
  const existing = collections.find((item) => item.id === collectionId);
  const collection = existing ?? newCollection(newCollectionName);
  let rest = existing ? collections : [...collections, collection];
  let group = collection.groups.find((item) => item.id === groupId);
  let collectionForEntry = collection;
  if (!group) {
    group = newGroup(newGroupName);
    collectionForEntry = {
      ...collection,
      groups: [...collection.groups, group],
    };
    rest = rest.map((item) =>
      item.id === collectionForEntry.id ? collectionForEntry : item
    );
  }
  const updated = upsertEntry(collectionForEntry, entry, group.id);
  return rest.map((item) => (item.id === updated.id ? updated : item));
};

const COLLECTIONS_KEY = 'api-client:collections';

export const loadCollections = (): RequestCollection[] => {
  try {
    const raw = localStorage.getItem(COLLECTIONS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as RequestCollection[]) : [];
  } catch {
    return [];
  }
};

export const saveCollections = (collections: RequestCollection[]): void => {
  try {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
  } catch {
    // storage full or unavailable — ignore
  }
};

export const upsertExample = (
  collection: RequestCollection,
  entryId: string,
  example: RequestExample
): RequestCollection => ({
  ...collection,
  groups: collection.groups.map((group) => ({
    ...group,
    entries: group.entries.map((entry) =>
      entry.id === entryId
        ? {
            ...entry,
            examples: [
              ...(entry.examples ?? []).filter(
                (item) => item.id !== example.id
              ),
              example,
            ],
          }
        : entry
    ),
  })),
});

export const removeExample = (
  collection: RequestCollection,
  entryId: string,
  exampleId: string
): RequestCollection => ({
  ...collection,
  groups: collection.groups.map((group) => ({
    ...group,
    entries: group.entries.map((entry) =>
      entry.id === entryId
        ? {
            ...entry,
            examples: (entry.examples ?? []).filter(
              (item) => item.id !== exampleId
            ),
          }
        : entry
    ),
  })),
});
