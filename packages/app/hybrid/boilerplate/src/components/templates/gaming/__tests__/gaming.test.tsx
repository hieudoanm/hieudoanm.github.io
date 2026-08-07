import { fireEvent, render, screen, within } from '@testing-library/react';
import { GameCatalogTemplate } from '../GameCatalogTemplate';
import { GameChallengesTemplate } from '../GameChallengesTemplate';
import { GameDetailTemplate } from '../GameDetailTemplate';
import { GameNewsTemplate } from '../GameNewsTemplate';
import { LeaderboardsTemplate } from '../LeaderboardsTemplate';
import { LiveMatchesTemplate } from '../LiveMatchesTemplate';
import { PlayerProfilesTemplate } from '../PlayerProfilesTemplate';
import { TournamentsTemplate } from '../TournamentsTemplate';
import CatalogPage from '@/app/(main)/gaming/catalog/page';
import ChallengesPage from '@/app/(main)/gaming/challenges/page';
import GamePage from '@/app/(main)/gaming/game/page';
import LeaderboardsPage from '@/app/(main)/gaming/leaderboards/page';
import MatchesPage from '@/app/(main)/gaming/matches/page';
import NewsPage from '@/app/(main)/gaming/news/page';
import PlayersPage from '@/app/(main)/gaming/players/page';
import TournamentsPage from '@/app/(main)/gaming/tournaments/page';

describe('GameCatalogTemplate', () => {
  it('renders the catalog with a count summary and game details', () => {
    render(<GameCatalogTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Game Catalog' })
    ).toBeInTheDocument();
    expect(screen.getByText('Browse every title.')).toBeInTheDocument();
    expect(screen.getByText('6 games')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Search games' })
    ).toBeInTheDocument();
    expect(screen.getByText('Stellar Vanguard')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getByText('2.4M players')).toBeInTheDocument();
    const card = screen
      .getByText('Stellar Vanguard')
      .closest('.card') as HTMLElement;
    expect(within(card).getByText('Action')).toBeInTheDocument();
  });

  it('filters games by genre tab', () => {
    render(<GameCatalogTemplate />);
    const main = screen.getByRole('main');
    fireEvent.click(within(main).getByRole('button', { name: 'RPG' }));
    expect(screen.getByText('2 games')).toBeInTheDocument();
    expect(screen.getByText('Ironforge Realms')).toBeInTheDocument();
    expect(screen.getByText('Nova Online')).toBeInTheDocument();
    expect(screen.queryByText('Stellar Vanguard')).not.toBeInTheDocument();
    fireEvent.click(within(main).getByRole('button', { name: 'All' }));
    expect(screen.getByText('6 games')).toBeInTheDocument();
  });

  it('searches games and shows the empty state', () => {
    render(<GameCatalogTemplate />);
    const input = screen.getByRole('textbox', { name: 'Search games' });
    fireEvent.change(input, { target: { value: 'nova' } });
    expect(screen.getByText('1 games')).toBeInTheDocument();
    expect(screen.getByText('Nova Online')).toBeInTheDocument();
    expect(screen.queryByText('Stellar Vanguard')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.getByText('0 games')).toBeInTheDocument();
    expect(screen.getByText('No games found')).toBeInTheDocument();
  });
});

