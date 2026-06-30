import { ComponentType } from 'react';

const loadPalindrome = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-word/PalindromeModal').then(
    (m) => ({ default: m.PalindromeModal })
  );

const loadTypoglycemia = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-word/TypoglycemiaModal').then(
    (m) => ({ default: m.TypoglycemiaModal })
  );

const loadWordle = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/games-word/WordleModal').then(
    (m) => ({ default: m.WordleModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  palindrome: loadPalindrome,
  typoglycemia: loadTypoglycemia,
  wordle: loadWordle,
};
