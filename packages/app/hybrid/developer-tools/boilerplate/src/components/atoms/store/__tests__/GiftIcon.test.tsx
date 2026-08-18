import { render, screen } from '@testing-library/react';
import { GiftIcon } from '../GiftIcon';

describe('GiftIcon', () => {
  it('renders with a default accessible label', () => {
    render(<GiftIcon />);
    expect(screen.getByRole('img', { name: 'Gift' })).toBeInTheDocument();
  });

  it('applies a custom size', () => {
    render(<GiftIcon size={28} />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '28');
    expect(screen.getByRole('img')).toHaveAttribute('height', '28');
  });

  it('uses a custom label', () => {
    render(<GiftIcon label="Free gift" />);
    expect(screen.getByRole('img', { name: 'Free gift' })).toBeInTheDocument();
  });
});
