import { fireEvent, render, screen } from '@testing-library/react';
import { CookieBanner } from '../CookieBanner';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('CookieBanner', () => {
  it('renders message, policy link, and buttons', () => {
    render(<CookieBanner onAccept={jest.fn()} onDecline={jest.fn()} />);
    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Privacy policy' })
    ).toHaveAttribute('href', '/landing/privacy');
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
  });

  it('calls onAccept and hides the banner', () => {
    const onAccept = jest.fn();
    render(<CookieBanner onAccept={onAccept} onDecline={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByRole('button', { name: 'Accept' })
    ).not.toBeInTheDocument();
  });

  it('calls onDecline on decline', () => {
    const onDecline = jest.fn();
    render(<CookieBanner onAccept={jest.fn()} onDecline={onDecline} />);
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));
    expect(onDecline).toHaveBeenCalledTimes(1);
  });
});
