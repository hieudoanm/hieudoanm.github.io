import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrashPage from '@/app/trash/page';
import { mockDb } from '@/test-utils/fakeDb';
import type { VaultItem } from '@/types';

jest.mock('@/lib/db', () => require('@/test-utils/fakeDb').mockDb);
jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const deletedAt = (): number => Date.now() - 3600000;

const trashed: VaultItem = {
  id: 'v-1',
  type: 'login',
  title: 'Old Login',
  username: 'old@email.com',
  password: 'secret',
  favorite: false,
  tags: [],
  createdAt: 1,
  updatedAt: 2,
  deletedAt: deletedAt(),
};

const makeItem = (id: string, title: string, deletedAt: number): VaultItem => ({
  ...trashed,
  id,
  title,
  deletedAt,
});

describe('TrashPage', () => {
  beforeEach(() => {
    mockDb.reset({ items: [trashed] });
    mockPush.mockClear();
  });

  it('lists trashed items', async () => {
    render(<TrashPage />);
    await waitFor(() =>
      expect(screen.getByText('Old Login')).toBeInTheDocument()
    );
    expect(screen.getByRole('button', { name: 'Restore' })).toBeInTheDocument();
  });

  it('shows empty state when trash is empty', async () => {
    mockDb.reset({ items: [] });
    render(<TrashPage />);
    await waitFor(() =>
      expect(screen.getByText('Trash is empty')).toBeInTheDocument()
    );
    expect(screen.getByRole('button', { name: 'Empty Trash' })).toBeDisabled();
  });

  it('restores an item', async () => {
    render(<TrashPage />);
    await waitFor(() =>
      expect(screen.getByText('Old Login')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Restore' }));
    await waitFor(() =>
      expect(screen.getByText('Item restored')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', deletedAt: undefined })
    );
  });

  it('permanently deletes an item', async () => {
    render(<TrashPage />);
    await waitFor(() =>
      expect(screen.getByText('Old Login')).toBeInTheDocument()
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete forever Old Login' })
    );
    expect(
      screen.getByRole('heading', { name: 'Delete forever?' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(screen.getByText('Item permanently deleted')).toBeInTheDocument()
    );
    expect(mockDb.db.items.delete).toHaveBeenCalledWith('v-1');
    expect(screen.getByText('Trash is empty')).toBeInTheDocument();
  });

  it('cancels permanent delete', async () => {
    render(<TrashPage />);
    await waitFor(() =>
      expect(screen.getByText('Old Login')).toBeInTheDocument()
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete forever Old Login' })
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(
      screen.queryByRole('heading', { name: 'Delete forever?' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Old Login')).toBeInTheDocument();
  });

  it('empties the whole trash', async () => {
    mockDb.reset({
      items: [
        makeItem('v-1', 'One', deletedAt()),
        makeItem('v-2', 'Two', deletedAt()),
      ],
    });
    render(<TrashPage />);
    await waitFor(() => expect(screen.getByText('One')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Empty Trash' }));
    expect(
      screen.getByRole('heading', { name: 'Empty trash?' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() =>
      expect(screen.getByText('Trash emptied')).toBeInTheDocument()
    );
    expect(mockDb.db.items.delete).toHaveBeenCalledWith('v-1');
    expect(mockDb.db.items.delete).toHaveBeenCalledWith('v-2');
  });

  it('cancels emptying the trash', async () => {
    render(<TrashPage />);
    await waitFor(() =>
      expect(screen.getByText('Old Login')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Empty Trash' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(
      screen.queryByRole('heading', { name: 'Empty trash?' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('Old Login')).toBeInTheDocument();
  });

  it('navigates home via the back button', async () => {
    render(<TrashPage />);
    await waitFor(() =>
      expect(screen.getByText('Old Login')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
