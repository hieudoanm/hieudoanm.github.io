import { render, screen } from '@testing-library/react';
import ActivityPage from '@/app/(templates)/app/activity/page';

describe('ActivityPage', () => {
  it('renders the ActivityPage', () => {
    render(<ActivityPage />);
    expect(
      screen.getByRole('button', { name: /Load more/ })
    ).toBeInTheDocument();
  });
});
