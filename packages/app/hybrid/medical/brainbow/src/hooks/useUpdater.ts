'use client';

import { useEffect } from 'react';
import { isTauri } from '@/lib/native';

export const useUpdater = (): void => {
  useEffect(() => {
    if (!isTauri()) return;
    let cancelled = false;
    const run = async (): Promise<void> => {
      const [{ check }, { ask, message }] = await Promise.all([
        import('@tauri-apps/plugin-updater'),
        import('@tauri-apps/plugin-dialog'),
      ]);
      const update = await check();
      if (cancelled || !update) return;
      const apply = await ask(
        `Version ${update.version} is available. Download and install now?`,
        { title: 'Brainbow update', kind: 'info' }
      );
      if (cancelled || !apply) return;
      await update.downloadAndInstall();
      await message('Update installed. Restart Brainbow to apply it.', {
        title: 'Brainbow update',
        kind: 'info',
      });
    };
    void run().catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);
};
