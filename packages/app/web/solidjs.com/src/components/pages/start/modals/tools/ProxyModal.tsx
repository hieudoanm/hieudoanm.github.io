import { createSignal, createMemo } from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

const PROXY_BASE_URL = 'https://hieudoanm-proxy.vercel.app/api?url=';

type TabType = 'curl' | 'fetch' | 'axios' | 'useQuery';

export const ProxyModal = (props: { onClose: () => void }) => {
  const [url, setUrl] = createSignal(
    'https://jsonplaceholder.typicode.com/todos/1'
  );
  const [activeTab, setActiveTab] = createSignal<TabType>('curl');
  const [copied, setCopied] = createSignal(false);

  const snippets = createMemo(() => {
    const encodedUrl = encodeURIComponent(
      url().trim() || 'https://example.com'
    );
    const fullUrl = `${PROXY_BASE_URL}${encodedUrl}`;

    return {
      curl: `curl "${fullUrl}"`,
      fetch: `fetch("${fullUrl}")
  .then(res => res.json())
  .then(console.log);`,
      axios: `import axios from 'axios';

axios.get("${fullUrl}")
  .then(res => console.log(res.data));`,
      useQuery: `import { useQuery } from '@tanstack/react-query';

const { data, isPending, error } = useQuery({
  queryKey: ['proxy', "${url().trim() || 'https://example.com'}"],
  queryFn: () => fetch("${fullUrl}").then(res => res.json()),
});`,
    };
  });

  const copyToClipboard = async () => {
    const text = snippets()[activeTab()];
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <ModalWrapper
      onClose={props.onClose}
      title="CORS Proxy Generator"
      subtitle="Bypass CORS restrictions using a simple proxy service."
      size="max-w-2xl">
      {/* Input Section */}
      <div class="flex flex-col gap-2">
        <label class="text-base-content/70 text-xs font-semibold tracking-wider uppercase">
          Target URL
        </label>
        <input
          type="text"
          placeholder="https://api.example.com/data"
          class="input input-bordered w-full font-mono text-sm"
          value={url()}
          onChange={(e: Event) => setUrl((e.target as HTMLInputElement).value)}
        />
      </div>

      {/* Tabs and Code Section */}
      <div class="flex flex-col gap-3">
        <div role="tablist" class="tabs tabs-boxed">
          {(['curl', 'fetch', 'axios', 'useQuery'] as TabType[]).map((t) => (
            <button
              key={t}
              role="tab"
              class={`tab capitalize ${activeTab() === t ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(t)}>
              {t === 'useQuery' ? 'TanStack Query' : t}
            </button>
          ))}
        </div>

        <div class="relative">
          <pre class="bg-base-300 min-h-[120px] overflow-x-auto rounded-lg p-4 font-mono text-sm break-all whitespace-pre-wrap">
            {snippets()[activeTab()]}
          </pre>
          <button
            class="btn btn-primary btn-xs absolute top-2 right-2"
            onClick={copyToClipboard}>
            {copied() ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Footer info */}
      <div class="alert alert-info bg-info/10 border-info/20 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-4 w-4 shrink-0 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-xs">
          This uses a public Vercel deployment of a simple proxy. For
          production, consider hosting your own.
        </span>
      </div>
    </ModalWrapper>
  );
};
