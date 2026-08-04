'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { SAMPLE_NAME, createSampleRaster } from '@/data/sample';
import { loadImageFiles } from '@/lib/image/load';
import { viewerStore } from '@/lib/store/viewerStore';

const HomePage = () => {
  const router = useRouter();

  const openDemo = useCallback(() => {
    viewerStore.set(createSampleRaster(), SAMPLE_NAME);
    router.push('/viewer');
  }, [router]);

  const importFiles = useCallback(
    async (files: File[]) => {
      const loaded = await loadImageFiles(files);
      if (loaded.length > 0) {
        viewerStore.set(loaded[0], files[0].name);
        router.push('/viewer');
      }
    },
    [router]
  );

  return <HomeTemplate onOpenDemo={openDemo} onImportFiles={importFiles} />;
};

export default HomePage;
