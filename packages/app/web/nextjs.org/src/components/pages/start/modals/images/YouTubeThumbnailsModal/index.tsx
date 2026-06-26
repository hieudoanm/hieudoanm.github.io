import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { QUALITIES } from './constants';
import { extractVideoId, thumbUrl } from './utils/youtube';

export const YouTubeThumbnailsModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [input, setInput] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(['maxresdefault', 'hqdefault'])
  );

  const handleExtract = () => {
    const id = extractVideoId(input.trim());
    if (!id) {
      setError('Could not find a valid YouTube video ID.');
      setVideoId(null);
      return;
    }
    setVideoId(id);
    setError(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    if (!videoId) return;
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
      /* */
    } finally {
      setDownloading(null);
    }
  };

  const downloadSelected = async () => {
    if (!videoId) return;
    for (const qId of selected) await downloadOne(qId, `${videoId}-${qId}.jpg`);
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
      <div className="join mb-2 w-full">
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          onKeyDown={onKeyDown}
          placeholder="Paste YouTube URL or video ID…"
          className="input input-bordered join-item w-full text-sm"
        />
        <button
          className="btn join-item btn-primary"
          onClick={handleExtract}
          disabled={!input.trim()}>
          Load
        </button>
      </div>
      <div className="mb-4 flex flex-wrap gap-1">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            className="btn btn-xs btn-ghost font-mono text-[10px]"
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
      {error && <div className="alert alert-error mb-4 text-sm">{error}</div>}
      {videoId && (
        <>
          <div className="mb-4 flex items-center gap-2 text-xs">
            <span className="opacity-40">Video ID:</span>
            <code className="badge badge-neutral font-mono">{videoId}</code>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {QUALITIES.map((q) => {
              const url = thumbUrl(videoId, q.id);
              const isSelected = selected.has(q.id);
              const isDownloading = downloading === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => toggleSelect(q.id)}
                  className={`relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${isSelected ? 'border-primary' : 'border-base-300 opacity-70 hover:opacity-100'}`}>
                  <div
                    className={`absolute top-1.5 left-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full text-xs ${isSelected ? 'bg-primary text-primary-content' : 'bg-base-300/70'}`}>
                    {isSelected ? '✓' : ''}
                  </div>
                  <img
                    src={url}
                    alt={q.label}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="90"%3E%3Crect width="160" height="90" fill="%23374151"/%3E%3Ctext x="80" y="50" font-size="11" fill="%236b7280" text-anchor="middle"%3EN/A%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute right-0 bottom-0 left-0 bg-black/60 px-2 py-1">
                    <p className="text-[10px] font-bold text-white">
                      {q.label}
                    </p>
                    <p className="text-[9px] text-white/50">{q.resolution}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadOne(q.id, `${videoId}-${q.id}.jpg`);
                    }}
                    disabled={isDownloading}
                    className="absolute top-1.5 right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-[10px] text-white hover:bg-black/80">
                    {isDownloading ? '…' : '⬇'}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-primary btn-sm flex-1"
              disabled={selected.size === 0 || !!downloading}
              onClick={downloadSelected}>
              {downloading ? (
                <>
                  <span className="loading loading-spinner loading-xs" />{' '}
                  Downloading…
                </>
              ) : (
                `⬇ Download selected (${selected.size})`
              )}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setSelected(new Set(QUALITIES.map((q) => q.id)))}>
              All
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setSelected(new Set())}>
              None
            </button>
          </div>
        </>
      )}
      {!videoId && !error && (
        <p className="py-4 text-center text-xs opacity-30">
          Supports youtube.com/watch, youtu.be, /embed, /shorts, or raw video ID
        </p>
      )}
      <p className="mt-3 text-center text-xs opacity-30">
        Enter · Load · Esc close
      </p>
    </ModalWrapper>
  );
};
YouTubeThumbnailsModal.displayName = 'YouTubeThumbnailsModal';
