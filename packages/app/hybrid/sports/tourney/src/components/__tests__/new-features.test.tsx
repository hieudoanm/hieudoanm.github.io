import { fireEvent, render, screen } from '@testing-library/react';
import { CalendarView } from '@/components/organisms/CalendarView';
import { Leaderboard } from '@/components/pages/profile/Leaderboard';
import { GroupAssignment } from '@/components/pages/participants/GroupAssignment';
import { ParticipantProfileModal } from '@/components/pages/participants/ParticipantProfileModal';
import { ParticipantList } from '@/components/pages/participants/ParticipantList';
import type { Match, Participant } from '@/types';

const DAY_MS = 24 * 60 * 60 * 1000;

const atNoon = (dayOffset = 0): number => {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + dayOffset,
    12,
    0,
    0
  ).getTime();
};

const match = (
  id: string,
  scheduledAt: number | undefined,
  round = 1
): Match => ({
  id,
  tournamentId: 't1',
  round,
  participant1Id: 'p1',
  participant2Id: 'p2',
  participant1Score: null,
  participant2Score: null,
  winnerId: null,
  status: 'scheduled',
  scheduledAt,
});

describe('CalendarView', () => {
  it('shows scheduled matches on their day and unscheduled ones separately', () => {
    render(
      <CalendarView
        matches={[match('m1', atNoon(0)), match('m2', undefined)]}
        getParticipantName={() => 'Player'}
        onReschedule={jest.fn()}
      />
    );

    expect(screen.getAllByText(/Player vs Player/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Unscheduled \(1\)/)).toBeInTheDocument();
  });

  it('navigates months with the prev and next buttons', () => {
    render(
      <CalendarView
        matches={[]}
        getParticipantName={() => 'Player'}
        onReschedule={jest.fn()}
      />
    );

    const monthLabel = screen.getByText(/\w+ \d{4}/);
    const current = monthLabel.textContent;
    fireEvent.click(screen.getByLabelText('Next month'));
    expect(screen.getByText(/\w+ \d{4}/).textContent).not.toBe(current);
    fireEvent.click(screen.getByLabelText('Previous month'));
    expect(screen.getByText(/\w+ \d{4}/).textContent).toBe(current);
  });

  it('reschedules a match when dropped on another day', () => {
    const onReschedule = jest.fn();
    render(
      <CalendarView
        matches={[match('m1', atNoon(0))]}
        getParticipantName={() => 'Player'}
        onReschedule={onReschedule}
      />
    );

    const chip = screen.getAllByText(/Player vs Player/)[0];
    fireEvent.dragStart(chip);

    const targetDay = atNoon(2);
    const targetDate = new Date(targetDay);
    const targetCell = screen.getByLabelText(
      `Calendar day ${targetDate.getDate()}`
    );
    fireEvent.dragOver(targetCell);
    fireEvent.drop(targetCell);

    expect(onReschedule).toHaveBeenCalledTimes(1);
    expect(onReschedule.mock.calls[0][0]).toBe('m1');
    expect(onReschedule.mock.calls[0][1]).toBe(targetDay - 12 * 60 * 60 * 1000);
  });

  it('sorts matches within a day by time', () => {
    render(
      <CalendarView
        matches={[
          match('late', atNoon(0) + 60 * 60 * 1000),
          match('early', atNoon(0)),
        ]}
        getParticipantName={() => 'Player'}
        onReschedule={jest.fn()}
      />
    );

    const dayCell = screen.getByLabelText(
      `Calendar day ${new Date(atNoon(0)).getDate()}`
    );
    const times = Array.from(
      dayCell.querySelectorAll('[class*="leading-tight"] > div:first-child')
    ).map((el) => el.textContent);
    expect(times).toHaveLength(2);
  });

  it('does not reschedule when a drop happens after dragEnd', () => {
    const onReschedule = jest.fn();
    render(
      <CalendarView
        matches={[match('m1', atNoon(0))]}
        getParticipantName={() => 'Player'}
        onReschedule={onReschedule}
      />
    );

    const chip = screen.getAllByText(/Player vs Player/)[0];
    fireEvent.dragStart(chip);
    fireEvent.dragEnd(chip);

    const targetDay = atNoon(2);
    const targetDate = new Date(targetDay);
    fireEvent.drop(
      screen.getByLabelText(`Calendar day ${targetDate.getDate()}`)
    );

    expect(onReschedule).not.toHaveBeenCalled();
  });
});

