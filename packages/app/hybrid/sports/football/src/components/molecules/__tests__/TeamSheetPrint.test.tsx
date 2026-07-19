import { render, screen } from '@testing-library/react';
import { TeamSheetPrint } from '@/components/molecules/TeamSheetPrint';
import { findFormation } from '@/lib/formations';
import { makeSquad } from '@/test/fixtures';

describe('TeamSheetPrint', () => {
  const formation = findFormation('442');
  if (!formation) throw new Error('missing 442');

  const squad = makeSquad({
    name: 'Rovers FC',
    formationId: '442',
    players: [
      { id: 'gk', name: 'Cara', number: 1, role: 'GK' },
      { id: 'st', name: 'Ada', number: 10, role: 'FWD' },
      { id: 'b1', name: 'Bob', number: 20, role: 'FWD', bench: true },
      { id: 'b2', name: 'Dan', number: 12, role: 'MID', bench: true },
      { id: 'un', name: 'Eve', number: 14, role: 'DEF' },
    ],
    assignments: { '442-0-0': ['gk'], '442-3-9': ['st'] },
  });

  it('renders the header with squad, opponent, date, and formation', () => {
    render(
      <TeamSheetPrint
        squad={squad}
        formation={formation}
        opponent="United"
        date="2026-08-15"
      />
    );
    expect(screen.getByText('Rovers FC')).toBeInTheDocument();
    expect(screen.getByText('vs United')).toBeInTheDocument();
    expect(screen.getByText('2026-08-15')).toBeInTheDocument();
    expect(screen.getByText('4-4-2')).toBeInTheDocument();
  });

  it('lists starters in formation slot order with position labels', () => {
    render(
      <TeamSheetPrint squad={squad} formation={formation} opponent="" date="" />
    );
    expect(screen.getByText('Starters · 3')).toBeInTheDocument();
    expect(screen.getByText('Cara')).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Eve')).toBeInTheDocument();
  });

  it('lists bench players sorted by shirt number', () => {
    render(
      <TeamSheetPrint squad={squad} formation={formation} opponent="" date="" />
    );
    expect(screen.getByText('Bench · 2')).toBeInTheDocument();
    const benchHeading = screen.getByText('Bench · 2');
    const rows = Array.from(
      benchHeading.parentElement?.querySelectorAll('tr') ?? []
    );
    expect(rows[0]?.textContent).toContain('Dan');
    expect(rows[1]?.textContent).toContain('Bob');
  });

  it('shows placeholders when opponent and date are missing', () => {
    render(
      <TeamSheetPrint squad={squad} formation={formation} opponent="" date="" />
    );
    expect(screen.getByText('Opponent: —')).toBeInTheDocument();
    expect(screen.getByText('Date: —')).toBeInTheDocument();
  });
});
