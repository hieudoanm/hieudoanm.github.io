import { render, screen } from '@testing-library/react';
import ThemePage from '@/app/(games)/(arts)/colors/css/theme/page';

jest.mock('@/games/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

jest.mock('@/games/colors/themeColors', () => ({
  useThemeColors: () => [
    { key: 'primary', label: 'Primary', value: '#6366f1' },
  ],
}));

describe('ThemePage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<ThemePage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color in CSS' })
    ).toHaveAttribute('href', '/colors/css');
    expect(
      screen.getByRole('heading', { name: 'Theme Colors' })
    ).toBeInTheDocument();
  });
});
