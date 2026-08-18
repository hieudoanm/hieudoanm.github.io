import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import AboutPage from '@/app/about/page';
import ErrorPage from '@/app/error';
import NotFoundPage from '@/app/not-found';
import { mockDb } from '@/test-utils/fakeDb';
import type { VaultItem } from '@/types';

jest.mock('@/lib/db', () => require('@/test-utils/fakeDb').mockDb);
jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(),
}));

const makeItem = (
  overrides: Partial<VaultItem> & { id: string; title: string }
): VaultItem => ({
  type: 'login',
  username: '',
  password: '',
  favorite: false,
  tags: [],
  createdAt: 1,
  updatedAt: 2,
  ...overrides,
});

const items: VaultItem[] = [
  makeItem({
    id: 'v-1',
    title: 'GitHub',
    type: 'login',
    username: 'user@gmail.com',
    password: 'Sup3r!Secret',
    favorite: true,
    tags: ['dev'],
    updatedAt: 200,
  }),
  makeItem({
    id: 'v-2',
    title: 'Visa 4242',
    type: 'card',
    cardNumber: '4242424242424242',
    cardholder: 'John Doe',
    expiry: '12/28',
    tags: ['finance'],
    updatedAt: 100,
  }),
];

describe('HomePage', () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    mockDb.reset({ items });
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

  it('renders vault items after loading', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    expect(screen.getByText('Visa 4242')).toBeInTheDocument();
    expect(screen.getByText('user@gmail.com')).toBeInTheDocument();
    expect(screen.getAllByText('dev').length).toBeGreaterThan(0);
    expect(screen.getAllByText('finance').length).toBeGreaterThan(0);
  });

  it('shows a skeleton while loading', () => {
    mockDb.db.items.getAll.mockImplementationOnce(() => new Promise(() => {}));
    const { container } = render(<HomePage />);
    expect(container.querySelectorAll('.skeleton').length).toBe(3);
  });

  it('filters items by search text', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.change(screen.getByPlaceholderText('Search vault...'), {
      target: { value: 'visa' },
    });
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
    expect(screen.getByText('Visa 4242')).toBeInTheDocument();
  });

  it('filters items by category chip', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Card' }));
    expect(screen.queryByText('GitHub')).not.toBeInTheDocument();
    expect(screen.getByText('Visa 4242')).toBeInTheDocument();
  });

  it('shows empty state when nothing matches', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.change(screen.getByPlaceholderText('Search vault...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('copies a password and shows a toast', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    const copyButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(copyButtons[0]);
    await waitFor(() =>
      expect(screen.getByText('Password copied')).toBeInTheDocument()
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Sup3r!Secret');
  });

  it('creates a new item from the modal', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'My Site' },
    });
    fireEvent.change(screen.getByPlaceholderText('https://'), {
      target: { value: 'https://mysite.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'secret' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Toggle password visibility' })
    );
    fireEvent.change(screen.getByPlaceholderText('Notes'), {
      target: { value: 'hello' },
    });
    fireEvent.change(screen.getByPlaceholderText('Tags (comma separated)'), {
      target: { value: 'dev, test' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(screen.getByText('My Site')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalled();
    expect(screen.getByText('Item created')).toBeInTheDocument();
  });

  it('cancels the new item modal without creating', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByPlaceholderText('Title')).not.toBeInTheDocument();
  });

  it('shows type-specific fields in the new item form', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('https://')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox', { name: 'Item type' }), {
      target: { value: 'card' },
    });
    expect(screen.getByPlaceholderText('Cardholder')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Card Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MM/YY')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('CVV')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('https://')).not.toBeInTheDocument();
  });

  it('creates a card item with type-specific fields', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'New' }));
    fireEvent.change(screen.getByRole('combobox', { name: 'Item type' }), {
      target: { value: 'card' },
    });
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Visa Gold' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cardholder'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Card Number'), {
      target: { value: '4242424242424242' },
    });
    fireEvent.change(screen.getByPlaceholderText('MM/YY'), {
      target: { value: '11/29' },
    });
    fireEvent.change(screen.getByPlaceholderText('CVV'), {
      target: { value: '999' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    await waitFor(() =>
      expect(screen.getByText('Visa Gold')).toBeInTheDocument()
    );
    expect(mockDb.db.items.put).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'card',
        cardNumber: '4242424242424242',
        cardholder: 'John Doe',
        expiry: '11/29',
        cvv: '999',
      })
    );
  });

  it('filters favorites from the sidebar', async () => {
    render(<HomePage />);
    await waitFor(() => expect(screen.getByText('GitHub')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Favorites' }));
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.queryByText('Visa 4242')).not.toBeInTheDocument();
  });
});

describe('AboutPage', () => {
  it('renders the about template', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { name: 'Password' })
    ).toBeInTheDocument();
    expect(screen.getByText('Secure password manager')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 6')).toBeInTheDocument();
    expect(screen.getByText('AES-256')).toBeInTheDocument();
  });
});

describe('ErrorPage', () => {
  it('renders error template and calls reset', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('boom')} reset={reset} />);
    expect(screen.getByRole('heading', { name: '500' })).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalled();
  });
});

describe('NotFoundPage', () => {
  it('renders 404 with a home link', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
