'use client';

import { useRouter } from 'next/navigation';
import { EmojiGuesser } from '@hieudoanm.github.io/components/routes/games/countries/EmojiGuesser';

const GamesCountriesEmojiGuesser = () => {
  const router = useRouter();
  return <EmojiGuesser onClose={() => router.push('/games/countries')} />;
};

export default GamesCountriesEmojiGuesser;
