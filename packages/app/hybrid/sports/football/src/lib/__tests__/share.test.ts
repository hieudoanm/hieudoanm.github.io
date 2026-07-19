import {
  SHARE_VERSION,
  addShareHistory,
  buildShareUrl,
  clearShareHistory,
  decodeShare,
  decodeSquad,
  encodeLineup,
  encodeSquad,
  loadShareHistory,
  squadFromDeepLink,
  squadFromUrl,
} from '@/lib/share';
import { makeSquad } from '@/test/fixtures';

const squad = makeSquad({
  name: 'Team A',
  formationId: '433',
  players: [
    { id: 'p1', name: 'Ada', number: 10, role: 'MID', position: 'AM' },
    { id: 'p2', name: 'Bob', number: 12, role: 'FWD', bench: true },
  ],
  assignments: { '433-2-5': ['p1'] },
  presets: [{ id: 'pr1', name: 'High press', formationId: '442' }],
  lineups: [{ id: 'l1', name: 'Plan B', formationId: '442', assignments: {} }],
});

const decodePayload = (encoded: string): unknown =>
  JSON.parse(
    decodeURIComponent(
      Buffer.from(
        encoded.replace(/-/g, '+').replace(/_/g, '/'),
        'base64'
      ).toString('utf8')
    )
  );

describe('share', () => {
  it('round-trips a squad through encode/decode', () => {
    const decoded = decodeSquad(encodeSquad(squad));
    expect(decoded).toEqual(squad);
  });

  it('stamps share URLs with the share version', () => {
    const payload = decodePayload(encodeSquad(squad)) as {
      v: number;
      t: string;
    };
    expect(payload.v).toBe(SHARE_VERSION);
    expect(payload.t).toBe('squad');
  });

  it('round-trips a lineup-only share through encode/decode', () => {
    const decoded = decodeSquad(encodeLineup(squad));
    expect(decoded?.formationId).toBe('433');
    expect(decoded?.players.map((p) => p.name)).toEqual(['Ada']);
    expect(decoded?.assignments).toEqual({ '433-2-5': ['p1'] });
  });

  it('excludes saved plans and presets from a lineup-only share', () => {
    const payload = decodePayload(encodeLineup(squad)) as {
      t: string;
      lineup: { players: unknown[] };
    };
    expect(payload.t).toBe('lineup');
    expect(payload.lineup.players).toHaveLength(1);
  });

  it('still decodes a legacy unstamped squad payload', () => {
    const encoded = Buffer.from(JSON.stringify(squad)).toString('base64');
    const decoded = decodeSquad(encoded);
    expect(decoded?.name).toBe('Team A');
  });

  it('reports the share mode when decoding', () => {
    expect(decodeShare(encodeSquad(squad))?.mode).toBe('squad');
    expect(decodeShare(encodeLineup(squad))?.mode).toBe('lineup');
    expect(decodeShare('garbage')).toBeNull();
  });

  it('handles unicode player names', () => {
    const unicode = makeSquad({
      players: [{ id: 'p1', name: 'Đoàn Mỹ', number: 7, role: 'FWD' }],
    });
    const decoded = decodeSquad(encodeSquad(unicode));
    expect(decoded?.players[0].name).toBe('Đoàn Mỹ');
  });

  it('returns null for invalid encoded data', () => {
    expect(decodeSquad('not-base64-!')).toBeNull();
    expect(decodeSquad('e30=')).toBeNull();
  });

  it('builds a share URL with the encoded squad', () => {
    const url = buildShareUrl(squad);
    expect(url).toContain('?squad=');
    const parsed = new URL(url);
    expect(parsed.searchParams.get('squad')).toBe(encodeSquad(squad));
  });

  it('builds a lineup-only share URL on request', () => {
    const url = buildShareUrl(squad, 'lineup');
    const parsed = new URL(url);
    expect(parsed.searchParams.get('squad')).toBe(encodeLineup(squad));
  });

  it('reads a squad from the URL search string', () => {
    const search = `?squad=${encodeSquad(squad)}`;
    const parsed = squadFromUrl(search);
    expect(parsed?.name).toBe('Team A');
    expect(parsed?.players).toHaveLength(2);
  });

  it('returns null when no squad param is present', () => {
    expect(squadFromUrl('')).toBeNull();
    expect(squadFromUrl('?other=1')).toBeNull();
  });

  it('returns null when the squad param is malformed', () => {
    expect(squadFromUrl('?squad=garbage')).toBeNull();
  });

  it('reads a squad from a deep-link URL', () => {
    const deepLink = `football://squad?squad=${encodeSquad(squad)}`;
    const decoded = squadFromDeepLink(deepLink);
    expect(decoded?.squad.name).toBe('Team A');
    expect(decoded?.mode).toBe('squad');
  });

  it('reads a lineup share from a deep-link URL', () => {
    const deepLink = `football://squad?squad=${encodeLineup(squad)}`;
    const decoded = squadFromDeepLink(deepLink);
    expect(decoded?.squad.players.map((p) => p.name)).toEqual(['Ada']);
    expect(decoded?.mode).toBe('lineup');
  });

  it('returns null for malformed deep-link URLs', () => {
    expect(squadFromDeepLink('not a url')).toBeNull();
    expect(squadFromDeepLink('football://squad?other=1')).toBeNull();
    expect(squadFromDeepLink('football://squad?squad=garbage')).toBeNull();
  });
});

describe('share history', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds entries to the history', () => {
    addShareHistory({
      mode: 'squad',
      name: 'Team A',
      url: 'https://a.test/?s',
    });
    const history = loadShareHistory();
    expect(history).toHaveLength(1);
    expect(history[0].name).toBe('Team A');
    expect(history[0].mode).toBe('squad');
    expect(history[0].url).toBe('https://a.test/?s');
  });

  it('dedupes entries by URL', () => {
    addShareHistory({
      mode: 'squad',
      name: 'Team A',
      url: 'https://a.test/?s',
    });
    addShareHistory({
      mode: 'lineup',
      name: 'Team A',
      url: 'https://a.test/?s',
    });
    expect(loadShareHistory()).toHaveLength(1);
  });

  it('drops malformed entries from storage', () => {
    localStorage.setItem(
      'football:shared-history:v1',
      JSON.stringify([{ id: 'x' }, { mode: 'squad', name: 'A', url: 'u' }])
    );
    const history = loadShareHistory();
    expect(history).toHaveLength(1);
    expect(history[0].name).toBe('A');
  });

  it('clears the history', () => {
    addShareHistory({
      mode: 'squad',
      name: 'Team A',
      url: 'https://a.test/?s',
    });
    clearShareHistory();
    expect(loadShareHistory()).toEqual([]);
  });
});
