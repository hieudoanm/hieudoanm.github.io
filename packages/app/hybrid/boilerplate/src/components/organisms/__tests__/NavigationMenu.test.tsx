import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationMenu } from '../NavigationMenu';

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

describe('NavigationMenu', () => {
  const items = [
    { label: 'Docs', children: <div>Docs panel</div> },
    { label: 'Pricing', href: '/pricing' },
  ];

  it('renders each item', () => {
    render(<NavigationMenu items={items} />);
    expect(screen.getByRole('button', { name: 'Docs' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute(
      'href',
      '/pricing'
    );
  });

  it('opens the dropdown panel', () => {
    render(<NavigationMenu items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Docs' }));
    expect(screen.getByText('Docs panel')).toBeInTheDocument();
  });

  it('closes the panel when clicking outside', () => {
    render(
      <div>
        <NavigationMenu items={items} />
        <button type="button">Outside</button>
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Docs' }));
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByText('Docs panel')).not.toBeInTheDocument();
  });

  it('closes the panel on Escape', () => {
    render(<NavigationMenu items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Docs' }));
    fireEvent.keyDown(screen.getByRole('button', { name: 'Docs' }), {
      key: 'Escape',
    });
    expect(screen.queryByText('Docs panel')).not.toBeInTheDocument();
  });
});
