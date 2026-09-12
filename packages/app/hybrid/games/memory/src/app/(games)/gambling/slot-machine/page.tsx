'use client';

import { SlotMachine } from '@/games/gambling/SlotMachine';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/slot-machine/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Slot Machine"
    description="Three reels, six symbols — three of a kind pays up to 50× your bet."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <SlotMachine />
  </GameContainer>
);

export default Page;
