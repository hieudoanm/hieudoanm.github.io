jest.mock('@/lib/db', () => ({
  db: {
    getAllTournaments: jest.fn(),
    getParticipants: jest.fn(),
    getMatches: jest.fn(),
    getGroups: jest.fn(),
    createTournament: jest.fn(),
    updateTournament: jest.fn(),
    deleteTournament: jest.fn(),
    createParticipant: jest.fn(),
    createParticipants: jest.fn(),
    updateParticipant: jest.fn(),
    deleteParticipant: jest.fn(),
    createMatch: jest.fn(),
    createMatches: jest.fn(),
    updateMatch: jest.fn(),
    deleteMatch: jest.fn(),
    createGroup: jest.fn(),
    updateGroup: jest.fn(),
    deleteGroup: jest.fn(),
  },
}));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DataProvider } from '@/providers/DataProvider';
import { db } from '@/lib/db';
import { TournamentCard } from '@/components/molecules/TournamentCard';
import { ParticipantList } from '@/components/organisms/ParticipantList';
import type { Tournament, Participant, Match, Group } from '@/types';

const tournament: Tournament = {
  id: 't1',
  name: 'Cup',
  description: 'desc',
  format: 'single-elimination',
  status: 'draft',
  maxParticipants: 8,
  createdAt: 1,
  updatedAt: 1,
};

const participant = (id: string): Participant => ({
  id,
  tournamentId: 't1',
  name: `Player ${id}`,
  seed: 1,
});

const match = (id: string): Match => ({
  id,
  tournamentId: 't1',
  round: 1,
  participant1Id: 'p1',
  participant2Id: 'p2',
  participant1Score: null,
  participant2Score: null,
  winnerId: null,
  status: 'scheduled',
});

const group = (id: string): Group => ({
  id,
  tournamentId: 't1',
  name: 'Group A',
  participantIds: ['p1'],
});

const seed = (overrides: { p?: unknown; m?: unknown; g?: unknown } = {}) => {
  (db.getAllTournaments as jest.Mock).mockResolvedValue([tournament]);
  (db.getParticipants as jest.Mock).mockResolvedValue(
    overrides.p ?? [participant('p1')]
  );
  (db.getMatches as jest.Mock).mockResolvedValue(overrides.m ?? [match('m1')]);
  (db.getGroups as jest.Mock).mockResolvedValue(overrides.g ?? [group('g1')]);
};

describe('ParticipantList', () => {
  it('renders participants with seeds and remove buttons', () => {
    const onRemove = jest.fn();
    render(
      <ParticipantList
        participants={[
          participant('p1'),
          { ...participant('p2'), seed: undefined },
        ]}
        onRemove={onRemove}
      />
    );
    expect(screen.getByText('Player p1')).toBeInTheDocument();
    expect(screen.getByText('Seed 1')).toBeInTheDocument();
    expect(screen.getByText('Player p2')).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('Remove')[0]);
    expect(onRemove).toHaveBeenCalledWith('p1');
  });

  it('adds a participant by name', () => {
    const onAdd = jest.fn();
    render(<ParticipantList participants={[]} onAdd={onAdd} />);
    fireEvent.change(screen.getByPlaceholderText('Participant name'), {
      target: { value: 'New Player' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAdd).toHaveBeenCalledWith('New Player');
  });

  it('does not add empty names', () => {
    const onAdd = jest.fn();
    render(<ParticipantList participants={[]} onAdd={onAdd} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('shows the empty message when no participants', () => {
    render(<ParticipantList participants={[]} />);
    expect(screen.getByText('No participants yet')).toBeInTheDocument();
  });

  it('batch adds names from the textarea', () => {
    const onBatchAdd = jest.fn();
    render(<ParticipantList participants={[]} onBatchAdd={onBatchAdd} />);
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.change(screen.getByPlaceholderText('One name per line'), {
      target: { value: 'A\n\nB  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add All' }));
    expect(onBatchAdd).toHaveBeenCalledWith(['A', 'B']);
  });

  it('skips batch add when the textarea is empty', () => {
    const onBatchAdd = jest.fn();
    render(<ParticipantList participants={[]} onBatchAdd={onBatchAdd} />);
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Add All' }));
    expect(onBatchAdd).not.toHaveBeenCalled();
  });
});

describe('TournamentCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    seed();
  });

  it('renders name, counts, and badges', async () => {
    render(
      <DataProvider>
        <TournamentCard tournament={tournament} participantCount={2} />
      </DataProvider>
    );
    expect(screen.getByText('Cup')).toBeInTheDocument();
    expect(screen.getByText('2/8')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText('Single Elimination')).toBeInTheDocument()
    );
  });

  it('clones a tournament with its participants, matches, and groups', async () => {
    const copy = { ...tournament, id: 't2', name: 'Cup (Copy)' };
    (db.createTournament as jest.Mock).mockResolvedValue(copy);
    (db.createParticipants as jest.Mock).mockResolvedValue([
      { ...participant('p1'), id: 'np1' },
    ]);
    (db.createMatches as jest.Mock).mockResolvedValue([]);
    (db.createGroup as jest.Mock).mockResolvedValue({});

    render(
      <DataProvider>
        <TournamentCard tournament={tournament} participantCount={2} />
      </DataProvider>
    );

    await waitFor(() =>
      expect(screen.getByText('Single Elimination')).toBeInTheDocument()
    );
    fireEvent.contextMenu(screen.getByText('Cup'), {
      clientX: 10,
      clientY: 10,
    });
    fireEvent.click(screen.getByText('Clone'));

    await waitFor(() =>
      expect(db.createTournament).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Cup (Copy)', status: 'draft' })
      )
    );
    expect(db.createParticipants).toHaveBeenCalled();
    expect(db.createMatches).toHaveBeenCalled();
    expect(db.createGroup).toHaveBeenCalled();
  });

  it('deletes a tournament after confirmation', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    render(
      <DataProvider>
        <TournamentCard tournament={tournament} participantCount={2} />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByText('Single Elimination')).toBeInTheDocument()
    );
    fireEvent.contextMenu(screen.getByText('Cup'), {
      clientX: 10,
      clientY: 10,
    });
    fireEvent.click(screen.getByText('Delete'));
    expect(db.deleteTournament).toHaveBeenCalledWith('t1');
  });

  it('keeps the tournament when delete is cancelled', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    render(
      <DataProvider>
        <TournamentCard tournament={tournament} participantCount={2} />
      </DataProvider>
    );
    await waitFor(() =>
      expect(screen.getByText('Single Elimination')).toBeInTheDocument()
    );
    fireEvent.contextMenu(screen.getByText('Cup'), {
      clientX: 10,
      clientY: 10,
    });
    fireEvent.click(screen.getByText('Delete'));
    expect(db.deleteTournament).not.toHaveBeenCalled();
  });
});
