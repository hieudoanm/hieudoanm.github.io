import { fireEvent, render, screen } from '@testing-library/react';
import { ColorSwatch } from '../ColorSwatch';

describe('ColorSwatch', () => {
  const colors = [
    { name: 'Black', value: '#111' },
    { name: 'White', value: '#fff' },
  ];

  it('renders a button per color with its label', () => {
    render(<ColorSwatch colors={colors} />);
    expect(screen.getByRole('button', { name: 'Black' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'White' })).toBeInTheDocument();
  });

  it('applies selected styling to the chosen swatch', () => {
    render(<ColorSwatch colors={colors} selected="Black" />);
    expect(screen.getByRole('button', { name: 'Black' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Black' })).toHaveClass(
      'border-primary'
    );
  });

  it('fires onSelect with the swatch name', () => {
    const onSelect = jest.fn();
    render(<ColorSwatch colors={colors} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'White' }));
    expect(onSelect).toHaveBeenCalledWith('White');
  });
});
