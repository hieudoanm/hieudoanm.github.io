import { render, screen } from '@testing-library/react';
import { TestimonialGrid } from '../TestimonialGrid';

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

describe('TestimonialGrid', () => {
  const testimonials = [
    { id: '1', quote: 'Loved it', author: 'Ada', role: 'Engineer' },
    { id: '2', quote: 'Great', author: 'Grace' },
  ];

  it('renders the title and testimonial content', () => {
    render(<TestimonialGrid title="Reviews" testimonials={testimonials} />);
    expect(
      screen.getByRole('heading', { name: 'Reviews' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Loved it/)).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText(/Great/)).toBeInTheDocument();
  });

  it('applies the requested column class', () => {
    const { container } = render(
      <TestimonialGrid testimonials={testimonials} columns={2} />
    );
    expect(container.querySelector('.grid')).toHaveClass('sm:grid-cols-2');
  });
});