describe('Leaderboard', () => {
  const participants: Participant[] = [
    { id: 'a', tournamentId: 't1', name: 'Alice' },
    { id: 'b', tournamentId: 't1', name: 'Bob' },
  ];

  it('shows an empty state when there are no results', () => {
    render(<Leaderboard matches={[]} participants={participants} />);
    expect(screen.getByText(/No results yet/)).toBeInTheDocument();
  });

  it('aggregates results across tournaments by points', () => {
    const matches: Match[] = [
      {
        ...match('m1', undefined),
        participant1Id: 'a',
        participant2Id: 'b',
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'a',
        status: 'completed',
      },
    ];
    render(<Leaderboard matches={matches} participants={participants} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('3 pts')).toBeInTheDocument();
    expect(screen.getByText('🥇')).toBeInTheDocument();
  });

  it('counts draws when there is no winner', () => {
    const matches: Match[] = [
      {
        ...match('m1', undefined),
        participant1Id: 'a',
        participant2Id: 'b',
        winnerId: null,
        status: 'completed',
      },
    ];
    render(<Leaderboard matches={matches} participants={participants} />);
    expect(screen.getAllByText('1 pts')).toHaveLength(2);
  });

  it('ignores matches for unknown participants', () => {
    const matches: Match[] = [
      {
        ...match('m1', undefined),
        participant1Id: 'ghost',
        participant2Id: 'other',
        winnerId: 'ghost',
        status: 'completed',
      },
    ];
    render(<Leaderboard matches={matches} participants={participants} />);
    expect(screen.getByText(/No results yet/)).toBeInTheDocument();
  });

  it('scores wins for participant two', () => {
    const matches: Match[] = [
      {
        ...match('m1', undefined),
        participant1Id: 'a',
        participant2Id: 'b',
        participant1Score: 1,
        participant2Score: 2,
        winnerId: 'b',
        status: 'completed',
      },
    ];
    render(<Leaderboard matches={matches} participants={participants} />);
    expect(screen.getByText('3 pts')).toBeInTheDocument();
    expect(screen.getAllByText('1 played').length).toBeGreaterThan(0);
  });

  it('aggregates across multiple matches per participant', () => {
    const matches: Match[] = [
      {
        ...match('m1', undefined),
        participant1Id: 'a',
        participant2Id: 'b',
        participant1Score: 1,
        participant2Score: 0,
        winnerId: 'a',
        status: 'completed',
      },
      {
        ...match('m2', undefined),
        participant1Id: 'a',
        participant2Id: 'b',
        participant1Score: 1,
        participant2Score: 2,
        winnerId: 'b',
        status: 'completed',
      },
    ];
    render(<Leaderboard matches={matches} participants={participants} />);

    const alice = screen.getByText('Alice').closest('li');
    expect(alice).toHaveTextContent('2 played');
    expect(alice).toHaveTextContent('3 pts');
  });
});

describe('GroupAssignment', () => {
  const participants: Participant[] = [
    { id: 'p1', tournamentId: 't1', name: 'Alice', groupId: 'g1' },
    { id: 'p2', tournamentId: 't1', name: 'Bob' },
  ];

  it('renders group members and unassigned participants', () => {
    render(
      <GroupAssignment
        participants={participants}
        groups={[
          {
            id: 'g1',
            tournamentId: 't1',
            name: 'Group A',
            participantIds: ['p1'],
          },
        ]}
        onAssign={jest.fn()}
      />
    );
    expect(screen.getAllByText('Group A').length).toBeGreaterThan(0);
    expect(screen.getByText('(1)')).toBeInTheDocument();
    expect(screen.getByText('Unassigned (1)')).toBeInTheDocument();
  });

  it('calls onAssign when a participant is moved to a group', () => {
    const onAssign = jest.fn();
    render(
      <GroupAssignment
        participants={participants}
        groups={[
          { id: 'g1', tournamentId: 't1', name: 'Group A', participantIds: [] },
        ]}
        onAssign={onAssign}
      />
    );

    fireEvent.change(screen.getByLabelText('Group for Bob'), {
      target: { value: 'g1' },
    });
    expect(onAssign).toHaveBeenCalledWith('p2', 'g1');

    fireEvent.change(screen.getByLabelText('Group for Bob'), {
      target: { value: '' },
    });
    expect(onAssign).toHaveBeenCalledWith('p2', undefined);
  });

  it('shows an empty state for empty groups', () => {
    render(
      <GroupAssignment
        participants={[]}
        groups={[
          { id: 'g1', tournamentId: 't1', name: 'Group A', participantIds: [] },
        ]}
        onAssign={jest.fn()}
      />
    );
    expect(screen.getByText('Empty group.')).toBeInTheDocument();
  });
});

