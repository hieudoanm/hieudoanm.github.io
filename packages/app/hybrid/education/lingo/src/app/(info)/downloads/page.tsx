import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';
import { NextPage } from 'next';

const RELEASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest';

const DownloadsPage: NextPage = () => (
  <DownloadsTemplate
    version="v0.0.1"
    items={[
      {
        platform: 'Linux',
        requirements: 'Ubuntu 22.04.+',
        label: '.AppImage',
        href: `${RELEASE}/lingo_amd64.AppImage`,
      },
      {
        platform: 'Linux (Debian)',
        requirements: 'Ubuntu 22.04.+',
        label: '.deb',
        href: `${RELEASE}/lingo_amd64.deb`,
      },
      {
        platform: 'macOS',
        requirements: 'Apple Silicon · macOS 13.+',
        label: '.dmg',
        href: `${RELEASE}/lingo_aarch64.dmg`,
      },
      {
        platform: 'Windows',
        requirements: 'Windows 10.+',
        label: '.msi',
        href: `${RELEASE}/lingo_x64.msi`,
      },
    ]}
  />
);

export default DownloadsPage;
