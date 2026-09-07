import HarvestPage from '@/app/(games)/tragedy-of-the-commons/harvest/page';
import { render, screen } from '@testing-library/react';

describe('HarvestPage', () => {
  it('renders the commons harvest game', () => {
    render(<HarvestPage />);
    expect(
      screen.getByRole('heading', { name: /Commons Harvest/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('submit-harvest')).toBeInTheDocument();
  });
});
