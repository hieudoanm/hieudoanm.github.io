import { render, screen } from '@testing-library/react';
import BreakingNewsPage from '@/app/(templates)/news/breaking/page';

describe('BreakingNewsPage', () => {
  it('renders the BreakingNewsPage', () => {
    render(<BreakingNewsPage />);
    expect(screen.getByText('6 stories')).toBeInTheDocument();
  });
});
