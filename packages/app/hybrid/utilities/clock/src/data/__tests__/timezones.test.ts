import { timezones, getTimeInZone } from '../timezones';

describe('timezones', () => {
  it('has 14 timezones', () => {
    expect(timezones).toHaveLength(14);
  });

  it('has correct structure for each timezone', () => {
    timezones.forEach((tz) => {
      expect(tz).toHaveProperty('label');
      expect(tz).toHaveProperty('country');
      expect(tz).toHaveProperty('tz');
      expect(tz).toHaveProperty('lat');
      expect(tz).toHaveProperty('lon');
      expect(tz).toHaveProperty('favorite');
      expect(typeof tz.label).toBe('string');
      expect(typeof tz.country).toBe('string');
      expect(typeof tz.tz).toBe('string');
      expect(typeof tz.lat).toBe('number');
      expect(typeof tz.lon).toBe('number');
      expect(typeof tz.favorite).toBe('boolean');
    });
  });

  it('has three favorites', () => {
    const favorites = timezones.filter((tz) => tz.favorite);
    expect(favorites).toHaveLength(3);
  });

  it('has Dallas as favorite', () => {
    const dallas = timezones.find((tz) => tz.label === 'Dallas');
    expect(dallas?.favorite).toBe(true);
  });

  it('has Ho Chi Minh City as favorite', () => {
    const hcmc = timezones.find((tz) => tz.label === 'Ho Chi Minh City');
    expect(hcmc?.favorite).toBe(true);
  });

  it('has Melbourne as favorite', () => {
    const melbourne = timezones.find((tz) => tz.label === 'Melbourne');
    expect(melbourne?.favorite).toBe(true);
  });
});

describe('getTimeInZone', () => {
  it('returns a time string for a valid timezone', () => {
    const time = getTimeInZone('America/New_York');
    expect(time).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('returns a time string for Asia/Tokyo', () => {
    const time = getTimeInZone('Asia/Tokyo');
    expect(time).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });
});
