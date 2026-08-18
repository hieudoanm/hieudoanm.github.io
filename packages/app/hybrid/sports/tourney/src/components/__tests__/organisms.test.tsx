import { fireEvent, render, screen } from '@testing-library/react';
import { ToastProvider, useToast } from '@/providers/ToastProvider';
import { ToastContainer } from '@/components/organisms/ToastContainer';
import { Header } from '@/components/organisms/Header';
import { StandingsTable } from '@/components/organisms/StandingsTable';
import { MatchCard } from '@/components/organisms/MatchCard';
import { TournamentList } from '@/components/molecules/TournamentList';
import { BracketView } from '@/components/organisms/BracketView';
import type { Participant, Standing, Tournament } from '@/types';

jest.mock('next/navigation', () => ({
  usePathname: () => '/create',
}));

const participant = (id: string, name: string): Participant => ({
  id,
  tournamentId: 't1',
  name,
});

const tournament = (overrides: Partial<Tournament> = {}): Tournament => ({
  id: 't1',
  name: 'Cup',
  description: '',
  format: 'single-elimination',
  status: 'draft',
  maxParticipants: 8,
  createdAt: 0,
  updatedAt: 0,
  ...overrides,
});

describe('Header', () => {
  it('renders title with optional subtitle, badges, action, and back link', () => {
    render(
      <Header
        title="My Tourney"
        subtitle="Round 1"
        badges={<span>badge</span>}
        action={<button>Go</button>}
        backHref="/"
      />
    );
    expect(
      screen.getByRole('heading', { name: 'My Tourney' })
    ).toBeInTheDocument();
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('badge')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('omits optional sections when absent', () => {
    render(<Header title="Only title" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText('Round 1')).not.toBeInTheDocument();
  });
});

describe('ToastContainer', () => {
  const Pusher = ({ message }: { message: string }) => {
    const { addToast } = useToast();
    return <button onClick={() => addToast(message, 'success')}>push</button>;
  };

  it('renders nothing with no toasts', () => {
    render(
      <ToastProvider>
        <ToastContainer />
      </ToastProvider>
    );
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('renders toasts and removes them on click', () => {
    render(
      <ToastProvider>
        <Pusher message="Saved" />
        <ToastContainer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'push' }));
    expect(screen.getByText('Saved')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Saved'));
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });
});

describe('StandingsTable', () => {
  const standings: Standing[] = [
    {
      participantId: 'p1',
      tournamentId: 't1',
      played: 2,
      won: 2,
      drawn: 0,
      lost: 0,
      points: 6,
      position: 1,
    },
    {
      participantId: 'missing',
      tournamentId: 't1',
      played: 1,
      won: 0,
      drawn: 1,
      lost: 0,
      points: 1,
      position: 2,
    },
  ];

  it('renders rows with names, falling back to Unknown', () => {
    render(
      <StandingsTable
        standings={standings}
        participants={[participant('p1', 'Alpha')]}
      />
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('renders rows beyond the top three without a medal class', () => {
    const { container } = render(
      <StandingsTable
        standings={[
          ...standings,
          {
            participantId: 'p3',
            tournamentId: 't1',
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            points: 0,
            position: 3,
          },
          {
            participantId: 'p4',
            tournamentId: 't1',
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            points: 0,
            position: 4,
          },
        ]}
        participants={[]}
      />
    );
    const rows = container.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(4);
    expect(rows[0]).toHaveClass('text-yellow-500');
    expect(rows[3].getAttribute('class')).toBeNull();
  });
});

describe('MatchCard', () => {
  const match = {
    id: 'm1',
    tournamentId: 't1',
    round: 1,
    status: 'completed' as const,
    participant1Id: 'p1',
    participant2Id: 'p2',
    participant1Score: 3,
    participant2Score: 1,
    winnerId: 'p1',
    scheduledAt: 1700000000000,
  };

  it('shows names, scores, and winner styling', () => {
    render(
      <MatchCard
        match={match}
        participant1={participant('p1', 'Alpha')}
        participant2={participant('p2', 'Beta')}
      />
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('falls back to TBD and hides scores for non-completed matches', () => {
    render(
      <MatchCard
        match={{
          ...match,
          status: 'scheduled',
          participant1Score: null,
          participant2Score: null,
        }}
      />
    );
    expect(screen.getAllByText('TBD')).toHaveLength(2);
    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });

  it('fires onClick when provided', () => {
    const onClick = jest.fn();
    render(
      <MatchCard match={{ ...match, status: 'scheduled' }} onClick={onClick} />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('styles the winner when the second participant wins', () => {
    const { container } = render(
      <MatchCard
        match={{ ...match, winnerId: 'p2' }}
        participant1={participant('p1', 'Alpha')}
        participant2={participant('p2', 'Beta')}
      />
    );
    const rows = container.querySelectorAll(
      'div.flex.items-center.justify-between'
    );
    expect(rows[2].className).toContain('text-primary');
    expect(rows[1].className).not.toContain('text-primary');
  });
});

describe('TournamentList', () => {
  it('shows a spinner while loading', () => {
    render(<TournamentList loading tournaments={[]} participantCounts={{}} />);
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('shows the empty state when there are no tournaments', () => {
    render(
      <TournamentList loading={false} tournaments={[]} participantCounts={{}} />
    );
    expect(screen.getByText('No tournaments yet')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Create Tournament' })
    ).toBeInTheDocument();
  });
});

describe('BracketView', () => {
  const matches = [
    {
      id: 'm1',
      tournamentId: 't1',
      round: 1,
      status: 'completed' as const,
      participant1Id: 'p1',
      participant2Id: 'p2',
      participant1Score: 2,
      participant2Score: 0,
      winnerId: 'p1',
      scheduledAt: 0,
    },
  ];

  it('renders elimination brackets with rounds', () => {
    render(<BracketView matches={matches} format="single-elimination" />);
    expect(screen.getByText('Round 1')).toBeInTheDocument();
  });

  it('renders list brackets for round robin', () => {
    render(<BracketView matches={matches} format="round-robin" />);
    expect(screen.getByText('Round 1')).toBeInTheDocument();
  });

  it('splits group stage into group and knockout phases', () => {
    render(
      <BracketView
        matches={[
          ...matches,
          { ...matches[0], id: 'm2', bracket: 'final' as const, round: 2 },
        ]}
        format="group-stage"
      />
    );
    expect(screen.getByText('Group Phase')).toBeInTheDocument();
    expect(screen.getByText('Knockout Bracket')).toBeInTheDocument();
    expect(screen.getByText('Round 2')).toBeInTheDocument();
  });

  it('calls onMatchClick when provided', () => {
    const onMatchClick = jest.fn();
    render(
      <BracketView
        matches={matches}
        format="single-elimination"
        onMatchClick={onMatchClick}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onMatchClick).toHaveBeenCalledWith('m1');
  });

  it('groups matches without a round under round zero', () => {
    const { round: _round, ...noRound } = matches[0];
    render(
      <BracketView
        matches={[noRound as unknown as (typeof matches)[0]]}
        format="group-stage"
      />
    );
    expect(screen.getByText('Round 0')).toBeInTheDocument();
    expect(screen.getByText('Group Phase')).toBeInTheDocument();
  });
});
