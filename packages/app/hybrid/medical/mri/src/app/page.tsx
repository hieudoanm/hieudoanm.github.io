'use client';

import { type FC } from 'react';
import Link from 'next/link';
import {
  FiActivity,
  FiCpu,
  FiDownload,
  FiFolder,
  FiGitMerge,
  FiGlobe,
  FiInfo,
  FiShield,
  FiTag,
} from 'react-icons/fi';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';

const HomePage: FC = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex items-center gap-2">
        <FiActivity className="text-primary text-5xl" />
        <h1>MRI</h1>
      </div>
      <p className="text-base-content/70 max-w-md">
        An MRI research workspace and orchestration layer. Import a DICOM series
        or NIfTI volume to get started.
      </p>
      <div className="flex items-center gap-2">
        <Badge variant="info">DICOM</Badge>
        <Badge variant="success">NIfTI</Badge>
        <Badge variant="warning">BIDS</Badge>
      </div>
    </div>

    <div className="flex flex-col items-center gap-2">
      <Link href="/workspace" data-testid="open-workspace" className="w-full">
        <Button variant="primary" size="lg" className="w-full">
          <FiFolder className="mr-2" />
          Open workspace
        </Button>
      </Link>
      <Link href="/protocols" data-testid="open-protocols" className="w-full">
        <Button variant="outline" size="lg" className="w-full">
          <FiShield className="mr-2" />
          Protocols
        </Button>
      </Link>
      <Link href="/pipelines" data-testid="open-pipelines" className="w-full">
        <Button variant="outline" size="lg" className="w-full">
          <FiGitMerge className="mr-2" />
          Pipelines
        </Button>
      </Link>
      <Link href="/models" data-testid="open-models" className="w-full">
        <Button variant="outline" size="lg" className="w-full">
          <FiCpu className="mr-2" />
          Models
        </Button>
      </Link>
      <Link href="/dicomweb" data-testid="open-dicomweb" className="w-full">
        <Button variant="outline" size="lg" className="w-full">
          <FiGlobe className="mr-2" />
          DICOMweb
        </Button>
      </Link>
    </div>

    <div className="flex items-center gap-2">
      <Link href="/about" data-testid="open-about">
        <Button variant="ghost" size="sm">
          <FiInfo className="mr-1" />
          About
        </Button>
      </Link>
      <Link href="/downloads" data-testid="open-downloads">
        <Button variant="ghost" size="sm">
          <FiDownload className="mr-1" />
          Downloads
        </Button>
      </Link>
      <Link href="/version" data-testid="open-version">
        <Button variant="ghost" size="sm">
          <FiTag className="mr-1" />
          Version
        </Button>
      </Link>
    </div>
  </main>
);

export default HomePage;
