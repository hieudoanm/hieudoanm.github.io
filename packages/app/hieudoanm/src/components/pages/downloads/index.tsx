import type { FC } from 'react';
import { DownloadsTemplate } from '@hieudoanm.github.io/components/templates/app/DownloadsTemplate';

const APP_NAME = 'hieudoanm.github.io';
const REPO = `https://github.com/hieudoanm/${APP_NAME}/releases/download`;
const VERSION = '0.0.1';

export const DownloadsPage: FC = () => (
  <DownloadsTemplate
    cli={`${REPO}/cli-latest/${APP_NAME}`}
    macos={{
      app: `${REPO}/macos-latest/${APP_NAME}_${VERSION}_aarch64.app`,
      dmg: `${REPO}/macos-latest/${APP_NAME}_${VERSION}_aarch64.dmg`,
    }}
    ubuntu={{
      appImage: `${REPO}/ubuntu-latest/${APP_NAME}_${VERSION}_amd64.AppImage`,
      deb: `${REPO}/ubuntu-latest/${APP_NAME}_${VERSION}_amd64.deb`,
    }}
    windows={{
      exe: `${REPO}/windows-latest/${APP_NAME}_${VERSION}_x64-setup.exe`,
      msi: `${REPO}/windows-latest/${APP_NAME}_${VERSION}_x64_en-US.msi`,
    }}
  />
);
