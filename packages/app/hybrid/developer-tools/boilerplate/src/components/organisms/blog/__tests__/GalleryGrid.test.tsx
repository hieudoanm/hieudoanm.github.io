import { render, screen } from '@testing-library/react';
import { GalleryGrid } from '../GalleryGrid';

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

describe('GalleryGrid', () => {
  const items = [
    { src: '/a.png', alt: 'Alpha', caption: 'Alpha shot' },
    { src: '/b.png', alt: 'Beta' },
  ];

  it('renders images with captions', () => {
    render(<GalleryGrid items={items} />);
    expect(screen.getByAltText('Alpha')).toHaveAttribute('src', '/a.png');
    expect(screen.getByText('Alpha shot')).toBeInTheDocument();
    expect(screen.getByAltText('Beta')).toHaveAttribute('src', '/b.png');
  });

  it('omits captions when not provided', () => {
    render(<GalleryGrid items={items} />);
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
  });

  it('applies the requested column count', () => {
    const { container } = render(<GalleryGrid items={items} columns={4} />);
    expect(container.firstChild).toHaveClass('lg:grid-cols-4');
  });
});
