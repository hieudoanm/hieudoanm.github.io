import { useState, useEffect } from 'react';

interface BrowserInfo {
  name: string;
  version: string;
  userAgent: string;
}

export const useBrowser = (): BrowserInfo => {
  const [info, setInfo] = useState<BrowserInfo>({
    name: 'unknown',
    version: '',
    userAgent: navigator.userAgent,
  });

  useEffect(() => {
    const ua = navigator.userAgent;

    let name = 'unknown';
    let version = '';

    if (/firefox\/(\d+)/i.test(ua)) {
      name = 'Firefox';
      version = ua.match(/firefox\/(\d+)/i)?.[1] ?? '';
    } else if (/chrome\/(\d+)/i.test(ua) && !/edg/i.test(ua)) {
      name = 'Chrome';
      version = ua.match(/chrome\/(\d+)/i)?.[1] ?? '';
    } else if (/safari\/(\d+)/i.test(ua) && !/chrome/i.test(ua)) {
      name = 'Safari';
      version = ua.match(/version\/(\d+)/i)?.[1] ?? '';
    } else if (/edg\/(\d+)/i.test(ua)) {
      name = 'Edge';
      version = ua.match(/edg\/(\d+)/i)?.[1] ?? '';
    } else if (/opera\/(\d+)/i.test(ua)) {
      name = 'Opera';
      version = ua.match(/opera\/(\d+)/i)?.[1] ?? '';
    }

    setInfo({
      name,
      version,
      userAgent: ua,
    });
  }, []);

  return info;
};
