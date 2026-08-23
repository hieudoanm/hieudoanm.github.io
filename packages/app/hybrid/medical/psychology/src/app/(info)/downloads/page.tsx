import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';
import { NextPage } from 'next';

const RELEASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-psychology-latest';

const DownloadsPage: NextPage = () => (
  <DownloadsTemplate
    appName="Psychology"
    version="v0.0.1"
    items={[
      {
        platform: 'Linux',
        requirements: 'Ubuntu 22.04.+',
        label: '.AppImage',
        href: `${RELEASE}/psychology_0.0.1_amd64.AppImage`,
      },
      {
        platform: 'Linux (Debian)',
        requirements: 'Ubuntu 22.04.+',
        label: '.deb',
        href: `${RELEASE}/psychology_0.0.1_amd64.deb`,
      },
      {
        platform: 'macOS',
        requirements: 'macOS 13.+',
        label: '.dmg',
        href: `${RELEASE}/psychology_0.0.1_aarch64.dmg`,
      },
    ]}
  />
);

export default DownloadsPage;
