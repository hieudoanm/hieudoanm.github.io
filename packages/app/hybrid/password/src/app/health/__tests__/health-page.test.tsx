import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HealthPage from '@/app/health/page';
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

const makeItem = (id: string, title: string, password: string): VaultItem => ({
  id,
  type: 'login',
  title,
  username: 'u@e.com',
  password,
  favorite: false,
  tags: [],
  createdAt: 1,
  updatedAt: 2,
});

describe('HealthPage', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders the health score breakdown', async () => {
    mockDb.reset({
      items: [
        makeItem('v-1', 'Strong Site', 'Abcdefghijk1!'),
        makeItem('v-2', 'Weak Site', 'pass'),
        {
          id: 'v-3',
          type: 'card',
          title: 'No Password Card',
          cardNumber: '4242424242424242',
          favorite: false,
          tags: [],
          createdAt: 1,
          updatedAt: 2,
        },
      ],
    });
    render(<HealthPage />);
    await waitFor(() => expect(screen.getByText('50%')).toBeInTheDocument());
    expect(screen.getByText('Overall Score')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getAllByText('1')).toHaveLength(2);
    expect(screen.getByText('Strong')).toBeInTheDocument();
    expect(screen.getByText('Weak')).toBeInTheDocument();
    expect(screen.getByText('Weak Passwords')).toBeInTheDocument();
    expect(screen.getByText('Weak Site')).toBeInTheDocument();
  });

  it('hides the weak list when no weak passwords exist', async () => {
    mockDb.reset({ items: [makeItem('v-1', 'Strong Site', 'Abcdefghijk1!')] });
    render(<HealthPage />);
    await waitFor(() => expect(screen.getByText('100%')).toBeInTheDocument());
    expect(screen.queryByText('Weak Passwords')).not.toBeInTheDocument();
  });

  it('shows 100% when no items have passwords', async () => {
    mockDb.reset({
      items: [
        {
          id: 'v-1',
          type: 'note',
          title: 'Note',
          notes: 'hi',
          favorite: false,
          tags: [],
          createdAt: 1,
          updatedAt: 2,
        },
      ],
    });
    render(<HealthPage />);
    await waitFor(() => expect(screen.getByText('100%')).toBeInTheDocument());
  });

  it('navigates back home', async () => {
    mockDb.reset({ items: [] });
    render(<HealthPage />);
    await waitFor(() => expect(screen.getByText('100%')).toBeInTheDocument());
    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