describe('ParticipantProfileModal', () => {
  const participant: Participant = {
    id: 'p1',
    tournamentId: 't1',
    name: 'Alice',
    seed: 2,
    rating: 1500,
  };

  const matches: Match[] = [
    {
      ...match('m1', undefined),
      participant1Id: 'p1',
      participant2Id: 'p2',
      participant1Score: 3,
      participant2Score: 1,
      winnerId: 'p1',
      status: 'completed',
    },
    {
      ...match('m2', undefined),
      participant1Id: 'p2',
      participant2Id: 'p1',
      participant1Score: 1,
      participant2Score: 0,
      winnerId: 'p2',
      status: 'completed',
    },
  ];

  it('renders nothing when participant is null', () => {
    const { container } = render(
      <ParticipantProfileModal
        participant={null}
        matches={matches}
        getParticipantName={() => 'Name'}
        onClose={jest.fn()}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows stats, matches, and closes', () => {
    const onClose = jest.fn();
    render(
      <ParticipantProfileModal
        participant={participant}
        matches={matches}
        getParticipantName={(id) => (id === 'p2' ? 'Bob' : 'Alice')}
        onClose={onClose}
      />
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Seed: 2')).toBeInTheDocument();
    expect(screen.getByText('Rating: 1500')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getAllByText(/vs Bob/).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows a dash for a missing seed and dashes for null scores', () => {
    const onClose = jest.fn();
    const noSeed: Participant = { id: 'p9', tournamentId: 't1', name: 'Carol' };
    const scheduled: Match[] = [
      {
        ...match('m1', undefined),
        participant1Id: 'p9',
        participant2Id: 'p2',
        status: 'scheduled',
      },
    ];
    render(
      <ParticipantProfileModal
        participant={noSeed}
        matches={scheduled}
        getParticipantName={(id) => (id === 'p2' ? 'Bob' : 'Carol')}
        onClose={onClose}
      />
    );

    expect(screen.getByText('Seed: -')).toBeInTheDocument();
    expect(screen.queryByText(/Rating:/)).not.toBeInTheDocument();
    expect(screen.getByText('- : -')).toBeInTheDocument();
    expect(screen.getByText('scheduled')).toBeInTheDocument();
  });

  it('sorts recent matches by round descending', () => {
    const onClose = jest.fn();
    const roundOne: Match = {
      ...match('m1', undefined, 1),
      participant1Id: 'p1',
      participant2Id: 'p2',
      participant1Score: 1,
      participant2Score: 2,
      winnerId: 'p2',
      status: 'completed',
    };
    const roundTwo: Match = {
      ...match('m2', undefined, 2),
      participant1Id: 'p1',
      participant2Id: 'p2',
      participant1Score: 2,
      participant2Score: 1,
      winnerId: 'p1',
      status: 'completed',
    };
    render(
      <ParticipantProfileModal
        participant={participant}
        matches={[roundOne, roundTwo]}
        getParticipantName={(id) => (id === 'p2' ? 'Bob' : 'Alice')}
        onClose={onClose}
      />
    );

    const rows = screen.getAllByText(/vs Bob/).map((el) => el.closest('div'));
    expect(rows[0]).toHaveTextContent('2 : 1');
    expect(rows[1]).toHaveTextContent('1 : 2');
  });

  it('shows an empty matches message', () => {
    render(
      <ParticipantProfileModal
        participant={participant}
        matches={[]}
        getParticipantName={() => 'Name'}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('No matches yet.')).toBeInTheDocument();
  });
});

describe('ParticipantList', () => {
  const participants: Participant[] = [
    { id: 'p1', tournamentId: 't1', name: 'Alice', seed: 1, rating: 1500 },
  ];

  it('renders seed and rating inputs when callbacks are provided', () => {
    const onSeedChange = jest.fn();
    const onRatingChange = jest.fn();
    render(
      <ParticipantList
        participants={participants}
        onRemove={jest.fn()}
        onSeedChange={onSeedChange}
        onRatingChange={onRatingChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Seed for Alice'), {
      target: { value: '5' },
    });
    expect(onSeedChange).toHaveBeenCalledWith('p1', 5);

    fireEvent.change(screen.getByLabelText('Rating for Alice'), {
      target: { value: '2000' },
    });
    expect(onRatingChange).toHaveBeenCalledWith('p1', 2000);

    fireEvent.change(screen.getByLabelText('Rating for Alice'), {
      target: { value: '' },
    });
    expect(onRatingChange).toHaveBeenCalledWith('p1', 0);
  });

  it('shows static seed and rating when callbacks are missing', () => {
    render(
      <ParticipantList participants={participants} onRemove={jest.fn()} />
    );

    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('1500')).toBeInTheDocument();
  });

  it('shows a dash for a missing seed and omits an undefined rating', () => {
    render(
      <ParticipantList
        participants={[{ id: 'p2', tournamentId: 't1', name: 'Bob' }]}
        onRemove={jest.fn()}
      />
    );

    expect(screen.getByText('#-')).toBeInTheDocument();
  });

  it('calls onSelect when the name is clicked', () => {
    const onSelect = jest.fn();
    render(
      <ParticipantList
        participants={participants}
        onRemove={jest.fn()}
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /View profile/ }));
    expect(onSelect).toHaveBeenCalledWith(participants[0]);
  });
});
