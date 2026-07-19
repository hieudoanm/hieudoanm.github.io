import { render, screen } from '@testing-library/react';
import ShadesTintsPage from '@/app/(games)/(arts)/colors/scales/shades-tints/page';

jest.mock('@/games/arts/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ShadesTintsPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<ShadesTintsPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Scales' })
    ).toHaveAttribute('href', '/colors/scales');
    expect(
      screen.getByRole('heading', { name: 'Shades & Tints' })
    ).toBeInTheDocument();
  });
});
