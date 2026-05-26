import { createSignal, createEffect } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

type IPInfo = {
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

const detectVPN = (org?: string): boolean => {
  if (!org) return false;
  const lower = org.toLowerCase();
  return ['cloudflare', 'amazon', 'google', 'digitalocean', 'microsoft'].some(
    (kw) => lower.includes(kw)
  );
};

const fetchFromIPInfo = async (ip: string) => {
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

const fetchFromIpapi = async (ip: string) => {
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

export const IPModal = (props: { onClose: () => void }) => {
  const [ipInfo, setIpInfo] = createSignal<IPInfo | null>(null);
  const [provider, setProvider] = createSignal<string | null>(null);
  const [vpnDetected, setVpnDetected] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const [domain, setDomain] = createSignal('');
  const [dnsResult, setDnsResult] = createSignal<any>(null);
  const [dnsLoading, setDnsLoading] = createSignal(false);
  const [dnsError, setDnsError] = createSignal<string | null>(null);

  const [tab, setTab] = createSignal<'network' | 'location' | 'dns'>('network');
  const [rawOpen, setRawOpen] = createSignal(false);

  const fetchIPInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const ipRes = await fetch('https://api.ipify.org?format=json');
      if (!ipRes.ok) throw new Error('Failed to fetch IP');
      const { ip } = await ipRes.json();
      let result;
      try {
        result = await fetchFromIPInfo(ip);
      } catch {
        result = await fetchFromIpapi(ip);
      }
      setIpInfo(result.parsed);
      setProvider(result.provider);
      setVpnDetected(detectVPN(result.parsed.org));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDNS = async () => {
    if (!domain().trim()) return;
    try {
      setDnsLoading(true);
      setDnsError(null);
      setDnsResult(null);
      const res = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${domain()}&type=A`,
        { headers: { accept: 'application/dns-json' } }
      );
      if (!res.ok) throw new Error('DNS lookup failed');
      setDnsResult(await res.json());
    } catch (err: any) {
      setDnsError(err.message);
    } finally {
      setDnsLoading(false);
    }
  };

  createEffect(() => {
    fetchIPInfo();
  });

  return (
    <ModalWrapper
      onClose={props.onClose}
      title="IP Inspector"
      subtitle="Pure frontend · Fallback enabled · No data stored"
      size="max-w-2xl">
      {/* Provider badge + refresh */}
      <div class="flex items-center gap-3">
        {provider() && (
          <span class="badge badge-outline text-xs">via {provider()}</span>
        )}
        {vpnDetected() && (
          <span class="badge badge-warning badge-outline text-xs">
            ⚠ VPN / shared hosting
          </span>
        )}
        <button
          class="btn btn-ghost btn-xs ml-auto"
          onClick={fetchIPInfo}
          disabled={loading()}>
          {loading() ? (
            <span class="loading loading-spinner loading-xs" />
          ) : (
            '↺ Refresh'
          )}
        </button>
      </div>

      {error() && <div class="alert alert-error py-2 text-sm">{error()}</div>}

      {/* Tabs */}
      <div class="tabs tabs-bordered">
        {(['network', 'location', 'dns'] as const).map((t) => (
          <button
            key={t}
            class={`tab tab-bordered capitalize ${tab() === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* Network tab */}
      {tab() === 'network' && (
        <div class="flex flex-col gap-2">
          {loading() && (
            <div class="flex justify-center py-8">
              <span class="loading loading-spinner loading-md" />
            </div>
          )}
          {ipInfo() && !loading() && (
            <>
              <Row label="IP" value={ipInfo()!.ip} mono />
              <Row label="Version" value={ipInfo()!.version} />
              <Row label="ASN" value={ipInfo()!.asn} />
              <Row label="Organization" value={ipInfo()!.org} />
              <Row label="Timezone" value={ipInfo()!.timezone} />

              {/* Raw JSON toggle */}
              <div class="border-base-300 mt-2 border-t pt-3">
                <button
                  class="btn btn-ghost btn-xs"
                  onClick={() => setRawOpen((o) => !o)}>
                  {rawOpen() ? '▲ Hide raw JSON' : '▼ Show raw JSON'}
                </button>
                {rawOpen() && (
                  <pre class="bg-base-200 mt-2 max-h-48 overflow-auto rounded-lg p-3 text-xs">
                    {JSON.stringify(ipInfo(), null, 2)}
                  </pre>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Location tab */}
      {tab() === 'location' && (
        <div class="flex flex-col gap-2">
          {loading() && (
            <div class="flex justify-center py-8">
              <span class="loading loading-spinner loading-md" />
            </div>
          )}
          {ipInfo() && !loading() && (
            <>
              <Row label="Country" value={ipInfo()!.country_name} />
              <Row label="Region" value={ipInfo()!.region} />
              <Row label="City" value={ipInfo()!.city} />
              <Row label="Postal" value={ipInfo()!.postal} />
              <Row
                label="Coordinates"
                value={
                  ipInfo()!.latitude && ipInfo()!.longitude
                    ? `${ipInfo()!.latitude}, ${ipInfo()!.longitude}`
                    : undefined
                }
                mono
              />
              {ipInfo()!.latitude && ipInfo()!.longitude && (
                <a
                  href={`https://www.openstreetmap.org/?mlat=${ipInfo()!.latitude}&mlon=${ipInfo()!.longitude}&zoom=12`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-ghost btn-xs mt-1 w-fit">
                  View on map ↗
                </a>
              )}
            </>
          )}
        </div>
      )}

      {/* DNS tab */}
      {tab() === 'dns' && (
        <div class="flex flex-col gap-3">
          <div class="flex gap-2">
            <input
              class="input input-bordered input-sm grow font-mono"
              placeholder="example.com"
              value={domain()}
              onChange={(e: Event) =>
                setDomain((e.target as HTMLInputElement).value)
              }
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === 'Enter') fetchDNS();
              }}
            />
            <button
              class="btn btn-sm btn-primary min-w-[80px]"
              onClick={fetchDNS}
              disabled={dnsLoading() || !domain().trim()}>
              {dnsLoading() ? (
                <span class="loading loading-spinner loading-xs" />
              ) : (
                'Lookup'
              )}
            </button>
          </div>

          {dnsError() && (
            <div class="alert alert-error py-2 text-sm">{dnsError()}</div>
          )}

          {dnsResult() && !dnsError() && (
            <pre class="bg-base-200 max-h-64 overflow-auto rounded-lg p-3 text-xs">
              {JSON.stringify(dnsResult(), null, 2)}
            </pre>
          )}

          {!dnsResult() && !dnsLoading() && !dnsError() && (
            <p class="text-base-content/30 py-6 text-center text-sm">
              Enter a domain to look up its A record.
            </p>
          )}
        </div>
      )}
    </ModalWrapper>
  );
};

// ── Helper ────────────────────────────────────────────────────────────────────

const Row = (props: {
  label: string;
  value?: string | number;
  mono?: boolean;
}) => (
  <div class="border-base-300 flex items-baseline justify-between gap-4 border-b py-1.5 last:border-0">
    <span class="text-base-content/50 shrink-0 text-xs tracking-wide uppercase">
      {props.label}
    </span>
    <span
      class={`text-right text-sm break-all ${props.mono ? 'font-mono' : ''} ${!props.value ? 'text-base-content/20' : ''}`}>
      {props.value ?? '—'}
    </span>
  </div>
);
