import JobMarketPage from '@/app/(games)/signaling/job-market/page';
import { render, screen } from '@testing-library/react';

describe('JobMarketPage', () => {
  it('renders the job market game', () => {
    render(<JobMarketPage />);
    expect(
      screen.getByRole('heading', { name: /Job Market Signaling/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('submit-wages')).toBeInTheDocument();
  });
});
