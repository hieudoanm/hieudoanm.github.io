import { s, t, group, toKnockoutTeams } from '@/data/touraments/shared';

describe('shared', () => {
  describe('s (standing)', () => {
    it('calculates goal difference and points', () => {
      const standing = s('team1', 5, 3, 1, 1, 10, 5);
      expect(standing).toEqual({
        teamId: 'team1',
        pld: 5,
        w: 3,
        d: 1,
        l: 1,
        gf: 10,
        ga: 5,
        gd: 5,
        pts: 10,
      });
    });

    it('handles zero values', () => {
      const standing = s('team2', 0, 0, 0, 0, 0, 0);
      expect(standing.gd).toBe(0);
      expect(standing.pts).toBe(0);
    });

    it('handles negative goal difference', () => {
      const standing = s('team3', 3, 0, 0, 3, 2, 8);
      expect(standing.gd).toBe(-6);
      expect(standing.pts).toBe(0);
    });
  });

  describe('t (team)', () => {
    it('creates a team object', () => {
      const team = t('brazil', 'Brazil', 'br');
      expect(team).toEqual({ id: 'brazil', name: 'Brazil', iso: 'br' });
    });
  });

  describe('group', () => {
    it('creates a group with default empty standings', () => {
      const g = group('A', ['team1', 'team2']);
      expect(g.name).toBe('A');
      expect(g.label).toBe('Group A');
      expect(g.teams).toEqual(['team1', 'team2']);
      expect(g.standings).toEqual({});
    });

    it('creates a group with provided standings', () => {
      const standings = { team1: s('team1', 1, 1, 0, 0, 3, 1) };
      const g = group('B', ['team1'], standings);
      expect(g.standings).toEqual(standings);
    });
  });

  describe('toKnockoutTeams', () => {
    it('adds flag emoji from ISO code', () => {
      const teams = { brazil: { id: 'brazil', name: 'Brazil', iso: 'br' } };
      const result = toKnockoutTeams(teams);
      expect(result.brazil.flag).toBeTruthy();
      expect(result.brazil.name).toBe('Brazil');
    });

    it('maps subdivision flags for GB nations', () => {
      const teams = {
        england: { id: 'england', name: 'England', iso: 'gb-eng' },
      };
      const result = toKnockoutTeams(teams);
      expect(result.england.flag).toBeTruthy();
    });

    it('handles GB-Scotland', () => {
      const teams = {
        scotland: { id: 'scotland', name: 'Scotland', iso: 'gb-sct' },
      };
      const result = toKnockoutTeams(teams);
      expect(result.scotland.flag).toBeTruthy();
    });

    it('handles GB-Wales', () => {
      const teams = { wales: { id: 'wales', name: 'Wales', iso: 'gb-wls' } };
      const result = toKnockoutTeams(teams);
      expect(result.wales.flag).toBeTruthy();
    });

    it('handles GB-Northern Ireland', () => {
      const teams = {
        nir: { id: 'nir', name: 'Northern Ireland', iso: 'gb-nir' },
      };
      const result = toKnockoutTeams(teams);
      expect(result.nir.flag).toBeTruthy();
    });

    it('handles empty teams', () => {
      const result = toKnockoutTeams({});
      expect(result).toEqual({});
    });

    it('handles non-GB 2-letter ISO codes', () => {
      const teams = { germany: { id: 'germany', name: 'Germany', iso: 'de' } };
      const result = toKnockoutTeams(teams);
      expect(result.germany.flag).toBeTruthy();
    });

    it('handles non-2-letter ISO codes', () => {
      const teams = { custom: { id: 'custom', name: 'Custom', iso: 'xyz' } };
      const result = toKnockoutTeams(teams);
      expect(result.custom.flag).toBe('\u{1f3f3}');
    });
  });
});
