import { detectVPN, fetchFromIPInfo, fetchFromIpapi } from '../lookup';

describe('detectVPN', () => {
  it('returns false for undefined org', () => {
    expect(detectVPN(undefined)).toBe(false);
  });

  it('returns false for empty org', () => {
    expect(detectVPN('')).toBe(false);
  });

  it('returns false for unknown org', () => {
    expect(detectVPN('Some ISP')).toBe(false);
  });

  it('returns true for cloudflare', () => {
    expect(detectVPN('Cloudflare Inc.')).toBe(true);
  });

  it('returns true for amazon', () => {
    expect(detectVPN('Amazon Web Services')).toBe(true);
  });

  it('returns true for google', () => {
    expect(detectVPN('Google LLC')).toBe(true);
  });

  it('returns true for digitalocean', () => {
    expect(detectVPN('DigitalOcean')).toBe(true);
  });

  it('returns true for microsoft', () => {
    expect(detectVPN('Microsoft Azure')).toBe(true);
  });

  it('is case insensitive', () => {
    expect(detectVPN('GOOGLE CLOUD')).toBe(true);
  });
});

describe('fetchFromIPInfo', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  it('fetches IP info successfully for IPv4', async () => {
    const mockData = {
      ip: '8.8.8.8',
      city: 'Mountain View',
      region: 'California',
      country: 'US',
      postal: '94043',
      loc: '37.386,-122.084',
      timezone: 'America/Los_Angeles',
      org: 'GOOGLE',
    };
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    const result = await fetchFromIPInfo('8.8.8.8');
    expect(result.provider).toBe('IPinfo');
    expect(result.parsed.ip).toBe('8.8.8.8');
    expect(result.parsed.version).toBe('IPv4');
    expect(result.parsed.city).toBe('Mountain View');
    expect(result.parsed.latitude).toBe('37.386');
    expect(result.parsed.longitude).toBe('-122.084');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://ipinfo.io/8.8.8.8/json'
    );
  });

  it('fetches IP info for IPv6', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ip: '::1', loc: '' }),
    });
    const result = await fetchFromIPInfo('::1');
    expect(result.parsed.version).toBe('IPv6');
  });

  it('throws on non-ok response', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });
    await expect(fetchFromIPInfo('8.8.8.8')).rejects.toThrow('IPinfo failed');
  });
});

describe('fetchFromIpapi', () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
  });

  it('fetches IP info successfully', async () => {
    const mockData = {
      ip: '1.1.1.1',
      version: 'IPv4',
      city: 'Sydney',
      region: 'NSW',
      country_name: 'Australia',
      country_code: 'AU',
      postal: '2000',
      latitude: '-33.8688',
      longitude: '151.2093',
      timezone: 'Australia/Sydney',
      org: 'Cloudflare',
      asn: 'AS13335',
    };
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    const result = await fetchFromIpapi('1.1.1.1');
    expect(result.provider).toBe('ipapi');
    expect(result.parsed.ip).toBe('1.1.1.1');
    expect(result.parsed.org).toBe('Cloudflare');
    expect(result.parsed.asn).toBe('AS13335');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://ipapi.co/1.1.1.1/json/'
    );
  });

  it('throws on non-ok response', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });
    await expect(fetchFromIpapi('1.1.1.1')).rejects.toThrow('ipapi failed');
  });
});
