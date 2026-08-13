import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BracketPage } from '@/components/pages/bracket/BracketPage';
import { MatchDetailPage } from '@/components/pages/match-detail/MatchDetailPage';
import { MatchesPage } from '@/components/pages/matches/MatchesPage';
import { ParticipantsPage } from '@/components/pages/participants/ParticipantsPage';
import { ParticipantsView } from '@/components/pages/tournament/ParticipantsView';
import { TournamentDetailPage } from '@/components/pages/tournament/TournamentDetailPage';
import type { Tournament, Participant, Match, Group } from '@/types';

jest.mock('@/lib/import', () => ({
  importParticipantsFromCSV: jest.fn(),
  readFileAsText: jest.fn(),
}));

import { importParticipantsFromCSV, readFileAsText } from '@/lib/import';

const mockedImportParticipantsFromCSV =
  importParticipantsFromCSV as jest.MockedFunction<
    typeof importParticipantsFromCSV
  >;
const mockedReadFileAsText = readFileAsText as jest.MockedFunction<
  typeof readFileAsText
>;

let mockPathname = '/';
let mockSearchParams: Record<string, string | null> = {};
const mockRouter = { push: jest.fn(), back: jest.fn() };

const tournament = (overrides: Partial<Tournament> = {}): Tournament => ({
  id: 't1',
  name: 'Cup',
  description: '',
  format: 'single-elimination',
  status: 'draft',
  maxParticipants: 8,
  createdAt: 100,
  updatedAt: 100,
  ...overrides,
});

const participant = (id: string, name?: string): Participant => ({
  id,
  tournamentId: 't1',
  name: name ?? `Player ${id}`,
  seed: 1,
});

const match = (overrides: Partial<Match> = {}): Match => ({
  id: 'm1',
  tournamentId: 't1',
  round: 1,
  participant1Id: 'p1',
  participant2Id: 'p2',
  participant1Score: null,
  participant2Score: null,
  winnerId: null,
  status: 'scheduled',
  ...overrides,
});

const mockData = {
  tournaments: [] as Tournament[],
  participants: [] as Participant[],
  matches: [] as Match[],
  groups: [] as Group[],
  loading: false,
  refresh: jest.fn(),
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
};

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockData,
}));

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useSearchParams: () => ({
    get: (key: string) => mockSearchParams[key] ?? null,
  }),
  useRouter: () => mockRouter,
}));

beforeEach(() => {
  mockPathname = '/';
  mockSearchParams = { id: 't1' };
  mockData.tournaments = [tournament()];
  mockData.participants = [
    participant('p1', 'Alpha'),
    participant('p2', 'Beta'),
  ];
  mockData.matches = [];
  mockData.groups = [];
  mockData.loading = false;
  mockRouter.push.mockClear();
  mockRouter.back.mockClear();
  Object.values(mockData).forEach((mock) => {
    if (typeof mock === 'function') (mock as jest.Mock).mockClear();
  });
});

describe('BracketPage', () => {
  it('shows the not-found message without a tournament', () => {
    mockSearchParams = { id: 'nope' };
    mockData.tournaments = [];
    render(<BracketPage />);
    expect(screen.getByText('Tournament not found')).toBeInTheDocument();
  });

  it('renders an elimination bracket with round labels and winners', () => {
    mockData.tournaments = [tournament({ status: 'completed' })];
    mockData.matches = [
      match({
        id: 'm1',
        round: 1,
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'p1',
        status: 'completed',
      }),
      match({
        id: 'm2',
        round: 2,
        participant1Score: 1,
        participant2Score: 3,
        winnerId: 'p2',
        status: 'completed',
      }),
      match({
        id: 'm3',
        round: 1,
        participant1Id: 'p2',
        participant2Id: null,
        participant1Score: 0,
        participant2Score: 0,
        winnerId: null,
      }),
      match({
        id: 'm4',
        round: 1,
        participant1Id: 'ghost',
        participant2Id: 'p1',
        participant1Score: 0,
        participant2Score: 0,
        winnerId: null,
      }),
    ];
    render(<BracketPage />);
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('Final')).toBeInTheDocument();
    expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0);
    expect(screen.getByText('BYE')).toBeInTheDocument();
    expect(screen.getByText('TBD')).toBeInTheDocument();
  });

  it('renders a group-stage bracket', () => {
    mockData.tournaments = [tournament({ format: 'group-stage' })];
    mockData.matches = [
      match({ participant1Score: 2, participant2Score: 1, winnerId: 'p1' }),
    ];
    render(<BracketPage />);
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('labels a semi-final round', () => {
    mockData.matches = [
      match({ id: 'm1', round: 1 }),
      match({ id: 'm2', round: 2 }),
      match({ id: 'm3', round: 3 }),
    ];
    render(<BracketPage />);
    expect(screen.getByText('Semi-Final')).toBeInTheDocument();
    expect(screen.getByText('Final')).toBeInTheDocument();
  });
});

