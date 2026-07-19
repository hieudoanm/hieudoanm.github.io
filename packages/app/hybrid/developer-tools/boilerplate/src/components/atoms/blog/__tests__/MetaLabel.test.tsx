import { render, screen } from '@testing-library/react';
import { MetaLabel } from '../MetaLabel';

describe('MetaLabel', () => {
  it('renders children text', () => {
    render(<MetaLabel>By John Doe</MetaLabel>);
    expect(screen.getByText('By John Doe')).toBeInTheDocument();
  });

  it('applies default styling classes', () => {
    render(<MetaLabel>By John Doe</MetaLabel>);
    expect(screen.getByText('By John Doe')).toHaveClass(
      'text-sm',
      'text-base-content/60'
    );
  });

  it('merges an extra className', () => {
    render(<MetaLabel className="uppercase">By John Doe</MetaLabel>);
    expect(screen.getByText('By John Doe')).toHaveClass('uppercase');
  });
});
