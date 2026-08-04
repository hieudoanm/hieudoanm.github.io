'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { SAMPLE_NAME, createSampleRaster } from '@/data/sample';
import { loadImageFiles, loadNativeImages } from '@/lib/image/load';
import { nativePickImages } from '@/lib/native';
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

  const importNative = useCallback(async () => {
    const payloads = await nativePickImages();
    if (payloads.length === 0) return;
    const loaded = await loadNativeImages(payloads);
    if (loaded.length > 0) {
      viewerStore.set(loaded[0], payloads[0].name);
      router.push('/viewer');
    }
  }, [router]);

  return (
    <HomeTemplate
      onOpenDemo={openDemo}
      onImportFiles={importFiles}
      onNativeImport={importNative}
    />
  );
};

export default HomePage;
