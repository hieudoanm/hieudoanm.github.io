import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ShadesTints } from '../ShadesTints';

describe('ShadesTints', () => {
  it('renders a scale centered on the base color', () => {
    render(<ShadesTints baseColor="#ff0030" />);
    expect(screen.getByTestId('shades-tints')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^Copy #/ })).toHaveLength(9);
    expect(
      screen.getByRole('button', { name: 'Copy #ff0030' })
    ).toBeInTheDocument();
  });

  it('labels dark steps as shades and light steps as tints', () => {
    render(<ShadesTints baseColor="#ff0030" />);
    expect(screen.getByText('shade 4')).toBeInTheDocument();
    expect(screen.getByText('base')).toBeInTheDocument();
    expect(screen.getByText('tint 4')).toBeInTheDocument();
  });

  it('changes the number of steps with the slider', () => {
    render(<ShadesTints baseColor="#ff0030" />);
    fireEvent.change(screen.getByRole('slider', { name: 'Shade steps' }), {
      target: { value: '5' },
    });
    expect(screen.getAllByRole('button', { name: /^Copy #/ })).toHaveLength(5);
  });

  it('copies a hex to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<ShadesTints baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy #ff0030' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#ff0030'));
  });
});
