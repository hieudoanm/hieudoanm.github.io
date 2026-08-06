import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: jest.fn(),
}));

jest.mock('@/components/templates/PageTransition', () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const { useRouter } = jest.requireMock('next/navigation');
const { useToast } = jest.requireMock('@/providers/ToastProvider');

describe('ProfilePage', () => {
  const push = jest.fn();
  const addToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push });
    useToast.mockReturnValue({ addToast });
  });

  it('renders the profile form', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('User Information')).toBeInTheDocument();
    expect(screen.getByText('Display Preferences')).toBeInTheDocument();
  });

  it('navigates back on back button click', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(push).toHaveBeenCalledWith('/');
  });

  it('shows an avatar image when a URL is provided', () => {
    render(<ProfilePage />);
    expect(document.querySelector('img')).toBeNull();
    fireEvent.change(
      screen.getByPlaceholderText('https://example.com/avatar.png'),
      {
        target: { value: 'https://example.com/a.png' },
      }
    );
    expect(document.querySelector('img')).toHaveAttribute(
      'src',
      'https://example.com/a.png'
    );
  });

  it('updates the display name and email', () => {
    render(<ProfilePage />);
    fireEvent.change(screen.getByDisplayValue('User'), {
      target: { value: 'Hieu' },
    });
    fireEvent.change(screen.getByPlaceholderText('user@example.com'), {
      target: { value: 'hi@example.com' },
    });
    expect(screen.getByDisplayValue('Hieu')).toBeInTheDocument();
    expect(screen.getByDisplayValue('hi@example.com')).toBeInTheDocument();
  });

  it('shows a toast when saving the profile', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByText('Save Profile'));
    expect(addToast).toHaveBeenCalledWith('Profile saved', 'success');
  });
});
