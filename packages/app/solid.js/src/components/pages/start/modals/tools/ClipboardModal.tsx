import { createSignal, createEffect } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

const createClipboard = () => {
  const clipboard =
    typeof navigator !== 'undefined' ? navigator.clipboard : null;
  return {
    copy: async (text: string) => {
      if (clipboard) await clipboard.writeText(text);
    },
    paste: async () => {
      if (clipboard) return clipboard.readText();
      return '';
    },
    isSupported: () => clipboard !== null,
  };
};

const createStorage = <T,>(
  type: 'local' | 'session',
  _default?: unknown
): {
  get: (key: string) => T | null;
  set: (key: string, value: T) => void;
  remove: (key: string) => void;
} => {
  const store = type === 'local' ? localStorage : sessionStorage;
  return {
    get: (key: string) => {
      const v = store.getItem(key);
      return v ? JSON.parse(v) : null;
    },
    set: (key: string, value: T) => store.setItem(key, JSON.stringify(value)),
    remove: (key: string) => store.removeItem(key),
  };
};

type ClipItem = {
  id: string;
  content: string;
  createdAt: number;
};

type ClipboardSchema = {
  clips: ClipItem[];
};

const clipboard = createClipboard();

const storage = createStorage<ClipboardSchema>('local', {
  namespace: 'clipboard',
});

export const ClipboardModal = (props: { onClose: () => void }) => {
  const [clips, setClips] = createSignal<ClipItem[]>([]);
  const [loading, setLoading] = createSignal(false);
  const [tab, setTab] = createSignal<'history' | 'preview'>('history');
  const [selected, setSelected] = createSignal<ClipItem | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  const loadClips = () => {
    const saved = storage.get('clips');
    setClips(saved ?? []);
  };

  const saveClips = (next: ClipItem[]) => {
    setClips(next);
    storage.set('clips', next);
  };

  const addClip = (text: string) => {
    if (!text.trim()) return;

    const next = [
      { id: crypto.randomUUID(), content: text, createdAt: Date.now() },
      ...clips().filter((c) => c.content !== text),
    ].slice(0, 50);

    saveClips(next);
  };

  const capture = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!clipboard.isSupported()) {
        setError('Clipboard API not supported');
        return;
      }

      const text = await clipboard.paste();
      addClip(text);
    } catch {
      setError('Clipboard read blocked (requires user interaction)');
    } finally {
      setLoading(false);
    }
  };

  const copy = async (text: string) => {
    try {
      await clipboard.copy(text);
    } catch {
      setError('Clipboard write failed');
    }
  };

  const remove = (id: string) => {
    const next = clips().filter((c) => c.id !== id);
    saveClips(next);

    if (selected()?.id === id) {
      setSelected(null);
      setTab('history');
    }
  };

  const clearAll = () => {
    storage.remove('clips');
    setClips([]);
    setSelected(null);
  };

  createEffect(() => {
    loadClips();
    capture();
  });

  return (
    <ModalWrapper
      onClose={props.onClose}
      title="Clipboard Manager"
      subtitle="Local history · Sync storage · navigator.clipboard"
      size="max-w-2xl">
      {/* Actions */}
      <div class="flex items-center gap-2">
        <button
          class="btn btn-xs btn-primary"
          onClick={capture}
          disabled={loading()}>
          {loading() ? (
            <span class="loading loading-spinner loading-xs" />
          ) : (
            'Capture'
          )}
        </button>

        <button
          class="btn btn-xs btn-ghost"
          onClick={clearAll}
          disabled={!clips().length}>
          Clear
        </button>

        <span class="ml-auto text-xs opacity-50">{clips().length} items</span>
      </div>

      {error() && <div class="alert alert-error py-2 text-sm">{error()}</div>}

      {/* Tabs */}
      <div class="tabs tabs-bordered">
        {(['history', 'preview'] as const).map((t) => (
          <button
            key={t}
            class={`tab tab-bordered capitalize ${tab() === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* HISTORY */}
      {tab() === 'history' && (
        <div class="flex max-h-80 flex-col gap-2 overflow-auto">
          {clips().map((c) => (
            <div
              key={c.id}
              class="bg-base-200 flex items-center gap-2 rounded-lg p-2">
              <button
                class="flex-1 truncate text-left text-sm"
                onClick={() => {
                  setSelected(c);
                  setTab('preview');
                }}>
                {c.content}
              </button>

              <button class="btn btn-xs" onClick={() => copy(c.content)}>
                Copy
              </button>

              <button class="btn btn-xs btn-ghost" onClick={() => remove(c.id)}>
                ✕
              </button>
            </div>
          ))}

          {!clips().length && (
            <p class="text-base-content/30 py-8 text-center text-sm">
              Clipboard is empty
            </p>
          )}
        </div>
      )}

      {/* PREVIEW */}
      {tab() === 'preview' && (
        <div class="flex flex-col gap-3">
          {selected() ? (
            <>
              <pre class="bg-base-200 max-h-64 overflow-auto rounded-lg p-3 text-xs">
                {selected()!.content}
              </pre>

              <div class="flex gap-2">
                <button
                  class="btn btn-sm btn-primary"
                  onClick={() => copy(selected()!.content)}>
                  Copy
                </button>

                <button
                  class="btn btn-sm btn-ghost"
                  onClick={() => setTab('history')}>
                  Back
                </button>
              </div>
            </>
          ) : (
            <p class="text-base-content/30 py-8 text-center text-sm">
              Select an item to preview
            </p>
          )}
        </div>
      )}
    </ModalWrapper>
  );
};
