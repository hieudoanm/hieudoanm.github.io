'use client';

import { useEffect } from 'react';
import { isTauri } from '@/lib/native';

export const useUpdater = (): void => {
  useEffect(() => {
    if (!isTauri()) return;
    let cancelled = false;

    const run = async (): Promise<void> => {
      try {
        const { check } = await import('@tauri-apps/plugin-updater');
        const { ask, message } = await import('@tauri-apps/plugin-dialog');
        const update = await check();
        if (!update || cancelled) return;
        const install = await ask('A new version is available. Install now?', {
          title: 'Food update',
          kind: 'info',
        });
        if (install) {
          await update.downloadAndInstall();
          await message('Update installed. Restart the app to apply changes.', {
            title: 'Food update',
            kind: 'info',
          });
        }
      } catch {
        // updater unavailable — ignore
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);
};
