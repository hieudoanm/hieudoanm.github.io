'use client';

import { useRouter } from 'next/navigation';
import { Palindrome } from '@hieudoanm.github.io/components/routes/games/trivia/Palindrome';

const GamesTriviaPalindrome = () => {
  const router = useRouter();
  return <Palindrome onClose={() => router.push('/games/trivia')} />;
};

export default GamesTriviaPalindrome;
