export type IPInfo = {
  ip: string;
  version: string;
  city?: string;
  region?: string;
  country_name?: string;
  country_code?: string;
  postal?: string;
  latitude?: number | string;
  longitude?: number | string;
  timezone?: string;
  org?: string;
  asn?: string;
};
