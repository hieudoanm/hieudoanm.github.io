import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { CreatePage } from '@/components/pages/create/CreatePage';
import { ProfilePage } from '@/components/pages/profile/ProfilePage';
import { SettingsPage } from '@/components/pages/settings/SettingsPage';
import { AboutPage } from '@/components/pages/AboutPage';
import { VersionPage } from '@/components/pages/VersionPage';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import RootLayout from '@/app/layout';
import ErrorPage from '@/app/error';
import NotFoundPage from '@/app/not-found';
import DashboardRoute from '@/app/(dashboard)/page';
import AboutRoute from '@/app/(info)/about/page';
import VersionRoute from '@/app/(info)/version/page';
import BracketRoute from '@/app/(tournament)/bracket/page';
import CreateRoute from '@/app/(tournament)/create/page';
import MatchRoute from '@/app/(tournament)/match/page';
import MatchesRoute from '@/app/(tournament)/matches/page';
import ParticipantsRoute from '@/app/(tournament)/participants/page';
import StandingsRoute from '@/app/(tournament)/standings/page';
import TournamentRoute from '@/app/(tournament)/tournament/page';
import ProfileRoute from '@/app/(user)/profile/page';
import SettingsRoute from '@/app/(user)/settings/page';
import type { Tournament, Participant, Match, Group } from '@/types';

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
  snapshots: [] as import('@/types').StandingSnapshot[],
  createSnapshot: jest.fn(),
  deleteSnapshot: jest.fn(),
  cloneTournament: jest.fn(),
};

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockData,
  DataProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useSearchParams: () => ({
    get: (key: string) => mockSearchParams[key] ?? null,
  }),
  useRouter: () => mockRouter,
}));

