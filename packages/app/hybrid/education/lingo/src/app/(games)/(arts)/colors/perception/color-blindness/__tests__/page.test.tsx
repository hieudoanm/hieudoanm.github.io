import { render, screen } from '@testing-library/react';
import ColorBlindnessPage from '@/app/(games)/(arts)/colors/perception/color-blindness/page';

jest.mock('@/games/arts/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('ColorBlindnessPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<ColorBlindnessPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color & Perception' })
    ).toHaveAttribute('href', '/colors/perception');
    expect(
      screen.getByRole('heading', { name: 'Color Blindness' })
    ).toBeInTheDocument();
  });
});
