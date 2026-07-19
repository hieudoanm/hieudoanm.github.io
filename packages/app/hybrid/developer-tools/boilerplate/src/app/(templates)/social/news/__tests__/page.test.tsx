import { render, screen } from '@testing-library/react';
import NewsPage from '@/app/(templates)/social/news/page';

describe('NewsPage', () => {
  it('renders the game news page', () => {
    render(<NewsPage />);
    expect(
      screen.getByRole('heading', { name: 'Game News' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 stories')).toBeInTheDocument();
  });
});
