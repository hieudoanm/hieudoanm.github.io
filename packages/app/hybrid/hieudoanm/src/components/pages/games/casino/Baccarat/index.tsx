import { FC, useCallback, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { Card, Bet, Phase } from './constants';
import {
  bankerDrawRule,
  cardValue,
  createDeck,
  handValue,
  playerDrawRule,
  shuffle,
} from './game';

export const Baccarat: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase, setPhase] = useState<Phase>('bet');
  const [deck, setDeck] = useState<Card[]>(() => shuffle(createDeck()));
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [bankerHand, setBankerHand] = useState<Card[]>([]);
  const [bet, setBet] = useState<Bet | null>(null);
  const [result, setResult] = useState<'player' | 'banker' | 'tie' | null>(
    null
  );
  const [credits, setCredits] = useState(200);
  const [lastWon, setLastWon] = useState(0);

  const drawCard = useCallback(
    (d: Card[]): [Card, Card[]] => [d[0], d.slice(1)],
    []
  );

  const deal = useCallback(() => {
    if (!bet || credits < 10) return;
    setCredits((c) => c - 10);
    let d = [...deck];
    if (d.length < 10) d = shuffle(createDeck());

    const [c1, d1] = drawCard(d);
    const [c2, d2] = drawCard(d1);
    const [c3, d3] = drawCard(d2);
    const [c4, d4] = drawCard(d3);

    const player = [c1, c3];
    const banker = [c2, c4];
    let d5: Card | undefined;
    let d6: Card | undefined;

    const pv = handValue(player);
    const bv = handValue(banker);

    if (!(pv === 8 || pv === 9 || bv === 8 || bv === 9)) {
      if (playerDrawRule(pv)) {
        const [c, dRest] = drawCard(d4);
        player.push(c);
        d5 = c;
        d = dRest;
      }
      if (bankerDrawRule(bv, d5)) {
        const [c] = drawCard(d);
        banker.push(c);
        d6 = c;
      }
    }

    const fp = handValue(player);
    const fb = handValue(banker);
    let res: 'player' | 'banker' | 'tie';
    if (fp > fb) res = 'player';
    else if (fb > fp) res = 'banker';
    else res = 'tie';

    let won = 0;
    if (bet === res) {
      if (res === 'player') won = 20;
      else if (res === 'banker') won = 19;
      else won = 80;
    }

    setPlayerHand(player);
    setBankerHand(banker);
    setDeck(d);
    setResult(res);
    setLastWon(won);
    if (won > 0) setCredits((c) => c + won);
    setPhase('result');
  }, [bet, credits, deck, drawCard]);

  const resetRound = useCallback(() => {
    setPlayerHand([]);
    setBankerHand([]);
    setResult(null);
    setBet(null);
    setLastWon(0);
    setPhase('bet');
  }, []);

  const cardName = (c: Card) => `${c.rank}${c.suit}`;
  const isRed = (s: Card['suit']) => s === '♥' || s === '♦';

  return (
    <FullScreen onClose={onClose} title="Baccarat">
      <div className="flex flex-col gap-3 outline-none">
        <div className="flex items-center justify-between text-sm">
          <span>
            Credits: <strong className="text-success">{credits}</strong>
          </span>
        </div>

        {phase === 'bet' && (
          <div className="flex flex-col gap-2">
            <p className="text-xs opacity-50">Place your bet:</p>
            <div className="flex gap-2">
              {(['player', 'banker', 'tie'] as Bet[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setBet(b)}
                  className={`btn btn-sm flex-1 capitalize ${bet === b ? 'btn-primary' : 'btn-ghost'}`}>
                  {b}
                  <span className="text-[10px] opacity-60">
                    {b === 'player' ? '2:1' : b === 'banker' ? '1.95:1' : '8:1'}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={deal}
              disabled={!bet || credits < 10}
              className="btn btn-primary btn-sm mt-2">
              Deal
            </button>
          </div>
        )}

        {phase === 'result' && (
          <div className="space-y-3">
            <div>
              <span className="text-xs opacity-50">Player</span>
              <div className="flex gap-1">
                {playerHand.map((c, i) => (
                  <span
                    key={i}
                    className={`inline-flex h-8 w-6 items-center justify-center rounded text-xs font-normal ${isRed(c.suit) ? 'text-error' : 'text-base-content'}`}
                    style={{ backgroundColor: '#1e293b' }}>
                    {cardName(c)}
                  </span>
                ))}
                <span className="ml-2 text-sm font-normal">
                  {handValue(playerHand)}
                </span>
              </div>
            </div>
            <div>
              <span className="text-xs opacity-50">Banker</span>
              <div className="flex gap-1">
                {bankerHand.map((c, i) => (
                  <span
                    key={i}
                    className={`inline-flex h-8 w-6 items-center justify-center rounded text-xs font-normal ${isRed(c.suit) ? 'text-error' : 'text-base-content'}`}
                    style={{ backgroundColor: '#1e293b' }}>
                    {cardName(c)}
                  </span>
                ))}
                <span className="ml-2 text-sm font-normal">
                  {handValue(bankerHand)}
                </span>
              </div>
            </div>
            <div className="text-center text-sm font-normal">
              {result === 'tie' ? 'Tie!' : `${result} wins!`}
              {lastWon > 0 && (
                <span className="text-success ml-2">+{lastWon}</span>
              )}
            </div>
            <button
              onClick={resetRound}
              className="btn btn-secondary btn-sm w-full">
              Next Round
            </button>
          </div>
        )}
      </div>
    </FullScreen>
  );
};
Baccarat.displayName = 'Baccarat';
