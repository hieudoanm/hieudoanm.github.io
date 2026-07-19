import { fireEvent, render, screen } from '@testing-library/react';
import { ShadesTints } from '../ShadesTints';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ShadesTints', () => {
  it('renders the Steps slider', () => {
    render(<ShadesTints baseColor="#ff0000" />);
    expect(
      screen.getByRole('slider', { name: 'Shade steps' })
    ).toBeInTheDocument();
  });

  it('displays the default step count', () => {
    render(<ShadesTints baseColor="#ff0000" />);
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('renders shade, base, and tint labels', () => {
    render(<ShadesTints baseColor="#ff0000" />);
    expect(screen.getByText('base')).toBeInTheDocument();
    expect(screen.getByText('shade 1')).toBeInTheDocument();
    expect(screen.getByText('tint 1')).toBeInTheDocument();
  });

  it('renders the TheoryNote about Shades and Tints', () => {
    render(<ShadesTints baseColor="#ff0000" />);
    expect(screen.getByText('Shades and Tints')).toBeInTheDocument();
  });

  it('renders the container with data-testid', () => {
    render(<ShadesTints baseColor="#6366f1" />);
    expect(screen.getByTestId('shades-tints')).toBeInTheDocument();
  });

  it('updates step count when slider changes', () => {
    render(<ShadesTints baseColor="#ff0000" />);
    const slider = screen.getByRole('slider', { name: 'Shade steps' });
    fireEvent.change(slider, { target: { value: '7' } });
    expect(screen.getByText('7')).toBeInTheDocument();
  });
});
