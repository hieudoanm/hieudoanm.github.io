'use client';

import { useCallback, type FC } from 'react';
import { HomeTemplate } from '@/components/templates/HomeTemplate';

const HomePage: FC = () => {
  const onImportFiles = useCallback((_files: File[]) => {
    // Phase 1 wires DICOM/NIfTI ingestion here
  }, []);

  return <HomeTemplate onImportFiles={onImportFiles} />;
};

export default HomePage;
