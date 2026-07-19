import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { DeckProvider } from '@/providers/DeckProvider';
import { db } from '@/lib/db';
import type { Deck } from '@/types/deck';
import { __resetIdbMock } from '../../__mocks__/idb';

export const resetDb = (): void => {
  __resetIdbMock();
  (
    globalThis as unknown as { __resetRouterMock: () => void }
  ).__resetRouterMock();
};

export const seedDeck = async (deck: Deck): Promise<void> => {
  await db.decks.put(deck);
};

export const renderWithDeck = (ui: ReactElement) =>
  render(<DeckProvider>{ui}</DeckProvider>);
