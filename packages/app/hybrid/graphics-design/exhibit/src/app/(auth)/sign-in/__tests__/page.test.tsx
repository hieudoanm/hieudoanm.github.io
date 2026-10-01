import { render, screen, fireEvent } from '@testing-library/react';
import SignInPage from '../page';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('SignInPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    window.history.replaceState({}, '', '/sign-in');
  });

  it('renders the sign-in form', () => {
    render(<SignInPage />);
    expect(
      screen.getByRole('heading', { name: 'Sign in' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows a link to sign up', () => {
    render(<SignInPage />);
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
      'href',
      '/sign-up'
    );
  });

  it('toggles password visibility', () => {
    render(<SignInPage />);
    const password = screen.getByLabelText('Password');
    expect(password).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(password).toHaveAttribute('type', 'text');
    fireEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(password).toHaveAttribute('type', 'password');
  });

  it('shows an error when fields are empty', () => {
    render(<SignInPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(
      screen.getByText('Enter your email and password.')
    ).toBeInTheDocument();
  });

  it('shows a success message when submitting valid fields', () => {
    render(<SignInPage />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'you@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(screen.getByText('Signed in successfully.')).toBeInTheDocument();
  });

  it('starts a wallet session and redirects into the wallet app', () => {
    render(<SignInPage />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'you@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(localStorage.getItem('wallet-auth')).toBe('true');
    expect(push).toHaveBeenCalledWith('/wallet');
  });

  it('honours the redirect target passed by the wallet route guard', () => {
    window.history.replaceState({}, '', '/sign-in?next=%2Fwallet%2Fcards');
    render(<SignInPage />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'you@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(push).toHaveBeenCalledWith('/wallet/cards');
  });

  it('ignores a redirect target outside the wallet app', () => {
    window.history.replaceState({}, '', '/sign-in?next=%2Fpos');
    render(<SignInPage />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'you@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(push).toHaveBeenCalledWith('/wallet');
  });
});
