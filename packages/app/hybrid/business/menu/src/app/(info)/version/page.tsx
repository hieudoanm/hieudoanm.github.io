'use client';

import { VersionTemplate } from '@/components/templates/VersionTemplate';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const VersionPage: NextPage = () => {
  const [version, setVersion] = useState('YYYY.MM.DD.hh.mm.ss');

  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    setVersion(
      [
        now.getFullYear(),
        pad(now.getMonth() + 1),
        pad(now.getDate()),
        pad(now.getHours()),
        pad(now.getMinutes()),
        pad(now.getSeconds()),
      ].join('.')
    );
  }, []);

  return <VersionTemplate version={version} />;
};

export default VersionPage;