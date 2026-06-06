import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Move = 'cooperate' | 'defect';
type Phase = 'choose' | 'reveal' | 'done';

interface Round {
  round: number;
  player: Move;
  opponent: Move;
  pScore: number;
  oScore: number;
}

type Strategy =
  | 'titfortat'
  | 'alwaysdefect'
  | 'alwayscooperate'
  | 'grimtrigger'
  | 'random';

const PAYOFF: Record<Move, Record<Move, [number, number]>> = {
  cooperate: { cooperate: [1, 1], defect: [3, 0] },
  defect: { cooperate: [0, 3], defect: [2, 2] },
};

const STRATEGIES: { id: Strategy; label: string; emoji: string }[] = [
  { id: 'titfortat', label: 'Tit for Tat', emoji: '🪞' },
  { id: 'alwaysdefect', label: 'Always Defect', emoji: '🔪' },
  { id: 'alwayscooperate', label: 'Always Cooperate', emoji: '🕊️' },
  { id: 'grimtrigger', label: 'Grim Trigger', emoji: '💣' },
  { id: 'random', label: 'Random', emoji: '🎲' },
];

const pickStrategy = (): Strategy =>
  STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)].id;

const chooseOpponent = (
  strategy: Strategy,
  history: Round[],
  playerHistory: Move[]
): Move => {
  switch (strategy) {
    case 'alwayscooperate':
      return 'cooperate';
    case 'alwaysdefect':
      return 'defect';
    case 'titfortat':
      return history.length === 0
        ? 'cooperate'
        : playerHistory[playerHistory.length - 1];
    case 'grimtrigger':
      return playerHistory.includes('defect') ? 'defect' : 'cooperate';
    case 'random':
      return Math.random() < 0.5 ? 'cooperate' : 'defect';
  }
};

const formatScore = (s: number) => `${s}yr`;

