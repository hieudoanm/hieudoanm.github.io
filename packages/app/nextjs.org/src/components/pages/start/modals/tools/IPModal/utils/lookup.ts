import { IPInfo } from '../types';

export const detectVPN = (org?: string): boolean => {
  if (!org) return false;
  const lower = org.toLowerCase();
  return ['cloudflare', 'amazon', 'google', 'digitalocean', 'microsoft'].some(
    (kw) => lower.includes(kw)
  );
};

type FetchResult = { parsed: IPInfo; provider: string };

export const fetchFromIPInfo = async (ip: string): Promise<FetchResult> => {
  const res = await fetch(`https://ipinfo.io/${ip}/json`);
  if (!res.ok) throw new Error('IPinfo failed');
  const data = await res.json();
  return {
    parsed: {
      ip: data.ip,
      version: data.ip.includes(':') ? 'IPv6' : 'IPv4',
      city: data.city,
      region: data.region,
      country_name: data.country,
      country_code: data.country,
      postal: data.postal,
      latitude: data.loc?.split(',')[0],
      longitude: data.loc?.split(',')[1],
      timezone: data.timezone,
      org: data.org,
      asn: data.org,
    },
    provider: 'IPinfo',
  };
};

export const fetchFromIpapi = async (ip: string): Promise<FetchResult> => {
  const res = await fetch(`https://ipapi.co/${ip}/json/`);
  if (!res.ok) throw new Error('ipapi failed');
  const data = await res.json();
  return {
    parsed: {
      ip: data.ip,
      version: data.version,
      city: data.city,
      region: data.region,
      country_name: data.country_name,
      country_code: data.country_code,
      postal: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      org: data.org,
      asn: data.asn,
    },
    provider: 'ipapi',
  };
};
