import StagHuntPage from '@/app/(games)/coordination-games/stag-hunt/page';
import { render, screen } from '@testing-library/react';

describe('StagHuntPage', () => {
  it('renders the Stag Hunt game', () => {
    render(<StagHuntPage />);
    expect(
      screen.getByRole('heading', { name: /Stag Hunt/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Choose your partner:')).toBeInTheDocument();
  });
});
