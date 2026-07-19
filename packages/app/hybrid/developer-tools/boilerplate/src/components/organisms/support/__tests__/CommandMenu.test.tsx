import { fireEvent, render, screen } from '@testing-library/react';
import { CommandMenu } from '../CommandMenu';

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

describe('CommandMenu', () => {
  const items = [
    {
      id: 'nav',
      label: 'Go to settings',
      description: 'Open preferences',
      group: 'Navigation',
    },
    { id: 'theme', label: 'Toggle theme', keywords: ['dark', 'light'] },
  ];

  it('returns null when closed', () => {
    const { container } = render(
      <CommandMenu open={false} onClose={jest.fn()} items={items} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders items and search input when open', () => {
    render(<CommandMenu open onClose={jest.fn()} items={items} />);
    expect(
      screen.getByRole('dialog', { name: 'Command menu' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Search commands' })
    ).toBeInTheDocument();
    expect(screen.getByText('Go to settings')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('filters by label and keywords', () => {
    render(<CommandMenu open onClose={jest.fn()} items={items} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search commands' }), {
      target: { value: 'dark' },
    });
    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
    expect(screen.queryByText('Go to settings')).not.toBeInTheDocument();
  });

  it('selects an item on click', () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    render(
      <CommandMenu
        open
        onClose={onClose}
        items={[{ id: 'nav', label: 'Go to settings', onSelect }]}
      />
    );
    fireEvent.click(screen.getByText('Go to settings'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('navigates with arrow keys and selects with Enter', () => {
    const first = jest.fn();
    const second = jest.fn();
    render(
      <CommandMenu
        open
        onClose={jest.fn()}
        items={[
          { id: 'a', label: 'Alpha', onSelect: first },
          { id: 'b', label: 'Beta', onSelect: second },
        ]}
      />
    );
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<CommandMenu open onClose={onClose} items={items} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes via backdrop', () => {
    const onClose = jest.fn();
    render(<CommandMenu open onClose={onClose} items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close command menu' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
