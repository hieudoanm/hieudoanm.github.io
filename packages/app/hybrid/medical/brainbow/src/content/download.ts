import { buildVersion } from './version';

const RELEASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-brainbow-latest';

export const download = {
  version: buildVersion,
  items: [
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.aab',
      href: `${RELEASE}/brainbow.aab`,
    },
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.apk',
      href: `${RELEASE}/brainbow.apk`,
    },
    {
      platform: 'Linux',
      requirements: 'All Distro',
      label: '.AppImage',
      href: `${RELEASE}/brainbow.AppImage`,
    },
    {
      platform: 'Linux',
      requirements: 'Fedora 40.+',
      label: '.rpm',
      href: `${RELEASE}/brainbow.rpm`,
    },
    {
      platform: 'Linux',
      requirements: 'Debian 13.+',
      label: '.deb',
      href: `${RELEASE}/brainbow.deb`,
    },
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: `${RELEASE}/brainbow.dmg`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.exe',
      href: `${RELEASE}/brainbow.exe`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.msi',
      href: `${RELEASE}/brainbow.msi`,
    },
  ],
};
