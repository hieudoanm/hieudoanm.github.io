const BLOCKED_DOMAINS: ReadonlyArray<string> = [
  'facebook.com',
  'twitter.com',
  'x.com',
  'instagram.com',
  'reddit.com',
  'tiktok.com',
  'youtube.com',
  'netflix.com',
  'twitch.tv',
  'discord.com',
];

const BETTER_SITES: ReadonlyArray<{ label: string; url: string }> = [
  { label: 'Read a book', url: 'https://openlibrary.org/' },
  { label: 'Learn', url: 'https://www.khanacademy.org/' },
  { label: 'Code', url: 'https://github.com/' },
  { label: 'Write', url: 'https://draftin.com/' },
  { label: 'Hacker News', url: 'https://news.ycombinator.com/' },
  { label: 'Podcasts', url: 'https://podcasts.apple.com/' },
  {
    label: 'Stretch',
    url: 'https://www.youtube.com/results?search_query=10+minute+stretch',
  },
  {
    label: 'Breathe',
    url: 'https://www.youtube.com/results?search_query=5+minute+guided+meditation',
  },
];

const SUGGESTIONS: ReadonlyArray<string> = [
  'Go for a 10-minute walk.',
  'Drink a glass of water.',
  'Stretch your shoulders.',
  'Text someone you care about.',
  'Tidy one small corner of your room.',
  'Write one paragraph of anything.',
  'Read one page of a book.',
  'Do 15 push-ups.',
  'Plan tomorrow in three bullet points.',
  'Make a healthy snack.',
  'Learn one thing you do not know.',
  'Call a friend or family member.',
  'Look out the window for a minute.',
  'Clean your desk.',
  'Take 5 deep breaths.',
  'Reply to an old message.',
  'Water your plants.',
  'Make a to-do list for today.',
  'Listen to one song you love.',
  'Do a short stretch.',
];

const BLOCKED_STARTED_AT = 'bored_blocked_started_at';
const SPIN_BASE_DELAY_MS = 40;
const SPIN_DURATION_MS = 2400;

function normalizeHostname(hostname: string): string {
  return hostname.replace(/^www\./, '').toLowerCase();
}

function isBlocked(hostname: string): boolean {
  const host = normalizeHostname(hostname);
  return BLOCKED_DOMAINS.some(
    (domain) => host === domain || host.endsWith(`.${domain}`)
  );
}

export function pickRandom<T>(items: ReadonlyArray<T>): T {
  return items[Math.floor(Math.random() * items.length)] ?? items[0];
}

function rememberBlockedAt(): void {
  if (!sessionStorage.getItem(BLOCKED_STARTED_AT)) {
    sessionStorage.setItem(BLOCKED_STARTED_AT, String(Date.now()));
  }
}

