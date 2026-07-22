import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

jest.mock('next/link', () => {
  return ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header', () => {
  it('renders the app name', () => {
    render(<Header />);
    expect(screen.getByText('Wallet')).toBeInTheDocument();
  });

  it('renders notification bell', () => {
    render(<Header />);
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
  });

  it('toggles menu on hamburger click', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Open menu');
    fireEvent.click(menuButton);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });
});
