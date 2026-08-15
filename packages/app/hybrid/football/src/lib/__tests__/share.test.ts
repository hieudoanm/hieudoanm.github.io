import {
  buildShareUrl,
  decodeSquad,
  encodeSquad,
  squadFromUrl,
} from '@/lib/share';
import { makeSquad } from '@/test/fixtures';

const squad = makeSquad({
  name: 'Team A',
  formationId: '433',
  players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID', position: 'AM' }],
  assignments: { '433-2-5': ['p1'] },
});

describe('share', () => {
  it('round-trips a squad through encode/decode', () => {
    const decoded = decodeSquad(encodeSquad(squad));
    expect(decoded).toEqual(squad);
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

  it('reads a squad from the URL search string', () => {
    const search = `?squad=${encodeSquad(squad)}`;
    const parsed = squadFromUrl(search);
    expect(parsed?.name).toBe('Team A');
    expect(parsed?.players).toHaveLength(1);
  });

  it('returns null when no squad param is present', () => {
    expect(squadFromUrl('')).toBeNull();
    expect(squadFromUrl('?other=1')).toBeNull();
  });

  it('returns null when the squad param is malformed', () => {
    expect(squadFromUrl('?squad=garbage')).toBeNull();
  });
});
