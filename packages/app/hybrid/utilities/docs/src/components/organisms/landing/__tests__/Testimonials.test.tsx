import { render, screen } from '@testing-library/react';
import { Testimonials } from '../Testimonials';

describe('Testimonials', () => {
  it('to match snapshot', () => {
    const { container } = render(<Testimonials />);
    expect(container).toMatchSnapshot();
  });

  it('renders section heading', () => {
    render(<Testimonials />);
    expect(screen.getByText(/testimonials/i)).toBeInTheDocument();
    expect(screen.getByText(/loved by teams/i)).toBeInTheDocument();
  });

  it('renders all testimonial quotes', () => {
    render(<Testimonials />);
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Marcus Rivera')).toBeInTheDocument();
    expect(screen.getByText('Priya Kapoor')).toBeInTheDocument();
  });

  it('renders author roles', () => {
    render(<Testimonials />);
    expect(screen.getByText(/Lead Designer/)).toBeInTheDocument();
    expect(screen.getByText(/Senior Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/DesignOps/)).toBeInTheDocument();
  });
});
