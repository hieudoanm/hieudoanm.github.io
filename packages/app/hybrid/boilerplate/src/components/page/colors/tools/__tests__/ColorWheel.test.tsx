import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ColorWheel } from '../ColorWheel';

describe('ColorWheel', () => {
  it('renders the wheel and every harmony group', () => {
    render(<ColorWheel baseColor="#ff0030" />);
    expect(screen.getByTestId('color-wheel')).toBeInTheDocument();
    for (const label of [
      'Complementary',
      'Split-complementary',
      'Analogous',
      'Triadic',
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('shows the base color as the active hue', () => {
    render(<ColorWheel baseColor="#ff0030" />);
    expect(screen.getAllByText('#ff0030').length).toBeGreaterThan(0);
  });

  it('recolors when the hue slider moves', () => {
    render(<ColorWheel baseColor="#ff0030" />);
    fireEvent.change(screen.getByRole('slider', { name: 'Hue' }), {
      target: { value: '0' },
    });
    expect(screen.getAllByText('#ff0000').length).toBeGreaterThan(0);
  });

  it('picks a hue when the wheel is clicked', () => {
    render(<ColorWheel baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Hue wheel' }), {
      clientX: 0,
      clientY: 98,
    });
    expect(screen.getAllByText('#00ffff').length).toBeGreaterThan(0);
  });

  it('copies the active color to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<ColorWheel baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy Active' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#ff0030'));
  });

  it('renders nothing for an invalid color', () => {
    render(<ColorWheel baseColor="not-a-color" />);
    expect(screen.queryByTestId('color-wheel')).not.toBeInTheDocument();
  });
});
