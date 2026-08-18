import { render, screen } from '@testing-library/react';
import HistoryPage from '@/app/(templates)/social/history/page';

describe('HistoryPage', () => {
  it('renders the watch history page', () => {
    render(<HistoryPage />);
    expect(
      screen.getByRole('heading', { name: 'History' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 watched titles')).toBeInTheDocument();
  });
});
