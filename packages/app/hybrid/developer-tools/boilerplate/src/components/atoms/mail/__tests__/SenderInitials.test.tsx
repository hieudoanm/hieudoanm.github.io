import { render, screen } from '@testing-library/react';
import { SenderInitials } from '../SenderInitials';

describe('SenderInitials', () => {
  it('renders initials from the first and last name', () => {
    render(<SenderInitials name="Jane Doe" />);
    expect(screen.getByTestId('sender-initials')).toHaveTextContent('JD');
  });

  it('renders a single initial for one-word names', () => {
    render(<SenderInitials name="Support" />);
    expect(screen.getByTestId('sender-initials')).toHaveTextContent('S');
  });

  it('handles empty names', () => {
    render(<SenderInitials name="   " />);
    expect(screen.getByTestId('sender-initials')).toHaveTextContent('');
  });
});
