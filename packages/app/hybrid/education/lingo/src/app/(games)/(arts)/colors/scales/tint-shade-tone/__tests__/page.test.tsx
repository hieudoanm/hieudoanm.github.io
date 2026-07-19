import { render, screen } from '@testing-library/react';
import TintShadeTonePage from '@/app/(games)/(arts)/colors/scales/tint-shade-tone/page';

jest.mock('@/games/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('TintShadeTonePage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<TintShadeTonePage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Scales' })
    ).toHaveAttribute('href', '/colors/scales');
    expect(
      screen.getByRole('heading', { name: 'Tint, Shade & Tone' })
    ).toBeInTheDocument();
  });
});
