import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { Row } from './components/Row';
import { IPInfo } from './types';
import { detectVPN, fetchFromIPInfo, fetchFromIpapi } from './utils/lookup';

export const IPModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [vpnDetected, setVpnDetected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domain, setDomain] = useState('');
  const [dnsResult, setDnsResult] = useState<Record<string, unknown> | null>(
    null
  );
  const [dnsLoading, setDnsLoading] = useState(false);
  const [dnsError, setDnsError] = useState<string | null>(null);
  const [tab, setTab] = useState<'network' | 'location' | 'dns'>('network');
  const [rawOpen, setRawOpen] = useState(false);

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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchDNS = async () => {
    if (!domain.trim()) return;
    try {
      setDnsLoading(true);
      setDnsError(null);
      setDnsResult(null);
      const res = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${domain}&type=A`,
        { headers: { accept: 'application/dns-json' } }
      );
      if (!res.ok) throw new Error('DNS lookup failed');
      setDnsResult(await res.json());
    } catch (err: unknown) {
      setDnsError(err instanceof Error ? err.message : String(err));
    } finally {
      setDnsLoading(false);
    }
  };

  useEffect(() => {
    fetchIPInfo();
  }, []);

  return (
    <ModalWrapper
      onClose={onClose}
      title="IP Inspector"
      subtitle="Pure frontend · Fallback enabled · No data stored"
      size="max-w-2xl">
      <div className="flex items-center gap-3">
        {provider && (
          <span className="badge badge-outline text-xs">via {provider}</span>
        )}
        {vpnDetected && (
          <span className="badge badge-warning badge-outline text-xs">
            ⚠ VPN / shared hosting
          </span>
        )}
        <button
          className="btn btn-ghost btn-xs ml-auto"
          onClick={fetchIPInfo}
          disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            '↺ Refresh'
          )}
        </button>
      </div>
      {error && <div className="alert alert-error py-2 text-sm">{error}</div>}
      <div className="tabs tabs-bordered">
        {(['network', 'location', 'dns'] as const).map((t) => (
          <button
            key={t}
            className={`tab tab-bordered capitalize ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      {tab === 'network' && (
        <div className="flex flex-col gap-2">
          {loading && (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md" />
            </div>
          )}
          {ipInfo && !loading && (
            <>
              <Row label="IP" value={ipInfo.ip} mono />
              <Row label="Version" value={ipInfo.version} />
              <Row label="ASN" value={ipInfo.asn} />
              <Row label="Organization" value={ipInfo.org} />
              <Row label="Timezone" value={ipInfo.timezone} />
              <div className="border-base-300 mt-2 border-t pt-3">
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => setRawOpen((o) => !o)}>
                  {rawOpen ? '▲ Hide raw JSON' : '▼ Show raw JSON'}
                </button>
                {rawOpen && (
                  <pre className="bg-base-200 mt-2 max-h-48 overflow-auto rounded-lg p-3 text-xs">
                    {JSON.stringify(ipInfo, null, 2)}
                  </pre>
                )}
              </div>
            </>
          )}
        </div>
      )}
      {tab === 'location' && (
        <div className="flex flex-col gap-2">
          {loading && (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md" />
            </div>
          )}
          {ipInfo && !loading && (
            <>
              <Row label="Country" value={ipInfo.country_name} />
              <Row label="Region" value={ipInfo.region} />
              <Row label="City" value={ipInfo.city} />
              <Row label="Postal" value={ipInfo.postal} />
              <Row
                label="Coordinates"
                value={
                  ipInfo.latitude && ipInfo.longitude
                    ? `${ipInfo.latitude}, ${ipInfo.longitude}`
                    : undefined
                }
                mono
              />
              {ipInfo.latitude && ipInfo.longitude && (
                <a
                  href={`https://www.openstreetmap.org/?mlat=${ipInfo.latitude}&mlon=${ipInfo.longitude}&zoom=12`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs mt-1 w-fit">
                  View on map ↗
                </a>
              )}
            </>
          )}
        </div>
      )}
      {tab === 'dns' && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              className="input input-bordered input-sm grow font-mono"
              placeholder="example.com"
              value={domain}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDomain(e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') fetchDNS();
              }}
            />
            <button
              className="btn btn-sm btn-primary min-w-[80px]"
              onClick={fetchDNS}
              disabled={dnsLoading || !domain.trim()}>
              {dnsLoading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                'Lookup'
              )}
            </button>
          </div>
          {dnsError && (
            <div className="alert alert-error py-2 text-sm">{dnsError}</div>
          )}
          {dnsResult && !dnsError && (
            <pre className="bg-base-200 max-h-64 overflow-auto rounded-lg p-3 text-xs">
              {JSON.stringify(dnsResult, null, 2)}
            </pre>
          )}
          {!dnsResult && !dnsLoading && !dnsError && (
            <p className="text-base-content/30 py-6 text-center text-sm">
              Enter a domain to look up its A record.
            </p>
          )}
        </div>
      )}
    </ModalWrapper>
  );
};
