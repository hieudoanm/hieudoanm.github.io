export interface TournamentConfig {
  slug: string;
  label: string;
  hrefPrefix: string;
}

export const TOURNAMENT_CONFIG: Record<string, TournamentConfig> = {
  'world-cup': {
    slug: 'world-cup',
    label: 'World Cup',
    hrefPrefix: '/app/football/world-cup',
  },
  euro: {
    slug: 'euro',
    label: 'Euro',
    hrefPrefix: '/app/football/euro',
  },
  'copa-america': {
    slug: 'copa-america',
    label: 'Copa América',
    hrefPrefix: '/app/football/copa-america',
  },
  afcon: {
    slug: 'afcon',
    label: 'Africa Cup of Nations',
    hrefPrefix: '/app/football/afcon',
  },
  afc: {
    slug: 'afc',
    label: 'AFC Asian Cup',
    hrefPrefix: '/app/football/afc',
  },
  concacaf: {
    slug: 'concacaf',
    label: 'CONCACAF Gold Cup',
    hrefPrefix: '/app/football/concacaf',
  },
  asean: {
    slug: 'asean',
    label: 'ASEAN Championship',
    hrefPrefix: '/app/football/asean',
  },
};

export type TournamentSlug = keyof typeof TOURNAMENT_CONFIG;

export const isValidTournament = (slug: string): slug is TournamentSlug =>
  slug in TOURNAMENT_CONFIG;

export const getTournamentConfig = (
  slug: string
): TournamentConfig | undefined => TOURNAMENT_CONFIG[slug];
