import { render, screen } from '@testing-library/react';
import WheelPage from '@/app/(games)/(arts)/colors/harmony/wheel/page';

jest.mock('@/games/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('WheelPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<WheelPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Harmony' })
    ).toHaveAttribute('href', '/colors/harmony');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Color Wheel' })
    ).toBeInTheDocument();
  });
});
