import { render, screen } from '@testing-library/react';
import { ContactInitials } from '../ContactInitials';

describe('ContactInitials', () => {
  it('renders initials for a two-part name', () => {
    render(<ContactInitials name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('exposes the name as an accessible label', () => {
    render(<ContactInitials name="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
  });

  it('applies the color class', () => {
    render(<ContactInitials name="Jane Doe" color="secondary" />);
    expect(screen.getByText('JD')).toHaveClass(
      'bg-secondary',
      'text-secondary-content'
    );
  });

  it('renders a placeholder for an empty name', () => {
    render(<ContactInitials name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
