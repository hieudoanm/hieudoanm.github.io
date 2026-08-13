import {
  base32Decode,
  generateTotp,
  getTotpRemainingSeconds,
  otpauthUri,
  TOTP_PERIOD_SECONDS,
} from '@/lib/totp';

const RFC_SECRET = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ'; // base32 of "12345678901234567890"

describe('base32Decode', () => {
  it('decodes RFC 4648 base32', () => {
    const bytes = base32Decode('MZXW6===');
    expect([...bytes]).toEqual([102, 111, 111]); // "foo"
  });

  it('handles padding and lowercase input', () => {
    const bytes = base32Decode('mzxw6======');
    expect([...bytes]).toEqual([102, 111, 111]);
  });

  it('skips invalid characters', () => {
    const bytes = base32Decode('M-ZXW-6===');
    expect([...bytes]).toEqual([102, 111, 111]);
  });
});

describe('generateTotp', () => {
  it('matches RFC 6238 SHA-1 test vectors', async () => {
    expect(await generateTotp(RFC_SECRET, 59 * 1000)).toBe('287082');
    expect(await generateTotp(RFC_SECRET, 1111111109 * 1000)).toBe('081804');
    expect(await generateTotp(RFC_SECRET, 1111111111 * 1000)).toBe('050471');
    expect(await generateTotp(RFC_SECRET, 1234567890 * 1000)).toBe('005924');
    expect(await generateTotp(RFC_SECRET, 2000000000 * 1000)).toBe('279037');
  });

  it('produces a six-digit code', async () => {
    const code = await generateTotp('JBSWY3DPEHPK3PXP');
    expect(code).toMatch(/^\d{6}$/);
  });
});

describe('getTotpRemainingSeconds', () => {
  it('counts down within the period', () => {
    const now = 59 * 1000;
    expect(getTotpRemainingSeconds(now)).toBe(
      TOTP_PERIOD_SECONDS - (59 % TOTP_PERIOD_SECONDS)
    );
  });
});

describe('otpauthUri', () => {
  it('builds a TOTP otpauth URI', () => {
    expect(otpauthUri('ABC123', 'user@example.com')).toBe(
      'otpauth://totp/Password%20Vault:user%40example.com?secret=ABC123&issuer=Password%20Vault'
    );
  });

  it('uses a custom issuer', () => {
    expect(otpauthUri('ABC123', 'user@example.com', 'GitHub')).toBe(
      'otpauth://totp/GitHub:user%40example.com?secret=ABC123&issuer=GitHub'
    );
  });
});
