import { render, screen } from '@testing-library/react';
import { CompareIcon } from '../CompareIcon';

describe('CompareIcon', () => {
  it('renders with a default accessible label', () => {
    render(<CompareIcon />);
    expect(screen.getByRole('img', { name: 'Compare' })).toBeInTheDocument();
  });

  it('applies a custom size', () => {
    render(<CompareIcon size={32} />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '32');
    expect(screen.getByRole('img')).toHaveAttribute('height', '32');
  });

  it('uses a custom label', () => {
    render(<CompareIcon label="Compare products" />);
    expect(
      screen.getByRole('img', { name: 'Compare products' })
    ).toBeInTheDocument();
  });
});
