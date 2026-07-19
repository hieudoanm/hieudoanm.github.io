'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FoodRandomizer } from '@/components/organisms/randomizer';

const RandomizerContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCountry = searchParams.get('country') ?? 'all';

  const handleCountryChange = (value: string) => {
    router.replace(
      value === 'all' ? '/randomizer' : `/randomizer?country=${value}`
    );
  };

  return (
    <FoodRandomizer
      initialCountry={initialCountry}
      onCountryChange={handleCountryChange}
    />
  );
};

const RandomizerPage = () => {
  return (
    <main className="bg-base-100 flex min-h-dvh flex-col items-center justify-center px-4 py-12 sm:px-6">
      <Suspense fallback={null}>
        <RandomizerContent />
      </Suspense>
    </main>
  );
};

export default RandomizerPage;
