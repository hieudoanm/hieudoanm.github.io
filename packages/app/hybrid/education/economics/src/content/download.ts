import { buildVersion } from './version';

const RELEASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-economics-latest';

export const download = {
  version: buildVersion,
  items: [
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: `${RELEASE}/economics.dmg`,
    },
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.aab',
      href: `${RELEASE}/economics.aab`,
    },
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.apk',
      href: `${RELEASE}/economics.apk`,
    },
    {
      platform: 'Linux',
      requirements: 'Ubuntu 22.04.+',
      label: '.AppImage',
      href: `${RELEASE}/economics.AppImage`,
    },
    {
      platform: 'Linux',
      requirements: 'Fedora 40.+',
      label: '.rpm',
      href: `${RELEASE}/economics.rpm`,
    },
    {
      platform: 'Linux (Debian)',
      requirements: 'Debian 13.+',
      label: '.deb',
      href: `${RELEASE}/economics.deb`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.exe',
      href: `${RELEASE}/economics.exe`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.msi',
      href: `${RELEASE}/economics.msi`,
    },
  ],
};
