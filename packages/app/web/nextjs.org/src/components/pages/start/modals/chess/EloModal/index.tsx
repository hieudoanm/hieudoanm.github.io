import { calculatePerformance, Score, TimeClass } from '@chess/ts';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useState } from 'react';
import { PerformanceTab } from './PerformanceTab';
import { RatingTab } from './RatingTab';
import { Formula, GameRow } from './types';

const INITIAL_FORMULA: Formula = {
  ratingPlayer: 1000,
  ratingOpponent: 1000,
  ratingNew: 1000,
  score: Score.DRAW,
  timeClass: TimeClass.CLASSICAL,
  lessThan30Games: false,
  overRating2400: false,
  overAge18: true,
};

export const EloModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<'rating' | 'performance'>('rating');
  const [formula, setFormula] = useState<Formula>(INITIAL_FORMULA);
  const [games, setGames] = useState<GameRow[]>([
    { ratingOpponent: 1800, score: Score.WIN },
  ]);
  const [performance, setPerformance] = useState<number>(0);

  const updateGame = (index: number, field: keyof GameRow, value: unknown) => {
    setGames((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  return (
    <ModalWrapper onClose={onClose} title="Elo Calculator">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full">
        <button
          role="tab"
          className={`tab w-[50%] ${tab === 'rating' ? 'tab-active' : ''}`}
          onClick={() => setTab('rating')}>
          Rating
        </button>
        <button
          role="tab"
          className={`tab w-[50%] ${tab === 'performance' ? 'tab-active' : ''}`}
          onClick={() => setTab('performance')}>
          Performance
        </button>
      </div>

      {tab === 'rating' && (
        <RatingTab formula={formula} setFormula={setFormula} />
      )}
      {tab === 'performance' && (
        <PerformanceTab
          games={games}
          performance={performance}
          updateGame={updateGame}
          addGame={() =>
            setGames([...games, { ratingOpponent: 1800, score: Score.DRAW }])
          }
          calcPerformance={() =>
            setPerformance(calculatePerformance({ games }))
          }
        />
      )}
    </ModalWrapper>
  );
};
EloModal.displayName = 'EloModal';
