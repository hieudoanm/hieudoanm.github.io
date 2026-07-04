import { FC, useEffect, useRef, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { RepoData } from './types';
import { renderPreview } from './utils/render';

export const GitHubSocialPreviewModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repo, setRepo] = useState<RepoData | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (repo && canvasRef.current)
      renderPreview(canvasRef.current, repo).catch(console.error);
  }, [repo]);

  const fetch_ = async (slug: string) => {
    const clean = slug.trim().replace(/^https?:\/\/github\.com\//, '');
    if (!clean || !clean.includes('/')) {
      setError('Enter a valid repo in owner/repo format.');
      return;
    }
    setLoading(true);
    setError(null);
    setRepo(null);
    try {
      const res = await fetch(`https://api.github.com/repos/${clean}`);
      if (!res.ok)
        throw new Error(
          res.status === 404 ? 'Repository not found.' : 'GitHub API error.'
        );
      setRepo(await res.json());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to fetch repository.');
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!canvasRef.current || !repo) return;
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = `${repo.full_name.replace('/', '-')}-preview.png`;
    a.click();
  };

  const copy = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
      } catch {
        download();
      }
    });
  };

  return (
    <FullScreen onClose={onClose} title="GitHub Social Preview">
      <div className="join mb-4 w-full">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') fetch_(input);
            if (e.key === 'Escape') onClose();
          }}
          placeholder="owner/repo or github.com/owner/repo"
          className="input input-bordered join-item w-full font-mono text-sm"
        />
        <button
          className="btn join-item btn-primary"
          disabled={loading || !input.trim()}
          onClick={() => fetch_(input)}>
          {loading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            'Generate'
          )}
        </button>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {['vercel/next.js', 'facebook/react', 'hieudoanm/hieudoanm'].map(
          (ex) => (
            <button
              key={ex}
              className="btn btn-xs btn-ghost font-mono"
              onClick={() => {
                setInput(ex);
                fetch_(ex);
              }}>
              {ex}
            </button>
          )
        )}
      </div>
      {error && <div className="alert alert-error mb-4 text-sm">{error}</div>}
      {repo && (
        <>
          <div className="bg-base-200 mb-3 overflow-hidden rounded-xl">
            <canvas
              ref={canvasRef}
              className="w-full"
              style={{ aspectRatio: '1200/630' }}
            />
          </div>
          <div className="mb-4 flex items-center gap-3 text-xs opacity-50">
            <span>1200 × 630 px</span>
            <span>·</span>
            <span>{repo.full_name}</span>
            {repo.language && (
              <>
                <span>·</span>
                <span>{repo.language}</span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm flex-1"
              onClick={download}>
              ⬇ Download PNG
            </button>
            <button className="btn btn-ghost btn-sm" onClick={copy}>
              📋 Copy
            </button>
          </div>
        </>
      )}
      {!repo && !loading && !error && (
        <p className="py-6 text-center text-xs opacity-30">
          Enter a GitHub repository to generate its social preview image
        </p>
      )}
    </FullScreen>
  );
};
GitHubSocialPreviewModal.displayName = 'GitHubSocialPreviewModal';
