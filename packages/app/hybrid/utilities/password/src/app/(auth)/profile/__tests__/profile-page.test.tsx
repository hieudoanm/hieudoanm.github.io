import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from '@/app/(auth)/profile/page';
import { mockDb } from '@/test-utils/fakeDb';

jest.mock('@/lib/db', () => require('@/test-utils/fakeDb').mockDb);
jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    mockDb.reset();
    mockPush.mockClear();
  });

  it('renders profile information', async () => {
    render(<ProfilePage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Profile' })
      ).toBeInTheDocument()
    );
    expect(screen.getByText('User Information')).toBeInTheDocument();
    expect(screen.getByDisplayValue('User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('user@example.com')).toBeInTheDocument();
  });

  it('shows a toast when saving', async () => {
    render(<ProfilePage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Profile' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(screen.getByText('Profile saved')).toBeInTheDocument()
    );
  });

  it('navigates back home', async () => {
    render(<ProfilePage />);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Profile' })
      ).toBeInTheDocument()
    );
    fireEvent.click(screen.getAllByRole('button', { name: '' })[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
