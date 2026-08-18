'use client';

import { VersionTemplate } from '@/components/templates/VersionTemplate';
import { NextPage } from 'next';

const VersionPage: NextPage = () => {
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

  return <VersionTemplate appName="Music" version={version} />;
};

export default VersionPage;
