import { FC, SubmitEvent, useState } from 'react';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

/* ------------------------------------------------------------------ */
/* Types + Engine                                                       */
/* ------------------------------------------------------------------ */

type DetectionResult = {
  url: string;
  isShopify: boolean;
  isPlus: boolean;
  confidence: number;
  signals: string[];
  checkedAt: number;
};

const detectFromHTML = (url: string, html: string): DetectionResult => {
  const h = html.toLowerCase();
  const signals: string[] = [];
  let score = 0;

  if (h.includes('cdn.shopify.com')) {
    signals.push('cdn.shopify.com found');
    score += 40;
  }
  if (h.includes('shopify-section')) {
    signals.push('shopify-section class found');
    score += 30;
  }
  if (h.includes('shopify')) {
    signals.push('shopify keyword found');
    score += 10;
  }

  let isPlus = false;
  if (h.includes('shopify plus') || h.includes('shopify-plus')) {
    isPlus = true;
    signals.push('Shopify Plus marker found');
    score += 20;
  }

  return {
    url,
    isShopify: score >= 40,
    isPlus,
    confidence: Math.min(score, 100),
    signals,
    checkedAt: Date.now(),
  };
};

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'shopify-history';

const loadHistory = (): DetectionResult[] => {
  if (typeof window === 'undefined') return [];
  try {
    const h = localStorage.getItem(STORAGE_KEY);
    return h ? JSON.parse(h) : [];
  } catch {
    return [];
  }
};

const saveHistory = (items: DetectionResult[]) => {
  try {
    const existing = loadHistory();
    const merged = [...items, ...existing].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return items;
  }
};

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

type Tab = 'check' | 'history';

export const ShopifyDetectModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<Tab>('check');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DetectionResult[]>([]);
  const [history, setHistory] = useState<DetectionResult[]>(loadHistory);

  const checkBatch = async (e: SubmitEvent) => {
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

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  return (
    <ModalWrapper onClose={onClose} title="Shopify Detector" size="max-w-lg">
      {/* Tabs */}
      <div role="tablist" className="tabs tabs-boxed mb-4">
        <a
          role="tab"
          className={`tab flex-1 ${tab === 'check' ? 'tab-active' : ''}`}
          onClick={() => setTab('check')}>
          🔍 Check
        </a>
        <a
          role="tab"
          className={`tab flex-1 ${tab === 'history' ? 'tab-active' : ''}`}
          onClick={() => setTab('history')}>
          🕐 History
          {history.length > 0 && (
            <span className="badge badge-xs badge-neutral ml-1">
              {history.length}
            </span>
          )}
        </a>
      </div>

      {/* ── Check tab ── */}
      {tab === 'check' && (
        <div>
          <form onSubmit={checkBatch} className="mb-4 space-y-3">
            <textarea
              className="textarea textarea-bordered h-28 w-full font-mono text-sm"
              placeholder={`example.com\nshopify.com\nnike.com`}
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
                  className={`rounded-xl border-2 p-3 ${
                    r.isShopify
                      ? 'border-success/30 bg-success/5'
                      : 'border-error/30 bg-error/5'
                  }`}>
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
                    className={`mb-2 text-sm font-semibold ${r.isShopify ? 'text-success' : 'text-error'}`}>
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

      {/* ── History tab ── */}
      {tab === 'history' && (
        <div>
          {history.length > 0 ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs opacity-50">
                  {history.length} entries
                </span>
                <button
                  className="btn btn-ghost btn-xs text-error"
                  onClick={clearHistory}>
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
    </ModalWrapper>
  );
};
