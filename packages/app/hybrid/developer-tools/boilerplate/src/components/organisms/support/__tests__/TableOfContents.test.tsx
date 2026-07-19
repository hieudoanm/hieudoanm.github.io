import { fireEvent, render, screen } from '@testing-library/react';
import { TableOfContents } from '../TableOfContents';

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

describe('TableOfContents', () => {
  const toc = [
    { id: 'intro', label: 'Introduction' },
    {
      id: 'usage',
      label: 'Usage',
      children: [{ id: 'props', label: 'Props' }],
    },
  ];

  it('renders the heading and items', () => {
    render(<TableOfContents items={toc} />);
    expect(screen.getByText('On this page')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Introduction' })
    ).toBeInTheDocument();
  });

  it('marks the active item', () => {
    render(<TableOfContents items={toc} activeId="intro" />);
    expect(
      screen.getByRole('button', { name: 'Introduction' })
    ).toHaveAttribute('aria-current', 'location');
  });

  it('notifies when an item is selected', () => {
    const onSelect = jest.fn();
    render(<TableOfContents items={toc} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Props' }));
    expect(onSelect).toHaveBeenCalledWith('props');
  });

  it('notifies when a top-level item is selected', () => {
    const onSelect = jest.fn();
    render(<TableOfContents items={toc} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Introduction' }));
    expect(onSelect).toHaveBeenCalledWith('intro');
  });

  it('marks an active nested item', () => {
    render(<TableOfContents items={toc} activeId="props" />);
    expect(screen.getByRole('button', { name: 'Props' })).toHaveClass(
      'text-primary'
    );
  });
});
