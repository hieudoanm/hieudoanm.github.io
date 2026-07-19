import { render, screen } from '@testing-library/react';
import { TeamStats } from '@/components/molecules/TeamStats';
import { findFormation } from '@/lib/formations';
import { makePlayer, makeSquad } from '@/test/fixtures';

describe('TeamStats', () => {
  const formation = () => {
    const f = findFormation('442');
    if (!f) throw new Error('442 missing');
    return f;
  };

  it('shows the overall strength and filled counts', () => {
    const squad = makeSquad({
      formationId: '442',
      players: [makePlayer({ id: 'p1', role: 'GK' })],
      assignments: { '442-0-0': ['p1'] },
    });
    render(<TeamStats squad={squad} formation={formation()} />);
    expect(screen.getByText('9%')).toBeInTheDocument();
    expect(
      screen.getByText(/1 of 11 positions filled · 0 unassigned/)
    ).toBeInTheDocument();
  });

  it('lists coverage per role', () => {
    const squad = makeSquad({
      formationId: '442',
      players: [makePlayer({ id: 'p1', role: 'GK' })],
      assignments: { '442-0-0': ['p1'] },
    });
    render(<TeamStats squad={squad} formation={formation()} />);
    expect(screen.getByText('GK')).toBeInTheDocument();
    expect(screen.getByText('DEF')).toBeInTheDocument();
    expect(screen.getByText('MID')).toBeInTheDocument();
    expect(screen.getByText('FWD')).toBeInTheDocument();
    expect(screen.getByText('1/1')).toBeInTheDocument();
    expect(screen.getAllByText('0/4')).toHaveLength(2);
  });

  it('reports unassigned players', () => {
    const squad = makeSquad({
      formationId: '442',
      players: [
        makePlayer({ id: 'p1', role: 'GK' }),
        makePlayer({ id: 'p2', name: 'Bob', role: 'FWD' }),
      ],
      assignments: { '442-0-0': ['p1'] },
    });
    render(<TeamStats squad={squad} formation={formation()} />);
    expect(
      screen.getByText(/1 of 11 positions filled · 1 unassigned/)
    ).toBeInTheDocument();
  });
});
