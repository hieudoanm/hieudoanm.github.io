import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ColorTemperature } from '../ColorTemperature';

describe('ColorTemperature', () => {
  it('classifies the active color as warm', () => {
    render(<ColorTemperature baseColor="#ff0030" />);
    expect(screen.getByTestId('color-temperature')).toBeInTheDocument();
    expect(screen.getByText('Warm')).toBeInTheDocument();
  });

  it('classifies the active color as cool', () => {
    render(<ColorTemperature baseColor="#0000ff" />);
    expect(screen.getByText('Cool')).toBeInTheDocument();
  });

  it('classifies desaturated colors as neutral', () => {
    render(<ColorTemperature baseColor="#808080" />);
    expect(screen.getByText('Neutral')).toBeInTheDocument();
  });

  it('previews the default 4000K temperature', () => {
    render(<ColorTemperature baseColor="#ff0030" />);
    expect(screen.getByText('#ffcea6')).toBeInTheDocument();
    expect(screen.getAllByText('4000K').length).toBeGreaterThan(0);
  });

  it('recolors when the temperature slider moves', () => {
    render(<ColorTemperature baseColor="#ff0030" />);
    fireEvent.change(
      screen.getByRole('slider', { name: 'Color temperature' }),
      {
        target: { value: '6500' },
      }
    );
    expect(screen.getByText('#fffefa')).toBeInTheDocument();
  });

  it('copies the temperature color to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<ColorTemperature baseColor="#ff0030" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy HEX' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('#ffcea6'));
  });
});