describe('MatchDetailPage', () => {
  it('shows the not-found message without a match', () => {
    mockSearchParams = { id: 'nope' };
    render(<MatchDetailPage />);
    expect(screen.getByText('Match not found')).toBeInTheDocument();
  });

  it('renders participants, saves scores, and sets a winner', async () => {
    mockSearchParams = { id: 'm1' };
    mockData.matches = [
      match({ participant1Score: 0, participant2Score: 0, winnerId: null }),
    ];
    render(<MatchDetailPage />);
    expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Beta').length).toBeGreaterThan(0);

    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '3' } });
    fireEvent.change(inputs[1], { target: { value: '1' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() =>
      expect(mockData.updateMatch).toHaveBeenCalledWith(
        expect.objectContaining({
          participant1Score: 3,
          participant2Score: 1,
          status: 'completed',
        })
      )
    );

    fireEvent.click(screen.getByRole('button', { name: 'Alpha' }));
    await waitFor(() =>
      expect(mockData.updateMatch).toHaveBeenCalledWith(
        expect.objectContaining({ winnerId: 'p1', status: 'completed' })
      )
    );
  });

  it('saves a null score when left blank', async () => {
    mockSearchParams = { id: 'm1' };
    mockData.matches = [match()];
    render(<MatchDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() =>
      expect(mockData.updateMatch).toHaveBeenCalledWith(
        expect.objectContaining({
          participant1Score: null,
          participant2Score: null,
        })
      )
    );
  });

  it('hides the winner selector for matches with one participant', () => {
    mockSearchParams = { id: 'm1' };
    mockData.matches = [match({ participant2Id: null })];
    render(<MatchDetailPage />);
    expect(screen.queryByText('Set Winner')).not.toBeInTheDocument();
    expect(screen.getByText('TBD')).toBeInTheDocument();
  });
});

describe('MatchesPage', () => {
  it('shows the not-found message without a tournament', () => {
    mockSearchParams = { id: 'nope' };
    mockData.tournaments = [];
    render(<MatchesPage />);
    expect(screen.getByText('Tournament not found')).toBeInTheDocument();
  });

  it('renders matches grouped by round and adds a match', async () => {
    mockData.matches = [
      match({
        id: 'm1',
        participant1Score: 2,
        participant2Score: 1,
        status: 'completed',
      }),
      match({ id: 'm2', round: 2 }),
    ];
    render(<MatchesPage />);
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('Round 2')).toBeInTheDocument();
    expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0);
    expect(screen.getByText('2 : 1')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Add Match' }));
    await waitFor(() =>
      expect(mockData.createMatch).toHaveBeenCalledWith(
        expect.objectContaining({
          tournamentId: 't1',
          round: 3,
          status: 'scheduled',
        })
      )
    );
  });

  it('shows the empty state when there are no matches', () => {
    mockData.matches = [];
    render(<MatchesPage />);
    expect(screen.getByText(/No matches yet/)).toBeInTheDocument();
  });

  it('starts a new tournament at round one', async () => {
    mockData.matches = [];
    render(<MatchesPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Add Match' }));
    await waitFor(() =>
      expect(mockData.createMatch).toHaveBeenCalledWith(
        expect.objectContaining({ round: 1 })
      )
    );
  });
});

