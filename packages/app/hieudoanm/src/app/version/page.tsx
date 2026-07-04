'use client';

import { VersionPage } from '@hieudoanm.github.io/components/pages/version';

const VersionAppPage = () => {
  const now = new Date();

  const pad = (n: number) => n.toString().padStart(2, '0');

  const version = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('.');

  return <VersionPage version={version} />;
};

export default VersionAppPage;
