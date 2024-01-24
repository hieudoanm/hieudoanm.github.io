import { Spinner, Text } from '@chakra-ui/react';
import { APP_NAME } from '@chess/common/constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Loading: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setTimeout(() => setLoading(false), 2000);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

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
