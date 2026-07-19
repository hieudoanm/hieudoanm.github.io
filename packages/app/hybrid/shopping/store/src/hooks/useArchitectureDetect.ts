'use client';

import { useEffect, useState } from 'react';
import { detectArchitecture, type Architecture } from '@/lib/os';

interface UserAgentData {
  getHighEntropyValues(
    hints: ['architecture']
  ): Promise<{ architecture?: string }>;
}

export const useArchitectureDetect = (): Architecture => {
  const [architecture, setArchitecture] = useState<Architecture>('unknown');

  useEffect(() => {
    const data = (navigator as Navigator & { userAgentData?: UserAgentData })
      .userAgentData;
    console.log('[useArchitectureDetect] userAgentData:', data);
    if (data) {
      data
        .getHighEntropyValues(['architecture'])
        .then(({ architecture: value }) => {
          console.log(
            '[useArchitectureDetect] highEntropyValue architecture:',
            value,
            '=>',
            detectArchitecture(value)
          );
          setArchitecture(detectArchitecture(value));
        })
        .catch((error) => {
          console.warn(
            '[useArchitectureDetect] getHighEntropyValues failed, falling back to UA',
            error
          );
          const fallback = detectArchitecture();
          console.log('[useArchitectureDetect] fallback:', fallback);
          setArchitecture(fallback);
        });
    } else {
      const fallback = detectArchitecture();
      console.log(
        '[useArchitectureDetect] no userAgentData, falling back to UA:',
        navigator.userAgent,
        '=>',
        fallback
      );
      setArchitecture(fallback);
    }
  }, []);

  return architecture;
};
