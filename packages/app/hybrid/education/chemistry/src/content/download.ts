import { buildVersion } from './version';

const RELEASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest';

export const download = {
  version: buildVersion,
  items: [
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.aab',
      href: `${RELEASE}/chemistry.aab`,
    },
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.apk',
      href: `${RELEASE}/chemistry.apk`,
    },
    {
      platform: 'Linux',
      requirements: 'All Distro',
      label: '.AppImage',
      href: `${RELEASE}/chemistry.AppImage`,
    },
    {
      platform: 'Linux',
      requirements: 'Fedora 40.+',
      label: '.rpm',
      href: `${RELEASE}/chemistry.rpm`,
    },
    {
      platform: 'Linux',
      requirements: 'Debian 13.+',
      label: '.deb',
      href: `${RELEASE}/chemistry.deb`,
    },
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: `${RELEASE}/chemistry.dmg`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.exe',
      href: `${RELEASE}/chemistry.exe`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.msi',
      href: `${RELEASE}/chemistry.msi`,
    },
  ],
};
