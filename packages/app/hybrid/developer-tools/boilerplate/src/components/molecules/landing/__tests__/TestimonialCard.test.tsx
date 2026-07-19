import { render, screen } from '@testing-library/react';
import { TestimonialCard } from '../TestimonialCard';

const testimonial = {
  quote: 'Amazing product.',
  author: 'Jane Doe',
  role: 'CTO',
  company: 'Acme',
  rating: 5,
};

describe('TestimonialCard', () => {
  it('renders quote, author, role, and company', () => {
    render(<TestimonialCard {...testimonial} />);
    expect(screen.getByText('“Amazing product.”')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('CTO · Acme')).toBeInTheDocument();
  });

  it('renders the star rating', () => {
    render(<TestimonialCard {...testimonial} />);
    expect(screen.getByLabelText('Rated 5 out of 5')).toBeInTheDocument();
  });

  it('hides the rating when omitted', () => {
    render(<TestimonialCard {...testimonial} rating={undefined} />);
    expect(screen.queryByLabelText(/Rated/)).not.toBeInTheDocument();
  });

  it('generates initials from the author name', () => {
    render(<TestimonialCard {...testimonial} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
