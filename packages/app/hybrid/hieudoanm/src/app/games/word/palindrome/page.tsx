'use client';

import { ToolPage } from '../../_shared/ToolPage';
import { Palindrome } from '@hieudoanm.github.io/components/pages/games/word/Palindrome';

const GamesWordPalindrome = () => {
  return <ToolPage Component={Palindrome} backPath="/games/word" />;
};
export default GamesWordPalindrome;
