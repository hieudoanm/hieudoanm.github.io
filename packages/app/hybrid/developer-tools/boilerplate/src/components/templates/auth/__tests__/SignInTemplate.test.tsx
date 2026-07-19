import { fireEvent, render, screen } from '@testing-library/react';
import { SignInTemplate } from '../SignInTemplate';

describe('SignInTemplate', () => {
  it('renders header and form', () => {
    render(<SignInTemplate onSubmit={jest.fn()} />);
    expect(
      screen.getByRole('heading', { name: 'Sign In' })
    ).toBeInTheDocument();
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<SignInTemplate onSubmit={jest.fn()} error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('submits email and password', () => {
    const onSubmit = jest.fn();
    render(<SignInTemplate onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'secret123' },
    });
    fireEvent.submit(document.querySelector('form')!);
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'secret123',
    });
  });

  it('toggles password visibility', () => {
    render(<SignInTemplate onSubmit={jest.fn()} />);
    const input = screen.getByPlaceholderText('Enter your password');
    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(input).toHaveAttribute('type', 'text');
  });

  it('shows loading state and disables submit', () => {
    render(<SignInTemplate onSubmit={jest.fn()} loading />);
    const button = screen.getByRole('button', { name: 'Signing in...' });
    expect(button).toBeDisabled();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('provides links to forgot-password and sign-up', () => {
    render(<SignInTemplate onSubmit={jest.fn()} />);
    expect(
      screen.getByRole('link', { name: 'Forgot password?' })
    ).toHaveAttribute('href', '/auth/forgot-password');
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
      'href',
      '/auth/sign-up'
    );
  });
});
