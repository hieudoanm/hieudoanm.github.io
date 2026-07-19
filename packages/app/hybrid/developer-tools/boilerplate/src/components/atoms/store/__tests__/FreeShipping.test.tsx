import { render, screen } from '@testing-library/react';
import { FreeShipping } from '../FreeShipping';

describe('FreeShipping', () => {
  it('renders the default label', () => {
    render(<FreeShipping />);
    expect(screen.getByTestId('free-shipping')).toHaveTextContent(
      'Free shipping'
    );
  });

  it('renders a custom label', () => {
    render(<FreeShipping label="Shipping included" />);
    expect(screen.getByTestId('free-shipping')).toHaveTextContent(
      'Shipping included'
    );
  });

  it('applies the success badge class', () => {
    render(<FreeShipping />);
    expect(screen.getByTestId('free-shipping')).toHaveClass('badge-success');
  });
});
