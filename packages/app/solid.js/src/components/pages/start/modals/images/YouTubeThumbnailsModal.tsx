import { createSignal } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type Quality = {
  id: string;
  label: string;
  description: string;
  resolution: string;
};

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const QUALITIES: Quality[] = [
  {
    id: 'maxresdefault',
    label: 'Max Resolution',
    description: 'Best quality',
    resolution: '1280×720',
  },
  {
    id: 'sddefault',
    label: 'SD',
    description: 'Standard',
    resolution: '640×480',
  },
  {
    id: 'hqdefault',
    label: 'HQ',
    description: 'High quality',
    resolution: '480×360',
  },
  {
    id: 'mqdefault',
    label: 'MQ',
    description: 'Medium',
    resolution: '320×180',
  },
  {
    id: 'default',
    label: 'Default',
    description: 'Smallest',
    resolution: '120×90',
  },
  {
    id: '0',
    label: 'Frame 0',
    description: 'Start frame',
    resolution: '480×360',
  },
  {
    id: '1',
    label: 'Frame 1',
    description: 'Mid frame 1',
    resolution: '120×90',
  },
  {
    id: '2',
    label: 'Frame 2',
    description: 'Mid frame 2',
    resolution: '120×90',
  },
  {
    id: '3',
    label: 'Frame 3',
    description: 'Mid frame 3',
    resolution: '120×90',
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m?.[1]) return m[1];
  }
  return null;
};

const thumbUrl = (videoId: string, quality: string) =>
  `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const YouTubeThumbnailsModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [input, setInput] = createSignal('');
  const [videoId, setVideoId] = createSignal<string | null>(null);
  const [error, setError] = createSignal<string | null>(null);
  const [downloading, setDownloading] = createSignal<string | null>(null);
  const [selected, setSelected] = createSignal<Set<string>>(
    new Set(['maxresdefault', 'hqdefault'])
  );

  const handleExtract = () => {
    const id = extractVideoId(input().trim());
    if (!id) {
      setError('Could not find a valid YouTube video ID.');
      setVideoId(null);
      return;
    }
    setVideoId(id);
    setError(null);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleExtract();
    if (e.key === 'Escape') onClose();
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const downloadOne = async (qualityId: string, filename: string) => {
    if (!videoId()) return;
    setDownloading(qualityId);
    try {
      const res = await fetch(thumbUrl(videoId, qualityId));
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* silently ignore — image may not exist at that quality */
    } finally {
      setDownloading(null);
    }
  };

  const downloadSelected = async () => {
    if (!videoId()) return;
    for (const qId of selected) {
      await downloadOne(qId, `${videoId}-${qId}.jpg`);
    }
  };

  const EXAMPLES = [
    'https://www.youtube.com/watch?v=owosAu5aycM',
    'https://youtu.be/dQw4w9WgXcQ',
  ];

  return (
    <ModalWrapper
      onClose={onClose}
      title="YouTube Thumbnail Downloader"
      size="max-w-xl">
      {/* Input */}
      <div class="join mb-2 w-full">
        <input
          autoFocus
          type="text"
          value={input()}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          onKeyDown={onKeyDown}
          placeholder="Paste YouTube URL or video ID…"
          class="input input-bordered join-item w-full text-sm"
        />
        <button
          class="btn join-item btn-primary"
          onClick={handleExtract}
          disabled={!input().trim()}>
          Load
        </button>
      </div>

      {/* Examples */}
      <div class="mb-4 flex flex-wrap gap-1">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            class="btn btn-xs btn-ghost font-mono text-[10px]"
            onClick={() => {
              setInput(ex);
              const id = extractVideoId(ex);
              setVideoId(id);
              setError(null);
            }}>
            {ex.slice(0, 38)}…
          </button>
        ))}
      </div>

      {error() && <div class="alert alert-error mb-4 text-sm">{error()}</div>}

      {videoId() && (
        <>
          {/* Video ID badge */}
          <div class="mb-4 flex items-center gap-2 text-xs">
            <span class="opacity-40">Video ID:</span>
            <code class="badge badge-neutral font-mono">{videoId()}</code>
          </div>

          {/* Thumbnail grid */}
          <div class="mb-4 grid grid-cols-3 gap-2">
            {QUALITIES.map((q) => {
              const url = thumbUrl(videoId(), q.id);
              const isSelected = selected().has(q.id);
              const isDownloading = downloading() === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => toggleSelect(q.id)}
                  class={`relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-primary'
                      : 'border-base-300 opacity-70 hover:opacity-100'
                  }`}>
                  {/* Checkbox indicator */}
                  <div
                    class={`absolute top-1.5 left-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                      isSelected
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-300/70'
                    }`}>
                    {isSelected ? '✓' : ''}
                  </div>

                  {/* Thumbnail */}
                  <img
                    src={url}
                    alt={q.label}
                    class="aspect-video w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="90"%3E%3Crect width="160" height="90" fill="%23374151"/%3E%3Ctext x="80" y="50" font-size="11" fill="%236b7280" text-anchor="middle"%3EN/A%3C/text%3E%3C/svg%3E';
                    }}
                  />

                  {/* Label overlay */}
                  <div class="absolute right-0 bottom-0 left-0 bg-black/60 px-2 py-1">
                    <p class="text-[10px] font-bold text-white">{q.label}</p>
                    <p class="text-[9px] text-white/50">{q.resolution}</p>
                  </div>

                  {/* Download single button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadOne(q.id, `${videoId()}-${q.id}.jpg`);
                    }}
                    disabled={isDownloading}
                    class="absolute top-1.5 right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-[10px] text-white hover:bg-black/80">
                    {isDownloading ? '…' : '⬇'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bulk actions */}
          <div class="flex items-center gap-2">
            <button
              class="btn btn-primary btn-sm flex-1"
              disabled={selected().size === 0 || !!downloading()}
              onClick={downloadSelected}>
              {downloading() ? (
                <>
                  <span class="loading loading-spinner loading-xs" />{' '}
                  Downloading…
                </>
              ) : (
                `⬇ Download selected (${selected().size})`
              )}
            </button>
            <button
              class="btn btn-ghost btn-sm"
              onClick={() => setSelected(new Set(QUALITIES.map((q) => q.id)))}>
              All
            </button>
            <button
              class="btn btn-ghost btn-sm"
              onClick={() => setSelected(new Set())}>
              None
            </button>
          </div>
        </>
      )}

      {!videoId() && !error() && (
        <p class="py-4 text-center text-xs opacity-30">
          Supports youtube.com/watch, youtu.be, /embed, /shorts, or raw video ID
        </p>
      )}

      <p class="mt-3 text-center text-xs opacity-30">
        Enter · Load · Esc close
      </p>
    </ModalWrapper>
  );
};
