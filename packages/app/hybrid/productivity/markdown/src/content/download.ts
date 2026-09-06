import { buildVersion } from './version';

const RELEASE =
  'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest';

export const download = {
  version: buildVersion,
  items: [
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.aab',
      href: `${RELEASE}/markdown.aab`,
    },
    {
      platform: 'Android',
      requirements: 'Android 14.+',
      label: '.apk',
      href: `${RELEASE}/markdown.apk`,
    },
    {
      platform: 'Linux',
      requirements: 'All Distro',
      label: '.AppImage',
      href: `${RELEASE}/markdown.AppImage`,
    },
    {
      platform: 'Linux',
      requirements: 'Fedora 40.+',
      label: '.rpm',
      href: `${RELEASE}/markdown.rpm`,
    },
    {
      platform: 'Linux',
      requirements: 'Debian 13.+',
      label: '.deb',
      href: `${RELEASE}/markdown.deb`,
    },
    {
      platform: 'macOS',
      requirements: 'Apple Silicon · macOS 13.+',
      label: '.dmg',
      href: `${RELEASE}/markdown.dmg`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.exe',
      href: `${RELEASE}/markdown.exe`,
    },
    {
      platform: 'Windows',
      requirements: 'Windows 10.+',
      label: '.msi',
      href: `${RELEASE}/markdown.msi`,
    },
  ],
};
