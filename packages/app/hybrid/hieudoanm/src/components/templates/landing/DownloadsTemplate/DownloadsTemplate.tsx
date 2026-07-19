'use client';

import { useState, useEffect, type FC } from 'react';
import {
  PiAppleLogo,
  PiLinuxLogo,
  PiWindowsLogo,
  PiDeviceMobile,
  PiTerminal,
  PiCopy,
  PiCheck,
  PiDownloadSimple,
  PiStar,
  PiUsers,
  PiGitFork,
  PiGridFour,
  PiLightning,
  PiShieldCheck,
  PiCode,
  PiGear,
  PiArrowRight,
  PiCaretDown,
} from 'react-icons/pi';

type Tab = 'desktop' | 'mobile' | 'cli';

interface Download {
  label: string;
  url: string;
  primary?: boolean;
}

interface PlatformEntry {
  id: string;
  name: string;
  description: string;
  icon: FC<{ size?: number; className?: string }>;
  downloads: Download[];
}

const DESKTOP: PlatformEntry[] = [
  {
    id: 'macos',
    name: 'macOS',
    description: 'macOS 12+ · Apple Silicon & Intel',
    icon: PiAppleLogo,
    downloads: [
      { label: '.app bundle', url: '#', primary: true },
      { label: '.dmg installer', url: '#' },
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    description: 'Windows 10 / 11 · x86_64',
    icon: PiWindowsLogo,
    downloads: [
      { label: '.exe installer', url: '#', primary: true },
      { label: '.msi package', url: '#' },
    ],
  },
  {
    id: 'linux',
    name: 'Ubuntu / Linux',
    description: 'Ubuntu 20.04+ · Debian · x86_64',
    icon: PiLinuxLogo,
    downloads: [
      { label: '.AppImage', url: '#', primary: true },
      { label: '.deb package', url: '#' },
    ],
  },
];

const MOBILE: PlatformEntry[] = [
  {
    id: 'android',
    name: 'Android',
    description: 'Android 8.0+ · APK & AAB',
    icon: PiDeviceMobile,
    downloads: [
      { label: 'Download .apk', url: '#', primary: true },
      { label: 'Download .aab', url: '#' },
    ],
  },
  {
    id: 'ios',
    name: 'iOS',
    description: 'iOS 15+ · App Store',
    icon: PiDeviceMobile,
    downloads: [{ label: 'App Store', url: '#', primary: true }],
  },
];

const CLI_COMMANDS = [
  { pm: 'npm', cmd: 'npm install -g my-app' },
  { pm: 'pnpm', cmd: 'pnpm add -g my-app' },
  { pm: 'Homebrew', cmd: 'brew install my-app' },
  { pm: 'curl', cmd: 'curl -sL https://my.app/install.sh | sh' },
];

const FEATURES = [
  {
    icon: PiLightning,
    title: 'Lightning fast',
    desc: 'Built for speed from the ground up.',
  },
  {
    icon: PiShieldCheck,
    title: 'Secure by default',
    desc: 'End-to-end encryption everywhere.',
  },
  {
    icon: PiCode,
    title: 'Developer friendly',
    desc: 'CLI, API, and SDK included.',
  },
  {
    icon: PiGear,
    title: 'Fully configurable',
    desc: 'Customise every behaviour.',
  },
  {
    icon: PiGridFour,
    title: 'Cross-platform',
    desc: 'Works on every major OS.',
  },
  { icon: PiUsers, title: 'Team ready', desc: 'Share, collaborate, deploy.' },
];

const FAQS = [
  {
    q: 'Is there a Linux build?',
    a: 'Yes — we ship .AppImage and .deb for Ubuntu 20.04+ and Debian-based distros.',
  },
  {
    q: 'Does the CLI work on Windows (WSL)?',
    a: 'Yes — the CLI runs on WSL 2 with full feature parity.',
  },
  {
    q: 'How do updates work?',
    a: 'Desktop apps auto-update via built-in updater. CLI users update through their package manager.',
  },
  {
    q: 'What are the minimum system requirements?',
    a: 'Desktop: 4 GB RAM, 500 MB storage. Mobile: Android 8.0+ or iOS 15+.',
  },
];

const STEPS = [
  { n: '1', title: 'Install', desc: 'Download the build for your platform.' },
  { n: '2', title: 'Launch', desc: 'Open the app or run the CLI command.' },
  { n: '3', title: 'Done', desc: 'Configure your preferences and start.' },
];

function detectPlatform(): string {
  if (typeof navigator === 'undefined') return 'generic';
  const ua = navigator.userAgent;
  if (/mac/i.test(ua)) return 'mac';
  if (/win/i.test(ua)) return 'windows';
  if (/linux/i.test(ua)) return 'linux';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'generic';
}

const ctaLabel: Record<string, string> = {
  mac: 'Download for macOS',
  windows: 'Download for Windows',
  linux: 'Download for Linux',
  ios: 'Get it on iOS',
  android: 'Get it on Android',
};

export const DownloadsTemplate: FC = () => {
  const [platform, setPlatform] = useState('generic');
  const [activeTab, setActiveTab] = useState<Tab>('desktop');
  const [copied, setCopied] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const tabClass = (tab: Tab) =>
    `btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-ghost border-base-300 border'}`;

  return (
    <div
      className="bg-base-100 text-base-content min-h-screen"
      data-theme="nothing">
      {/* 1. Hero */}
      <section className="px-6 pt-20 pb-14 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary mb-7 text-xs tracking-[0.2em] uppercase">
            Download
          </p>
          <h1 className="mb-6 text-5xl leading-[1.05] tracking-tight">
            Get the App
          </h1>
          <p className="text-base-content/60 mx-auto mb-8 max-w-md text-base leading-relaxed">
            Available on every platform you use.
          </p>
          <a
            href="#"
            className="btn btn-primary min-w-[200px]"
            style={{ width: '200px' }}>
            {ctaLabel[platform] || 'Download Now'}
          </a>
          <p className="text-base-content/40 mt-3 text-xs">
            v2.0.0 · Free · Open Source
          </p>
          <p className="mt-6">
            <a
              href="#platforms"
              className="text-base-content/40 hover:text-base-content text-xs transition-colors">
              View all platforms <PiCaretDown className="inline" size={12} />
            </a>
          </p>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="border-base-300 border-y">
        <div className="mx-auto flex max-w-3xl justify-around gap-8 px-6 py-6 md:px-12">
          {[
            { icon: PiDownloadSimple, value: '10K+', label: 'Downloads' },
            { icon: PiStar, value: '4.8', label: 'Rating' },
            { icon: PiGitFork, value: '2.5K', label: 'GitHub Stars' },
            { icon: PiUsers, value: '5K+', label: 'Active Users' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <s.icon size={20} className="text-base-content/40" />
              <span className="text-sm font-medium">{s.value}</span>
              <span className="text-base-content/40 text-[11px] tracking-wider uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Platforms */}
      <section id="platforms" className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex justify-center gap-2">
            {(['desktop', 'mobile', 'cli'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={tabClass(tab)}>
                {tab === 'desktop' && <PiAppleLogo size={14} />}
                {tab === 'mobile' && <PiDeviceMobile size={14} />}
                {tab === 'cli' && <PiTerminal size={14} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'desktop' && (
            <div className="flex flex-col gap-5">
              {DESKTOP.map((p) => (
                <div
                  key={p.id}
                  className="card bg-base-200 border-base-300 border">
                  <div className="card-body p-7">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2rem] text-xl">
                        <p.icon size={24} className="text-base-content" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm tracking-[0.1em] uppercase">
                          {p.name}
                        </h3>
                        <p className="text-base-content/40 text-xs">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.downloads.map((d) => (
                        <a
                          key={d.label}
                          href={d.url}
                          download
                          className={`btn btn-sm ${d.primary ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}>
                          ↓ {d.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'mobile' && (
            <div className="flex flex-col gap-5">
              {MOBILE.map((p) => (
                <div
                  key={p.id}
                  className="card bg-base-200 border-base-300 border">
                  <div className="card-body p-7">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2rem] text-xl">
                        <p.icon size={24} className="text-base-content" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm tracking-[0.1em] uppercase">
                          {p.name}
                        </h3>
                        <p className="text-base-content/40 text-xs">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.downloads.map((d) => (
                        <a
                          key={d.label}
                          href={d.url}
                          download
                          className={`btn btn-sm ${d.primary ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}>
                          {d.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="flex flex-col gap-5">
              {CLI_COMMANDS.map(({ pm, cmd }) => (
                <div
                  key={pm}
                  className="card bg-base-200 border-base-300 border">
                  <div className="card-body p-7">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[2rem] text-xl">
                        <PiTerminal size={24} className="text-base-content" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm tracking-[0.1em] uppercase">
                          {pm}
                        </h3>
                      </div>
                    </div>
                    <div className="bg-base-300 border-base-content/10 flex items-center justify-between gap-3 rounded-[2rem] border px-4 py-3">
                      <code className="text-primary font-mono text-sm break-all">
                        {cmd}
                      </code>
                      <button
                        onClick={() => copy(cmd, pm)}
                        className={`btn btn-xs shrink-0 rounded-[2rem] ${copied === pm ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}>
                        {copied === pm ? (
                          <PiCheck size={14} />
                        ) : (
                          <PiCopy size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Features Grid */}
      <section className="border-base-300 border-y px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
            Features
          </p>
          <h2 className="mb-6 text-3xl leading-snug tracking-tight">
            Why choose this app?
          </h2>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-5 text-left">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="card bg-base-200 border-base-300 border">
                <div className="card-body p-5">
                  <f.icon size={20} className="text-base-content mb-3" />
                  <h3 className="text-sm font-medium">{f.title}</h3>
                  <p className="text-base-content/50 text-xs leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
            How it works
          </p>
          <h2 className="mb-10 text-3xl leading-snug tracking-tight">
            Three steps to get started
          </h2>
          <div className="mx-auto flex max-w-xl justify-between gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex flex-1 flex-col items-center">
                <div className="bg-primary text-primary-content mb-4 flex h-10 w-10 items-center justify-center rounded-[2rem] text-sm font-medium">
                  {s.n}
                </div>
                <h3 className="mb-1 text-sm font-medium">{s.title}</h3>
                <p className="text-base-content/50 text-xs">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <PiArrowRight
                    size={16}
                    className="text-base-content/20 mt-4 -mr-8 hidden md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="border-base-300 border-y px-6 py-16 md:px-12">
        <div className="mx-auto max-w-2xl">
          <p className="text-primary mb-3 text-center text-xs tracking-[0.2em] uppercase">
            FAQ
          </p>
          <h2 className="mb-8 text-center text-3xl leading-snug tracking-tight">
            Platform & install questions
          </h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="card bg-base-200 border-base-300 cursor-pointer border"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="card-body px-5 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{faq.q}</h3>
                    <span
                      className={`text-xs transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </div>
                  {openFaq === i && (
                    <p className="text-base-content/50 mt-3 text-xs leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
            Stay updated
          </p>
          <h2 className="mb-3 text-3xl leading-snug tracking-tight">
            Get notified about new releases
          </h2>
          <p className="text-base-content/50 mb-6 text-sm">
            No spam. Unsubscribe anytime.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered flex-1 rounded-[2rem]"
            />
            <button className="btn btn-primary rounded-[2rem]">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="bg-base-200 border-base-300 border-y px-6 py-16 md:px-12">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-3 text-3xl leading-snug tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-base-content/50 mb-6 text-sm">
            Download now. Free forever. No account needed.
          </p>
          <a
            href="#"
            className="btn btn-primary min-w-[200px]"
            style={{ width: '200px' }}>
            {ctaLabel[platform] || 'Download Now'}
          </a>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="text-primary text-xs tracking-[0.2em] uppercase">
            My App
          </p>
          <div className="flex gap-6 text-xs">
            <a
              href="#"
              className="text-base-content/40 hover:text-base-content transition-colors">
              Changelog
            </a>
            <a
              href="#"
              className="text-base-content/40 hover:text-base-content transition-colors">
              GitHub
            </a>
            <a
              href="#"
              className="text-base-content/40 hover:text-base-content transition-colors">
              Docs
            </a>
            <a
              href="#"
              className="text-base-content/40 hover:text-base-content transition-colors">
              Legal
            </a>
          </div>
          <p className="text-base-content/30 text-[11px]">
            © 2026 My App · Free · Open Source
          </p>
        </div>
      </footer>
    </div>
  );
};

DownloadsTemplate.displayName = 'DownloadsTemplate';
