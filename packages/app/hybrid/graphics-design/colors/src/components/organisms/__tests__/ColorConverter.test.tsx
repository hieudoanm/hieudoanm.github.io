import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorConverter } from '../ColorConverter';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ColorConverter', () => {
  const onColorChange = jest.fn();

  beforeEach(() => {
    onColorChange.mockClear();
  });

  it('renders all format rows (HEX, RGB, HSL, HSV, CMYK)', () => {
    render(
      <ColorConverter baseColor="#ff0000" onColorChange={onColorChange} />
    );
    expect(screen.getByText('HEX')).toBeInTheDocument();
    expect(screen.getByText('RGB')).toBeInTheDocument();
    expect(screen.getByText('HSL')).toBeInTheDocument();
    expect(screen.getByText('HSV')).toBeInTheDocument();
    expect(screen.getByText('CMYK')).toBeInTheDocument();
  });

  it('renders the paste input with correct aria-label', () => {
    render(
      <ColorConverter baseColor="#ff0000" onColorChange={onColorChange} />
    );
    expect(screen.getByLabelText('Paste a color')).toBeInTheDocument();
  });

  it('renders the color picker input', () => {
    render(
      <ColorConverter baseColor="#ff0000" onColorChange={onColorChange} />
    );
    expect(screen.getByLabelText('Pick a color')).toBeInTheDocument();
  });

  it('calls onColorChange when a valid color is typed', async () => {
    const user = userEvent.setup();
    render(
      <ColorConverter baseColor="#ff0000" onColorChange={onColorChange} />
    );
    const input = screen.getByLabelText('Paste a color');
    await user.clear(input);
    await user.type(input, '#00ff00');
    expect(onColorChange).toHaveBeenCalledWith('#00ff00');
  });

  it('renders the TheoryNote about Color Models', () => {
    render(
      <ColorConverter baseColor="#ff0000" onColorChange={onColorChange} />
    );
    expect(screen.getByText('Color Models')).toBeInTheDocument();
  });
});
