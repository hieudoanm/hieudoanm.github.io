import { render, screen } from '@testing-library/react';
import { CardsSection } from '../CardsSection';

describe('CardsSection', () => {
  it('renders section heading', () => {
    render(<CardsSection />);
    expect(screen.getByText('Cards & stats')).toBeInTheDocument();
    expect(screen.getByText('Surface what matters')).toBeInTheDocument();
  });

  it('renders product card', () => {
    render(<CardsSection />);
    expect(screen.getByText('Nike Shoes')).toBeInTheDocument();
    expect(screen.getByText('Buy Now')).toBeInTheDocument();
  });

  it('renders pricing card', () => {
    render(<CardsSection />);
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('$29')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('renders testimonial card', () => {
    render(<CardsSection />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Product Designer')).toBeInTheDocument();
  });

  it('renders stats', () => {
    render(<CardsSection />);
    expect(screen.getByText('$12,450')).toBeInTheDocument();
    expect(screen.getByText('2,340')).toBeInTheDocument();
    expect(screen.getByText('91')).toBeInTheDocument();
  });

  it('renders stat titles', () => {
    render(<CardsSection />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Page Score')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<CardsSection />);
    expect(container).toMatchSnapshot();
  });
});
