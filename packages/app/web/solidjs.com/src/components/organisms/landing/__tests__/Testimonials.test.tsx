import { render, screen } from '@solidjs/testing-library';
import { Testimonials } from '../Testimonials';

describe('Testimonials', () => {
  it('renders section label', () => {
    render(() => <Testimonials />);
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
  });

  it('renders heading', () => {
    render(() => <Testimonials />);
    expect(screen.getByText('Loved by teams')).toBeInTheDocument();
  });

  it('renders all three author names', () => {
    render(() => <Testimonials />);
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Marcus Rivera')).toBeInTheDocument();
    expect(screen.getByText('Priya Kapoor')).toBeInTheDocument();
  });

  it('renders author roles', () => {
    render(() => <Testimonials />);
    expect(
      screen.getByText('Lead Designer at Pitch Studio')
    ).toBeInTheDocument();
    expect(screen.getByText('Senior Engineer at DataFlow')).toBeInTheDocument();
    expect(screen.getByText('DesignOps at ScaleUp')).toBeInTheDocument();
  });
});
