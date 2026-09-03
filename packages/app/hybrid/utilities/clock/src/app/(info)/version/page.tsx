'use client';

import { FC } from 'react';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

const VersionPage: FC = () => (
  <div className="flex flex-col">
    <VersionTemplate version="0.0.1" />
  </div>
);

export default VersionPage;
