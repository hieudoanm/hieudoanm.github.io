import { render, screen } from '@testing-library/react';
import AdjusterPage from '@/app/(games)/(arts)/colors/models/adjuster/page';

jest.mock('@/games/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('AdjusterPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<AdjusterPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Models' })
    ).toHaveAttribute('href', '/colors/models');
    expect(
      screen.getByRole('heading', { name: 'Color Adjuster' })
    ).toBeInTheDocument();
  });
});
