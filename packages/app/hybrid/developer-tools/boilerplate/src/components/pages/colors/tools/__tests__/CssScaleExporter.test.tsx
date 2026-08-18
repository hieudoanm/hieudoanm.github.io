import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CssScaleExporter } from '../CssScaleExporter';

describe('CssScaleExporter', () => {
  it('renders a 50-900 scale from the base color', () => {
    render(<CssScaleExporter baseColor="#ff0030" />);
    expect(screen.getByTestId('css-scale-exporter')).toBeInTheDocument();
    for (const label of [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
    ]) {
      expect(
        screen.getByText(new RegExp(`^--color-${label}:`))
      ).toBeInTheDocument();
    }
  });

  it('maps the lightest step to 50 and the darkest to 900', () => {
    render(<CssScaleExporter baseColor="#ff0030" />);
    expect(screen.getByText('--color-50: #ffffff;')).toBeInTheDocument();
    expect(screen.getByText('--color-900: #000000;')).toBeInTheDocument();
  });

  it('renders nothing for an invalid color', () => {
    render(<CssScaleExporter baseColor="not-a-color" />);
    expect(screen.queryByTestId('css-scale-exporter')).not.toBeInTheDocument();
  });

  it('regenerates the scale when the color picker changes', () => {
    render(<CssScaleExporter baseColor="#ff0030" />);
    expect(screen.getByText('--color-50: #ffffff;')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Scale color'), {
      target: { value: '#0000ff' },
    });
    expect(screen.getByText('--color-100: #c6c6ff;')).toBeInTheDocument();
    expect(screen.getByText('--color-900: #000000;')).toBeInTheDocument();
  });

  it('copies a single variable to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<CssScaleExporter baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy --color-50' }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith('--color-50: #ffffff;')
    );
  });

  it('copies the whole scale to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<CssScaleExporter baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy CSS scale' }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        expect.stringContaining('--color-50: #ffffff;')
      )
    );
  });
});
