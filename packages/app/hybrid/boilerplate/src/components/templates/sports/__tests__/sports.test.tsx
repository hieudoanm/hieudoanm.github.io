import { fireEvent, render, screen, within } from '@testing-library/react';
import { LiveScoresTemplate } from '../LiveScoresTemplate';
import { MatchDetailTemplate } from '../MatchDetailTemplate';
import { TeamRosterTemplate } from '../TeamRosterTemplate';
import { SeasonStandingsTemplate } from '../SeasonStandingsTemplate';
import { FixturesTemplate } from '../FixturesTemplate';
import { PlayerStatsTemplate } from '../PlayerStatsTemplate';
import { SportsNewsTemplate } from '../SportsNewsTemplate';
import { FavoriteTeamsTemplate } from '../FavoriteTeamsTemplate';
import ScoresPage from '@/app/(templates)/sports/scores/page';
import MatchPage from '@/app/(templates)/sports/match/page';
import RosterPage from '@/app/(templates)/sports/roster/page';
import StandingsPage from '@/app/(templates)/sports/standings/page';
import FixturesPage from '@/app/(templates)/sports/fixtures/page';
import StatsPage from '@/app/(templates)/sports/stats/page';
import NewsPage from '@/app/(templates)/sports/news/page';
import FavoritesPage from '@/app/(templates)/sports/favorites/page';

describe('LiveScoresTemplate', () => {
  it('renders matches with scores and live badges', () => {
    render(<LiveScoresTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Live Scores' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 matches live')).toBeInTheDocument();
    expect(screen.getByText('FC Riverside')).toBeInTheDocument();
    expect(screen.getByText('Atlas United')).toBeInTheDocument();
    expect(screen.getByText('2 — 1')).toBeInTheDocument();
    expect(screen.getByText('88 — 84')).toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(4);
  });

  it('filters matches by sport tab', () => {
    render(<LiveScoresTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Football' }));
    expect(screen.getByText('2 matches live')).toBeInTheDocument();
    expect(screen.getByText('Northport City')).toBeInTheDocument();
    expect(screen.queryByText('Lakeside Nets')).not.toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Basketball' }));
    expect(screen.getByText('2 matches live')).toBeInTheDocument();
    expect(screen.getByText('Summit Storm')).toBeInTheDocument();
    expect(screen.queryByText('FC Riverside')).not.toBeInTheDocument();
  });
});

