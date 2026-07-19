import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaletteGenerator } from '../PaletteGenerator';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

jest.mock('@/lib/colors', () => ({
  randomPalette: jest.fn(() => [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
  ]),
}));

describe('PaletteGenerator', () => {
  it('renders five swatches', () => {
    const { container } = render(<PaletteGenerator />);
    const swatches = container.querySelectorAll('[style*="background-color"]');
    expect(swatches).toHaveLength(5);
  });

  it('renders the Generate button', () => {
    render(<PaletteGenerator />);
    expect(
      screen.getByRole('button', { name: 'Generate a new palette' })
    ).toBeInTheDocument();
  });

  it('renders the descriptive text', () => {
    render(<PaletteGenerator />);
    expect(screen.getByText(/random but harmonious/)).toBeInTheDocument();
  });

  it('renders the TheoryNote about Palette Balance', () => {
    render(<PaletteGenerator />);
    expect(screen.getByText('Palette Balance')).toBeInTheDocument();
  });

  it('renders the container with data-testid', () => {
    render(<PaletteGenerator />);
    expect(screen.getByTestId('palette-generator')).toBeInTheDocument();
  });

  it('regenerates the palette when Generate is clicked', async () => {
    const { randomPalette } = jest.requireMock('@/lib/colors');
    const user = userEvent.setup();
    render(<PaletteGenerator />);
    await user.click(
      screen.getByRole('button', { name: 'Generate a new palette' })
    );
    expect(randomPalette).toHaveBeenCalledWith(5);
  });
});
