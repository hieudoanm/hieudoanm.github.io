import { fireEvent, render, screen } from '@testing-library/react';
import { AnnouncementBar } from '../AnnouncementBar';

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

describe('AnnouncementBar', () => {
  it('renders text and an optional link', () => {
    render(
      <AnnouncementBar
        text="Early bird sale"
        link={{ label: 'Shop now', href: '/shop' }}
      />
    );
    expect(screen.getByText('Early bird sale')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Shop now' });
    expect(link).toHaveAttribute('href', '/shop');
  });

  it('renders without a dismiss button by default', () => {
    render(<AnnouncementBar text="Hello" />);
    expect(
      screen.queryByRole('button', { name: 'Dismiss announcement' })
    ).not.toBeInTheDocument();
  });

  it('dismisses and calls onDismiss', () => {
    const onDismiss = jest.fn();
    render(<AnnouncementBar text="Hello" dismissible onDismiss={onDismiss} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Dismiss announcement' })
    );
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('applies the neutral variant class', () => {
    const { container } = render(
      <AnnouncementBar text="Hello" variant="neutral" />
    );
    expect(container.firstChild).toHaveClass('bg-neutral');
  });
});
