'use client';

import { PokerOdds } from '@/games/gambling/PokerOdds';
import { GAMBLING_GAMES } from '@/games/gambling/_shared/games';
import { GameContainer } from '@/components/organisms/GameContainer';
import { NextPage } from 'next';

const RELATED_GAMES = GAMBLING_GAMES.filter(
  (game) => game.href !== '/gambling/poker-odds/'
);

const Page: NextPage = () => (
  <GameContainer
    title="Poker Odds"
    description="Monte Carlo equity calculator for Texas Hold’em — up to nine players."
    relatedGames={RELATED_GAMES}
    backHref="/gambling/">
    <PokerOdds />
  </GameContainer>
);

export default Page;
