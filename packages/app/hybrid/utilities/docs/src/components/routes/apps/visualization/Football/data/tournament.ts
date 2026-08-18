export interface TournamentConfig {
  slug: string;
  label: string;
  hrefPrefix: string;
}

export const TOURNAMENT_CONFIG: Record<string, TournamentConfig> = {
  'world-cup': {
    slug: 'world-cup',
    label: 'World Cup',
    hrefPrefix: '/apps/visualization/football/world-cup',
  },
  euro: {
    slug: 'euro',
    label: 'Euro',
    hrefPrefix: '/apps/visualization/football/euro',
  },
  'copa-america': {
    slug: 'copa-america',
    label: 'Copa América',
    hrefPrefix: '/apps/visualization/football/copa-america',
  },
  afcon: {
    slug: 'afcon',
    label: 'Africa Cup of Nations',
    hrefPrefix: '/apps/visualization/football/afcon',
  },
  afc: {
    slug: 'afc',
    label: 'AFC Asian Cup',
    hrefPrefix: '/apps/visualization/football/afc',
  },
  concacaf: {
    slug: 'concacaf',
    label: 'CONCACAF Gold Cup',
    hrefPrefix: '/apps/visualization/football/concacaf',
  },
  asean: {
    slug: 'asean',
    label: 'ASEAN Championship',
    hrefPrefix: '/apps/visualization/football/asean',
  },
  'premier-league': {
    slug: 'premier-league',
    label: 'Premier League',
    hrefPrefix: '/apps/visualization/football/premier-league',
  },
  'la-liga': {
    slug: 'la-liga',
    label: 'La Liga',
    hrefPrefix: '/apps/visualization/football/la-liga',
  },
  bundesliga: {
    slug: 'bundesliga',
    label: 'Bundesliga',
    hrefPrefix: '/apps/visualization/football/bundesliga',
  },
  'champions-league': {
    slug: 'champions-league',
    label: 'Champions League',
    hrefPrefix: '/apps/visualization/football/champions-league',
  },
};

export type TournamentSlug = keyof typeof TOURNAMENT_CONFIG;

export const isValidTournament = (slug: string): slug is TournamentSlug =>
  slug in TOURNAMENT_CONFIG;

export const getTournamentConfig = (
  slug: string
): TournamentConfig | undefined => TOURNAMENT_CONFIG[slug];
