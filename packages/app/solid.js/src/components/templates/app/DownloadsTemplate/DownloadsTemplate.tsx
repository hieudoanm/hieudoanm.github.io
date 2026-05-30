import { createSignal, type JSX } from 'solid-js';

type CopiedKey = string | null;

const useCopy = (): [
  CopiedKey,
  (text: string, key: string) => Promise<void>,
] => {
  const [copied, setCopied] = createSignal<CopiedKey>(null);
  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };
  return [copied, copy];
};

// ── DOWNLOAD BUTTON ──
const DownloadButton = (props: {
  href: string;
  label: string;
  primary?: boolean;
}) => (
  <a
    href={props.href}
    download
    class={`btn btn-sm ${props.primary ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}>
    ↓ {props.label}
  </a>
);

// ── PLATFORM CARD ──
const PlatformCard = (props: {
  emoji: string;
  name: string;
  description: string;
  badge?: string;
  badgeClass?: string;
  children: JSX.Element;
}) => (
  <div class="card bg-base-200 border-base-300 hover:border-primary/40 border transition-colors">
    <div class="card-body p-7">
      <div class="mb-4 flex items-center gap-3">
        <div class="bg-primary/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl">
          {props.emoji}
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h3 class="font-medium">{props.name}</h3>
            {props.badge && (
              <span
                class={`badge badge-sm ${props.badgeClass ?? 'badge-neutral'}`}>
                {props.badge}
              </span>
            )}
          </div>
          <p class="text-base-content/40 text-xs">{props.description}</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">{props.children}</div>
    </div>
  </div>
);

// ── CLI CARD ──
const CliCard = (props: { cli: string }) => {
  const [copied, copy] = useCopy();
  return (
    <div class="card bg-base-200 border-base-300 hover:border-primary/40 border transition-colors">
      <div class="card-body p-7">
        <div class="mb-4 flex items-center gap-3">
          <div class="bg-primary/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl">
            🖥️
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h3 class="font-medium">CLI</h3>
              <span class="badge badge-sm badge-info">Terminal</span>
            </div>
            <p class="text-base-content/40 text-xs">
              Install via package manager
            </p>
          </div>
        </div>
        {/* Command block */}
        <div class="bg-base-300 border-base-content/10 flex items-center justify-between gap-3 rounded-xl border px-4 py-3">
          <code class="text-primary font-mono text-sm break-all">
            {props.cli}
          </code>
          <button
            onClick={() => copy(props.cli, 'cli')}
            class={`btn btn-xs shrink-0 ${copied() === 'cli' ? 'btn-success' : 'btn-ghost border-base-300 border'}`}>
            {copied() === 'cli' ? '✓' : '⎘'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const DownloadsTemplate = (props: {
  cli: string;
  macos: { app: string; dmg: string };
  ubuntu: { appImage: string; deb: string };
  windows: { exe: string; msi: string };
}) => {
  const {
    cli = '',
    macos = { app: '', dmg: '' },
    ubuntu = { appImage: '', deb: '' },
    windows = { exe: '', msi: '' },
  } = props;
  return (
    <div
      class="bg-base-100 text-base-content relative flex min-h-screen flex-col items-center justify-center px-6 py-20 md:px-12"
      data-theme="luxury">
      {/* Ambient glow */}
      <div class="bg-primary/5 pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <div class="relative mx-auto w-full max-w-3xl">
        {/* Header — mirrors Section label + Hero heading pattern */}
        <div class="mb-14 text-center">
          <p class="text-primary mb-7 text-xs tracking-[0.2em] uppercase">
            Latest release
          </p>
          <h1 class="mb-6 font-serif text-6xl leading-[1.05] font-black tracking-tight md:text-7xl">
            Download the app
          </h1>
          <p class="text-base-content/60 mx-auto max-w-md text-base leading-relaxed">
            Available for every platform. Pick your preferred install method and
            get started in seconds.
          </p>
        </div>

        {/* Platform cards — ordered: CLI, macOS, Ubuntu, Windows */}
        <div class="mb-10 flex flex-col gap-5">
          {/* CLI */}
          <CliCard cli={cli} />

          {/* macOS */}
          <PlatformCard
            emoji="🍎"
            name="macOS"
            description="macOS 12 Monterey or later · Apple Silicon & Intel"
            badge="Recommended"
            badgeClass="badge-success">
            <DownloadButton href={macos.app} label=".app bundle" primary />
            <DownloadButton href={macos.dmg} label=".dmg installer" />
          </PlatformCard>

          {/* Ubuntu */}
          <PlatformCard
            emoji="🐧"
            name="Ubuntu / Linux"
            description="Ubuntu 20.04+ · Debian-based distros · x86_64"
            badge="AppImage · deb"
            badgeClass="badge-neutral">
            <DownloadButton href={ubuntu.appImage} label=".AppImage" primary />
            <DownloadButton href={ubuntu.deb} label=".deb package" />
          </PlatformCard>

          {/* Windows */}
          <PlatformCard
            emoji="🪟"
            name="Windows"
            description="Windows 10 / 11 · x86_64"
            badge="exe · msi"
            badgeClass="badge-neutral">
            <DownloadButton href={windows.exe} label=".exe installer" primary />
            <DownloadButton href={windows.msi} label=".msi package" />
          </PlatformCard>
        </div>

        {/* Footer badges — mirrors Hero badge cluster */}
        <div class="flex flex-wrap justify-center gap-3">
          <span class="badge badge-success gap-1">● Stable</span>
          <span class="badge badge-info">Free</span>
          <span class="badge badge-neutral">MIT License</span>
          <span class="badge badge-ghost border-base-300 border">
            WCAG 2.1 AA
          </span>
        </div>
      </div>
    </div>
  );
};
