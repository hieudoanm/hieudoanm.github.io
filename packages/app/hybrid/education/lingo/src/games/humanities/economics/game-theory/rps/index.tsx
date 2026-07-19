import { FC, useCallback, useReducer } from 'react';
import { BOT_STRATEGIES, EMOJIS, MOVES, TOTAL_ROUNDS } from './constants';
import { exploitableHint } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { BotId, Move } from './types';

const formatScore = (n: number): string => (n > 0 ? `+${n}` : `${n}`);

export const RpsGame: FC = () => {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState
  );
  const { phase, round, botId, mine, theirs, outcome, score, results } = state;

  const pickBot = useCallback(
    (next: BotId) => dispatch({ type: 'PICK_BOT', botId: next }),
    []
  );
  const play = useCallback(
    (move: Move) => dispatch({ type: 'PLAY', move }),
    []
  );
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const bot = BOT_STRATEGIES.find((b) => b.id === botId);
  const hint = botId && results.length > 0 ? exploitableHint(botId) : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Your score: <strong>{formatScore(score)}</strong>
        </span>
      </div>

      {phase === 'choose' && !botId && (
        <div>
          <p className="text-base-content/60 mb-2 text-sm">
            Pick a bot strategy:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {BOT_STRATEGIES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => pickBot(b.id)}
                data-testid={`bot-${b.id}`}
                className="card border-base-content/10 border p-3 text-left transition-colors">
                <span className="text-lg">
                  {b.emoji} {b.label}
                </span>
                <span className="text-base-content/60 block text-xs">
                  {b.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'choose' && botId && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm">
            Playing against {bot?.emoji} {bot?.label}
          </p>
          <div className="flex gap-3">
            {MOVES.map((move) => (
              <button
                key={move}
                type="button"
                onClick={() => play(move)}
                data-testid={`move-${move}`}
                className="btn btn-lg btn-outline">
                {EMOJIS[move]}
                <span className="text-xs capitalize">{move}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'reveal' && mine && theirs && outcome && (
        <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4">
          <div className="flex items-center gap-6 text-2xl">
            <span className="text-center">
              <div className="text-4xl">{EMOJIS[mine]}</div>
              <span className="text-xs capitalize">You: {mine}</span>
            </span>
            <span className="text-sm">vs</span>
            <span className="text-center">
              <div className="text-4xl">{EMOJIS[theirs]}</div>
              <span className="text-xs capitalize">Bot: {theirs}</span>
            </span>
          </div>
          <div
            className={
              outcome === 'win'
                ? 'text-success font-bold'
                : outcome === 'lose'
                  ? 'text-error font-bold'
                  : 'font-bold'
            }>
            {outcome === 'win'
              ? 'You win +1'
              : outcome === 'lose'
                ? 'You lose -1'
                : 'Draw 0'}
          </div>
          {hint && <p className="text-base-content/60 text-xs">{hint}</p>}
          <button
            type="button"
            onClick={nextRound}
            className="btn btn-primary btn-sm">
            {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
          </button>
        </div>
      )}

      {phase === 'done' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-4xl">🏁</div>
          <div className="text-lg">Match over</div>
          <div className="flex flex-col items-center gap-1 text-center text-sm">
            <span>
              Your net score: <strong>{formatScore(score)}</strong>
            </span>
            <p className="text-base-content/60 mt-2 max-w-md text-xs">
              RPS is zero-sum: your gain is the bot&rsquo;s loss. Against
              optimal mixed play it has value 0 &mdash; only mistakes give you
              an edge.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="btn btn-primary btn-sm">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
RpsGame.displayName = 'RpsGame';
