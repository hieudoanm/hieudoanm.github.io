import { Layout } from '@web/layout';
import { ChangeEvent, FC, useState } from 'react';

type DevelopmentCoefficient = 10 | 20 | 40;

enum TimeClass {
  CLASSICAL = 'classical',
  RAPID = 'rapid',
  BLITZ = 'blitz',
}

enum Score {
  WIN = 1,
  DRAW = 0.5,
  LOSS = 0,
}

export const ChessElo: FC = () => {
  const [formula, setFormula] = useState<{
    playerRating: number;
    opponentRating: number;
    score: Score;
    timeClass: TimeClass;
    lessThan30Games: boolean;
    overRating2400: boolean;
    overAge18: boolean;
    ratingChange: number;
  }>({
    playerRating: 1000,
    opponentRating: 1000,
    score: Score.DRAW,
    timeClass: TimeClass.CLASSICAL,
    lessThan30Games: false,
    overRating2400: false,
    overAge18: true,
    ratingChange: 0,
  });

  const getDevelopmentCoefficient = ({
    playerRating = 1000,
    lessThan30Games = false,
    overRating2400 = false,
    overAge18 = true,
    timeClass = TimeClass.CLASSICAL,
  }): DevelopmentCoefficient => {
    if (timeClass === TimeClass.RAPID || timeClass === TimeClass.BLITZ)
      return 20;
    if (overRating2400) return 10;
    if (lessThan30Games || (!overAge18 && playerRating < 2300)) return 40;
    return 20;
  };

  const getDelta = ({
    playerRating = 1000,
    opponentRating = 1000,
    lessThan30Games = false,
    overRating2400 = false,
    overAge18 = true,
    score = Score.DRAW,
    timeClass = TimeClass.CLASSICAL,
  }): number => {
    if (![Score.WIN, Score.DRAW, Score.LOSS].includes(score)) return 0;
    const gap: number = opponentRating - playerRating;
    const chanceToWin: number = 1 / (1 + 10 ** (gap / 400));
    const K: DevelopmentCoefficient = getDevelopmentCoefficient({
      playerRating,
      lessThan30Games,
      overRating2400,
      overAge18,
      timeClass,
    });
    return Math.round(K * (score - chanceToWin));
  };

  const calculate = ({
    playerRating = 1000,
    opponentRating = 1000,
    lessThan30Games = false,
    overRating2400 = false,
    overAge18 = true,
    score = Score.DRAW,
    timeClass = TimeClass.CLASSICAL,
  }: {
    playerRating: number;
    opponentRating: number;
    lessThan30Games: boolean;
    overRating2400: boolean;
    overAge18: boolean;
    score: Score;
    timeClass: TimeClass;
  }) => {
    const delta = getDelta({
      playerRating,
      opponentRating,
      lessThan30Games,
      overRating2400,
      overAge18,
      score,
      timeClass,
    });
    setFormula({ ...formula, ratingChange: playerRating + delta });
  };

  return (
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='flex h-full w-full items-center justify-center'>
            <div className='flex w-full flex-col gap-y-4 md:gap-y-8'>
              <div className='join join-vertical w-full md:join-horizontal'>
                <label className='input join-item input-bordered flex w-full items-center gap-2 border-base-content'>
                  <span>Player</span>
                  <input
                    type='number'
                    id='playerRating'
                    name='playerRating'
                    placeholder='Player Rating'
                    className='grow'
                    value={formula.playerRating}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setFormula({
                        ...formula,
                        playerRating: parseInt(event.target.value, 10),
                      });
                    }}
                  />
                </label>
                <label className='input join-item input-bordered flex w-full items-center gap-2 border-base-content'>
                  <span>Opponent</span>
                  <input
                    type='number'
                    id='opponentRating'
                    name='opponentRating'
                    placeholder='Opponent Rating'
                    className='grow'
                    value={formula.opponentRating}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setFormula({
                        ...formula,
                        opponentRating: parseInt(event.target.value, 10),
                      });
                    }}
                  />
                </label>
                <select
                  id='score'
                  name='score'
                  className='join-item select select-bordered w-full border-base-content'
                  value={formula.score}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setFormula({
                      ...formula,
                      score: parseFloat(event.target.value) as Score,
                    });
                  }}>
                  <option disabled>Score</option>
                  <option value={Score.WIN}>Win (1)</option>
                  <option value={Score.DRAW}>Draw (0.5)</option>
                  <option value={Score.LOSS}>Loss (0)</option>
                </select>
                <select
                  id='timeClass'
                  name='timeClass'
                  className='join-item select select-bordered w-full border-base-content'
                  value={formula.timeClass}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setFormula({
                      ...formula,
                      timeClass: event.target.value as TimeClass,
                    });
                  }}>
                  <option disabled>Time Class</option>
                  <option value={TimeClass.CLASSICAL}>Classical</option>
                  <option value={TimeClass.RAPID}>Rapid</option>
                  <option value={TimeClass.BLITZ}>Blitz</option>
                </select>
              </div>
              <div className='join join-vertical w-full md:join-horizontal'>
                <select
                  id='age'
                  name='age'
                  className='join-item select select-bordered w-full border-base-content'
                  value={formula.overAge18.toString()}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setFormula({
                      ...formula,
                      overAge18: Boolean(event.target.value),
                    });
                  }}>
                  <option disabled>Age</option>
                  <option value='true'>Over 18</option>
                  <option value='false'>Under 18</option>
                </select>
                <select
                  id='rating'
                  name='rating'
                  className='join-item select select-bordered w-full border-base-content'
                  value={formula.overRating2400.toString()}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setFormula({
                      ...formula,
                      overRating2400: Boolean(event.target.value),
                    });
                  }}>
                  <option disabled>Rating</option>
                  <option value='true'>Rating cross 2400</option>
                  <option value='false'>Rating under 2400</option>
                </select>
                <select
                  id='games'
                  name='games'
                  className='join-item select select-bordered w-full border-base-content'
                  value={formula.lessThan30Games.toString()}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setFormula({
                      ...formula,
                      lessThan30Games: Boolean(event.target.value),
                    });
                  }}>
                  <option disabled>Games</option>
                  <option value='false'>Less than 30 Games</option>
                  <option value='true'>More than 30 Games</option>
                </select>
                <label className='input join-item input-bordered flex w-full items-center gap-2 border-base-content'>
                  <span>New</span>
                  <input
                    type='number'
                    id='ratingChange'
                    name='ratingChange'
                    placeholder='Rating Change'
                    className='grow'
                    value={formula.ratingChange}
                  />
                </label>
              </div>
              <button
                type='button'
                className='btn btn-outline join-item'
                onClick={() => calculate(formula)}>
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
