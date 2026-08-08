import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TintShadeTone } from '../TintShadeTone';

describe('TintShadeTone', () => {
  it('renders the tint, shade and tone scales', () => {
    render(<TintShadeTone baseColor="#ff0030" />);
    expect(screen.getByTestId('tint-shade-tone')).toBeInTheDocument();
    expect(screen.getByText('Tints (add white)')).toBeInTheDocument();
    expect(screen.getByText('Shades (add black)')).toBeInTheDocument();
    expect(screen.getByText('Tones (add gray)')).toBeInTheDocument();
  });

  it('tints reach white and shades reach black', () => {
    render(<TintShadeTone baseColor="#ff0030" />);
    expect(screen.getByText('#ffffff')).toBeInTheDocument();
    expect(screen.getByText('#000000')).toBeInTheDocument();
  });

  it('tones mix toward gray', () => {
    render(<TintShadeTone baseColor="#ff0030" />);
    expect(screen.getByText('#808080')).toBeInTheDocument();
  });

  it('copies a tinted color to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<TintShadeTone baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy #ffffff' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#ffffff'));
  });
});
