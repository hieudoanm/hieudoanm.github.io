import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '@/app/profile/page';

const push = jest.fn();
const addToast = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

jest.mock('react-icons/fi', () => ({
  FiArrowLeft: () => <span data-testid="arrow-left" />,
  FiUser: () => <span data-testid="user" />,
  FiSave: () => <span data-testid="save" />,
}));

jest.mock('@/providers/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ addToast }),
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    push.mockReset();
    addToast.mockReset();
  });

  it('renders user information inputs', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('User Information')).toBeInTheDocument();
    expect(screen.getByDisplayValue('User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('user@example.com')).toBeInTheDocument();
    expect(screen.getByTestId('user')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save Profile' })
    ).toBeInTheDocument();
  });

  it('shows the avatar image once a URL is entered', () => {
    render(<ProfilePage />);
    const input = screen.getByPlaceholderText('https://example.com/avatar.png');
    fireEvent.change(input, { target: { value: 'https://example.com/a.png' } });
    expect(screen.getByAltText('Avatar')).toHaveAttribute(
      'src',
      'https://example.com/a.png'
    );
    expect(screen.queryByTestId('user')).not.toBeInTheDocument();
  });

  it('updates the display name and email inputs', () => {
    render(<ProfilePage />);
    fireEvent.change(screen.getByDisplayValue('User'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByPlaceholderText('user@example.com'), {
      target: { value: 'jane@example.com' },
    });
    expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
    expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument();
  });

  it('saves and shows a toast', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole('button', { name: 'Save Profile' }));
    expect(addToast).toHaveBeenCalledWith('Profile saved', 'success');
  });

  it('navigates back', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByTestId('arrow-left').closest('button')!);
    expect(push).toHaveBeenCalledWith('/');
  });
});
