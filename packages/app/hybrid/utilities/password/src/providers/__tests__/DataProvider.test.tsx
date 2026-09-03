import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/DataProvider';
import { mockDb } from '@/test-utils/fakeDb';
import type { VaultItem } from '@/types';

jest.mock('@/lib/db', () => require('@/test-utils/fakeDb').mockDb);
jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(),
}));

const makeItem = (id: string, title: string, updatedAt: number): VaultItem => ({
  id,
  type: 'login',
  title,
  username: 'u@e.com',
  password: 'p@ss',
  favorite: false,
  tags: [],
  createdAt: 1,
  updatedAt,
});

const Probe = () => {
  const {
    items,
    trashedItems,
    folders,
    settings,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
    trashItem,
    restoreItem,
    duplicateItem,
    touchItem,
    toggleFavorite,
    updateSettings,
    createFolder,
    renameFolder,
    deleteFolder,
    toggleFolderTeam,
    shareItem,
    revokeShare,
    importItems,
    requestEmergencyAccess,
    cancelEmergencyRequest,
  } = useData();
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="theme">{settings.theme}</span>
      <span data-testid="emergency">
        {settings.emergencyRequest ? 'pending' : 'none'}
      </span>
      <ul>
        {items.map((i) => (
          <li key={i.id} data-testid={`item-${i.id}`}>
            {i.title}
            {i.favorite ? '*' : ''}
            {i.sharedWith ? `:${i.sharedWith.length}` : ''}
          </li>
        ))}
      </ul>
      <ul>
        {trashedItems.map((i) => (
          <li key={i.id} data-testid={`trash-${i.id}`}>
            {i.title}
          </li>
        ))}
      </ul>
      <ul>
        {folders.map((f) => (
          <li key={f.id} data-testid={`folder-${f.id}`}>
            {f.name}
            {f.isTeam ? '!' : ''}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          createItem({
            type: 'login',
            title: 'New Item',
            username: '',
            password: '',
            url: '',
            notes: '',
            favorite: false,
            tags: [],
          })
        }>
        Create
      </button>
      <button
        type="button"
        onClick={() => updateItem('v-1', { title: 'Updated' })}>
        Update
      </button>
      <button
        type="button"
        onClick={() => updateItem('missing', { title: 'X' })}>
        Update Missing
      </button>
      <button type="button" onClick={() => deleteItem('v-1')}>
        Delete
      </button>
      <button type="button" onClick={() => trashItem('v-1')}>
        Trash
      </button>
      <button type="button" onClick={() => trashItem('missing')}>
        Trash Missing
      </button>
      <button type="button" onClick={() => restoreItem('v-1')}>
        Restore
      </button>
      <button type="button" onClick={() => restoreItem('missing')}>
        Restore Missing
      </button>
      <button type="button" onClick={() => duplicateItem('v-1')}>
        Duplicate
      </button>
      <button type="button" onClick={() => duplicateItem('missing')}>
        Duplicate Missing
      </button>
      <button type="button" onClick={() => touchItem('v-1')}>
        Touch
      </button>
      <button type="button" onClick={() => toggleFavorite('v-1')}>
        Toggle
      </button>
      <button type="button" onClick={() => updateSettings({ theme: 'password-dark' })}>
        Theme
      </button>
      <button type="button" onClick={() => createFolder('Work')}>
        Create Folder
      </button>
      <button type="button" onClick={() => renameFolder('f-1', 'Home')}>
        Rename Folder
      </button>
      <button type="button" onClick={() => renameFolder('missing', 'Home')}>
        Rename Folder Missing
      </button>
      <button type="button" onClick={() => deleteFolder('f-1')}>
        Delete Folder
      </button>
      <button type="button" onClick={() => deleteFolder('f-2')}>
        Delete Folder No Orphans
      </button>
      <button type="button" onClick={() => toggleFolderTeam('f-1')}>
        Toggle Team Folder
      </button>
      <button type="button" onClick={() => toggleFolderTeam('missing')}>
        Toggle Team Folder Missing
      </button>
      <button
        type="button"
        onClick={() =>
          shareItem('v-1', { email: 'a@b.com', permission: 'view' })
        }>
        Share
      </button>
      <button
        type="button"
        onClick={() =>
          shareItem('v-1', { email: 'a@b.com', permission: 'edit' })
        }>
        Share Again
      </button>
      <button
        type="button"
        onClick={() =>
          shareItem('missing', { email: 'a@b.com', permission: 'view' })
        }>
        Share Missing
      </button>
      <button type="button" onClick={() => revokeShare('v-1', 'a@b.com')}>
        Revoke Share
      </button>
      <button type="button" onClick={() => revokeShare('missing', 'a@b.com')}>
        Revoke Share Missing
      </button>
      <button
        type="button"
        onClick={() =>
          importItems([
            {
              type: 'note',
              title: 'Imported',
              notes: '',
              favorite: false,
              tags: [],
            },
          ])
        }>
        Import
      </button>
      <button
        type="button"
        onClick={() => requestEmergencyAccess('g@e.com', 30)}>
        Request Emergency
      </button>
      <button type="button" onClick={() => cancelEmergencyRequest()}>
        Cancel Emergency
      </button>
    </div>
  );
};

describe('DataProvider', () => {
  beforeEach(() => {
    mockDb.reset();
    jest.clearAllMocks();
  });

  it('throws when useData is used outside the provider', () => {
    expect(() => render(<Probe />)).toThrow(
      'useData must be used within DataProvider'
    );
  });

  it('loads and sorts items by updatedAt descending', async () => {
    mockDb.reset({
      items: [makeItem('v-1', 'Older', 100), makeItem('v-2', 'Newer', 200)],
      settings: { theme: 'password-light', autoLockTimeout: 15, clipboardClear: 60 },
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    const titles = screen.getAllByTestId(/^item-/).map((n) => n.textContent);
    expect(titles[0]).toContain('Newer');
    expect(titles[1]).toContain('Older');
    expect(screen.getByTestId('theme')).toHaveTextContent('password-light');
  });

  it('creates an item and persists it', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(screen.getByText('New Item')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalled();
  });

  it('updates an existing item', async () => {
    mockDb.reset({ items: [makeItem('v-1', 'Original', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByText('Original')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    await waitFor(() =>
      expect(screen.getByText('Updated')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalled();
  });

  it('does not persist when updating a missing item', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('touches an item to record last used', async () => {
    mockDb.reset({ items: [makeItem('v-1', 'Used', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Touch' }));
    await waitFor(() =>
      expect(mockDb.db.items.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'v-1', lastUsed: expect.any(Number) })
      )
    );
  });

  it('does not touch a missing item', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Touch' }));
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('does not persist when updating a missing item', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Update Missing' }));
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('moves an item to trash', async () => {
    mockDb.reset({
      items: [makeItem('v-1', 'Trashed', 100), makeItem('v-2', 'Kept', 200)],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByText('Trashed')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Trash' }));
    await waitFor(() =>
      expect(screen.getByTestId('trash-v-1')).toHaveTextContent('Trashed')
    );
    expect(screen.queryByTestId('item-v-1')).not.toBeInTheDocument();
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', deletedAt: expect.any(Number) })
    );
  });

  it('does nothing when trashing a missing item', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Trash Missing' }));
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('restores an item from trash', async () => {
    mockDb.reset({
      items: [makeItem('v-1', 'Back', 100), makeItem('v-2', 'Other', 200)],
    });
    mockDb.db.items.put.mockImplementationOnce(async () => undefined);
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() => expect(screen.getByText('Back')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Trash' }));
    await waitFor(() =>
      expect(screen.getByTestId('trash-v-1')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Restore' }));
    await waitFor(() =>
      expect(screen.getByTestId('item-v-1')).toHaveTextContent('Back')
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', deletedAt: undefined })
    );
  });

  it('does nothing when restoring a missing item', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Restore Missing' }));
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('duplicates an item with a fresh id', async () => {
    mockDb.reset({ items: [makeItem('v-1', 'Source', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() => expect(screen.getByText('Source')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Duplicate' }));
    await waitFor(() =>
      expect(screen.getByText('Source (copy)')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Source (copy)' })
    );
  });

  it('returns undefined when duplicating a missing item', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Duplicate Missing' }));
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('creates a folder', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Create Folder' }));
    await waitFor(() => expect(screen.getByText('Work')).toBeInTheDocument());
    expect(mockDb.db.folders.put).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Work' })
    );
  });

  it('renames a folder', async () => {
    mockDb.reset({
      items: [],
      folders: [
        { id: 'f-1', name: 'Work', createdAt: 1 },
        { id: 'f-2', name: 'Other', createdAt: 2 },
      ],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() => expect(screen.getByText('Work')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Rename Folder' }));
    await waitFor(() =>
      expect(screen.getByTestId('folder-f-1')).toHaveTextContent('Home')
    );
    expect(mockDb.db.folders.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'f-1', name: 'Home' })
    );
  });

  it('does nothing when renaming a missing folder', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Rename Folder Missing' })
    );
    expect(mockDb.db.folders.put).not.toHaveBeenCalled();
  });

  it('deletes a folder and clears orphaned items', async () => {
    mockDb.reset({
      items: [
        { ...makeItem('v-1', 'In Folder', 100), folderId: 'f-1' },
        makeItem('v-2', 'Elsewhere', 200),
      ],
      folders: [
        { id: 'f-1', name: 'Work', createdAt: 1 },
        { id: 'f-2', name: 'Empty', createdAt: 2 },
      ],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByText('In Folder')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete Folder' }));
    await waitFor(() =>
      expect(mockDb.db.folders.delete).toHaveBeenCalledWith('f-1')
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', folderId: undefined })
    );
  });

  it('deletes a folder without orphaned items', async () => {
    mockDb.reset({
      items: [],
      folders: [{ id: 'f-2', name: 'Empty', createdAt: 2 }],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() => expect(screen.getByText('Empty')).toBeInTheDocument());
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Folder No Orphans' })
    );
    await waitFor(() =>
      expect(mockDb.db.folders.delete).toHaveBeenCalledWith('f-2')
    );
    await waitFor(() =>
      expect(screen.queryByText('Empty')).not.toBeInTheDocument()
    );
  });

  it('purges expired trash items on load', async () => {
    const expired = {
      ...makeItem('v-1', 'Expired', 100),
      deletedAt: Date.now() - 40 * 86400000,
    };
    mockDb.reset({ items: [expired] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(mockDb.db.items.delete).toHaveBeenCalledWith('v-1')
    );
    expect(screen.queryByTestId('trash-v-1')).not.toBeInTheDocument();
  });

  it('deletes an item', async () => {
    mockDb.reset({ items: [makeItem('v-1', 'Gone', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() => expect(screen.getByText('Gone')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(screen.queryByText('Gone')).not.toBeInTheDocument()
    );
    expect(mockDb.db.items.delete).toHaveBeenCalledWith('v-1');
  });

  it('toggles favorite on an item', async () => {
    mockDb.reset({ items: [makeItem('v-1', 'Starred', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByText('Starred')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    await waitFor(() =>
      expect(screen.getByTestId('item-v-1')).toHaveTextContent('Starred*')
    );
    expect(mockDb.db.items.put).toHaveBeenCalled();
  });

  it('does not toggle favorite for a missing item', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('updates settings', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Theme' }));
    await waitFor(() =>
      expect(screen.getByTestId('theme')).toHaveTextContent('password-dark')
    );
    expect(mockDb.db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({ theme: 'password-dark' })
    );
  });

  it('toggles a folder as a team folder', async () => {
    mockDb.reset({
      items: [],
      folders: [{ id: 'f-1', name: 'Work', createdAt: 1 }],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() => expect(screen.getByText('Work')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Toggle Team Folder' }));
    await waitFor(() =>
      expect(screen.getByTestId('folder-f-1')).toHaveTextContent('Work!')
    );
    expect(mockDb.db.folders.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'f-1', isTeam: true })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toggle Team Folder' }));
    await waitFor(() =>
      expect(screen.getByTestId('folder-f-1')).toHaveTextContent('Work')
    );
  });

  it('does nothing when toggling a missing folder', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Toggle Team Folder Missing' })
    );
    expect(mockDb.db.folders.put).not.toHaveBeenCalled();
  });

  it('shares an item and logs access', async () => {
    mockDb.reset({ items: [makeItem('v-1', 'Shared', 100)] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() => expect(screen.getByText('Shared')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    await waitFor(() =>
      expect(screen.getByTestId('item-v-1')).toHaveTextContent('Shared:1')
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'v-1',
        sharedWith: [{ email: 'a@b.com', permission: 'view' }],
      })
    );
  });

  it('upserts a share recipient by email', async () => {
    mockDb.reset({
      items: [
        {
          ...makeItem('v-1', 'Shared', 100),
          sharedWith: [{ email: 'a@b.com', permission: 'view' }],
        },
      ],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('item-v-1')).toHaveTextContent('Shared:1')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Share Again' }));
    await waitFor(() =>
      expect(mockDb.db.items.put).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'v-1',
          sharedWith: [{ email: 'a@b.com', permission: 'edit' }],
        })
      )
    );
    expect(screen.getByTestId('item-v-1')).toHaveTextContent('Shared:1');
  });

  it('does nothing when sharing a missing item', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Share Missing' }));
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('revokes a share', async () => {
    mockDb.reset({
      items: [
        {
          ...makeItem('v-1', 'Shared', 100),
          sharedWith: [{ email: 'a@b.com', permission: 'view' }],
        },
      ],
    });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('item-v-1')).toHaveTextContent('Shared:1')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Revoke Share' }));
    await waitFor(() =>
      expect(screen.getByTestId('item-v-1')).toHaveTextContent('Shared')
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', sharedWith: [] })
    );
  });

  it('does nothing when revoking a share on a missing item', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Revoke Share Missing' })
    );
    expect(mockDb.db.items.put).not.toHaveBeenCalled();
  });

  it('imports items with fresh ids', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Import' }));
    await waitFor(() =>
      expect(screen.getByText('Imported')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Imported', type: 'note' })
    );
  });

  it('requests emergency access', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Request Emergency' }));
    await waitFor(() =>
      expect(screen.getByTestId('emergency')).toHaveTextContent('pending')
    );
    expect(mockDb.db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({
        emergencyContact: { email: 'g@e.com', delayMinutes: 30 },
        emergencyRequest: { requestedAt: expect.any(Number), delayMinutes: 30 },
      })
    );
  });

  it('cancels an emergency request', async () => {
    mockDb.reset({ items: [] });
    render(
      <DataProvider>
        <Probe />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Request Emergency' }));
    await waitFor(() =>
      expect(screen.getByTestId('emergency')).toHaveTextContent('pending')
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel Emergency' }));
    await waitFor(() =>
      expect(screen.getByTestId('emergency')).toHaveTextContent('none')
    );
    expect(mockDb.db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({ emergencyRequest: undefined })
    );
  });
});
