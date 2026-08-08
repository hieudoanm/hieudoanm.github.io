import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RandomColor } from '../RandomColor';

describe('RandomColor', () => {
  it('renders a color with HEX, RGB and HSL variants', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    try {
      render(<RandomColor />);
      expect(screen.getByTestId('random-color')).toBeInTheDocument();
      expect(screen.getByLabelText('Random color preview')).toHaveStyle({
        backgroundColor: '#3cdddd',
      });
      expect(screen.getByText('#3cdddd')).toBeInTheDocument();
      expect(screen.getByText('rgb(60, 221, 221)')).toBeInTheDocument();
      expect(screen.getByText('hsl(180, 70%, 55%)')).toBeInTheDocument();
    } finally {
      spy.mockRestore();
    }
  });

  it('generates a new color on demand', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
    try {
      render(<RandomColor />);
      const preview = screen.getByLabelText('Random color preview');
      expect(preview).toHaveStyle({ backgroundColor: '#3cdddd' });
      spy.mockReturnValue(0.25);
      fireEvent.click(screen.getByRole('button', { name: 'Generate' }));
      expect(preview).toHaveStyle({ backgroundColor: '#73b82e' });
    } finally {
      spy.mockRestore();
    }
  });

  it('copies a variant to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<RandomColor />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy HEX' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
  });
});
