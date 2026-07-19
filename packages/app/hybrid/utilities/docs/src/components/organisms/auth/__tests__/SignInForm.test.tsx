import { fireEvent, render, screen } from '@testing-library/react';
import { SignInForm } from '../SignInForm';

describe('SignInForm', () => {
  it('to match snapshot', () => {
    const { container } = render(<SignInForm />);
    expect(container).toMatchSnapshot();
  });

  it('renders heading and description', () => {
    render(<SignInForm />);
    expect(screen.getByText('DaisyX')).toBeInTheDocument();
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
  });

  it('renders email and password fields', () => {
    render(<SignInForm />);
    expect(screen.getByPlaceholderText(/jane@forma.io/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/)).toBeInTheDocument();
  });

  it('renders sign in and Google sign in buttons', () => {
    render(<SignInForm />);
    expect(
      screen.getByRole('button', { name: /^sign in$/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/sign in with google/i)).toBeInTheDocument();
  });

  it('shows error when submitting empty email', () => {
    render(<SignInForm />);
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
  });

  it('shows error when submitting empty password', () => {
    render(<SignInForm />);
    fireEvent.change(screen.getByPlaceholderText(/jane@forma.io/), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));
    expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<SignInForm />);
    const passwordInput = screen.getByPlaceholderText(/••••••••/);
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getByRole('button', { name: /👁/i }));
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('calls onSuccess after valid submission', async () => {
    const onSuccess = jest.fn();
    render(<SignInForm onSuccess={onSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/jane@forma.io/), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^sign in$/i }));
    expect(screen.getByText(/signing in/i)).toBeInTheDocument();
    await screen.findByRole(
      'button',
      { name: /^sign in$/i },
      { timeout: 5000 }
    );
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('calls onForgotPasswordClick when link clicked', () => {
    const onClick = jest.fn();
    render(<SignInForm onForgotPasswordClick={onClick} />);
    fireEvent.click(screen.getByText(/forgot password/i));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onSignUpClick when create account link clicked', () => {
    const onClick = jest.fn();
    render(<SignInForm onSignUpClick={onClick} />);
    fireEvent.click(screen.getByText(/Create one free/));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
