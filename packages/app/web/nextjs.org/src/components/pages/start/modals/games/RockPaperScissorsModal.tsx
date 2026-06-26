import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

type Choice = 'rock' | 'paper' | 'scissors';

const CHOICES: { value: Choice; emoji: string; label: string }[] = [
  { value: 'rock', emoji: '🪨', label: 'Rock' },
  { value: 'paper', emoji: '📄', label: 'Paper' },
  { value: 'scissors', emoji: '✂️', label: 'Scissors' },
];

const BEATS: Record<Choice, Choice> = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

type Result = 'win' | 'lose' | 'draw';

const play = (player: Choice, computer: Choice): Result => {
  if (player === computer) return 'draw';
  return BEATS[player] === computer ? 'win' : 'lose';
};

const randomChoice = (): Choice =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)].value;

export const RockPaperScissorsModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleChoice = useCallback((choice: Choice) => {
    const comp = randomChoice();
    setPlayerChoice(choice);
    setComputerChoice(comp);
    const res = play(choice, comp);
    setResult(res);
    if (res === 'win') {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else if (res === 'lose') {
      setStreak(0);
    }
  }, []);

  const reset = useCallback(() => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
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
      const idx = Number(e.key);
      if (idx >= 1 && idx <= CHOICES.length) {
        handleChoice(CHOICES[idx - 1].value);
      }
    },
    [onClose, handleChoice, reset]
  );

  const resultColor =
    result === 'win'
      ? 'text-success'
      : result === 'lose'
        ? 'text-error'
        : 'text-base-content/60';

  const resultEmoji = result === 'win' ? '🎉' : result === 'lose' ? '😞' : '🤝';

  return (
    <ModalWrapper
      onClose={onClose}
      title="Rock Paper Scissors"
      size="max-w-sm"
      fullHeight>
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 outline-none">
        {/* Score */}
        <div className="flex items-center justify-between text-sm">
          <span>
            Score: <strong>{score}</strong>
          </span>
          <span className="opacity-60">
            Streak: <strong>{streak}</strong> / Best:{' '}
            <strong>{bestStreak}</strong>
          </span>
        </div>

        {/* Showdown */}
        <div className="flex flex-1 items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase opacity-40">You</span>
            <span className="text-6xl">
              {playerChoice
                ? CHOICES.find((c) => c.value === playerChoice)!.emoji
                : '❔'}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className={`text-2xl font-black ${resultColor}`}>
              {resultEmoji}
            </span>
            {result && (
              <span className={`text-xs font-bold ${resultColor} uppercase`}>
                {result}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase opacity-40">Bot</span>
            <span className="text-6xl">
              {computerChoice
                ? CHOICES.find((c) => c.value === computerChoice)!.emoji
                : '❔'}
            </span>
          </div>
        </div>

        {/* Choices */}
        <div className="flex flex-wrap justify-center gap-2">
          {CHOICES.map((c, i) => (
            <button
              key={c.value}
              onClick={() => handleChoice(c.value)}
              className={`btn btn-outline flex-col gap-0 px-3 py-4 ${
                playerChoice === c.value ? 'btn-primary' : ''
              }`}>
              <span className="text-xl">{c.emoji}</span>
              <span className="text-[10px]">{i + 1}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-2">
          <button onClick={reset} className="btn btn-primary btn-sm">
            Reset
          </button>
        </div>

        <p className="text-center text-xs opacity-40">
          1–{CHOICES.length} pick · R reset · Esc close
        </p>
      </div>
    </ModalWrapper>
  );
};
RockPaperScissorsModal.displayName = 'RockPaperScissorsModal';
