import { render, screen } from '@testing-library/react';
import SchemesPage from '@/app/(games)/(arts)/colors/harmony/schemes/page';

jest.mock('@/games/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('SchemesPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<SchemesPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Harmony' })
    ).toHaveAttribute('href', '/colors/harmony');
    expect(
      screen.getByRole('heading', { name: 'Color Schemes' })
    ).toBeInTheDocument();
  });
});
