import { render, screen } from '@testing-library/react';
import { CultureCard } from '../CultureCard';

describe('CultureCard', () => {
  it('renders the title and default category', () => {
    render(<CultureCard title="New museum opens" />);
    expect(screen.getByText('New museum opens')).toBeInTheDocument();
    expect(screen.getByText('Culture')).toBeInTheDocument();
  });

  it('renders author and date when provided', () => {
    render(<CultureCard title="Museum" author="Hoa Le" date="Mar 1, 2024" />);
    expect(screen.getByText('Hoa Le')).toBeInTheDocument();
    expect(screen.getByText('Mar 1, 2024')).toBeInTheDocument();
  });

  it('renders a custom category', () => {
    render(<CultureCard title="Museum" category="Art" />);
    expect(screen.getByText('Art')).toBeInTheDocument();
  });

  it('renders a link when href is provided', () => {
    render(<CultureCard title="Museum" href="/culture/museum" />);
    expect(screen.getByRole('link', { name: 'Museum' })).toHaveAttribute(
      'href',
      '/culture/museum'
    );
  });
});
