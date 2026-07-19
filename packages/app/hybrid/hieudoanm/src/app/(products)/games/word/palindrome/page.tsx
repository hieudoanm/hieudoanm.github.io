'use client';

import { useRouter } from 'next/navigation';
import { Palindrome } from '@hieudoanm.github.io/components/routes/games/word/Palindrome';

const GamesWordPalindrome = () => {
  const router = useRouter();
  return <Palindrome onClose={() => router.push('/games/word')} />;
};

export default GamesWordPalindrome;
