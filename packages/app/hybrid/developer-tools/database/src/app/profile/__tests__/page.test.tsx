import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '@/app/profile/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="ico-back" />,
  FiUser: () => <span data-testid="ico-user" />,
  FiSave: () => <span data-testid="ico-save" />,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: jest.fn(),
}));

const { useRouter } = jest.requireMock('next/navigation');
const { useToast } = jest.requireMock('@/providers/ToastProvider');

const mockPush = jest.fn();
const mockAddToast = jest.fn();

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    useToast.mockReturnValue({ addToast: mockAddToast });
  });

  it('renders the profile form', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('User Information')).toBeInTheDocument();
  });

  it('navigates back on back button click', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('shows a toast when saving', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByText('Save'));
    expect(mockAddToast).toHaveBeenCalledWith('Profile saved', 'success');
  });
});
