import { render, screen } from '@testing-library/react';
import OpacityPage from '@/app/(games)/(arts)/colors/scales/opacity/page';

jest.mock('@/games/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('OpacityPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<OpacityPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Scales' })
    ).toHaveAttribute('href', '/colors/scales');
    expect(
      screen.getByRole('heading', { name: 'Opacity Overlay' })
    ).toBeInTheDocument();
  });
});
