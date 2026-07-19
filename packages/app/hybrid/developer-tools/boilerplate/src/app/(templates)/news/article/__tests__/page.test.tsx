import { render, screen } from '@testing-library/react';
import ArticlePage from '@/app/(templates)/news/article/page';

describe('ArticlePage', () => {
  it('renders the ArticlePage', () => {
    render(<ArticlePage />);
    expect(screen.getByText('128 likes')).toBeInTheDocument();
  });
});
