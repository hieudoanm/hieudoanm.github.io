import { fireEvent, render, screen } from '@testing-library/react';
import { PasswordForget } from '../PasswordForget';

describe('PasswordForget', () => {
  it('to match snapshot', () => {
    const { container } = render(<PasswordForget />);
    expect(container).toMatchSnapshot();
  });

  it('renders heading and description', () => {
    render(<PasswordForget />);
    expect(screen.getByText('DaisyX')).toBeInTheDocument();
    expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();
    expect(screen.getByText(/send you a reset link/i)).toBeInTheDocument();
  });

  it('renders email field and submit button', () => {
    render(<PasswordForget />);
    expect(screen.getByPlaceholderText(/jane@forma.io/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send reset link/i })
    ).toBeInTheDocument();
  });

  it('shows error when submitting empty email', () => {
    render(<PasswordForget />);
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
  });

  it('shows success state after submission', async () => {
    render(<PasswordForget />);
    fireEvent.change(screen.getByPlaceholderText(/jane@forma.io/), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    await screen.findByText(/check your inbox/i, {}, { timeout: 5000 });
    expect(screen.getByText(/jane@test.com/)).toBeInTheDocument();
  });

  it('shows resend option after submission', async () => {
    render(<PasswordForget />);
    fireEvent.change(screen.getByPlaceholderText(/jane@forma.io/), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    await screen.findByText(/resend/i, {}, { timeout: 5000 });
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
  });

  it('calls onSuccess when Done clicked', async () => {
    const onSuccess = jest.fn();
    render(<PasswordForget onSuccess={onSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/jane@forma.io/), {
      target: { value: 'jane@test.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    await screen.findByText(/check your inbox/i, {}, { timeout: 5000 });
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('calls onBackToSignIn when link clicked', () => {
    const onClick = jest.fn();
    render(<PasswordForget onBackToSignIn={onClick} />);
    fireEvent.click(screen.getByText(/Sign in/));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