function pause(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function buildStyles(): string {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: radial-gradient(circle at top, #1f2937, #0f172a);
      color: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem 1rem;
    }
    .bored-wall { max-width: 640px; width: 100%; text-align: center; }
    .bored-ball { font-size: 4rem; margin-bottom: 0.5rem; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    .lede { color: #94a3b8; margin-bottom: 1rem; }
    .domain {
      display: inline-block;
      margin-bottom: 1.5rem;
      padding: 0.4rem 1rem;
      background: #1e293b;
      border-radius: 9999px;
      font-family: monospace;
      font-size: 0.9rem;
      color: #ef4444;
    }
    h2 { font-size: 1.15rem; margin: 1.5rem 0 0.75rem; color: #cbd5e1; }
    .better-sites { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.6rem; }
    .better-sites a {
      color: #0f172a;
      background: #f59e0b;
      text-decoration: none;
      font-weight: 600;
      padding: 0.6rem 0.8rem;
      border-radius: 0.6rem;
      transition: transform 0.12s ease, background 0.12s ease;
    }
    .better-sites a:hover { transform: translateY(-2px); background: #fbbf24; }
    .wheel { margin-top: 2rem; }
    .wheel-display {
      min-height: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.9rem 1.2rem;
      background: #1e293b;
      border: 2px solid #334155;
      border-radius: 1rem;
      font-size: 1.05rem;
      line-height: 1.4;
      color: #e2e8f0;
    }
    .wheel-display.spinning { color: #94a3b8; font-style: italic; }
    .wheel-button {
      margin-top: 0.9rem;
      border: none;
      cursor: pointer;
      font: inherit;
      font-size: 1rem;
      font-weight: 700;
      color: #0f172a;
      background: linear-gradient(90deg, #ef4444, #f59e0b);
      padding: 0.8rem 1.8rem;
      border-radius: 9999px;
      transition: transform 0.12s ease, filter 0.12s ease;
    }
    .wheel-button:hover { transform: translateY(-2px); filter: brightness(1.05); }
    .wheel-button:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  `;
}

function createBetterSitesHtml(): string {
  return BETTER_SITES.map(
    (site) =>
      `<a href="${site.url}" target="_blank" rel="noopener noreferrer">${site.label}</a>`
  ).join('');
}

function buildWall(): {
  root: HTMLElement;
  wheelDisplay: HTMLElement;
  wheelButton: HTMLButtonElement;
} {
  const domain = window.location.hostname;

  const root = document.createElement('div');
  root.className = 'bored-wall';
  root.innerHTML = `
    <div class="bored-ball">🎲</div>
    <h1>Feeling bored?</h1>
    <p class="lede">You tried to open a distracting site. Do something better instead.</p>
    <span class="domain">${domain}</span>
    <h2>Or jump to something better</h2>
    <div class="better-sites">${createBetterSitesHtml()}</div>
    <div class="wheel">
      <h2>Spin for a suggestion</h2>
      <div class="wheel-display">Click the button below and let fate decide.</div>
      <button type="button" class="wheel-button">🎡 Spin</button>
    </div>
  `;

  const wheelDisplay = root.querySelector<HTMLElement>('.wheel-display');
  const wheelButton = root.querySelector<HTMLButtonElement>('.wheel-button');
  if (!wheelDisplay || !wheelButton) {
    throw new Error('Bored: failed to build wheel elements');
  }

  return { root, wheelDisplay, wheelButton };
}

async function revealResult(
  display: HTMLElement,
  result: string
): Promise<void> {
  const finalIndex = SUGGESTIONS.indexOf(result);
  const lastTwo = [SUGGESTIONS[finalIndex - 2], SUGGESTIONS[finalIndex - 1]];

  for (const value of lastTwo) {
    if (value) {
      display.textContent = value;
      await pause(180);
    }
  }
  display.textContent = `→ ${result}`;
}

async function spinSuggestions(
  display: HTMLElement,
  button: HTMLButtonElement
): Promise<string> {
  button.disabled = true;
  display.classList.add('spinning');

  const result = pickRandom(SUGGESTIONS);
  const startedAt = Date.now();
  let delay = SPIN_BASE_DELAY_MS;
  let index = 0;

  while (Date.now() - startedAt < SPIN_DURATION_MS) {
    display.textContent = SUGGESTIONS[index % SUGGESTIONS.length];
    index += 1;
    delay *= 1.14;
    await pause(delay);
  }

  await revealResult(display, result);
  display.classList.remove('spinning');
  button.disabled = false;

  return result;
}

function renderBlockedWall(): void {
  rememberBlockedAt();

  document.documentElement.innerHTML = '';
  const style = document.createElement('style');
  style.textContent = buildStyles();

  const { root, wheelDisplay, wheelButton } = buildWall();

  const body = document.createElement('body');
  body.appendChild(style);
  body.appendChild(root);
  document.body = body;

  wheelButton.addEventListener('click', () => {
    void spinSuggestions(wheelDisplay, wheelButton);
  });
}

if (isBlocked(window.location.hostname)) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBlockedWall, {
      once: true,
    });
  } else {
    renderBlockedWall();
  }
}