describe('GameDetailTemplate', () => {
  it('renders the game details with genres and rating', () => {
    render(<GameDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Game' })).toBeInTheDocument();
    expect(screen.getByText('Game details.')).toBeInTheDocument();
    expect(screen.getByText('Stellar Vanguard')).toBeInTheDocument();
    expect(screen.getByText('Aurora Interactive')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('4.7 rating')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('Multiplayer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Wishlist' })
    ).toBeInTheDocument();
  });

  it('toggles play to paused', () => {
    render(<GameDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Paused' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Paused' }));
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('toggles wishlist to wishlisted with a badge', () => {
    render(<GameDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Wishlist' }));
    expect(
      screen.getByRole('button', { name: 'Wishlisted' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Wishlisted')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Wishlisted' }));
    expect(
      screen.getByRole('button', { name: 'Wishlist' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Wishlisted')).not.toBeInTheDocument();
  });
});

describe('LiveMatchesTemplate', () => {
  it('renders live matches with scores, arenas and live badges', () => {
    render(<LiveMatchesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Live Matches' })
    ).toBeInTheDocument();
    expect(screen.getByText('Matches happening now.')).toBeInTheDocument();
    expect(screen.getByText('4 live matches')).toBeInTheDocument();
    expect(screen.getByText('Team Alpha')).toBeInTheDocument();
    expect(screen.getByText('Team Nova')).toBeInTheDocument();
    expect(screen.getByText('3 — 1')).toBeInTheDocument();
    expect(screen.getByText('Crimson Arena')).toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(4);
  });

  it('toggles a match to watching', () => {
    render(<LiveMatchesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Watch' })[0]);
    expect(
      screen.getByRole('button', { name: 'Watching' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Watching')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(3);
    expect(screen.getAllByText('Live')).toHaveLength(4);
  });
});

describe('LeaderboardsTemplate', () => {
  it('renders the global leaderboard with ranked players', () => {
    render(<LeaderboardsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Leaderboards' })
    ).toBeInTheDocument();
    expect(screen.getByText('Top players.')).toBeInTheDocument();
    expect(screen.getByText('5 players')).toBeInTheDocument();
    expect(screen.getByText('NovaBlaze')).toBeInTheDocument();
    expect(screen.getByText('12,450')).toBeInTheDocument();
    expect(screen.getByText('78% win rate')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Follow' })).toHaveLength(5);
  });

  it('switches to the regional leaderboard', () => {
    render(<LeaderboardsTemplate />);
    const main = screen.getByRole('main');
    fireEvent.click(within(main).getByRole('button', { name: 'Regional' }));
    expect(screen.getByText('4 players')).toBeInTheDocument();
    expect(screen.getByText('MapleRush')).toBeInTheDocument();
    expect(screen.queryByText('NovaBlaze')).not.toBeInTheDocument();
  });

  it('follows a player', () => {
    render(<LeaderboardsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Follow' })[0]);
    expect(
      screen.getByRole('button', { name: 'Following' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Following')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Follow' })).toHaveLength(4);
  });
});

describe('TournamentsTemplate', () => {
  it('renders tournaments with statuses, prizes and dates', () => {
    render(<TournamentsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Tournaments' })
    ).toBeInTheDocument();
    expect(screen.getByText('Upcoming and live events.')).toBeInTheDocument();
    expect(screen.getByText('5 tournaments')).toBeInTheDocument();
    expect(screen.getByText('Aurora Cup')).toBeInTheDocument();
    expect(screen.getByText('$10,000 prize')).toBeInTheDocument();
    expect(screen.getByText('Aug 15, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('Registering')).toHaveLength(3);
    expect(screen.getAllByText('Live')).toHaveLength(1);
    expect(screen.getAllByText('Finished')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Register' })).toHaveLength(3);
  });

  it('registers for a tournament', () => {
    render(<TournamentsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0]);
    expect(
      screen.getByRole('button', { name: 'Registered' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Registered')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Register' })).toHaveLength(2);
  });
});

describe('PlayerProfilesTemplate', () => {
  it('renders players with team, role, rank and hours', () => {
    render(<PlayerProfilesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Players' })
    ).toBeInTheDocument();
    expect(screen.getByText('Follow your favorites.')).toBeInTheDocument();
    expect(screen.getByText('5 players')).toBeInTheDocument();
    expect(screen.getByText('NovaBlaze')).toBeInTheDocument();
    expect(screen.getByText('Team Alpha')).toBeInTheDocument();
    expect(screen.getByText('DPS')).toBeInTheDocument();
    expect(screen.getByText('Gold III')).toBeInTheDocument();
    expect(screen.getByText('1,240 hours')).toBeInTheDocument();
  });

  it('searches players by name', () => {
    render(<PlayerProfilesTemplate />);
    const input = screen.getByRole('textbox', { name: 'Search players' });
    fireEvent.change(input, { target: { value: 'shadow' } });
    expect(screen.getByText('1 players')).toBeInTheDocument();
    expect(screen.getByText('ShadowFang')).toBeInTheDocument();
    expect(screen.queryByText('NovaBlaze')).not.toBeInTheDocument();
  });

  it('shows the empty state for an unmatched query', () => {
    render(<PlayerProfilesTemplate />);
    const input = screen.getByRole('textbox', { name: 'Search players' });
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.getByText('0 players')).toBeInTheDocument();
    expect(screen.getByText('No players found')).toBeInTheDocument();
  });
});

describe('GameNewsTemplate', () => {
  it('renders stories with category badges and dates', () => {
    render(<GameNewsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Game News' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Patches, events, and esports.')
    ).toBeInTheDocument();
    expect(screen.getByText('4 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Stellar Vanguard patch 2.1 launches next week')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Patch')).toHaveLength(2);
    expect(screen.getAllByText('Esports')).toHaveLength(1);
    expect(screen.getAllByText('Community')).toHaveLength(1);
    expect(screen.getByText('Aug 4, 2026')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Read more' })).toHaveLength(
      4
    );
  });

  it('expands a story with the read more button', () => {
    render(<GameNewsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Read more' })[0]);
    expect(
      screen.getByText(
        'The update rebalances three heroes and adds a new ranked map rotation.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show less' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Read more' })).toHaveLength(
      3
    );
  });
});

describe('GameChallengesTemplate', () => {
  it('renders challenges with descriptions and rewards', () => {
    render(<GameChallengesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Challenges' })
    ).toBeInTheDocument();
    expect(screen.getByText('Daily and weekly quests.')).toBeInTheDocument();
    expect(screen.getByText('4 challenges')).toBeInTheDocument();
    expect(screen.getByText('Win 3 matches')).toBeInTheDocument();
    expect(
      screen.getByText('Earn a victory in any ranked queue three times.')
    ).toBeInTheDocument();
    expect(screen.getByText('500 XP')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Claim' })).toHaveLength(4);
  });

  it('claims a challenge and updates the count', () => {
    render(<GameChallengesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Claim' })[0]);
    expect(screen.getByRole('button', { name: 'Claimed' })).toBeInTheDocument();
    expect(screen.getAllByText('Claimed')).toHaveLength(2);
    expect(screen.getByText('3 challenges')).toBeInTheDocument();
  });

  it('shows the empty state after claiming every challenge', () => {
    render(<GameChallengesTemplate />);
    while (screen.queryAllByRole('button', { name: 'Claim' }).length > 0) {
      fireEvent.click(screen.getAllByRole('button', { name: 'Claim' })[0]);
    }
    expect(screen.getByText('0 challenges')).toBeInTheDocument();
    expect(screen.getByText('No challenges available')).toBeInTheDocument();
  });
});

describe('Gaming pages', () => {
  it('renders the game catalog page', () => {
    render(<CatalogPage />);
    expect(
      screen.getByRole('heading', { name: 'Game Catalog' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 games')).toBeInTheDocument();
  });

  it('renders the game detail page', () => {
    render(<GamePage />);
    expect(screen.getByRole('heading', { name: 'Game' })).toBeInTheDocument();
    expect(screen.getByText('4.7 rating')).toBeInTheDocument();
  });

  it('renders the live matches page', () => {
    render(<MatchesPage />);
    expect(
      screen.getByRole('heading', { name: 'Live Matches' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 live matches')).toBeInTheDocument();
  });

  it('renders the leaderboards page', () => {
    render(<LeaderboardsPage />);
    expect(
      screen.getByRole('heading', { name: 'Leaderboards' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 players')).toBeInTheDocument();
  });

  it('renders the tournaments page', () => {
    render(<TournamentsPage />);
    expect(
      screen.getByRole('heading', { name: 'Tournaments' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 tournaments')).toBeInTheDocument();
  });

  it('renders the players page', () => {
    render(<PlayersPage />);
    expect(
      screen.getByRole('heading', { name: 'Players' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 players')).toBeInTheDocument();
  });

  it('renders the game news page', () => {
    render(<NewsPage />);
    expect(
      screen.getByRole('heading', { name: 'Game News' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 stories')).toBeInTheDocument();
  });

  it('renders the challenges page', () => {
    render(<ChallengesPage />);
    expect(
      screen.getByRole('heading', { name: 'Challenges' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 challenges')).toBeInTheDocument();
  });
});
