import { buildVersion } from './version';

const RELEASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-clock-latest';

export const download = {
  version: buildVersion,
  items: [
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: `${RELEASE}/clock.dmg`,
    },
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.aab',
      href: `${RELEASE}/clock.aab`,
    },
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.apk',
      href: `${RELEASE}/clock.apk`,
    },
    {
      platform: 'Linux',
      requirements: 'Ubuntu 22.04.+',
      label: '.AppImage',
      href: `${RELEASE}/clock.AppImage`,
    },
    {
      platform: 'Linux',
      requirements: 'Fedora 40.+',
      label: '.rpm',
      href: `${RELEASE}/clock.rpm`,
    },
    {
      platform: 'Linux (Debian)',
      requirements: 'Debian 13.+',
      label: '.deb',
      href: `${RELEASE}/clock.deb`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.exe',
      href: `${RELEASE}/clock.exe`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.msi',
      href: `${RELEASE}/clock.msi`,
    },
  ],
};
