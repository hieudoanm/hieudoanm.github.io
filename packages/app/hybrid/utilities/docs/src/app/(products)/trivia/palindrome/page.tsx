'use client';

import { useRouter } from 'next/navigation';
import { Palindrome } from '@hieudoanm.github.io/components/routes/apps/trivia/Palindrome';

const GamesTriviaPalindrome = () => {
  const router = useRouter();
  return <Palindrome onClose={() => router.push('/trivia')} />;
};

export default GamesTriviaPalindrome;
