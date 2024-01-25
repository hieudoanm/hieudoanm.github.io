'use client';

import { Spinner, Text } from '@chakra-ui/react';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Loading: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setTimeout(() => setLoading(false), 2000);
    const url = `${pathname}?${searchParameters}`;
    handleStart(url);
    handleComplete(url);
  }, [pathname, searchParameters, router]);

  return (
    <>
      {loading ? (
        <div className="fixed z-50 h-screen w-screen bg-white/90">
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="flex flex-col items-center justify-center gap-y-4">
                <Text color="teal.500">{APP_NAME}</Text>
                <Spinner color="teal.500" size="xl" />
                <Text color="teal.500">Loading</Text>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
