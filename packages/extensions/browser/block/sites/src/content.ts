// Content script for Block Sites Extension
// Displays a clean block page when a site is blocked

const DEFAULT_BLOCKED_DOMAINS = [
  'facebook.com',
  'twitter.com',
  'reddit.com',
  'tiktok.com',
];

function isBlocked(hostname: string): boolean {
  return DEFAULT_BLOCKED_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );
}

if (isBlocked(window.location.hostname)) {
  document.documentElement.innerHTML = `
    <html>
      <head>
        <title>Site Blocked</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            font-family: system-ui, -apple-system, sans-serif;
            background: #0f172a;
            color: #f8fafc;
          }
          .icon { font-size: 4rem; margin-bottom: 1rem; }
          h1 { font-size: 2rem; margin-bottom: 0.5rem; }
          p { color: #94a3b8; font-size: 1rem; }
          .domain {
            margin-top: 0.75rem;
            padding: 0.4rem 1rem;
            background: #1e293b;
            border-radius: 9999px;
            font-family: monospace;
            font-size: 0.9rem;
            color: #ef4444;
          }
        </style>
      </head>
      <body>
        <div class="icon">🚫</div>
        <h1>Site Blocked</h1>
        <p>This website has been blocked by the Block Sites extension.</p>
        <span class="domain">${window.location.hostname}</span>
      </body>
    </html>
  `;
}