describe('MatchDetailTemplate', () => {
  it('renders match details with venue, date and events', () => {
    render(<MatchDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Match' })).toBeInTheDocument();
    expect(screen.getAllByText('FC Riverside')).toHaveLength(3);
    expect(screen.getAllByText('Atlas United')).toHaveLength(3);
    expect(screen.getByText('2 — 1')).toBeInTheDocument();
    expect(screen.getByText('Riverside Arena')).toBeInTheDocument();
    expect(screen.getByText('Aug 7, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('Goal')).toHaveLength(3);
    expect(screen.getAllByText('Card')).toHaveLength(1);
    expect(screen.getByText('Mateo Silva')).toBeInTheDocument();
  });

  it('toggles the follow match button to Following', () => {
    render(<MatchDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Follow match' }));
    expect(
      screen.getByRole('button', { name: 'Following' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Following')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Following' }));
    expect(
      screen.getByRole('button', { name: 'Follow match' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Following')).not.toBeInTheDocument();
  });
});

describe('TeamRosterTemplate', () => {
  it('renders the roster table with player details', () => {
    render(<TeamRosterTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Team Roster' })
    ).toBeInTheDocument();
    expect(screen.getByText('FC Riverside')).toBeInTheDocument();
    expect(screen.getByText('8 players')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByText('Rafael Cruz')).toBeInTheDocument();
    expect(within(table).getByText('Goalkeeper')).toBeInTheDocument();
    expect(within(table).getAllByText('Defender')).toHaveLength(2);
    expect(within(table).getAllByText('Midfielder')).toHaveLength(2);
    expect(within(table).getAllByText('Forward')).toHaveLength(3);
  });

  it('filters players by position tab', () => {
    render(<TeamRosterTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Defenders' }));
    expect(screen.getByText('2 players')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByText('Omar Haddad')).toBeInTheDocument();
    expect(within(table).queryByText('Rafael Cruz')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Midfielders' }));
    expect(screen.getByText('2 players')).toBeInTheDocument();
    expect(within(table).getByText('Lukas Meyer')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Forwards' }));
    expect(screen.getByText('3 players')).toBeInTheDocument();
    expect(within(table).getAllByText('Forward')).toHaveLength(3);
  });
});

describe('SeasonStandingsTemplate', () => {
  it('renders the standings table with leader badge', () => {
    render(<SeasonStandingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Standings' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 teams')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByText('FC Riverside')).toBeInTheDocument();
    expect(within(table).getByText('34 pts')).toBeInTheDocument();
    expect(within(table).getByText('17 pts')).toBeInTheDocument();
    expect(screen.getAllByText('Leader')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Favorite' })).toHaveLength(6);
  });

  it('favorites a team and updates the badge', () => {
    render(<SeasonStandingsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Favorite' })[0]);
    expect(screen.getAllByText('Favorited')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Favorite' })).toHaveLength(5);
    fireEvent.click(screen.getByRole('button', { name: 'Favorited' }));
    expect(screen.queryAllByText('Favorited')).toHaveLength(0);
    expect(screen.getAllByRole('button', { name: 'Favorite' })).toHaveLength(6);
  });
});

describe('FixturesTemplate', () => {
  it('renders fixtures with dates, times and venues', () => {
    render(<FixturesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Fixtures' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 fixtures')).toBeInTheDocument();
    expect(screen.getByText('FC Riverside')).toBeInTheDocument();
    expect(screen.getAllByText('Granite FC')).toHaveLength(2);
    expect(screen.getByText('Aug 10, 2026')).toBeInTheDocument();
    expect(screen.getByText('Aug 11, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('18:00')).toHaveLength(2);
    expect(screen.getByText('Riverside Arena')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Remind me' })).toHaveLength(
      4
    );
  });

  it('sets a reminder and shows the Reminder set badge', () => {
    render(<FixturesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remind me' })[0]);
    expect(
      screen.getByRole('button', { name: 'Reminder set' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Reminder set')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Remind me' })).toHaveLength(
      3
    );
  });
});

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

describe('SportsNewsTemplate', () => {
  it('renders stories with category badges and times', () => {
    render(<SportsNewsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Sports News' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Riverside sign midfielder in club-record deal')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Transfers')).toHaveLength(2);
    expect(screen.getAllByText('Matchday')).toHaveLength(2);
    expect(screen.getAllByText('Injury')).toHaveLength(1);
    expect(screen.getByText('3h ago')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Read' })).toHaveLength(5);
  });

  it('toggles an inline summary with the Read button', () => {
    render(<SportsNewsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Read' })[0]);
    expect(
      screen.getByText(
        'The midfielder arrives on a three-year contract from Atlas United.'
      )
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Read' })).toHaveLength(4);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText(
        'The midfielder arrives on a three-year contract from Atlas United.'
      )
    ).not.toBeInTheDocument();
  });
});

describe('FavoriteTeamsTemplate', () => {
  it('renders favorite teams with leagues and records', () => {
    render(<FavoriteTeamsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Favorite Teams' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 favorite teams')).toBeInTheDocument();
    expect(screen.getByText('FC Riverside')).toBeInTheDocument();
    expect(screen.getAllByText('Premier Division')).toHaveLength(2);
    expect(screen.getByText('12W 4L 2D')).toBeInTheDocument();
    expect(screen.getByText('11W 4L 3D')).toBeInTheDocument();
  });

  it('removes a team and updates the count', () => {
    render(<FavoriteTeamsTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove FC Riverside' })
    );
    expect(screen.getByText('3 favorite teams')).toBeInTheDocument();
    expect(screen.queryByText('FC Riverside')).not.toBeInTheDocument();
  });

  it('shows an empty state after removing every team', () => {
    render(<FavoriteTeamsTemplate />);
    while (screen.queryAllByRole('button', { name: /^Remove / }).length > 0) {
      screen
        .getAllByRole('button', { name: /^Remove / })
        .forEach((button) => fireEvent.click(button));
    }
    expect(screen.getByText('0 favorite teams')).toBeInTheDocument();
    expect(screen.getByText('No favorite teams')).toBeInTheDocument();
  });
});

describe('Sports pages', () => {
  it('renders the scores page', () => {
    render(<ScoresPage />);
    expect(
      screen.getByRole('heading', { name: 'Live Scores' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 matches live')).toBeInTheDocument();
  });

  it('renders the match page', () => {
    render(<MatchPage />);
    expect(screen.getByRole('heading', { name: 'Match' })).toBeInTheDocument();
    expect(screen.getByText('2 — 1')).toBeInTheDocument();
  });

  it('renders the roster page', () => {
    render(<RosterPage />);
    expect(
      screen.getByRole('heading', { name: 'Team Roster' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 players')).toBeInTheDocument();
  });

  it('renders the standings page', () => {
    render(<StandingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Standings' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 teams')).toBeInTheDocument();
  });

  it('renders the fixtures page', () => {
    render(<FixturesPage />);
    expect(
      screen.getByRole('heading', { name: 'Fixtures' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 fixtures')).toBeInTheDocument();
  });

  it('renders the stats page', () => {
    render(<StatsPage />);
    expect(
      screen.getByRole('heading', { name: 'Player Stats' })
    ).toBeInTheDocument();
    expect(screen.getByText('18 goals')).toBeInTheDocument();
  });

  it('renders the news page', () => {
    render(<NewsPage />);
    expect(
      screen.getByRole('heading', { name: 'Sports News' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 stories')).toBeInTheDocument();
  });

  it('renders the favorites page', () => {
    render(<FavoritesPage />);
    expect(
      screen.getByRole('heading', { name: 'Favorite Teams' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 favorite teams')).toBeInTheDocument();
  });
});
