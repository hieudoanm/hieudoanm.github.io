import { render, screen } from '@testing-library/react';
import GradientPage from '@/app/(games)/(arts)/colors/css/gradient/page';

jest.mock('@/games/arts/colors/shared/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: jest.fn() }),
}));

describe('GradientPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<GradientPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color in CSS' })
    ).toHaveAttribute('href', '/colors/css');
    expect(
      screen.getByRole('heading', { name: 'Gradient Builder' })
    ).toBeInTheDocument();
  });
});
