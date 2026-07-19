import { fireEvent, render, screen } from '@testing-library/react';
import { TestimonialCarousel } from '../TestimonialCarousel';

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

describe('TestimonialCarousel', () => {
  const items = [
    { quote: 'Loved it.', author: 'Ada', role: 'Engineer' },
    { quote: 'Great work.', author: 'Grace' },
  ];

  it('renders the first testimonial', () => {
    render(<TestimonialCarousel items={items} />);
    expect(screen.getByText(/Loved it/)).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('navigates with the next and previous buttons', () => {
    render(<TestimonialCarousel items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next testimonial' }));
    expect(screen.getByText(/Great work/)).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Previous testimonial' })
    );
    expect(screen.getByText(/Loved it/)).toBeInTheDocument();
  });

  it('jumps to a specific testimonial via the dots', () => {
    render(<TestimonialCarousel items={items} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Show testimonial 2' }));
    expect(screen.getByText(/Great work/)).toBeInTheDocument();
  });

  it('renders an avatar when provided', () => {
    render(
      <TestimonialCarousel
        items={[{ quote: 'Nice.', author: 'Ada', avatar: '/ada.png' }]}
      />
    );
    expect(screen.getByAltText('Ada')).toHaveAttribute('src', '/ada.png');
  });

  it('returns null when there are no items', () => {
    const { container } = render(<TestimonialCarousel items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
