import { render, screen } from '@testing-library/react';
import NewsPage from '@/app/(templates)/news/news/page';

describe('NewsPage', () => {
  it('renders the news page', () => {
    render(<NewsPage />);
    expect(
      screen.getByRole('heading', { name: 'Sports News' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 stories')).toBeInTheDocument();
  });
});
