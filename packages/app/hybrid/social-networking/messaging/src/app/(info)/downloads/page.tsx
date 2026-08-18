import { type FC } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const PLATFORMS = [
  {
    id: 'web',
    name: 'Web (PWA)',
    href: '/',
    description: 'Installable from the browser, works on any platform.',
  },
  {
    id: 'desktop',
    name: 'Desktop',
    href: 'https://github.com/hieudoanm/hieudoanm.github.io/releases',
    description: 'Windows, macOS and Linux bundles (Tauri).',
  },
  {
    id: 'android',
    name: 'Android',
    href: 'https://github.com/hieudoanm/hieudoanm.github.io/releases',
    description: 'APK and App Bundle builds.',
  },
  {
    id: 'ios',
    name: 'iOS',
    href: 'https://github.com/hieudoanm/hieudoanm.github.io/releases',
    description: 'iPhone and iPad builds (TestFlight).',
  },
];

const DownloadsPage: FC = () => (
  <div className="bg-base-200 min-h-screen">
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/" className="btn btn-circle btn-ghost btn-sm">
          <FaArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">Downloads</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PLATFORMS.map((platform) => (
          <a
            key={platform.id}
            href={platform.href}
            className="bg-base-100 rounded-lg p-6 transition-transform hover:scale-[1.02]">
            <h2 className="text-lg font-semibold">{platform.name}</h2>
            <p className="text-base-content/60 mt-1 text-sm">
              {platform.description}
            </p>
            <span className="btn btn-primary btn-sm mt-4">Download</span>
          </a>
        ))}
      </div>

      <p className="text-base-content/40 mt-6 text-xs">
        Desktop and mobile bundles are built from the latest release tag{' '}
        <code className="badge badge-ghost badge-sm">
          app-hybrid-social-networking-messaging-latest
        </code>
        .
      </p>
    </div>
  </div>
);

export default DownloadsPage;
