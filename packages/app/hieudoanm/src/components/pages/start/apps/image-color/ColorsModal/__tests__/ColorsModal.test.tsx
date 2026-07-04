jest.mock('@lodashx/ts', () => ({
  hex2hsl: () => ({ h: 0, s: 0, l: 0 }),
  hex2rgb: () => ({ r: 23, g: 23, b: 23 }),
  hex2oklch: () => ({ l: 0, c: 0, h: 0 }),
  randomHex: () => '#ff0000',
  brightness: () => 0,
}));

import { fireEvent, render, screen } from '@testing-library/react';
import { ColorsModal } from '../index';

describe('ColorsModal', () => {
  it('renders with title and initial color', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(
      screen.getAllByDisplayValue('#171717').length
    ).toBeGreaterThanOrEqual(1);
  });

  it('shows RGB value on render', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    expect(screen.getByText(/rgb\(/)).toBeInTheDocument();
  });

  it('shows HSL value on render', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    expect(screen.getByText(/hsl\(/)).toBeInTheDocument();
  });

  it('shows OKLCH value on render', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    expect(screen.getByText(/oklch\(/)).toBeInTheDocument();
  });

  it('generates random color on Random button click', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    const randomBtn = screen.getByText('Random');
    fireEvent.click(randomBtn);
    const hexInputs = screen.getAllByDisplayValue('#ff0000');
    expect(hexInputs.length).toBeGreaterThanOrEqual(1);
  });

  it('updates color when hex input changes', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    const hexInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(hexInput, { target: { value: '#0000ff' } });
    const values = screen.getAllByDisplayValue('#0000ff');
    expect(values.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Tailwind palette', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    expect(screen.getByText('Tailwind Palette')).toBeInTheDocument();
    expect(screen.getByText('red')).toBeInTheDocument();
    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('gray')).toBeInTheDocument();
  });

  it('parses Tailwind color names from constants', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    expect(screen.getByText('red')).toBeInTheDocument();
    expect(screen.getByText('amber')).toBeInTheDocument();
    expect(screen.getByText('emerald')).toBeInTheDocument();
    expect(screen.getByText('slate')).toBeInTheDocument();
    expect(screen.getByText('zinc')).toBeInTheDocument();
    expect(screen.getByText('stone')).toBeInTheDocument();
    expect(screen.getByText('neutral')).toBeInTheDocument();
  });

  it('shows footer note', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    expect(screen.getByText(/Click outside to close/)).toBeInTheDocument();
  });

  it('generates random color on Space key press', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: ' ' });
    const hexInputs = screen.getAllByDisplayValue('#ff0000');
    expect(hexInputs.length).toBeGreaterThanOrEqual(1);
  });

  it('selects color from color picker', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    const colorPicker = document.querySelector(
      'input[type="color"]'
    ) as HTMLInputElement;
    fireEvent.change(colorPicker, { target: { value: '#ff0000' } });
    const values = screen.getAllByDisplayValue('#ff0000');
    expect(values.length).toBeGreaterThanOrEqual(1);
  });

  it('selects color from Tailwind palette swatch', () => {
    render(<ColorsModal onClose={jest.fn()} />);
    const swatches = screen.getAllByTitle(/red-50/);
    fireEvent.click(swatches[0]);
    expect(screen.getByText(/red/i)).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<ColorsModal onClose={onClose} />);
    const closeBtns = screen.getAllByText('✕');
    fireEvent.click(closeBtns[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
