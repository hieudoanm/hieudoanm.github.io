import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ItemPage from '@/app/item/page';
import { mockDb } from '@/test-utils/fakeDb';
import type { VaultItem } from '@/types';

jest.mock('@/lib/db', () => require('@/test-utils/fakeDb').mockDb);
jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(),
}));

const mockPush = jest.fn();
let mockId = 'v-1';
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    get: (key: string) => (key === 'id' ? mockId : null),
  }),
}));

const loginItem: VaultItem = {
  id: 'v-1',
  type: 'login',
  title: 'GitHub',
  username: 'user@gmail.com',
  password: 'Sup3r!Secret',
  url: 'https://github.com',
  favorite: true,
  tags: ['dev'],
  createdAt: 1,
  updatedAt: 2,
};

const cardItem: VaultItem = {
  id: 'v-2',
  type: 'card',
  title: 'Visa 4242',
  cardNumber: '4242424242424242',
  cardholder: 'John Doe',
  expiry: '12/28',
  favorite: false,
  tags: ['finance'],
  createdAt: 1,
  updatedAt: 2,
};

describe('ItemPage', () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    mockDb.reset({ items: [loginItem] });
    mockId = 'v-1';
    mockPush.mockClear();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
  });

  const iconButtons = () => screen.getAllByRole('button', { name: '' });

  it('renders item details with masked password', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    expect(screen.getByText('user@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('•'.repeat(12))).toBeInTheDocument();
    expect(screen.getByText('https://github.com')).toBeInTheDocument();
    expect(screen.getByText('dev')).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(screen.getByText('•'.repeat(12))).toBeInTheDocument()
    );
    fireEvent.click(iconButtons()[3]);
    expect(screen.getByText('Sup3r!Secret')).toBeInTheDocument();
    fireEvent.click(iconButtons()[3]);
    expect(screen.getByText('•'.repeat(12))).toBeInTheDocument();
  });

  it('copies password to clipboard', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(screen.getByText('•'.repeat(12))).toBeInTheDocument()
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[1]);
    await waitFor(() =>
      expect(screen.getByText('Password copied')).toBeInTheDocument()
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Sup3r!Secret');
  });

  it('copies username to clipboard', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(screen.getByText('user@gmail.com')).toBeInTheDocument()
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0]);
    await waitFor(() =>
      expect(screen.getByText('Username copied')).toBeInTheDocument()
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'user@gmail.com'
    );
  });

  it('toggles favorite', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    fireEvent.click(iconButtons()[1]);
    await waitFor(() =>
      expect(mockDb.db.items.put).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'v-1', favorite: false })
      )
    );
  });

  it('deletes the item and navigates home', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    fireEvent.click(iconButtons()[2]);
    await waitFor(() =>
      expect(screen.getByText('Item deleted')).toBeInTheDocument()
    );
    expect(mockDb.db.items.delete).toHaveBeenCalledWith('v-1');
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders card fields for a card item', async () => {
    mockDb.reset({ items: [cardItem] });
    mockId = 'v-2';
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Visa 4242' })
      ).toBeInTheDocument()
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Expires: 12/28')).toBeInTheDocument();
    expect(screen.getByText('•'.repeat(16))).toBeInTheDocument();
  });

  it('shows not found when the vault is empty', async () => {
    mockDb.reset({ items: [] });
    mockId = 'missing';
    render(<ItemPage />);
    await waitFor(() =>
      expect(screen.getByText('Item not found')).toBeInTheDocument()
    );
  });

  it('redirects home when the item does not exist', async () => {
    mockId = 'missing';
    render(<ItemPage />);
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });

  it('edits an item and saves changes', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(
      screen.getByRole('heading', { name: 'Edit Item' })
    ).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'GitHub (work)' },
    });
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'updated@email.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(screen.getByText('Item updated')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'v-1',
        title: 'GitHub (work)',
        username: 'updated@email.com',
      })
    );
  });
});
