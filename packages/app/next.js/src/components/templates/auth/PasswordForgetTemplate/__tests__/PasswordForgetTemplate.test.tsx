import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordForgetTemplate } from '../PasswordForgetTemplate';

describe('PasswordForgetTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<PasswordForgetTemplate />);
    expect(container).toMatchSnapshot();
  });

  it('renders nav with brand name', () => {
    render(<PasswordForgetTemplate />);
    expect(screen.getAllByText('Forma').length).toBeGreaterThan(0);
  });

  it('renders forgot password form', () => {
    render(<PasswordForgetTemplate />);
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(<PasswordForgetTemplate />);
    expect(screen.getByPlaceholderText('jane@forma.io')).toBeInTheDocument();
  });

  it('renders form description', () => {
    render(<PasswordForgetTemplate />);
    expect(screen.getByText(/enter your email/)).toBeInTheDocument();
  });

  it('renders home link in nav', () => {
    render(<PasswordForgetTemplate />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<PasswordForgetTemplate />);
    expect(screen.getByText(/Built with care/)).toBeInTheDocument();
  });

  it('renders sign in link', () => {
    render(<PasswordForgetTemplate />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('calls onBackToSignIn when sign in link is clicked', () => {
    const onBackToSignIn = jest.fn();
    render(<PasswordForgetTemplate onBackToSignIn={onBackToSignIn} />);
    fireEvent.click(screen.getByText('Sign in'));
    expect(onBackToSignIn).toHaveBeenCalledTimes(1);
  });

  it('shows error when email is empty on submit', () => {
    render(<PasswordForgetTemplate />);
    fireEvent.submit(screen.getByText('Send reset link').closest('form')!);
    expect(screen.getAllByText(/enter your email/).length).toBeGreaterThan(0);
  });
});
