import { render, screen } from '@testing-library/react';
import ContinueWatchingPage from '@/app/(templates)/media/continue-watching/page';

describe('ContinueWatchingPage', () => {
  it('renders the continue watching page', () => {
    render(<ContinueWatchingPage />);
    expect(
      screen.getByRole('heading', { name: 'Continue Watching' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 titles')).toBeInTheDocument();
  });
});
