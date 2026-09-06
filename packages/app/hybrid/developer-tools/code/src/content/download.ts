import { buildVersion } from './version';

const RELEASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-code-latest';

export const download = {
  version: buildVersion,
  items: [
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.aab',
      href: `${RELEASE}/code.aab`,
    },
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.apk',
      href: `${RELEASE}/code.apk`,
    },
    {
      platform: 'Linux',
      requirements: 'All Distro',
      label: '.AppImage',
      href: `${RELEASE}/code.AppImage`,
    },
    {
      platform: 'Linux',
      requirements: 'Fedora 40.+',
      label: '.rpm',
      href: `${RELEASE}/code.rpm`,
    },
    {
      platform: 'Linux',
      requirements: 'Debian 13.+',
      label: '.deb',
      href: `${RELEASE}/code.deb`,
    },
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: `${RELEASE}/code.dmg`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.exe',
      href: `${RELEASE}/code.exe`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.msi',
      href: `${RELEASE}/code.msi`,
    },
  ],
};
