import { RepoData } from '../types';
import { LANG_COLORS } from '../constants';
import { fmt } from './format';

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

export async function renderPreview(
  canvas: HTMLCanvasElement,
  repo: RepoData
): Promise<void> {
  const W = 1200,
    H = 630;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, W, H);
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

  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, '#58a6ff');
  grad.addColorStop(0.5, '#a371f7');
  grad.addColorStop(1, '#f78166');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, 4);

  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.crossOrigin = 'anonymous';
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = repo.owner.avatar_url;
    });
    ctx.save();
    ctx.beginPath();
    ctx.arc(128, 128, 48, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, 80, 80, 96, 96);
    ctx.restore();
    ctx.strokeStyle = 'rgba(88,166,255,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(128, 128, 50, 0, Math.PI * 2);
    ctx.stroke();
  } catch {
    /* skip avatar */
  }

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

  const desc = repo.description ?? 'No description provided.';
  ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(139,148,158,0.9)';
  const words = desc.split(' ');
  let line = '',
    y = 200;
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > W - 160 && line) {
      ctx.fillText(line, 80, y);
      line = word;
      y += 38;
      if (y > 290) {
        ctx.fillText(line + '…', 80, y);
        break;
      }
    } else line = test;
  }
  if (y <= 290) ctx.fillText(line, 80, y);

  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, 330);
  ctx.lineTo(W - 80, 330);
  ctx.stroke();

  const stats = [
    { emoji: '⭐', value: fmt(repo.stargazers_count), label: 'stars' },
    { emoji: '🍴', value: fmt(repo.forks_count), label: 'forks' },
    { emoji: '👁', value: fmt(repo.watchers_count), label: 'watching' },
    { emoji: '🐛', value: fmt(repo.open_issues_count), label: 'issues' },
  ];
  let sx = 80;
  for (const s of stats) {
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
  } else sx = 80;

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

  ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = 'rgba(139,148,158,0.35)';
  ctx.fillText(`github.com/${repo.full_name}`, 80, H - 32);
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
