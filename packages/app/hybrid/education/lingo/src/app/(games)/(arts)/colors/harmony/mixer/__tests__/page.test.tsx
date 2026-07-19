import { render, screen } from '@testing-library/react';
import MixerPage from '@/app/(games)/(arts)/colors/harmony/mixer/page';

jest.mock('@/games/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('MixerPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<MixerPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Harmony' })
    ).toHaveAttribute('href', '/colors/harmony');
    expect(
      screen.getByRole('heading', { name: 'Color Mixer' })
    ).toBeInTheDocument();
  });
});
