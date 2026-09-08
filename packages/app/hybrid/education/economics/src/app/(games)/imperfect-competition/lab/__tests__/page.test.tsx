import MonopolisticCompetitionLabPage from '@/app/(games)/imperfect-competition/lab/page';
import { render, screen } from '@testing-library/react';

describe('MonopolisticCompetitionLabPage', () => {
  it('renders the monopolistic competition firm lab', () => {
    render(<MonopolisticCompetitionLabPage />);
    expect(
      screen.getByRole('heading', { name: 'Monopolistic Competition Firm Lab' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Back to Theory/ })
    ).toHaveAttribute('href', '/imperfect-competition');
    expect(
      screen.getByTestId('monopolistic-competition-game')
    ).toBeInTheDocument();
  });
});
