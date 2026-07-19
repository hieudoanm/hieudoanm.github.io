import { render, screen } from '@testing-library/react';
import { Legend } from '../Legend';

describe('Legend', () => {
  it('renders all legend items', () => {
    render(<Legend />);
    expect(screen.getByText(/Click to advance/)).toBeInTheDocument();
    expect(screen.getByText(/Through to the next round/)).toBeInTheDocument();
    expect(screen.getByText(/Eliminated/)).toBeInTheDocument();
  });
});
