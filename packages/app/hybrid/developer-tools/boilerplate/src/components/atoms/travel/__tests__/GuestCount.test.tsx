import { render, screen } from '@testing-library/react';
import { GuestCount } from '../GuestCount';

describe('GuestCount', () => {
  it('renders the plural label for multiple guests', () => {
    render(<GuestCount count={3} />);
    expect(screen.getByTestId('guest-count')).toHaveTextContent('3 guests');
  });

  it('renders the singular label for one guest', () => {
    render(<GuestCount count={1} />);
    expect(screen.getByTestId('guest-count')).toHaveTextContent('1 guest');
  });

  it('renders a zero count', () => {
    render(<GuestCount count={0} />);
    expect(screen.getByTestId('guest-count')).toHaveTextContent('0 guests');
  });
});
