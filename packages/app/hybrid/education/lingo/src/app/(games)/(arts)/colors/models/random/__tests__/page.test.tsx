import { render, screen } from '@testing-library/react';
import RandomPage from '@/app/(games)/(arts)/colors/models/random/page';

jest.mock('@/games/colors/colors', () => ({
  randomColor: jest.fn(() => '#123456'),
}));

describe('RandomPage', () => {
  it('renders the tool page with a back link and heading', () => {
    render(<RandomPage />);
    expect(
      screen.getByRole('link', { name: '← Back to Color Models' })
    ).toHaveAttribute('href', '/colors/models');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Random Color' })
    ).toBeInTheDocument();
  });
});
