import {
  hashPassword,
  generateSalt,
  isLockFlagSet,
  setLockFlag,
  clearLockFlag,
} from '@/lib/security';

describe('hashPassword', () => {
  it('hashes the password with the salt deterministically', async () => {
    const salt = 'deadbeef';
    const a = await hashPassword('secret', salt);
    const b = await hashPassword('secret', salt);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    expect(a).toBe(b);
  });

  it('produces different hashes for different passwords', async () => {
    const salt = 'deadbeef';
    const a = await hashPassword('secret', salt);
    const b = await hashPassword('other', salt);
    expect(a).not.toBe(b);
  });
});

describe('generateSalt', () => {
  it('generates unique 16-byte hex salts', () => {
    const s1 = generateSalt();
    const s2 = generateSalt();
    expect(s1).toMatch(/^[0-9a-f]{32}$/);
    expect(s1).not.toBe(s2);
  });
});

describe('lock flag', () => {
  beforeEach(() => window.localStorage.clear());

  it('is unset by default', () => {
    expect(isLockFlagSet()).toBe(false);
  });

  it('round-trips set and clear', () => {
    setLockFlag();
    expect(isLockFlagSet()).toBe(true);
    clearLockFlag();
    expect(isLockFlagSet()).toBe(false);
  });
});
