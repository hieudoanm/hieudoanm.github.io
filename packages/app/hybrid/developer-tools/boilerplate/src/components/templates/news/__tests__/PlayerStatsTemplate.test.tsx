import { fireEvent, render, screen, within } from '@testing-library/react';
import { PlayerStatsTemplate } from '../PlayerStatsTemplate';

describe('PlayerStatsTemplate', () => {
  it('renders the goals leaderboard by default', () => {
    render(<PlayerStatsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Player Stats' })
    ).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByText('Mateo Silva')).toBeInTheDocument();
    expect(within(table).getByText('18 goals')).toBeInTheDocument();
    expect(within(table).getByText('14 goals')).toBeInTheDocument();
    expect(within(table).getByText('12 goals')).toBeInTheDocument();
    expect(screen.queryByText('9 assists')).not.toBeInTheDocument();
  });

  it('switches leaderboards between stat tabs', () => {
    render(<PlayerStatsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Assists' }));
    const assistsTable = screen.getByRole('table');
    expect(within(assistsTable).getByText('9 assists')).toBeInTheDocument();
    expect(within(assistsTable).getByText('8 assists')).toBeInTheDocument();
    expect(within(assistsTable).getByText('7 assists')).toBeInTheDocument();
    expect(screen.queryByText('18 goals')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clean sheets' }));
    const cleanSheetsTable = screen.getByRole('table');
    expect(
      within(cleanSheetsTable).getByText('11 clean sheets')
    ).toBeInTheDocument();
    expect(
      within(cleanSheetsTable).getByText('10 clean sheets')
    ).toBeInTheDocument();
    expect(screen.queryByText('9 assists')).not.toBeInTheDocument();
  });
});
