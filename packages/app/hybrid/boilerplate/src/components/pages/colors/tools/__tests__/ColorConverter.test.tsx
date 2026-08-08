import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ColorConverter } from '../ColorConverter';

describe('ColorConverter', () => {
  it('shows HEX, RGB, HSL, HSV and CMYK values for the base color', () => {
    render(<ColorConverter baseColor="#ff0030" onColorChange={jest.fn()} />);
    expect(screen.getByText('#ff0030')).toBeInTheDocument();
    expect(screen.getByText('rgb(255, 0, 48)')).toBeInTheDocument();
    expect(screen.getByText('hsl(349, 100%, 50%)')).toBeInTheDocument();
    expect(screen.getByText('hsv(349, 100%, 100%)')).toBeInTheDocument();
    expect(screen.getByText('cmyk(0%, 100%, 81%, 0%)')).toBeInTheDocument();
  });

  it('shows zeroed values for black', () => {
    render(<ColorConverter baseColor="#000000" onColorChange={jest.fn()} />);
    expect(screen.getByText('hsv(0, 0%, 0%)')).toBeInTheDocument();
    expect(screen.getByText('cmyk(0%, 0%, 0%, 100%)')).toBeInTheDocument();
  });

  it('renders nothing for an invalid color', () => {
    render(
      <ColorConverter baseColor="not-a-color" onColorChange={jest.fn()} />
    );
    expect(screen.queryByTestId('color-converter')).not.toBeInTheDocument();
  });

  it('copies a conversion value to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<ColorConverter baseColor="#ff0030" onColorChange={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy CMYK' }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith('cmyk(0%, 100%, 81%, 0%)')
    );
  });

  it('parses pasted hex and reports the normalized color', () => {
    const onColorChange = jest.fn();
    render(
      <ColorConverter baseColor="#ff0030" onColorChange={onColorChange} />
    );
    fireEvent.change(screen.getByLabelText('Paste a color'), {
      target: { value: '#00ff00' },
    });
    expect(onColorChange).toHaveBeenCalledWith('#00ff00');
  });

  it('parses pasted rgb and reports the normalized color', () => {
    const onColorChange = jest.fn();
    render(
      <ColorConverter baseColor="#ff0030" onColorChange={onColorChange} />
    );
    fireEvent.change(screen.getByLabelText('Paste a color'), {
      target: { value: 'rgb(0, 0, 255)' },
    });
    expect(onColorChange).toHaveBeenCalledWith('#0000ff');
  });

  it('ignores invalid pasted input', () => {
    const onColorChange = jest.fn();
    render(
      <ColorConverter baseColor="#ff0030" onColorChange={onColorChange} />
    );
    fireEvent.change(screen.getByLabelText('Paste a color'), {
      target: { value: 'nope' },
    });
    expect(onColorChange).not.toHaveBeenCalled();
  });

  it('updates via the color picker', () => {
    const onColorChange = jest.fn();
    render(
      <ColorConverter baseColor="#ff0030" onColorChange={onColorChange} />
    );
    fireEvent.change(screen.getByLabelText('Pick a color'), {
      target: { value: '#0000ff' },
    });
    expect(onColorChange).toHaveBeenCalledWith('#0000ff');
  });

  it('syncs its query input when the base color changes', () => {
    const { rerender } = render(
      <ColorConverter baseColor="#ff0030" onColorChange={jest.fn()} />
    );
    rerender(<ColorConverter baseColor="#00ff00" onColorChange={jest.fn()} />);
    expect(screen.getByLabelText('Paste a color')).toHaveValue('#00ff00');
  });
});
