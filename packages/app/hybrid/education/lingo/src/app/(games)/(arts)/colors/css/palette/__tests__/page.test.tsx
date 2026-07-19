import { render, screen } from '@testing-library/react';
import PalettePage from '@/app/(games)/(arts)/colors/css/palette/page';

jest.mock('@/games/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

jest.mock('@/games/colors/colors', () => ({
  randomPalette: jest.fn(() => ['#ff0000', '#00ff00', '#0000ff']),
}));

describe('PalettePage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<PalettePage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color in CSS' })
    ).toHaveAttribute('href', '/colors/css');
    expect(
      screen.getByRole('heading', { name: 'Palette Generator' })
    ).toBeInTheDocument();
  });
});
