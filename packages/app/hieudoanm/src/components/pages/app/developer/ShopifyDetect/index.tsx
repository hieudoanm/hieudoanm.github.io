import { FC, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { DetectionResult, Tab } from './types';
import { detectFromHTML } from './utils/detect';
import {
  clearHistory as clearStorageHistory,
  loadHistory,
  saveHistory,
} from './utils/storage';

export const ShopifyDetect: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('check');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DetectionResult[]>([]);
  const [history, setHistory] = useState<DetectionResult[]>(loadHistory);

  const checkBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    const urls = input
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);
    if (!urls.length) return;
    setLoading(true);
    setResults([]);
    const newResults: DetectionResult[] = [];
    for (const raw of urls) {
      try {
        const url = raw.startsWith('http') ? raw : `https://${raw}`;
        const res = await fetch(url);
        const html = await res.text();
        newResults.push(detectFromHTML(url, html));
      } catch {
        newResults.push({
          url: raw,
          isShopify: false,
          isPlus: false,
          confidence: 0,
          signals: ['Fetch failed (CORS or network error)'],
          checkedAt: Date.now(),
        });
      }
    }
    setResults(newResults);
    setHistory(saveHistory(newResults));
    setLoading(false);
    setTab('check');
  };
  ShopifyDetect.displayName = 'ShopifyDetect';

  const handleClear = () => {
    clearStorageHistory();
    setHistory([]);
  };

  return (
    <FullScreen centered onClose={onClose} title="Shopify Detector">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="mb-4 flex">
          <button
            className={`flex-1 border-b-2 px-3 py-2 text-sm transition-colors ${
              tab === 'check'
                ? 'border-primary text-primary'
                : 'text-base-content/40 border-transparent'
            }`}
            onClick={() => setTab('check')}>
            🔍 Check
          </button>
          <button
            className={`flex-1 border-b-2 px-3 py-2 text-sm transition-colors ${
              tab === 'history'
                ? 'border-primary text-primary'
                : 'text-base-content/40 border-transparent'
            }`}
            onClick={() => setTab('history')}>
            🕐 History
            {history.length > 0 && (
              <span className="badge badge-xs badge-neutral ml-1">
                {history.length}
              </span>
            )}
          </button>
        </div>
        {tab === 'check' && (
          <div>
            <form onSubmit={checkBatch} className="mb-4 space-y-3">
              <textarea
                className="textarea textarea-bordered h-28 w-full font-mono text-sm"
                placeholder="example.com\nshopify.com\nnike.com"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />{' '}
                    Checking…
                  </>
                ) : (
                  'Check sites'
                )}
              </button>
            </form>
            {results.length > 0 && (
              <div className="space-y-3">
                {results.map((r) => (
                  <div
                    key={r.url}
                    className={`rounded-xl border-2 p-3 ${r.isShopify ? 'border-primary/30 bg-primary/5' : 'border-base-content/30 bg-base-content/5'}`}>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate font-mono text-xs">
                        {r.url}
                      </span>
                      <div className="flex shrink-0 items-center gap-2">
                        {r.isPlus && (
                          <span className="badge badge-xs badge-warning">
                            Plus
                          </span>
                        )}
                        <span className="badge badge-xs badge-outline">
                          {r.confidence}%
                        </span>
                      </div>
                    </div>
                    <div
                      className={`mb-2 text-sm font-normal ${r.isShopify ? 'text-primary' : 'text-base-content/60'}`}>
                      {r.isShopify ? '✔ Shopify detected' : '✖ Not Shopify'}
                    </div>
                    <progress
                      className={`progress mb-2 w-full ${r.isShopify ? 'progress-success' : 'progress-error'}`}
                      value={r.confidence}
                      max={100}
                    />
                    <ul className="ml-3 list-disc space-y-0.5 text-xs opacity-60">
                      {r.signals.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {results.length === 0 && !loading && (
              <p className="text-center text-xs opacity-30">
                Enter one URL per line and hit Check
              </p>
            )}
          </div>
        )}
        {tab === 'history' && (
          <div>
            {history.length > 0 ? (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs opacity-50">
                    {history.length} entries
                  </span>
                  <button
                    className="btn btn-ghost btn-xs text-base-content/60"
                    onClick={handleClear}>
                    Clear all
                  </button>
                </div>
                <ul className="max-h-80 space-y-2 overflow-y-auto">
                  {history.map((h) => (
                    <li
                      key={h.checkedAt}
                      className="border-base-300 flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs">
                      <div className="min-w-0">
                        <p className="truncate font-mono">{h.url}</p>
                        <p className="opacity-40">
                          {new Date(h.checkedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        {h.isPlus && (
                          <span className="badge badge-xs badge-warning">
                            Plus
                          </span>
                        )}
                        <span
                          className={`badge badge-xs ${h.isShopify ? 'badge-success' : 'badge-error'}`}>
                          {h.isShopify ? '✔' : '✖'}
                        </span>
                        <span className="badge badge-xs badge-outline">
                          {h.confidence}%
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="py-8 text-center text-xs opacity-30">
                No history yet
              </p>
            )}
          </div>
        )}
      </div>
    </FullScreen>
  );
};
