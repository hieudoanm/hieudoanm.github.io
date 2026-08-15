import {
  loadCollections,
  newCollection,
  newCollectionEntry,
  newGroup,
  removeExample,
  saveCollections,
  saveEntry,
  upsertEntry,
  upsertExample,
} from '@/lib/collections';
import { emptyRequest } from '@/lib/http';

const request = () => ({
  ...emptyRequest(),
  url: 'https://api.example.com/users',
});

describe('collection factories', () => {
  it('creates a collection with a name', () => {
    const collection = newCollection('Users API');
    expect(collection.name).toBe('Users API');
    expect(collection.groups).toEqual([]);
  });

  it('creates a group with a name', () => {
    const group = newGroup('Auth');
    expect(group.name).toBe('Auth');
    expect(group.entries).toEqual([]);
  });

  it('creates an entry with a name and request', () => {
    const entry = newCollectionEntry('List users', request());
    expect(entry.name).toBe('List users');
    expect(entry.request.url).toBe('https://api.example.com/users');
  });
});

describe('upsertEntry', () => {
  it('adds an entry to a group', () => {
    const collection = newCollection('API');
    const withGroup = { ...collection, groups: [newGroup('Users')] };
    const entry = newCollectionEntry('List', request());
    const updated = upsertEntry(withGroup, entry, withGroup.groups[0].id);
    expect(updated.groups[0].entries).toHaveLength(1);
  });

  it('returns the collection unchanged when the group is missing', () => {
    const collection = newCollection('API');
    const updated = upsertEntry(
      collection,
      newCollectionEntry('x', request()),
      'missing'
    );
    expect(updated.groups).toEqual([]);
  });

  it('leaves other groups untouched when upserting', () => {
    const collection = {
      ...newCollection('API'),
      groups: [newGroup('Users'), newGroup('Auth')],
    };
    const entry = newCollectionEntry('Login', request());
    const updated = upsertEntry(collection, entry, collection.groups[1].id);
    expect(updated.groups[0].entries).toHaveLength(0);
    expect(updated.groups[1].entries[0].name).toBe('Login');
  });

  it('replaces an entry in a multi-group collection', () => {
    const collection = {
      ...newCollection('API'),
      groups: [newGroup('Users'), newGroup('Auth')],
    };
    const entry = newCollectionEntry('Login', request());
    const withEntry = upsertEntry(collection, entry, collection.groups[1].id);
    const replaced = upsertEntry(
      withEntry,
      { ...entry, name: 'Login renamed' },
      withEntry.groups[1].id
    );
    expect(replaced.groups[1].entries[0].name).toBe('Login renamed');
  });
});

describe('saveEntry', () => {
  it('adds an entry to an existing collection and group', () => {
    const collection = {
      ...newCollection('API'),
      groups: [newGroup('Users')],
    };
    const next = saveEntry(
      [collection],
      request(),
      'List users',
      collection.id,
      'ignored',
      collection.groups[0].id,
      'ignored'
    );
    expect(next[0].groups[0].entries[0].name).toBe('List users');
  });

  it('creates a new collection and group when ids are missing', () => {
    const next = saveEntry(
      [],
      request(),
      'List users',
      'missing',
      'My API',
      'missing',
      'Users'
    );
    expect(next).toHaveLength(1);
    expect(next[0].name).toBe('My API');
    expect(next[0].groups[0].name).toBe('Users');
    expect(next[0].groups[0].entries[0].name).toBe('List users');
  });

  it('adds an entry to an existing collection but new group', () => {
    const collection = newCollection('API');
    const next = saveEntry(
      [collection],
      request(),
      'List',
      collection.id,
      'x',
      'missing',
      'Auth'
    );
    expect(next[0].groups).toHaveLength(1);
    expect(next[0].groups[0].name).toBe('Auth');
    expect(next[0].groups[0].entries[0].name).toBe('List');
  });

  it('replaces an entry with the same id', () => {
    const collection = {
      ...newCollection('API'),
      groups: [newGroup('Users')],
    };
    const entry = newCollectionEntry('List', request());
    const withEntry = upsertEntry(collection, entry, collection.groups[0].id);
    const replaced = upsertEntry(
      withEntry,
      { ...entry, name: 'List renamed' },
      withEntry.groups[0].id
    );
    const entries = replaced.groups[0].entries;
    expect(entries).toHaveLength(1);
    expect(entries[0].name).toBe('List renamed');
  });
});

describe('collection persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads collections', () => {
    const collection = newCollection('API');
    saveCollections([collection]);
    expect(loadCollections()).toHaveLength(1);
    expect(loadCollections()[0].name).toBe('API');
  });

  it('returns empty array on corrupt storage', () => {
    localStorage.setItem('api-client:collections', 'not-json');
    expect(loadCollections()).toEqual([]);
  });

  it('returns empty array when not an array', () => {
    localStorage.setItem('api-client:collections', '{"x":1}');
    expect(loadCollections()).toEqual([]);
  });
});

describe('request examples', () => {
  const withEntry = () => ({
    ...newCollection('API'),
    groups: [
      {
        ...newGroup('Users'),
        entries: [newCollectionEntry('List', request())],
      },
    ],
  });

  it('adds an example to an entry', () => {
    const source = withEntry();
    const updated = upsertExample(source, source.groups[0].entries[0].id, {
      id: 'e1',
      name: 'Sample',
      body: '{"ok":true}',
    });
    expect(updated.groups[0].entries[0].examples).toEqual([
      { id: 'e1', name: 'Sample', body: '{"ok":true}' },
    ]);
  });

  it('replaces an existing example with the same id', () => {
    const source = withEntry();
    const updated = upsertExample(source, source.groups[0].entries[0].id, {
      id: 'e1',
      name: 'Sample',
      body: '{"ok":true}',
    });
    const replaced = upsertExample(updated, updated.groups[0].entries[0].id, {
      id: 'e1',
      name: 'Sample v2',
      body: '{"ok":false}',
    });
    expect(replaced.groups[0].entries[0].examples).toHaveLength(1);
    expect(replaced.groups[0].entries[0].examples?.[0].name).toBe('Sample v2');
  });

  it('does not touch other entries when adding an example', () => {
    const source = withEntry();
    const other = newCollectionEntry('Other', request());
    const collection = {
      ...source,
      groups: [
        { ...source.groups[0], entries: [...source.groups[0].entries, other] },
      ],
    };
    const updated = upsertExample(collection, other.id, {
      id: 'e1',
      name: 'S',
      body: '{}',
    });
    expect(updated.groups[0].entries[0].examples).toBeUndefined();
    expect(updated.groups[0].entries[1].examples).toHaveLength(1);
  });

  it('removes an example by id', () => {
    const source = withEntry();
    const updated = upsertExample(source, source.groups[0].entries[0].id, {
      id: 'e1',
      name: 'Sample',
      body: '{"ok":true}',
    });
    const removed = removeExample(
      updated,
      updated.groups[0].entries[0].id,
      'e1'
    );
    expect(removed.groups[0].entries[0].examples).toEqual([]);
  });
});
