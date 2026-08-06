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
    settings,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
    toggleFavorite,
    updateSettings,
  } = useData();
  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="theme">{settings.theme}</span>
      <ul>
        {items.map((i) => (
          <li key={i.id} data-testid={`item-${i.id}`}>
            {i.title}
            {i.favorite ? '*' : ''}
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
      <button type="button" onClick={() => deleteItem('v-1')}>
        Delete
      </button>
      <button type="button" onClick={() => toggleFavorite('v-1')}>
        Toggle
      </button>
      <button type="button" onClick={() => updateSettings({ theme: 'night' })}>
        Theme
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
      settings: { theme: 'night', autoLockTimeout: 15, clipboardClear: 60 },
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
    expect(screen.getByTestId('theme')).toHaveTextContent('night');
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
      expect(screen.getByTestId('theme')).toHaveTextContent('night')
    );
    expect(mockDb.db.settings.put).toHaveBeenCalledWith(
      expect.objectContaining({ theme: 'night' })
    );
  });
});
