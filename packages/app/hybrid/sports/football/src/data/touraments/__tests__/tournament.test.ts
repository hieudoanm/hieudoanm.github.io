import {
  TOURNAMENT_CONFIG,
  isValidTournament,
  getTournamentConfig,
} from '@/data/touraments/tournament';

describe('tournament', () => {
  it('TOURNAMENT_CONFIG contains expected tournaments', () => {
    expect(Object.keys(TOURNAMENT_CONFIG)).toContain('world-cup');
    expect(Object.keys(TOURNAMENT_CONFIG)).toContain('euro');
    expect(Object.keys(TOURNAMENT_CONFIG)).toContain('premier-league');
    expect(Object.keys(TOURNAMENT_CONFIG)).toContain('champions-league');
  });

  it('each config has required fields', () => {
    for (const config of Object.values(TOURNAMENT_CONFIG)) {
      expect(config).toHaveProperty('slug');
      expect(config).toHaveProperty('label');
      expect(config).toHaveProperty('hrefPrefix');
      expect(typeof config.slug).toBe('string');
      expect(typeof config.label).toBe('string');
      expect(typeof config.hrefPrefix).toBe('string');
    }
  });

  describe('isValidTournament', () => {
    it('returns true for valid slugs', () => {
      expect(isValidTournament('world-cup')).toBe(true);
      expect(isValidTournament('euro')).toBe(true);
      expect(isValidTournament('copa-america')).toBe(true);
      expect(isValidTournament('afcon')).toBe(true);
      expect(isValidTournament('afc')).toBe(true);
      expect(isValidTournament('concacaf')).toBe(true);
      expect(isValidTournament('asean')).toBe(true);
      expect(isValidTournament('premier-league')).toBe(true);
      expect(isValidTournament('la-liga')).toBe(true);
      expect(isValidTournament('bundesliga')).toBe(true);
      expect(isValidTournament('champions-league')).toBe(true);
    });

    it('returns false for invalid slugs', () => {
      expect(isValidTournament('invalid')).toBe(false);
      expect(isValidTournament('')).toBe(false);
      expect(isValidTournament('world-cup-2026')).toBe(false);
    });
  });

  describe('getTournamentConfig', () => {
    it('returns config for valid slugs', () => {
      const config = getTournamentConfig('world-cup');
      expect(config).toBeDefined();
      expect(config?.slug).toBe('world-cup');
      expect(config?.label).toBe('World Cup');
    });

    it('returns undefined for invalid slugs', () => {
      expect(getTournamentConfig('invalid')).toBeUndefined();
      expect(getTournamentConfig('')).toBeUndefined();
    });
  });
});
