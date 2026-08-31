import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HealthPage from '@/app/(app)/health/page';
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
  updatedAt: Date.now(),
});

const day = 86400000;
const now = Date.now();

describe('HealthPage', () => {
  beforeEach(() => {
    mockPush.mockClear();
    localStorage.clear();
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
    expect(screen.getByTestId('health-trend')).toBeInTheDocument();
    expect(screen.getByText('Remediation Suggestions')).toBeInTheDocument();
    expect(screen.getByText(/Weak password on Weak Site/)).toBeInTheDocument();
  });

  it('hides remediation when no weak passwords exist', async () => {
    mockDb.reset({ items: [makeItem('v-1', 'Strong Site', 'Abcdefghijk1!')] });
    render(<HealthPage />);
    await waitFor(() => expect(screen.getByText('100%')).toBeInTheDocument());
    expect(
      screen.getByText('Great job! No remediation needed.')
    ).toBeInTheDocument();
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

  it('flags reused passwords as a group', async () => {
    mockDb.reset({
      items: [
        makeItem('v-1', 'Alpha', 'shared-pass'),
        makeItem('v-2', 'Beta', 'shared-pass'),
      ],
    });
    render(<HealthPage />);
    await waitFor(() =>
      expect(screen.getByText('Reused Passwords')).toBeInTheDocument()
    );
    expect(screen.getByText('Used by Alpha, Beta')).toBeInTheDocument();
  });

  it('flags breached passwords', async () => {
    mockDb.reset({
      items: [makeItem('v-1', 'Hacked', 'password')],
    });
    render(<HealthPage />);
    await waitFor(() =>
      expect(screen.getByText('Breached Passwords')).toBeInTheDocument()
    );
    expect(screen.getByText('Hacked')).toBeInTheDocument();
    expect(screen.getByText(/Breached password on Hacked/)).toBeInTheDocument();
  });

  it('flags passwords older than 90 days', async () => {
    mockDb.reset({
      items: [
        {
          ...makeItem('v-1', 'Legacy', 'S3cure!Pass'),
          updatedAt: now - 200 * day,
        },
        {
          ...makeItem('v-2', 'Fresh', 'S3cure!Pass'),
          updatedAt: now - 10 * day,
        },
      ],
    });
    render(<HealthPage />);
    await waitFor(() =>
      expect(screen.getByText('Old Passwords')).toBeInTheDocument()
    );
    expect(screen.getByText('Legacy')).toBeInTheDocument();
    expect(
      screen.getByText(/Password older than 90 days on Legacy/)
    ).toBeInTheDocument();
  });

  it('renders a trend chart once the vault loads', async () => {
    mockDb.reset({ items: [makeItem('v-1', 'Good', 'Abcdefghijk1!')] });
    render(<HealthPage />);
    await waitFor(() => {
      const bars = screen.getByTestId('health-trend').querySelectorAll('div');
      expect(bars.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders an error-colored trend bar for low scores', async () => {
    mockDb.reset({
      items: [
        makeItem('v-1', 'Strong', 'Abcdefghijk1!'),
        makeItem('v-2', 'Weak A', 'pass'),
        makeItem('v-3', 'Weak B', 'pass'),
        makeItem('v-4', 'Weak C', 'pass'),
      ],
    });
    render(<HealthPage />);
    await waitFor(() => {
      const bar = screen
        .getByTestId('health-trend')
        .querySelector('div.bg-error');
      expect(bar).not.toBeNull();
    });
  });

  it('keeps an existing health trend instead of overwriting it', async () => {
    localStorage.setItem(
      'vault-health-trend',
      JSON.stringify([
        { date: '2026-08-10', score: 100 },
        { date: '2026-08-11', score: 90 },
        { date: '2026-08-12', score: 80 },
      ])
    );
    mockDb.reset({ items: [makeItem('v-1', 'Good', 'Abcdefghijk1!')] });
    render(<HealthPage />);
    await waitFor(() => {
      const bars = screen.getByTestId('health-trend').querySelectorAll('div');
      expect(bars.length).toBe(3);
    });
  });

  it('navigates back home', async () => {
    mockDb.reset({ items: [] });
    render(<HealthPage />);
    await waitFor(() => expect(screen.getByText('100%')).toBeInTheDocument());
    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
