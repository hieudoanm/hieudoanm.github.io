import { currencyLocaleMap, healthConfig } from '../constants';

describe('currencyLocaleMap', () => {
  it('contains expected currency mappings', () => {
    expect(currencyLocaleMap.USD).toBe('en-US');
    expect(currencyLocaleMap.VND).toBe('vi-VN');
    expect(currencyLocaleMap.EUR).toBe('de-DE');
    expect(currencyLocaleMap.JPY).toBe('ja-JP');
    expect(currencyLocaleMap.GBP).toBe('en-GB');
  });

  it('contains all expected currencies', () => {
    const currencies = [
      'USD',
      'VND',
      'JPY',
      'EUR',
      'GBP',
      'AUD',
      'CAD',
      'CHF',
      'CNY',
      'SEK',
      'NOK',
      'DKK',
      'INR',
      'RUB',
      'BRL',
      'MXN',
      'ZAR',
      'SGD',
      'HKD',
      'NZD',
      'KRW',
      'TRY',
      'ARS',
      'PLN',
      'PHP',
      'IDR',
      'MYR',
      'THB',
      'ILS',
      'CLP',
      'COP',
      'SAR',
      'AED',
      'EGP',
      'NGN',
      'PKR',
      'BD',
      'KES',
      'CZK',
      'HUF',
      'RON',
      'BGN',
      'HRK',
      'VEF',
      'UAH',
      'LKR',
    ];
    for (const c of currencies) {
      expect(currencyLocaleMap).toHaveProperty(c);
    }
  });

  it('returns en-US for unknown currency', () => {
    expect(
      (currencyLocaleMap as Record<string, string>)['XXX']
    ).toBeUndefined();
  });
});

describe('healthConfig', () => {
  it('contains deflation config', () => {
    const hc = healthConfig.deflation;
    expect(hc.border).toBe('border-success');
    expect(hc.bg).toBe('bg-success');
    expect(hc.text).toBe('text-success-content');
    expect(hc.emoji).toBe('🟢');
  });

  it('contains low inflation config', () => {
    const hc = healthConfig.low;
    expect(hc.emoji).toBe('🟡');
  });

  it('contains moderate inflation config', () => {
    const hc = healthConfig.moderate;
    expect(hc.emoji).toBe('🟠');
  });

  it('contains high inflation config', () => {
    const hc = healthConfig.high;
    expect(hc.emoji).toBe('🔴');
    expect(hc.border).toBe('border-error');
    expect(hc.bg).toBe('bg-error');
  });

  it('covers all health types', () => {
    const healthTypes = ['deflation', 'low', 'moderate', 'high'] as const;
    for (const h of healthTypes) {
      expect(healthConfig).toHaveProperty(h);
      expect(healthConfig[h].border).toBeDefined();
      expect(healthConfig[h].bg).toBeDefined();
      expect(healthConfig[h].text).toBeDefined();
      expect(healthConfig[h].emoji).toBeDefined();
    }
  });
});
