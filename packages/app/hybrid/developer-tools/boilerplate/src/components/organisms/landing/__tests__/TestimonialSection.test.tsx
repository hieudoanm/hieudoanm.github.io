import { render, screen } from '@testing-library/react';
import { TestimonialSection } from '../TestimonialSection';

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

describe('TestimonialSection', () => {
  const items = [
    { quote: 'Amazing product.', author: 'Ada Lovelace', role: 'Engineer' },
    { quote: 'Love it.', author: 'Grace Hopper' },
  ];

  it('renders title, quotes, authors, and roles', () => {
    render(<TestimonialSection items={items} title="What they say" />);
    expect(screen.getByText('What they say')).toBeInTheDocument();
    expect(screen.getByText('“Amazing product.”')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
  });

  it('falls back to initials from author name', () => {
    render(
      <TestimonialSection items={[{ quote: 'x', author: 'Ada Lovelace' }]} />
    );
    expect(screen.getByText('AD')).toBeInTheDocument();
  });

  it('applies 2-column layout when columns is 2', () => {
    const { container } = render(
      <TestimonialSection items={items} columns={2} />
    );
    expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument();
  });
});
