import { FC, useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type Language = { name: string; color: string };
type RepoData = {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  owner: { login: string; avatar_url: string };
  license: { spdx_id: string } | null;
  open_issues_count: number;
};

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Nix: '#7e7eff',
};

const fmt = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

/* ------------------------------------------------------------------ */
/* Canvas renderer                                                      */
/* ------------------------------------------------------------------ */

async function renderPreview(
  canvas: HTMLCanvasElement,
  repo: RepoData
): Promise<void> {
  const W = 1200,
    H = 630;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, W, H);

  // Subtle grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Top accent bar
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#58a6ff');
  grad.addColorStop(0.5, '#a371f7');
  grad.addColorStop(1, '#f78166');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, 4);

  // Avatar
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.crossOrigin = 'anonymous';
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = repo.owner.avatar_url;
    });
    const AX = 80,
      AY = 80,
      AR = 48;
    ctx.save();
    ctx.beginPath();
    ctx.arc(AX + AR, AY + AR, AR, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, AX, AY, AR * 2, AR * 2);
    ctx.restore();
    // Avatar ring
    ctx.strokeStyle = 'rgba(88,166,255,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(AX + AR, AY + AR, AR + 2, 0, Math.PI * 2);
    ctx.stroke();
  } catch {
    /* skip avatar on CORS fail */
  }

  // Owner / repo name
  const [owner, repoName] = repo.full_name.split('/');
  ctx.font =
    '500 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(139,148,158,1)';
  ctx.fillText(owner + ' /', 192, 118);
  const ownerW = ctx.measureText(owner + ' /').width;

  ctx.font =
    'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#58a6ff';
  ctx.fillText(repoName, 192 + ownerW + 6, 118);

  // Description
  const desc = repo.description ?? 'No description provided.';
  const maxW = W - 160;
  ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(139,148,158,0.9)';
  // Word-wrap
  const words = desc.split(' ');
  let line = '',
    y = 200;
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, 80, y);
      line = word;
      y += 38;
      if (y > 290) {
        ctx.fillText(line + '…', 80, y);
        break;
      }
    } else {
      line = test;
    }
  }
  if (y <= 290) ctx.fillText(line, 80, y);

  // Divider
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 330);
  ctx.lineTo(W - 80, 330);
  ctx.stroke();

  // Stats row
  const stats = [
    { emoji: '⭐', value: fmt(repo.stargazers_count), label: 'stars' },
    { emoji: '🍴', value: fmt(repo.forks_count), label: 'forks' },
    { emoji: '👁', value: fmt(repo.watchers_count), label: 'watching' },
    { emoji: '🐛', value: fmt(repo.open_issues_count), label: 'issues' },
  ];
  let sx = 80;
  for (const s of stats) {
    // Pill background
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    roundRect(ctx, sx, 355, 200, 56, 10);
    ctx.fill();
    ctx.font =
      'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = '#e6edf3';
    ctx.fillText(`${s.emoji} ${s.value}`, sx + 16, 386);
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(139,148,158,0.7)';
    ctx.fillText(s.label, sx + 16, 402);
    sx += 220;
  }

  // Language badge
  if (repo.language) {
    const color = LANG_COLORS[repo.language] ?? '#8b949e';
    const ly = 448;
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    const lw = ctx.measureText(repo.language).width + 52;
    roundRect(ctx, 80, ly, lw, 40, 20);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(104, ly + 20, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.font =
      '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = '#e6edf3';
    ctx.fillText(repo.language, 120, ly + 26);
    sx = 80 + lw + 12;
  } else {
    sx = 80;
  }

  // License badge
  if (repo.license) {
    const ly = 448;
    const ltext = repo.license.spdx_id;
    ctx.font =
      '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    const lw2 = ctx.measureText(ltext).width + 36;
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    roundRect(ctx, sx, ly, lw2, 40, 20);
    ctx.fill();
    ctx.fillStyle = 'rgba(139,148,158,0.8)';
    ctx.fillText('⚖ ' + ltext, sx + 12, ly + 26);
    sx += lw2 + 12;
  }

  // Topics
  if (repo.topics.length > 0) {
    const ly = 508;
    let tx = 80;
    ctx.font =
      '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    for (const topic of repo.topics.slice(0, 6)) {
      const tw = ctx.measureText(topic).width + 24;
      if (tx + tw > W - 80) break;
      ctx.fillStyle = 'rgba(56,139,253,0.15)';
      roundRect(ctx, tx, ly, tw, 32, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56,139,253,0.3)';
      ctx.lineWidth = 1;
      roundRect(ctx, tx, ly, tw, 32, 16);
      ctx.stroke();
      ctx.fillStyle = '#58a6ff';
      ctx.fillText(topic, tx + 12, ly + 22);
      tx += tw + 8;
    }
  }

  // Bottom: github.com/owner/repo watermark
  ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(139,148,158,0.35)';
  ctx.fillText(`github.com/${repo.full_name}`, 80, H - 32);

  // GitHub mark (simple octocat-ish circle)
  ctx.fillStyle = 'rgba(139,148,158,0.25)';
  ctx.beginPath();
  ctx.arc(W - 100, H - 44, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0d1117';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('G', W - 100, H - 36);
  ctx.textAlign = 'left';
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

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
    if (repo && canvasRef.current) {
      renderPreview(canvasRef.current, repo).catch(console.error);
    }
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
      const data: RepoData = await res.json();
      setRepo(data);
    } catch (e: any) {
      setError(e.message ?? 'Failed to fetch repository.');
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') fetch_(input);
    if (e.key === 'Escape') onClose();
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
        /* fallback: just download */ download();
      }
    });
  };

  return (
    <dialog
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-box w-full max-w-2xl">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>

        <h3 className="mb-4 text-center text-lg font-bold">
          GitHub Social Preview
        </h3>

        {/* Input */}
        <div className="join mb-4 w-full">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
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

        {/* Quick examples */}
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

        {/* Error */}
        {error && <div className="alert alert-error mb-4 text-sm">{error}</div>}

        {/* Canvas preview */}
        {repo && (
          <>
            <div className="bg-base-200 mb-3 overflow-hidden rounded-xl">
              <canvas
                ref={canvasRef}
                className="w-full"
                style={{ aspectRatio: '1200/630' }}
              />
            </div>

            {/* Meta */}
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

            {/* Actions */}
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

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
