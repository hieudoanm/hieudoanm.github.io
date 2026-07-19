import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CollectionsPanel } from '../CollectionsPanel';
import { newCollection, newCollectionEntry, newGroup } from '@/lib/collections';
import { emptyRequest } from '@/lib/http';

jest.mock('@/lib/request-file', () => {
  const actual = jest.requireActual('@/lib/request-file') as {
    readTextFile: (file: File) => Promise<string>;
  };
  return { ...actual, readTextFile: jest.fn(actual.readTextFile) };
});

const spec = JSON.stringify({
  openapi: '3.0.0',
  paths: {
    '/users': {
      get: {
        operationId: 'listUsers',
        summary: 'List all users',
      },
    },
  },
});

const collection = {
  ...newCollection('Users API'),
  groups: [
    {
      ...newGroup('Users'),
      entries: [
        newCollectionEntry('List users', {
          ...emptyRequest(),
          url: 'https://api.example.com/users',
        }),
      ],
    },
  ],
};

describe('CollectionsPanel', () => {
  const onLoad = jest.fn();
  const onUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the empty state', () => {
    render(
      <CollectionsPanel
        collections={[]}
        request={emptyRequest()}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    expect(screen.getByText('No collections yet')).toBeInTheDocument();
  });

  it('saves the current request into a new collection', () => {
    render(
      <CollectionsPanel
        collections={[]}
        request={{ ...emptyRequest(), url: 'https://api.example.com/users' }}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    fireEvent.change(screen.getByLabelText('Collection entry name'), {
      target: { value: 'List users' },
    });
    fireEvent.click(screen.getByText('Save'));

    expect(onUpdate).toHaveBeenCalled();
    const next = onUpdate.mock.calls[0][0];
    expect(next).toHaveLength(1);
    expect(next[0].name).toBe('My Collection');
    expect(next[0].groups[0].name).toBe('Requests');
    expect(next[0].groups[0].entries[0].name).toBe('List users');
  });

  it('loads an entry', () => {
    render(
      <CollectionsPanel
        collections={[collection]}
        request={emptyRequest()}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByText('List users'));
    expect(onLoad).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://api.example.com/users' }),
      expect.any(String)
    );
  });

  it('deletes an entry', () => {
    render(
      <CollectionsPanel
        collections={[collection]}
        request={emptyRequest()}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByLabelText('Delete entry List users'));
    expect(onUpdate).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          groups: [expect.objectContaining({ entries: [] })],
        }),
      ])
    );
  });

  it('deletes a group', () => {
    render(
      <CollectionsPanel
        collections={[collection]}
        request={emptyRequest()}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByLabelText('Delete group Users'));
    expect(onUpdate).toHaveBeenCalledWith([
      expect.objectContaining({ groups: [] }),
    ]);
  });

  it('deletes a collection', () => {
    render(
      <CollectionsPanel
        collections={[collection]}
        request={emptyRequest()}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByLabelText('Delete collection Users API'));
    expect(onUpdate).toHaveBeenCalledWith([]);
  });

  it('imports an OpenAPI spec as a collection', async () => {
    render(
      <CollectionsPanel
        collections={[]}
        request={emptyRequest()}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    const file = new File([spec], 'api.json', { type: 'application/json' });
    fireEvent.change(screen.getByLabelText('Import OpenAPI spec'), {
      target: { files: [file] },
    });

    await waitFor(() => expect(onUpdate).toHaveBeenCalled());
    const next = onUpdate.mock.calls[0][0];
    expect(next[0].name).toBe('Imported API');
    expect(next[0].groups[0].entries[0].name).toBe('List all users');
  });

  it('shows an error for an invalid OpenAPI spec', async () => {
    render(
      <CollectionsPanel
        collections={[]}
        request={emptyRequest()}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    const file = new File(['not-json'], 'api.json', {
      type: 'application/json',
    });
    fireEvent.change(screen.getByLabelText('Import OpenAPI spec'), {
      target: { files: [file] },
    });

    expect(
      await screen.findByText('Invalid or empty OpenAPI spec')
    ).toBeInTheDocument();
  });

  it('shows an error when the import file cannot be read', async () => {
    const requestFile = jest.requireMock('@/lib/request-file') as {
      readTextFile: jest.Mock;
    };
    requestFile.readTextFile.mockRejectedValueOnce(new Error('boom'));
    render(
      <CollectionsPanel
        collections={[]}
        request={emptyRequest()}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    const file = new File(['{}'], 'api.json', { type: 'application/json' });
    fireEvent.change(screen.getByLabelText('Import OpenAPI spec'), {
      target: { files: [file] },
    });

    expect(await screen.findByText('Failed to read file')).toBeInTheDocument();
    requestFile.readTextFile.mockClear();
  });

  it('saves into an existing collection and group', () => {
    render(
      <CollectionsPanel
        collections={[collection]}
        request={{ ...emptyRequest(), url: 'https://api.example.com/new' }}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    fireEvent.change(screen.getByLabelText('Collection entry name'), {
      target: { value: 'New entry' },
    });
    fireEvent.change(screen.getByLabelText('Collection'), {
      target: { value: collection.id },
    });
    fireEvent.change(screen.getByLabelText('Group'), {
      target: { value: collection.groups[0].id },
    });
    fireEvent.click(screen.getByText('Save'));

    const next = onUpdate.mock.calls[0][0];
    expect(
      next[0].groups[0].entries.map((entry: { name: string }) => entry.name)
    ).toContain('New entry');
  });

  it('shows the new group name field when creating a group', () => {
    render(
      <CollectionsPanel
        collections={[collection]}
        request={emptyRequest()}
        activeEntryId={null}
        onLoad={onLoad}
        onUpdate={onUpdate}
      />
    );
    fireEvent.change(screen.getByLabelText('Collection'), {
      target: { value: collection.id },
    });
    expect(screen.getByLabelText('New group name')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Group'), {
      target: { value: collection.groups[0].id },
    });
    expect(screen.queryByLabelText('New group name')).not.toBeInTheDocument();
  });
});
