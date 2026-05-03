import { twinkleTwinkle } from '@hieudoanm/data/twinkle-twinkle-little-star';
import { FC, useEffect, useRef, useState } from 'react';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const whiteKeys = [
  { id: 'c', note: 'C' },
  { id: 'd', note: 'D' },
  { id: 'e', note: 'E' },
  { id: 'f', note: 'F' },
  { id: 'g', note: 'G' },
  { id: 'a', note: 'A' },
  { id: 'b', note: 'B' },
];

const blackKeys = [
  { id: 'cs', note: 'C#', position: 0 },
  { id: 'ds', note: 'D#', position: 1 },
  { id: 'fs', note: 'F#', position: 3 },
  { id: 'gs', note: 'G#', position: 4 },
  { id: 'as', note: 'A#', position: 5 },
];

const levels: string[][] = [
  ['c', 'd'],
  ['c', 'cs', 'd'],
  ['c', 'cs', 'd', 'ds'],
  ['c', 'cs', 'd', 'ds', 'e'],
  ['c', 'cs', 'd', 'ds', 'e', 'f'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as'],
  ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b'],
];

export const PitchModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [started, setStarted] = useState(false);
  const [target, setTarget] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [ripple, setRipple] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [feedback, setFeedback] = useState<{
    correctId?: string;
    wrongId?: string;
  } | null>(null);
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('pitch-high-score');
    if (saved) setHighScore(Number.parseInt(saved, 10));
  }, []);

  const playTone = (id: string) => {
    try {
      const note =
        NODE_ENV === 'development'
          ? `/audio/3/${id}.mp3`
          : `/hieudoanm/audio/3/${id}.mp3`;
      const audio = new Audio(note);
      audioRef.current = audio;
      audio.play();
      setRipple(true);
      setTimeout(() => setRipple(false), 600);
    } catch (error) {
      console.error(error);
    }
  };

  const playSequence = async (
    sequence: { id?: string; note?: string; duration?: number }[],
    getKey: (item: any) => string,
    getDuration: (item: any) => number
  ) => {
    if (isPracticing) return;
    setIsPracticing(true);
    setStarted(false);
    setTarget(null);
    for (const item of sequence) {
      const key = getKey(item);
      setHighlightedKey(key);
      playTone(key);
      await new Promise((res) => setTimeout(res, getDuration(item)));
      setHighlightedKey(null);
    }
    setIsPracticing(false);
  };

  const playPractice = () =>
    playSequence(
      whiteKeys,
      (k) => k.id,
      () => 800
    );

  const playTwinkle = () =>
    playSequence(
      twinkleTwinkle,
      (k) => k.note,
      (k) => k.duration
    );

  const nextRound = () => {
    const available = levels[level - 1];
    const random = available[Math.floor(Math.random() * available.length)];
    setTarget(random);
    playTone(random);
  };

  const startGame = () => {
    setScore(0);
    setStarted(true);
    nextRound();
  };

  const handleGuess = (id: string) => {
    if (!started || !target || isPracticing) return;

    if (id === target) {
      setFeedback({ correctId: id });
      const newScore = score + 1;
      setScore(newScore);
      if (newScore % 10 === 0 && level < levels.length) setLevel((l) => l + 1);
      setTimeout(() => {
        setFeedback(null);
        nextRound();
      }, 700);
    } else {
      setFeedback({ correctId: target, wrongId: id });
      setTimeout(() => {
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('pitch-high-score', score.toString());
        }
        setFeedback(null);
        setScore(0);
        setStarted(false);
        setTarget(null);
      }, 900);
    }
  };

  const whiteKeyClass = (id: string) => {
    if (feedback?.correctId === id)
      return 'bg-success border-success text-success-content';
    if (feedback?.wrongId === id)
      return 'bg-error border-error text-error-content';
    if (highlightedKey === id) return 'bg-info border-info text-info-content';
    return 'bg-base-content border-base-content text-base-100';
  };

  const blackKeyClass = (id: string) => {
    if (feedback?.correctId === id)
      return 'bg-success border-success text-success-content shadow-[0_4px_0_oklch(var(--su)/0.6)]';
    if (feedback?.wrongId === id)
      return 'bg-error border-error text-error-content shadow-[0_4px_0_oklch(var(--er)/0.6)]';
    if (highlightedKey === id)
      return 'bg-info border-info text-info-content shadow-[0_4px_0_oklch(var(--in)/0.6)]';
    return 'bg-base-100 border-base-300 text-base-content shadow-[0_4px_0_oklch(0_0_0/0.3)]';
  };

  return (
    <dialog
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-box w-full max-w-xl pb-8">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>
        <h3 className="mb-3 text-center text-lg font-bold">🎹 Pitch Trainer</h3>
        {/* Stats */}
        <div className="mb-4 flex justify-center gap-3 text-xs">
          <span className="badge badge-neutral">Level {level}</span>
          <span className="badge badge-primary">Score: {score}</span>
          <span className="badge badge-accent">🏆 Best: {highScore}</span>
        </div>
        {/* Ripple + action buttons */}
        <div className="relative mb-6 flex items-center justify-center">
          {ripple && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="bg-primary h-16 w-16 animate-ping rounded-full opacity-20" />
            </div>
          )}
          {!started ? (
            <div className="flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={startGame}
                disabled={isPracticing}>
                ▶ Start
              </button>
              <button
                className="btn btn-info btn-sm"
                onClick={playPractice}
                disabled={isPracticing}>
                🎵 Practice
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={playTwinkle}
                disabled={isPracticing}>
                ⭐ Twinkle
              </button>
            </div>
          ) : (
            <p className="text-base-content/50 text-xs">Guess the note!</p>
          )}
        </div>
        {/* Keyboard */}
        <div className="relative h-44 w-full">
          {/* White keys */}
          <div className="flex h-full gap-1">
            {whiteKeys.map(({ id, note }) => (
              <button
                key={id}
                onClick={() => (started ? handleGuess(id) : playTone(id))}
                className={`relative flex flex-1 items-end justify-center rounded-lg border-2 pb-2 text-xs font-bold transition-all duration-150 active:translate-y-0.5 ${whiteKeyClass(id)}`}>
                {note}
              </button>
            ))}
          </div>

          {/* Black keys */}
          {blackKeys.map(({ id, note, position }) => (
            <button
              key={id}
              onClick={() => (started ? handleGuess(id) : playTone(id))}
              className={`absolute top-0 z-10 h-[58%] w-[9%] -translate-x-1/2 rounded-b-lg border-2 text-white transition-all duration-150 active:translate-y-0.5 ${blackKeyClass(id)}`}
              style={{ left: `${((position + 1) * 100) / 7}%` }}>
              <div className="flex h-full items-end justify-center pb-1 text-[10px] font-bold">
                {note}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-xs opacity-40">
          Click keys to play · Esc close
        </p>
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
