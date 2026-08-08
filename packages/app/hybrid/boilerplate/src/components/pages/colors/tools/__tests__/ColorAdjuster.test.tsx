import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ColorAdjuster } from '../ColorAdjuster';

describe('ColorAdjuster', () => {
  it('shows the base color until adjusted', () => {
    render(<ColorAdjuster baseColor="#ff0030" />);
    expect(screen.getByTestId('color-adjuster')).toBeInTheDocument();
    expect(screen.getByText('#ff0030')).toBeInTheDocument();
    expect(screen.getByLabelText('Adjusted color preview')).toHaveStyle({
      backgroundColor: '#ff0030',
    });
  });

  it('recolors when the hue slider moves', () => {
    render(<ColorAdjuster baseColor="#ff0030" />);
    fireEvent.change(screen.getByRole('slider', { name: 'Hue' }), {
      target: { value: '0' },
    });
    expect(screen.getByText('#ff0000')).toBeInTheDocument();
  });

  it('desaturates to gray', () => {
    render(<ColorAdjuster baseColor="#ff0030" />);
    fireEvent.change(screen.getByRole('slider', { name: 'Saturation' }), {
      target: { value: '0' },
    });
    expect(screen.getByText('#808080')).toBeInTheDocument();
  });

  it('darkens to black', () => {
    render(<ColorAdjuster baseColor="#ff0030" />);
    fireEvent.change(screen.getByRole('slider', { name: 'Lightness' }), {
      target: { value: '0' },
    });
    expect(screen.getByText('#000000')).toBeInTheDocument();
  });

  it('copies the adjusted color', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<ColorAdjuster baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy HEX' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#ff0030'));
  });
});
