'use client';

import type { NextPage } from 'next';
import { VersionTemplate } from '@/components/templates/VersionTemplate';
import { Navbar, NAV_ITEMS } from '@/components/organisms/Navbar';

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

  return (
    <div className="flex min-h-dvh flex-col pb-20">
      <VersionTemplate version={version} />
      <Navbar items={NAV_ITEMS} />
    </div>
  );
};

export default VersionPage;
