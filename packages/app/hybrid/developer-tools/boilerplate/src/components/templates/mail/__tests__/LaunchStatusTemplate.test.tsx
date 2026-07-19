import { fireEvent, render, screen } from '@testing-library/react';
import { LaunchStatusTemplate } from '../LaunchStatusTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('LaunchStatusTemplate (coming-soon)', () => {
  it('renders headline and waitlist form', () => {
    render(<LaunchStatusTemplate variant="coming-soon" />);
    expect(screen.getByText('Something great is coming')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('does not subscribe without email', () => {
    render(<LaunchStatusTemplate variant="coming-soon" />);
    fireEvent.click(screen.getByRole('button', { name: /Notify me/ }));
    expect(screen.queryByText("You're on the list!")).not.toBeInTheDocument();
  });

  it('subscribes when email is entered', () => {
    render(<LaunchStatusTemplate variant="coming-soon" />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Notify me/ }));
    expect(screen.getByText("You're on the list!")).toBeInTheDocument();
  });

  it('links to sign-up for early access', () => {
    render(<LaunchStatusTemplate variant="coming-soon" />);
    expect(
      screen.getByRole('link', { name: 'Get early access' })
    ).toHaveAttribute('href', '/auth/sign-up');
  });
});

describe('LaunchStatusTemplate (maintenance)', () => {
  it('renders heading and notify form', () => {
    render(<LaunchStatusTemplate variant="maintenance" />);
    expect(screen.getByText("We'll be back shortly")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('shows confirmation after notify', () => {
    render(<LaunchStatusTemplate variant="maintenance" />);
    fireEvent.click(screen.getByRole('button', { name: /Notify me/ }));
    expect(
      screen.getByText("We'll email you when we're back.")
    ).toBeInTheDocument();
  });

  it('links to contact support', () => {
    render(<LaunchStatusTemplate variant="maintenance" />);
    expect(
      screen.getByRole('link', { name: /Contact support/ })
    ).toHaveAttribute('href', '/');
  });
});
