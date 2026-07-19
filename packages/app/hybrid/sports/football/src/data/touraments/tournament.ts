export interface TournamentConfig {
  slug: string;
  label: string;
  hrefPrefix: string;
}

export const TOURNAMENT_CONFIG: Record<string, TournamentConfig> = {
  'world-cup': {
    slug: 'world-cup',
    label: 'World Cup',
    hrefPrefix: '/touraments/world-cup',
  },
  euro: {
    slug: 'euro',
    label: 'Euro',
    hrefPrefix: '/touraments/euro',
  },
  'copa-america': {
    slug: 'copa-america',
    label: 'Copa América',
    hrefPrefix: '/touraments/copa-america',
  },
  afcon: {
    slug: 'afcon',
    label: 'Africa Cup of Nations',
    hrefPrefix: '/touraments/afcon',
  },
  afc: {
    slug: 'afc',
    label: 'AFC Asian Cup',
    hrefPrefix: '/touraments/afc',
  },
  concacaf: {
    slug: 'concacaf',
    label: 'CONCACAF Gold Cup',
    hrefPrefix: '/touraments/concacaf',
  },
  asean: {
    slug: 'asean',
    label: 'ASEAN Championship',
    hrefPrefix: '/touraments/asean',
  },
  'premier-league': {
    slug: 'premier-league',
    label: 'Premier League',
    hrefPrefix: '/touraments/premier-league',
  },
  'la-liga': {
    slug: 'la-liga',
    label: 'La Liga',
    hrefPrefix: '/touraments/la-liga',
  },
  bundesliga: {
    slug: 'bundesliga',
    label: 'Bundesliga',
    hrefPrefix: '/touraments/bundesliga',
  },
  'champions-league': {
    slug: 'champions-league',
    label: 'Champions League',
    hrefPrefix: '/touraments/champions-league',
  },
};

export type TournamentSlug = keyof typeof TOURNAMENT_CONFIG;

export const isValidTournament = (slug: string): slug is TournamentSlug =>
  slug in TOURNAMENT_CONFIG;

export const getTournamentConfig = (
  slug: string
): TournamentConfig | undefined => TOURNAMENT_CONFIG[slug];
