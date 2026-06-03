import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordResetTemplate } from '../PasswordResetTemplate';

describe('PasswordResetTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<PasswordResetTemplate token="valid-token" />);
    expect(container).toMatchSnapshot();
  });

  it('renders nav with brand name', () => {
    render(<PasswordResetTemplate token="valid-token" />);
    expect(screen.getAllByText('Forma').length).toBeGreaterThan(0);
  });

  it('shows invalid link view when no token', () => {
    render(<PasswordResetTemplate />);
    expect(screen.getByText('Invalid reset link')).toBeInTheDocument();
  });

  it('renders password reset form when token is provided', () => {
    render(<PasswordResetTemplate token="valid-token" />);
    expect(screen.getByText('Choose a new password')).toBeInTheDocument();
  });

  it('renders home link in nav', () => {
    render(<PasswordResetTemplate token="valid-token" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<PasswordResetTemplate token="valid-token" />);
    expect(screen.getByText(/Built with care/)).toBeInTheDocument();
  });

  it('renders password checklist when token is provided', () => {
    render(<PasswordResetTemplate token="valid-token" />);
    expect(screen.getByText(/At least 8 characters/)).toBeInTheDocument();
    expect(screen.getByText(/Passwords match/)).toBeInTheDocument();
  });

  it('calls onBackToSignIn from invalid link view', () => {
    const onBackToSignIn = jest.fn();
    render(<PasswordResetTemplate onBackToSignIn={onBackToSignIn} />);
    fireEvent.click(screen.getByText('Back to sign in'));
    expect(onBackToSignIn).toHaveBeenCalledTimes(1);
  });

  it('renders back to sign in link in form view', () => {
    render(<PasswordResetTemplate token="valid-token" />);
    expect(screen.getAllByText(/Back to sign in/).length).toBeGreaterThan(0);
  });

  it('shows error when password is too short', () => {
    render(<PasswordResetTemplate token="valid-token" />);
    fireEvent.click(screen.getByText('Reset password'));
    expect(screen.getByText(/at least 8 characters/)).toBeInTheDocument();
  });
});
