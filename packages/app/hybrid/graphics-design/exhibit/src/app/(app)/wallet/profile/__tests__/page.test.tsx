import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../page';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the profile page with account fields', () => {
    render(<ProfilePage />);
    expect(
      screen.getByRole('heading', { name: 'Profile' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('clears the wallet session and returns to sign in on sign out', () => {
    localStorage.setItem('wallet-auth', 'true');
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole('button', { name: /Sign out/i }));
    expect(localStorage.getItem('wallet-auth')).toBeNull();
    expect(push).toHaveBeenCalledWith('/sign-in');
  });

  it('shows a success message when saving changes', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
    expect(screen.getByText('Changes saved.')).toBeInTheDocument();
  });
});