describe('CreatePage', () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
    mockRouter.back.mockClear();
    mockData.createTournament.mockClear();
  });

  it('creates a tournament with the selected options', async () => {
    const { container } = render(<CreatePage />);
    fireEvent.change(screen.getByPlaceholderText('Tournament name'), {
      target: { value: 'Summer Cup' },
    });
    fireEvent.change(screen.getByPlaceholderText('Optional description'), {
      target: { value: 'Big event' },
    });
    fireEvent.click(screen.getByText('Double Elimination'));
    fireEvent.click(screen.getByRole('button', { name: '32' }));
    const dateInput = container.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;
    fireEvent.change(dateInput, {
      target: { value: '2025-06-01' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() =>
      expect(mockData.createTournament).toHaveBeenCalledWith({
        name: 'Summer Cup',
        description: 'Big event',
        format: 'double-elimination',
        status: 'draft',
        maxParticipants: 32,
        startDate: new Date('2025-06-01').getTime(),
      })
    );
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('creates a tournament without a start date', async () => {
    render(<CreatePage />);
    fireEvent.change(screen.getByPlaceholderText('Tournament name'), {
      target: { value: 'Quick Cup' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() =>
      expect(mockData.createTournament).toHaveBeenCalledWith(
        expect.objectContaining({ startDate: undefined })
      )
    );
  });

  it('disables the submit button when the name is blank', () => {
    render(<CreatePage />);
    expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
  });

  it('goes back when cancelled', () => {
    render(<CreatePage />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockRouter.back).toHaveBeenCalled();
  });
});

describe('ProfilePage', () => {
  beforeEach(() => {
    mockData.tournaments = [
      tournament({ id: 't1', name: 'Draft Cup', status: 'draft' }),
      tournament({
        id: 't2',
        name: 'Done Cup',
        status: 'completed',
        createdAt: 200,
        updatedAt: 300,
      }),
    ];
    mockData.participants = [
      participant('p1', 'Alpha'),
      participant('p2', 'Beta'),
    ];
    mockData.matches = [
      {
        id: 'm1',
        tournamentId: 't1',
        round: 1,
        participant1Id: 'p1',
        participant2Id: 'p2',
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'p1',
        status: 'completed',
      },
    ];
  });

  it('renders stats and recent activity', () => {
    render(<ProfilePage />);
    expect(screen.getAllByText('2')).toHaveLength(1);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('"Done Cup" completed')).toBeInTheDocument();
    expect(screen.getByText('Created "Done Cup"')).toBeInTheDocument();
    expect(screen.getByText('Alpha won vs Beta')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute(
      'href',
      '/settings'
    );
    expect(screen.getByRole('link', { name: 'Version' })).toHaveAttribute(
      'href',
      '/version'
    );
  });

  it('shows a dash win rate and empty activity without completed matches', () => {
    mockData.matches = [];
    mockData.tournaments = [];
    render(<ProfilePage />);
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('No activity yet')).toBeInTheDocument();
  });
});

describe('SettingsPage', () => {
  it('renders all sections and updates selections', () => {
    render(<SettingsPage />);
    expect(screen.getAllByText('Language')).toHaveLength(2);
    expect(screen.getByText('Appearance')).toBeInTheDocument();
    expect(screen.getByText('Date & Time')).toBeInTheDocument();
    expect(screen.getByText('Tournament Defaults')).toBeInTheDocument();
    expect(screen.getByText('Auto-save')).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue('English'), {
      target: { value: 'vi' },
    });
    fireEvent.change(screen.getByDisplayValue('Nothing'), {
      target: { value: 'night' },
    });
    fireEvent.change(screen.getByDisplayValue('24-hour'), {
      target: { value: '12h' },
    });
    fireEvent.change(screen.getByDisplayValue('Single Elimination'), {
      target: { value: 'league' },
    });
    fireEvent.change(screen.getByDisplayValue('16'), {
      target: { value: '64' },
    });
    fireEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByDisplayValue('Tieng Viet')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Night')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12-hour (AM/PM)')).toBeInTheDocument();
    expect(screen.getByDisplayValue('League')).toBeInTheDocument();
    expect(screen.getByDisplayValue('64')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});

describe('AboutPage and VersionPage', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  it('renders the about page', () => {
    render(<AboutPage />);
    expect(screen.getByText('Tourney')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders the version page with segments and copies on click', async () => {
    render(<VersionPage />);
    expect(await screen.findByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    expect(await screen.findByText('Copied')).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});

describe('ErrorTemplate and app error routes', () => {
  it('renders the error template with optional parts', () => {
    const { rerender } = render(
      <ErrorTemplate
        code="500"
        description="Boom"
        action={<button>Retry</button>}
      />
    );
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Boom')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();

    rerender(<ErrorTemplate code="404" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.queryByText('Boom')).not.toBeInTheDocument();
  });

  it('renders the app error page and resets', () => {
    const reset = jest.fn();
    render(<ErrorPage error={new Error('kaboom')} reset={reset} />);
    expect(screen.getByText('kaboom')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalled();
  });

  it('renders the not-found page', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});

describe('App routes', () => {
  beforeEach(() => {
    mockPathname = '/';
    mockSearchParams = { id: 't1' };
    mockData.tournaments = [tournament({ status: 'in-progress' })];
    mockData.participants = [
      participant('p1', 'Alpha'),
      participant('p2', 'Beta'),
    ];
    mockData.matches = [
      {
        id: 'm1',
        tournamentId: 't1',
        round: 1,
        participant1Id: 'p1',
        participant2Id: 'p2',
        participant1Score: 2,
        participant2Score: 1,
        winnerId: 'p1',
        status: 'completed',
      },
    ];
  });

  it('renders the root layout', () => {
    render(
      <RootLayout>
        <span>child</span>
      </RootLayout>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('renders the dashboard route', () => {
    render(<DashboardRoute />);
    expect(screen.getByText('Cup')).toBeInTheDocument();
  });

  it('renders the settings route', () => {
    render(<SettingsRoute />);
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('renders the profile route', () => {
    render(<ProfileRoute />);
    expect(screen.getByText('Win Rate')).toBeInTheDocument();
  });

  it('renders the about route', () => {
    render(<AboutRoute />);
    expect(screen.getByText('Tourney')).toBeInTheDocument();
  });

  it('renders the version route', async () => {
    render(<VersionRoute />);
    expect(await screen.findByText('Year')).toBeInTheDocument();
  });

  it('renders the create route', () => {
    render(<CreateRoute />);
    expect(screen.getByText('Single Elimination')).toBeInTheDocument();
  });

  it('renders the bracket route', () => {
    render(<BracketRoute />);
    expect(screen.getByText('Round 1')).toBeInTheDocument();
  });

  it('renders the tournament route', () => {
    render(<TournamentRoute />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders the matches route', () => {
    render(<MatchesRoute />);
    expect(screen.getByText('Round 1')).toBeInTheDocument();
  });

  it('renders the participants route', () => {
    render(<ParticipantsRoute />);
    expect(screen.getByPlaceholderText('Participant name')).toBeInTheDocument();
  });

  it('renders the match route', () => {
    mockSearchParams = { id: 'm1' };
    render(<MatchRoute />);
    expect(screen.getByText('Match Detail')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders the standings route', () => {
    render(<StandingsRoute />);
    expect(screen.getByText('🥇')).toBeInTheDocument();
  });
});
