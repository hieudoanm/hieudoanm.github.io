import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PaletteGenerator } from '../PaletteGenerator';

describe('PaletteGenerator', () => {
  it('renders the default palette', () => {
    render(<PaletteGenerator />);
    expect(screen.getByTestId('palette-generator')).toBeInTheDocument();
    for (const hex of ['#ff0030', '#ff8054', '#ffd166', '#7bdff2', '#3a86ff']) {
      expect(
        screen.getByRole('button', { name: `Copy ${hex}` })
      ).toBeInTheDocument();
    }
  });

  it('copies a palette hex to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<PaletteGenerator />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy #ff0030' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#ff0030'));
  });

  it('generates a new palette on demand', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    try {
      render(<PaletteGenerator />);
      fireEvent.click(screen.getByRole('button', { name: 'Generate palette' }));
      expect(
        screen.queryByRole('button', { name: 'Copy #ff0030' })
      ).not.toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /Copy #/ })).toHaveLength(5);
    } finally {
      spy.mockRestore();
    }
  });
});
