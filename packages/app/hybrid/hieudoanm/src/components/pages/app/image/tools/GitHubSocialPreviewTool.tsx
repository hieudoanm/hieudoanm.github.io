'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { ImageToolConfig } from '../config';
import { downloadBlob, loadImage } from '../lib/canvas';

interface RepoData {
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  owner: { avatar_url: string; login: string };
  html_url: string;
}

const renderPreview = async (canvas: HTMLCanvasElement, repo: RepoData) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = 1200;
  canvas.height = 630;

  const grad = ctx.createLinearGradient(0, 0, 1200, 630);
  grad.addColorStop(0, '#0d1117');
  grad.addColorStop(1, '#161b22');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 630);

  ctx.fillStyle = '#30363d';
  ctx.fillRect(0, 0, 1200, 1);
  ctx.fillRect(0, 629, 1200, 1);
  ctx.fillRect(0, 0, 1, 630);
  ctx.fillRect(1199, 0, 1, 630);

  ctx.fillStyle = '#f0f6fc';
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(repo.full_name, 60, 200);

  if (repo.description) {
    ctx.fillStyle = '#8b949e';
    ctx.font = '24px sans-serif';
    const words = repo.description.split(' ');
    let line = '';
    let y = 280;
    for (const word of words) {
      const test = line + word + ' ';
      if (ctx.measureText(test).width > 1000) {
        ctx.fillText(line.trim(), 60, y);
        line = word + ' ';
        y += 36;
      } else line = test;
    }
    if (line.trim()) ctx.fillText(line.trim(), 60, y);
  }

  ctx.fillStyle = '#8b949e';
  ctx.font = '20px sans-serif';
  ctx.fillText(`★ ${repo.stargazers_count.toLocaleString()}`, 60, 400);
  ctx.fillText(`⑂ ${repo.forks_count.toLocaleString()}`, 60, 440);

  if (repo.language) {
    ctx.fillStyle = '#8b949e';
    ctx.font = '20px sans-serif';
    ctx.fillText(`▸ ${repo.language}`, 60, 480);
  }

  ctx.fillStyle = '#484f58';
  ctx.font = '18px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('github.com/' + repo.full_name, 1140, 570);

  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = repo.owner.avatar_url;
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = rej;
    });
    ctx.save();
    ctx.beginPath();
    ctx.arc(1060, 180, 50, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 1010, 130, 100, 100);
    ctx.restore();
    ctx.strokeStyle = '#30363d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(1060, 180, 51, 0, Math.PI * 2);
    ctx.stroke();
  } catch {
    // skip avatar
  }
};

export const GitHubSocialPreviewTool: FC<{ config: ImageToolConfig }> = ({
  config,
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
    <div className="flex flex-col gap-4">
      <div className="join w-full">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') fetch_(input);
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
      <div className="flex flex-wrap gap-2">
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
      {error && <div className="alert alert-error text-sm">{error}</div>}
      {repo && (
        <>
          <div className="bg-base-200 overflow-hidden rounded-xl">
            <canvas
              ref={canvasRef}
              className="w-full"
              style={{ aspectRatio: '1200/630' }}
            />
          </div>
          <div className="flex items-center gap-3 text-xs opacity-50">
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
    </div>
  );
};
GitHubSocialPreviewTool.displayName = 'GitHubSocialPreviewTool';
