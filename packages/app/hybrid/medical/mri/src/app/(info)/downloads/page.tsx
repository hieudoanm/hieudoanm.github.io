import { DownloadsTemplate } from '@/components/templates/DownloadsTemplate';
import { NextPage } from 'next';

const RELEASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-mri-latest';

const DownloadsPage: NextPage = () => (
  <DownloadsTemplate
    version="v0.0.1"
    items={[
      {
        platform: 'Android',
        requirements: 'Android 14.+',
        label: '.aab',
        href: `${RELEASE}/app-universal-release.aab`,
      },
      {
        platform: 'Android',
        requirements: 'Android 14.+',
        label: '.apk',
        href: `${RELEASE}/app-universal-release.apk`,
      },
      {
        platform: 'Linux',
        requirements: 'Ubuntu 22.04.+',
        label: '.AppImage',
        href: `${RELEASE}/mri_0.0.1_amd64.AppImage`,
      },
      {
        platform: 'Linux (Debian)',
        requirements: 'Ubuntu 22.04.+',
        label: '.deb',
        href: `${RELEASE}/mri_0.0.1_amd64.deb`,
      },
      {
        platform: 'macOS',
        requirements: 'macOS 13.+',
        label: '.dmg',
        href: `${RELEASE}/mri_0.0.1_arm64.dmg`,
      },
    ]}
  />
);

export default DownloadsPage;
