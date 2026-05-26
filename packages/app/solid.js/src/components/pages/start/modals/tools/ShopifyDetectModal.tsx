import { createSignal } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

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

type Tab = 'check' | 'history';

export const ShopifyDetectModal = (props: { onClose: () => void }) => {
  const [tab, setTab] = createSignal<Tab>('check');
  const [input, setInput] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [results, setResults] = createSignal<DetectionResult[]>([]);
  const [history, setHistory] = createSignal<DetectionResult[]>(loadHistory);

  const checkBatch = async (e: Event) => {
    e.preventDefault();
    const urls = input()
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
    <ModalWrapper
      onClose={props.onClose}
      title="Shopify Detector"
      size="max-w-lg">
      {/* Tabs */}
      <div role="tablist" class="tabs tabs-boxed mb-4">
        <a
          role="tab"
          class={`tab flex-1 ${tab() === 'check' ? 'tab-active' : ''}`}
          onClick={() => setTab('check')}>
          🔍 Check
        </a>
        <a
          role="tab"
          class={`tab flex-1 ${tab() === 'history' ? 'tab-active' : ''}`}
          onClick={() => setTab('history')}>
          🕐 History
          {history().length > 0 && (
            <span class="badge badge-xs badge-neutral ml-1">
              {history().length}
            </span>
          )}
        </a>
      </div>

      {tab() === 'check' && (
        <div>
          <form onSubmit={checkBatch} class="mb-4 space-y-3">
            <textarea
              class="textarea textarea-bordered h-28 w-full font-mono text-sm"
              placeholder={`example.com\nshopify.com\nnike.com`}
              value={input()}
              onChange={(e: Event) =>
                setInput((e.target as HTMLTextAreaElement).value)
              }
              required
            />
            <button
              type="submit"
              class="btn btn-primary w-full"
              disabled={loading()}>
              {loading() ? (
                <>
                  <span class="loading loading-spinner loading-xs" /> Checking…
                </>
              ) : (
                'Check sites'
              )}
            </button>
          </form>

          {results().length > 0 && (
            <div class="space-y-3">
              {results().map((r) => (
                <div
                  key={r.url}
                  class={`rounded-xl border-2 p-3 ${
                    r.isShopify
                      ? 'border-success/30 bg-success/5'
                      : 'border-error/30 bg-error/5'
                  }`}>
                  <div class="mb-2 flex items-center justify-between gap-2">
                    <span class="min-w-0 truncate font-mono text-xs">
                      {r.url}
                    </span>
                    <div class="flex shrink-0 items-center gap-2">
                      {r.isPlus && (
                        <span class="badge badge-xs badge-warning">Plus</span>
                      )}
                      <span class="badge badge-xs badge-outline">
                        {r.confidence}%
                      </span>
                    </div>
                  </div>

                  <div
                    class={`mb-2 text-sm font-semibold ${r.isShopify ? 'text-success' : 'text-error'}`}>
                    {r.isShopify ? '✔ Shopify detected' : '✖ Not Shopify'}
                  </div>

                  <progress
                    class={`progress mb-2 w-full ${r.isShopify ? 'progress-success' : 'progress-error'}`}
                    value={r.confidence}
                    max={100}
                  />

                  <ul class="ml-3 list-disc space-y-0.5 text-xs opacity-60">
                    {r.signals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {results().length === 0 && !loading() && (
            <p class="text-center text-xs opacity-30">
              Enter one URL per line and hit Check
            </p>
          )}
        </div>
      )}

      {tab() === 'history' && (
        <div>
          {history().length > 0 ? (
            <>
              <div class="mb-3 flex items-center justify-between">
                <span class="text-xs opacity-50">
                  {history().length} entries
                </span>
                <button
                  class="btn btn-ghost btn-xs text-error"
                  onClick={clearHistory}>
                  Clear all
                </button>
              </div>
              <ul class="max-h-80 space-y-2 overflow-y-auto">
                {history().map((h) => (
                  <li
                    key={h.checkedAt}
                    class="border-base-300 flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs">
                    <div class="min-w-0">
                      <p class="truncate font-mono">{h.url}</p>
                      <p class="opacity-40">
                        {new Date(h.checkedAt).toLocaleString()}
                      </p>
                    </div>
                    <div class="flex shrink-0 items-center gap-1.5">
                      {h.isPlus && (
                        <span class="badge badge-xs badge-warning">Plus</span>
                      )}
                      <span
                        class={`badge badge-xs ${h.isShopify ? 'badge-success' : 'badge-error'}`}>
                        {h.isShopify ? '✔' : '✖'}
                      </span>
                      <span class="badge badge-xs badge-outline">
                        {h.confidence}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p class="py-8 text-center text-xs opacity-30">No history yet</p>
          )}
        </div>
      )}
    </ModalWrapper>
  );
};