describe('ParticipantsPage', () => {
  it('shows the not-found message without a tournament', () => {
    mockSearchParams = { id: 'nope' };
    mockData.tournaments = [];
    render(<ParticipantsPage />);
    expect(screen.getByText('Tournament not found')).toBeInTheDocument();
  });

  it('adds, batch adds, and removes participants', async () => {
    mockData.participants = [];
    render(<ParticipantsPage />);
    expect(screen.getByText(/No participants yet/)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Participant name'), {
      target: { value: 'Charlie' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    await waitFor(() =>
      expect(mockData.createParticipant).toHaveBeenCalledWith({
        tournamentId: 't1',
        name: 'Charlie',
        seed: 1,
      })
    );

    fireEvent.click(screen.getByRole('button', { name: 'Batch Add' }));
    fireEvent.change(screen.getByPlaceholderText('One name per line'), {
      target: { value: 'Dave\nEve\n  \nFrank' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add All' }));
    await waitFor(() =>
      expect(mockData.createParticipants).toHaveBeenCalledWith([
        { tournamentId: 't1', name: 'Dave', seed: 1 },
        { tournamentId: 't1', name: 'Eve', seed: 2 },
        { tournamentId: 't1', name: 'Frank', seed: 3 },
      ])
    );

    mockData.participants = [participant('p1', 'Alpha')];
    render(<ParticipantsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    await waitFor(() =>
      expect(mockData.deleteParticipant).toHaveBeenCalledWith('p1')
    );
  });

  it('disables the add button when the participant limit is reached', () => {
    mockData.tournaments = [tournament({ maxParticipants: 1 })];
    mockData.participants = [participant('p1', 'Alpha')];
    render(<ParticipantsPage />);
    fireEvent.change(screen.getByPlaceholderText('Participant name'), {
      target: { value: 'Beta' },
    });
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  it('auto-seeds participants by rating descending', async () => {
    mockData.participants = [
      { ...participant('p1', 'Alpha'), rating: 1500 },
      { ...participant('p2', 'Beta'), rating: 1200 },
      { ...participant('p3', 'Gamma'), rating: 1800 },
    ];
    render(<ParticipantsPage />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Auto-seed by Rating' })
    );
    await waitFor(() =>
      expect(mockData.updateParticipant).toHaveBeenCalledWith({
        id: 'p3',
        tournamentId: 't1',
        name: 'Gamma',
        seed: 1,
        rating: 1800,
      })
    );
    expect(mockData.updateParticipant).toHaveBeenCalledWith({
      id: 'p1',
      tournamentId: 't1',
      name: 'Alpha',
      seed: 2,
      rating: 1500,
    });
    expect(mockData.updateParticipant).toHaveBeenCalledWith({
      id: 'p2',
      tournamentId: 't1',
      name: 'Beta',
      seed: 3,
      rating: 1200,
    });
  });

  it('randomizes seeds', async () => {
    render(<ParticipantsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Randomize Seeds' }));
    await waitFor(() =>
      expect(mockData.updateParticipant).toHaveBeenCalledTimes(2)
    );
  });

  it('updates a seed from its input', async () => {
    render(<ParticipantsPage />);
    fireEvent.change(screen.getByLabelText('Seed for Alpha'), {
      target: { value: '5' },
    });
    await waitFor(() =>
      expect(mockData.updateParticipant).toHaveBeenCalledWith({
        id: 'p1',
        tournamentId: 't1',
        name: 'Alpha',
        seed: 5,
      })
    );
  });

  it('updates a rating from its input', async () => {
    mockData.participants = [{ ...participant('p1', 'Alpha'), rating: 1500 }];
    render(<ParticipantsPage />);
    fireEvent.change(screen.getByLabelText('Rating for Alpha'), {
      target: { value: '1700' },
    });
    await waitFor(() =>
      expect(mockData.updateParticipant).toHaveBeenCalledWith(
        expect.objectContaining({ rating: 1700 })
      )
    );
  });

  it('assigns a participant to a group', async () => {
    mockData.tournaments = [tournament({ format: 'group-stage' })];
    mockData.groups = [
      { id: 'gA', tournamentId: 't1', name: 'Group A', participantIds: [] },
    ];
    render(<ParticipantsPage />);
    fireEvent.change(screen.getByLabelText('Group for Alpha'), {
      target: { value: 'gA' },
    });
    await waitFor(() =>
      expect(mockData.updateParticipant).toHaveBeenCalledWith({
        id: 'p1',
        tournamentId: 't1',
        name: 'Alpha',
        seed: 1,
        groupId: 'gA',
      })
    );
  });

  it('creates groups and auto-assigns participants', async () => {
    mockData.tournaments = [tournament({ format: 'group-stage' })];
    mockData.createGroup.mockImplementation(async (g: Group) => ({
      ...g,
      id: g.name === 'Group A' ? 'gA' : 'gB',
    }));
    render(<ParticipantsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Auto-assign Groups' }));
    await waitFor(() => expect(mockData.createGroup).toHaveBeenCalledTimes(2));
    expect(mockData.createGroup).toHaveBeenCalledWith({
      tournamentId: 't1',
      name: 'Group A',
      participantIds: [],
    });
    await waitFor(() =>
      expect(mockData.updateParticipant).toHaveBeenCalledWith({
        id: 'p1',
        tournamentId: 't1',
        name: 'Alpha',
        seed: 1,
        groupId: 'gA',
      })
    );
    expect(mockData.updateParticipant).toHaveBeenCalledWith({
      id: 'p2',
      tournamentId: 't1',
      name: 'Beta',
      seed: 1,
      groupId: 'gB',
    });
  });

  it('does not batch add when there are no names', async () => {
    render(<ParticipantsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Batch Add' }));
    fireEvent.change(screen.getByPlaceholderText('One name per line'), {
      target: { value: '   \n\n' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add All' }));
    await waitFor(() =>
      expect(mockData.createParticipants).not.toHaveBeenCalled()
    );
  });

  it('assigns into existing groups without creating new ones', async () => {
    mockData.tournaments = [tournament({ format: 'group-stage' })];
    mockData.groups = [
      { id: 'gA', tournamentId: 't1', name: 'Group A', participantIds: [] },
      { id: 'gB', tournamentId: 't1', name: 'Group B', participantIds: [] },
    ];
    render(<ParticipantsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Auto-assign Groups' }));
    await waitFor(() => expect(mockData.createGroup).not.toHaveBeenCalled());
    expect(mockData.updateParticipant).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'p1', groupId: 'gA' })
    );
    expect(mockData.updateParticipant).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'p2', groupId: 'gB' })
    );
  });

  it('imports participants from a CSV file', async () => {
    mockData.participants = [];
    mockedReadFileAsText.mockResolvedValue('name,seed,rating\n');
    mockedImportParticipantsFromCSV.mockReturnValue([
      { name: 'Ivy', seed: 3, rating: 1000 },
      { name: 'Jay' },
    ]);
    render(<ParticipantsPage />);
    fireEvent.change(screen.getByLabelText('Import participants CSV'), {
      target: { files: [new File([''], 'p.csv', { type: 'text/csv' })] },
    });
    await waitFor(() =>
      expect(mockData.createParticipants).toHaveBeenCalledWith([
        { tournamentId: 't1', name: 'Ivy', seed: 3, rating: 1000 },
        { tournamentId: 't1', name: 'Jay', seed: 2, rating: undefined },
      ])
    );
  });

  it('does not import an empty CSV', async () => {
    mockedReadFileAsText.mockResolvedValue('');
    mockedImportParticipantsFromCSV.mockReturnValue([]);
    render(<ParticipantsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Import CSV' }));
    fireEvent.change(screen.getByLabelText('Import participants CSV'), {
      target: { files: [new File([''], 'p.csv', { type: 'text/csv' })] },
    });
    await waitFor(() =>
      expect(mockData.createParticipants).not.toHaveBeenCalled()
    );
  });

  it('cancels the batch add form', async () => {
    render(<ParticipantsPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Batch Add' }));
    fireEvent.change(screen.getByPlaceholderText('One name per line'), {
      target: { value: 'Dave' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(
      screen.queryByPlaceholderText('One name per line')
    ).not.toBeInTheDocument();
  });

  it('updates the number of groups for auto-assignment', async () => {
    mockData.tournaments = [tournament({ format: 'group-stage' })];
    mockData.createGroup.mockImplementation(async (g: Group) => ({
      ...g,
      id: `g-${g.name}`,
    }));
    render(<ParticipantsPage />);
    fireEvent.change(screen.getByLabelText('Number of groups'), {
      target: { value: '3' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Auto-assign Groups' }));
    await waitFor(() => expect(mockData.createGroup).toHaveBeenCalledTimes(3));
  });

  it('opens a profile modal with stats and recent matches', () => {
    mockData.matches = [
      match({
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'p1',
        status: 'completed',
      }),
    ];
    render(<ParticipantsPage />);
    fireEvent.click(
      screen.getByRole('button', { name: 'View profile for Alpha' })
    );
    expect(screen.getByText('Seed: 1')).toBeInTheDocument();
    expect(screen.getByText('Played')).toBeInTheDocument();
    expect(screen.getByText('Won')).toBeInTheDocument();
    expect(screen.getByText('vs Beta')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Played')).not.toBeInTheDocument();
  });
});

describe('TournamentDetailPage', () => {
  it('shows the not-found message without an id', () => {
    mockSearchParams = {};
    render(<TournamentDetailPage />);
    expect(screen.getByText('No tournament selected')).toBeInTheDocument();
  });

  it('shows a loading state when the tournament is missing', () => {
    mockSearchParams = { id: 'nope' };
    mockData.tournaments = [];
    render(<TournamentDetailPage />);
    expect(document.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('renders every tab and switches between them', () => {
    mockData.tournaments = [
      tournament({
        status: 'in-progress',
        description: 'A tournament',
        startDate: 200,
      }),
    ];
    mockData.participants = [
      participant('p1', 'Alpha'),
      participant('p2', 'Beta'),
    ];
    mockData.matches = [
      match({
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'p1',
        status: 'completed',
      }),
      match({
        id: 'm2',
        round: 2,
        participant1Score: 1,
        participant2Score: 2,
        winnerId: 'p2',
        status: 'completed',
      }),
    ];
    render(<TournamentDetailPage />);

    expect(screen.getByText('A tournament')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Start Date')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Bracket' }));
    expect(screen.getByText('Final')).toBeInTheDocument();
    expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: 'Standings' }));
    expect(screen.getByText('🥇')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Matches' }));
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole('button', { name: 'Participants' }));
    expect(screen.getByPlaceholderText('Participant name')).toBeInTheDocument();
    expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0);
  });

  it('starts a draft tournament from the overview', async () => {
    mockData.participants = [
      participant('p1', 'Alpha'),
      participant('p2', 'Beta'),
    ];
    render(<TournamentDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Start Tournament' }));

    await waitFor(() => expect(mockData.createMatches).toHaveBeenCalled());
    await waitFor(() =>
      expect(mockData.updateTournament).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'in-progress' })
      )
    );
  });

  it('shows a hint when a draft has too few participants', () => {
    mockData.participants = [participant('p1', 'Alpha')];
    render(<TournamentDetailPage />);
    expect(
      screen.getByText('Add at least 2 participants to start')
    ).toBeInTheDocument();
  });

  it('deletes a tournament after confirmation', async () => {
    render(<TournamentDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete Tournament' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete', hidden: true })
    );
    await waitFor(() =>
      expect(mockData.deleteTournament).toHaveBeenCalledWith('t1')
    );
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('renders standings with medal positions', () => {
    mockData.tournaments = [tournament({ status: 'completed' })];
    mockData.participants = [
      participant('p1', 'Alpha'),
      participant('p2', 'Beta'),
      participant('p3', 'Gamma'),
    ];
    mockData.matches = [
      match({
        id: 'm1',
        participant1Score: 3,
        participant2Score: 1,
        winnerId: 'p1',
        status: 'completed',
      }),
      match({
        id: 'm2',
        participant1Id: 'p2',
        participant2Id: 'p3',
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'p2',
        status: 'completed',
      }),
      match({
        id: 'm3',
        participant1Id: 'p1',
        participant2Id: 'p3',
        participant1Score: 2,
        participant2Score: 0,
        winnerId: 'p1',
        status: 'completed',
      }),
    ];
    render(<TournamentDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Standings' }));
    expect(screen.getByText('🥇')).toBeInTheDocument();
    expect(screen.getByText('🥈')).toBeInTheDocument();
    expect(screen.getByText('🥉')).toBeInTheDocument();
    expect(screen.queryByText('#4')).not.toBeInTheDocument();
  });

  it('renders a round-robin bracket with fallbacks', () => {
    mockData.tournaments = [tournament({ format: 'round-robin' })];
    mockData.matches = [
      match({
        id: 'm1',
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'p1',
        status: 'completed',
      }),
      match({ id: 'm2', round: 2, participant2Id: 'ghost' }),
    ];
    render(<TournamentDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Bracket' }));
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('Round 2')).toBeInTheDocument();
    expect(screen.getByText('TBD')).toBeInTheDocument();
    expect(screen.getByText(/^-\s*:\s*-$/)).toBeInTheDocument();
  });

  it('renders a double-elimination bracket', () => {
    mockData.tournaments = [tournament({ format: 'double-elimination' })];
    mockData.matches = [
      match({
        id: 'm1',
        round: 1,
        bracket: 'winners',
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'p1',
        status: 'completed',
      }),
      match({
        id: 'm2',
        round: 1,
        bracket: 'losers',
        participant1Score: 0,
        participant2Score: 2,
        winnerId: 'p2',
        status: 'completed',
      }),
      match({
        id: 'm3',
        round: 2,
        bracket: 'final',
        participant1Score: 3,
        participant2Score: 3,
        winnerId: null,
        status: 'completed',
      }),
      match({ id: 'm4', round: 2, bracket: 'winners', participant2Id: null }),
    ];
    render(<TournamentDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Bracket' }));
    expect(screen.getByText('Winners Bracket')).toBeInTheDocument();
    expect(screen.getByText('Losers Bracket')).toBeInTheDocument();
    expect(screen.getByText('Grand Final')).toBeInTheDocument();
    expect(screen.getByText('BYE')).toBeInTheDocument();
  });

  it('labels a single-round bracket as Round 1', () => {
    mockData.matches = [
      match({
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'p1',
        status: 'completed',
      }),
    ];
    render(<TournamentDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Bracket' }));
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.queryByText('Final')).not.toBeInTheDocument();
  });

  it('renders matches with fallbacks and an add link', () => {
    mockData.matches = [match({ id: 'm1', participant2Id: null })];
    render(<TournamentDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Matches' }));
    expect(screen.getByText('Round 1')).toBeInTheDocument();
    expect(screen.getByText('TBD')).toBeInTheDocument();
    expect(screen.getByText(/^-\s*:\s*-$/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Add Match' })).toHaveAttribute(
      'href',
      '/participants?tournamentId=t1'
    );
  });

  it('adds, batch adds, and removes participants from the tab', async () => {
    mockData.participants = [
      { ...participant('p1', 'Alpha'), rating: 1500 },
      participant('p2', 'Beta'),
    ];
    render(<TournamentDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Participants' }));
    expect(screen.getByText('1500')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Participant name'), {
      target: { value: 'Charlie' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    await waitFor(() =>
      expect(mockData.createParticipant).toHaveBeenCalledWith({
        tournamentId: 't1',
        name: 'Charlie',
        seed: 3,
      })
    );

    fireEvent.click(screen.getByRole('button', { name: 'Batch Add' }));
    fireEvent.change(screen.getByPlaceholderText('One name per line'), {
      target: { value: 'Dave\nEve' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add All' }));
    await waitFor(() =>
      expect(mockData.createParticipants).toHaveBeenCalledWith([
        { tournamentId: 't1', name: 'Dave', seed: 3 },
        { tournamentId: 't1', name: 'Eve', seed: 4 },
      ])
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    await waitFor(() =>
      expect(mockData.deleteParticipant).toHaveBeenCalledWith('p1')
    );
  });

  it('shows the empty participants state', () => {
    mockData.participants = [];
    render(<TournamentDetailPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Participants' }));
    expect(screen.getByText(/No participants yet/)).toBeInTheDocument();
  });
});

describe('ParticipantsView', () => {
  it('adds a participant when pressing Enter', async () => {
    render(
      <ParticipantsView
        tournament={mockData.tournaments[0]}
        participants={mockData.participants}
      />
    );
    fireEvent.change(screen.getByPlaceholderText('Participant name'), {
      target: { value: 'Charlie' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText('Participant name'), {
      key: 'Enter',
    });
    await waitFor(() =>
      expect(mockData.createParticipant).toHaveBeenCalledWith({
        tournamentId: 't1',
        name: 'Charlie',
        seed: 3,
      })
    );
  });

  it('imports participants from a CSV file', async () => {
    mockedReadFileAsText.mockResolvedValue('name,seed\n');
    mockedImportParticipantsFromCSV.mockReturnValue([
      { name: 'Ivy', seed: 7, rating: 1000 },
    ]);
    render(
      <ParticipantsView
        tournament={mockData.tournaments[0]}
        participants={mockData.participants}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Import CSV' }));
    fireEvent.change(screen.getByLabelText('Import participants CSV'), {
      target: { files: [new File([''], 'p.csv', { type: 'text/csv' })] },
    });
    await waitFor(() =>
      expect(mockData.createParticipants).toHaveBeenCalledWith([
        {
          tournamentId: 't1',
          name: 'Ivy',
          seed: 7,
          rating: 1000,
        },
      ])
    );
  });

  it('does nothing when a CSV file change has no file', async () => {
    render(
      <ParticipantsView
        tournament={mockData.tournaments[0]}
        participants={mockData.participants}
      />
    );
    fireEvent.change(screen.getByLabelText('Import participants CSV'), {
      target: { files: [] },
    });
    await waitFor(() =>
      expect(mockData.createParticipants).not.toHaveBeenCalled()
    );
  });
});
