import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ItemPage from '@/app/(app)/item/page';
import { mockDb } from '@/test-utils/fakeDb';
import type { VaultItem } from '@/types';

jest.mock('qrcode', () => ({
  __esModule: true,
  default: {
    toDataURL: jest.fn().mockResolvedValue('data:image/png;base64,QR'),
  },
}));
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

  it('moves the item to trash and navigates home', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    fireEvent.click(iconButtons()[2]);
    await waitFor(() =>
      expect(screen.getByText('Moved to trash')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', deletedAt: expect.any(Number) })
    );
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('duplicates the item and navigates to the copy', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Duplicate' }));
    await waitFor(() =>
      expect(screen.getByText('Item duplicated')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'GitHub (copy)',
        id: expect.stringMatching(/^v-/),
      })
    );
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringMatching(/^\/item\?id=/)
    );
  });

  it('renders custom fields', async () => {
    const customItem: VaultItem = {
      ...loginItem,
      customFields: [
        { key: 'PIN', value: '1234' },
        { key: 'Recovery', value: 'question' },
      ],
    };
    mockDb.reset({ items: [customItem] });
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    expect(screen.getByText('Custom fields')).toBeInTheDocument();
    expect(screen.getByText('PIN')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.getByText('Recovery')).toBeInTheDocument();
  });

  it('navigates home via the back button', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    fireEvent.click(iconButtons()[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('copies the card number for a card item', async () => {
    mockDb.reset({ items: [cardItem] });
    mockId = 'v-2';
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Visa 4242' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() =>
      expect(screen.getByText('Card copied')).toBeInTheDocument()
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '4242424242424242'
    );
  });

  it('cancels the edit modal without saving', async () => {
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
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(
      screen.queryByRole('heading', { name: 'Edit Item' })
    ).not.toBeInTheDocument();
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

  it('renders a TOTP code for items with a secret', async () => {
    const totpItem: VaultItem = {
      ...loginItem,
      totpSecret: 'JBSWY3DPEHPK3PXP',
    };
    mockDb.reset({ items: [totpItem] });
    render(<ItemPage />);
    await waitFor(
      () =>
        expect(screen.getByTestId('totp-code')).toHaveTextContent(/^\d{6}$/),
      { timeout: 5000 }
    );
    expect(
      screen.getByRole('button', { name: 'Show QR code' })
    ).toBeInTheDocument();
  });

  it('falls back to the title as TOTP account when no username exists', async () => {
    const totpItem: VaultItem = {
      ...loginItem,
      username: '',
      totpSecret: 'JBSWY3DPEHPK3PXP',
    };
    mockDb.reset({ items: [totpItem] });
    render(<ItemPage />);
    await waitFor(
      () =>
        expect(screen.getByTestId('totp-code')).toHaveTextContent(/^\d{6}$/),
      { timeout: 5000 }
    );
  });

  it('reveals the card number with the show/hide toggle', async () => {
    mockDb.reset({ items: [cardItem] });
    mockId = 'v-2';
    render(<ItemPage />);
    await waitFor(() =>
      expect(screen.getByText('•'.repeat(16))).toBeInTheDocument()
    );
    fireEvent.click(iconButtons()[3]);
    expect(screen.getByText('4242424242424242')).toBeInTheDocument();
    fireEvent.click(iconButtons()[3]);
    expect(screen.getByText('•'.repeat(16))).toBeInTheDocument();
  });

  it('copies a TOTP code', async () => {
    const totpItem: VaultItem = {
      ...loginItem,
      totpSecret: 'JBSWY3DPEHPK3PXP',
    };
    mockDb.reset({ items: [totpItem] });
    render(<ItemPage />);
    await waitFor(
      () =>
        expect(screen.getByTestId('totp-code')).toHaveTextContent(/^\d{6}$/),
      { timeout: 5000 }
    );
    const code = screen.getByTestId('totp-code').textContent;
    fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Copy code' })
      ).toHaveTextContent('Copied')
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
  });

  it('shares an item via the share dialog', async () => {
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    expect(screen.getByText('Share "GitHub"')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Share with email'), {
      target: { value: 'team@example.com' },
    });
    fireEvent.click(screen.getAllByRole('button', { name: 'Share' })[1]);
    await waitFor(() =>
      expect(
        screen.getAllByText('Shared with team@example.com').length
      ).toBeGreaterThan(0)
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'v-1',
        sharedWith: [{ email: 'team@example.com', permission: 'view' }],
      })
    );
  });

  it('revokes a share from the share dialog', async () => {
    const sharedItem: VaultItem = {
      ...loginItem,
      sharedWith: [{ email: 'team@example.com', permission: 'view' }],
    };
    mockDb.reset({ items: [sharedItem] });
    render(<ItemPage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'GitHub' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Share' }));
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Revoke share for team@example.com',
      })
    );
    await waitFor(() =>
      expect(
        screen.getByText('Revoked access for team@example.com')
      ).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'v-1', sharedWith: [] })
    );
  });

  it('renders the access log for an item', async () => {
    const loggedItem: VaultItem = {
      ...loginItem,
      accessLog: [
        { action: 'view', timestamp: 100, detail: 'GitHub' },
        { action: 'copy', timestamp: 200, detail: 'password' },
      ],
    };
    mockDb.reset({ items: [loggedItem] });
    render(<ItemPage />);
    await waitFor(() =>
      expect(screen.getByText('Access Log')).toBeInTheDocument()
    );
    expect(screen.getByText(/Viewed/)).toBeInTheDocument();
    expect(screen.getByText('Copied password')).toBeInTheDocument();
  });
});