export const PrisonerDilemmaModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const TOTAL_ROUNDS = 10;
  const [phase, setPhase] = useState<Phase>('choose');
  const [round, setRound] = useState(1);
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [opponentMove, setOpponentMove] = useState<Move | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [history, setHistory] = useState<Round[]>([]);
  const [strategy, setStrategy] = useState<Strategy>(pickStrategy);
  const [revealStrategy, setRevealStrategy] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const playerHistory = useMemo(() => history.map((r) => r.player), [history]);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleMove = useCallback(
    (move: Move) => {
      if (phase !== 'choose') return;
      const opp = chooseOpponent(strategy, history, playerHistory);
      const [pAdd, oAdd] = PAYOFF[move][opp];
      const newRound: Round = {
        round,
        player: move,
        opponent: opp,
        pScore: pAdd,
        oScore: oAdd,
      };
      setPlayerMove(move);
      setOpponentMove(opp);
      setPhase('reveal');
      setPlayerScore((s) => s + pAdd);
      setOpponentScore((s) => s + oAdd);
      setHistory((h) => [...h, newRound]);
    },
    [phase, round, strategy, history, playerHistory]
  );

  const nextRound = useCallback(() => {
    if (round >= TOTAL_ROUNDS) {
      setPhase('done');
      setRevealStrategy(true);
      return;
    }
    setRound((r) => r + 1);
    setPlayerMove(null);
    setOpponentMove(null);
    setPhase('choose');
    containerRef.current?.focus();
  }, [round]);

  const reset = useCallback(() => {
    setPhase('choose');
    setRound(1);
    setPlayerMove(null);
    setOpponentMove(null);
    setPlayerScore(0);
    setOpponentScore(0);
    setHistory([]);
    setStrategy(pickStrategy());
    setRevealStrategy(false);
    containerRef.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'r') {
        reset();
        return;
      }
      if (e.key === 'c') handleMove('cooperate');
      if (e.key === 'd') handleMove('defect');
      if (e.key === 'Enter' && phase === 'reveal') nextRound();
    },
    [onClose, handleMove, nextRound, phase, reset]
  );

  const win =
    phase === 'done'
      ? playerScore < opponentScore
        ? 'win'
        : playerScore > opponentScore
          ? 'lose'
          : 'draw'
      : null;

  return (
    <ModalWrapper onClose={onClose} title="Prisoner's Dilemma" size="max-w-sm">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-3 outline-none">
        {/* Round & Score */}
        <div className="flex items-center justify-between text-sm">
          <span>
            Round <strong>{phase === 'done' ? TOTAL_ROUNDS : round}</strong> /{' '}
            {TOTAL_ROUNDS}
          </span>
          <div className="flex gap-3">
            <span>
              You: <strong>{formatScore(playerScore)}</strong>
            </span>
            <span className="opacity-60">
              Bot: <strong>{formatScore(opponentScore)}</strong>
            </span>
          </div>
        </div>

        {/* Payoff Matrix */}
        <div className="border-base-300 overflow-hidden rounded-lg border text-center text-[10px]">
          <div className="border-base-300 bg-base-200 grid grid-cols-3 border-b font-bold">
            <div className="p-1" />
            <div className="p-1">🤝 Coop</div>
            <div className="p-1">🔪 Defect</div>
          </div>
          <div className="border-base-300 grid grid-cols-3 border-b">
            <div className="bg-base-200 p-1 font-bold">🤝 Coop</div>
            <div className="text-success p-1">1yr, 1yr</div>
            <div className="text-error p-1">3yr, 0yr</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="bg-base-200 p-1 font-bold">🔪 Defect</div>
            <div className="text-error p-1">0yr, 3yr</div>
            <div className="p-1">2yr, 2yr</div>
          </div>
        </div>

        {/* Game area */}
        {phase === 'choose' && (
          <>
            <div className="flex justify-center gap-3 py-4">
              <button
                onClick={() => handleMove('cooperate')}
                className="btn btn-success btn-lg flex-col gap-0 px-6">
                <span className="text-2xl">🤝</span>
                <span className="text-xs">Cooperate</span>
              </button>
              <button
                onClick={() => handleMove('defect')}
                className="btn btn-error btn-lg flex-col gap-0 px-6">
                <span className="text-2xl">🔪</span>
                <span className="text-xs">Defect</span>
              </button>
            </div>
            <p className="text-center text-xs opacity-40">
              C cooperate · D defect
            </p>
          </>
        )}

        {phase === 'reveal' && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="flex items-center gap-6 text-center">
              <div>
                <div className="text-xs uppercase opacity-40">You</div>
                <div className="text-3xl">
                  {playerMove === 'cooperate' ? '🤝' : '🔪'}
                </div>
                <div className="text-xs font-bold uppercase">
                  {playerMove === 'cooperate' ? 'Cooperate' : 'Defect'}
                </div>
                <div className="text-xs opacity-60">
                  {formatScore(playerScore)}
                </div>
              </div>
              <div className="text-2xl opacity-30">VS</div>
              <div>
                <div className="text-xs uppercase opacity-40">Bot</div>
                <div className="text-3xl">
                  {opponentMove === 'cooperate' ? '🤝' : '🔪'}
                </div>
                <div className="text-xs font-bold uppercase">
                  {opponentMove === 'cooperate' ? 'Cooperate' : 'Defect'}
                </div>
                <div className="text-xs opacity-60">
                  {formatScore(opponentScore)}
                </div>
              </div>
            </div>
            <button onClick={nextRound} className="btn btn-primary btn-sm">
              {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
            </button>
            <p className="text-xs opacity-40">Enter to continue</p>
          </div>
        )}

        {phase === 'done' && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="text-4xl">
              {win === 'win' ? '🏆' : win === 'lose' ? '😞' : '🤝'}
            </div>
            <div
              className={`text-lg font-bold ${win === 'win' ? 'text-success' : win === 'lose' ? 'text-error' : ''}`}>
              {win === 'win'
                ? 'You won!'
                : win === 'lose'
                  ? 'Bot won!'
                  : 'Draw!'}
            </div>
            <div className="flex gap-6 text-sm">
              <span>
                You: <strong>{formatScore(playerScore)}</strong>
              </span>
              <span>
                Bot: <strong>{formatScore(opponentScore)}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="opacity-60">Bot strategy:</span>
              <span>
                {STRATEGIES.find((s) => s.id === strategy)?.emoji}{' '}
                {STRATEGIES.find((s) => s.id === strategy)?.label}
              </span>
            </div>
            <button onClick={reset} className="btn btn-primary btn-sm">
              Play Again
            </button>
          </div>
        )}

        {/* History */}
        {history.length > 0 && phase !== 'choose' && (
          <div className="border-base-300 max-h-24 overflow-y-auto rounded-lg border">
            {history.map((r) => (
              <div
                key={r.round}
                className="border-base-200 flex items-center justify-between border-b px-3 py-1 text-[10px] last:border-0">
                <span className="opacity-40">#{r.round}</span>
                <span>
                  You {r.player === 'cooperate' ? '🤝' : '🔪'} vs Bot{' '}
                  {r.opponent === 'cooperate' ? '🤝' : '🔪'}
                </span>
                <span>
                  +{r.pScore} / +{r.oScore}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs opacity-40">
          C cooperate · D defect · R reset · Esc close
        </p>
      </div>
    </ModalWrapper>
  );
};
