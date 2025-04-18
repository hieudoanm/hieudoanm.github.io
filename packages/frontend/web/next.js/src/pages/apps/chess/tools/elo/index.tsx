import { NextPage } from 'next';
import players2700 from '@web/json/chess/players/2700.json';
import playersVietnam from '@web/json/chess/players/vietnam.json';
import { ChangeEvent, FC, useState } from 'react';
import { addZero } from '@web/utils/number/utils';
import Link from 'next/link';

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

const Calculator = () => {
  const [formula, setFormula] = useState<{
    ratingPlayer: number;
    ratingOpponent: number;
    ratingNew: number;
    score: Score;
    timeClass: TimeClass;
    lessThan30Games: boolean;
    overRating2400: boolean;
    overAge18: boolean;
  }>({
    ratingPlayer: 1000,
    ratingOpponent: 1000,
    ratingNew: 1000,
    score: Score.DRAW,
    timeClass: TimeClass.CLASSICAL,
    lessThan30Games: false,
    overRating2400: false,
    overAge18: true,
  });

  const getDevelopmentCoefficient = ({
    ratingPlayer = 1000,
    lessThan30Games = false,
    overRating2400 = false,
    overAge18 = true,
    timeClass = TimeClass.CLASSICAL,
  }): DevelopmentCoefficient => {
    if (timeClass === TimeClass.RAPID || timeClass === TimeClass.BLITZ)
      return 20;
    if (overRating2400) return 10;
    if (lessThan30Games || (!overAge18 && ratingPlayer < 2300)) return 40;
    return 20;
  };

  const getDelta = ({
    ratingPlayer = 1000,
    ratingOpponent = 1000,
    lessThan30Games = false,
    overRating2400 = false,
    overAge18 = true,
    score = Score.DRAW,
    timeClass = TimeClass.CLASSICAL,
  }): number => {
    if (![Score.WIN, Score.DRAW, Score.LOSS].includes(score)) return 0;
    const gap: number = ratingOpponent - ratingPlayer;
    const chanceToWin: number = 1 / (1 + 10 ** (gap / 400));
    const K: DevelopmentCoefficient = getDevelopmentCoefficient({
      ratingPlayer,
      lessThan30Games,
      overRating2400,
      overAge18,
      timeClass,
    });
    return Math.round(K * (score - chanceToWin));
  };

  const calculate = ({
    ratingPlayer = 1000,
    ratingOpponent = 1000,
    lessThan30Games = false,
    overRating2400 = false,
    overAge18 = true,
    score = Score.DRAW,
    timeClass = TimeClass.CLASSICAL,
  }: {
    ratingPlayer: number;
    ratingOpponent: number;
    lessThan30Games: boolean;
    overRating2400: boolean;
    overAge18: boolean;
    score: Score;
    timeClass: TimeClass;
  }) => {
    const delta = getDelta({
      ratingPlayer,
      ratingOpponent,
      lessThan30Games,
      overRating2400,
      overAge18,
      score,
      timeClass,
    });
    setFormula({ ...formula, ratingNew: ratingPlayer + delta });
  };

  return (
    <div className="flex w-full flex-col gap-y-2 p-8">
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="ratingPlayer" className="text-sm font-bold">
          Your Rating
        </label>
        <input
          type="number"
          id="ratingPlayer"
          name="ratingPlayer"
          placeholder="Player Rating"
          className="grow text-right"
          value={formula.ratingPlayer}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFormula({
              ...formula,
              ratingPlayer: parseInt(event.target.value, 10),
            });
          }}
        />
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="ratingOpponent" className="text-sm font-bold">
          Opponent Rating
        </label>
        <input
          type="number"
          id="ratingOpponent"
          name="ratingOpponent"
          placeholder="Opponent Rating"
          className="grow text-right"
          value={formula.ratingOpponent}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFormula({
              ...formula,
              ratingOpponent: parseInt(event.target.value, 10),
            });
          }}
        />
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="score" className="text-sm font-bold">
          Score
        </label>
        <select
          id="score"
          name="score"
          className="grow appearance-none text-right"
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
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="age" className="text-sm font-bold">
          Age Class
        </label>
        <select
          id="age"
          name="age"
          className="grow appearance-none text-right"
          value={formula.overAge18.toString()}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setFormula({
              ...formula,
              overAge18: Boolean(event.target.value),
            });
          }}>
          <option disabled>Age</option>
          <option value="true">Over 18</option>
          <option value="false">Under 18</option>
        </select>
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="timeClass" className="text-sm font-bold">
          Time Class
        </label>
        <select
          id="timeClass"
          name="timeClass"
          className="grow appearance-none text-right"
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
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="rating" className="text-sm font-bold">
          Rating Class
        </label>
        <select
          id="rating"
          name="rating"
          className="grow appearance-none text-right"
          value={formula.overRating2400.toString()}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setFormula({
              ...formula,
              overRating2400: Boolean(event.target.value),
            });
          }}>
          <option disabled>Rating</option>
          <option value="true">Over 2400</option>
          <option value="false">Under 2400</option>
        </select>
      </div>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="games" className="text-sm font-bold">
          Number of Games
        </label>
        <select
          id="games"
          name="games"
          className="grow appearance-none text-right"
          value={formula.lessThan30Games.toString()}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setFormula({
              ...formula,
              lessThan30Games: Boolean(event.target.value),
            });
          }}>
          <option disabled>Number of Games</option>
          <option value="false">Under 30</option>
          <option value="true">Over 30</option>
        </select>
      </div>
      <button
        type="button"
        className="w-full rounded bg-gray-900 py-2 text-red-500"
        onClick={() => calculate(formula)}>
        Calculate
      </button>
      <div className="flex w-full items-center gap-x-2">
        <label htmlFor="ratingNew" className="text-sm font-bold">
          New Rating
        </label>
        <input
          type="number"
          id="ratingNew"
          name="ratingNew"
          placeholder="New Rating"
          className="grow text-right"
          value={formula.ratingNew}
          readOnly
          disabled
        />
      </div>
    </div>
  );
};

const WorldTitle: FC<{ worldTitles: string[] }> = ({ worldTitles = [] }) => {
  const values: string[] = Object.values(worldTitles);
  const classical: string = 'World Classical Champion';
  const fisher: string = 'World Classical Fisher Champion';
  const fide: string = 'World FIDE Champion';
  const blitz: string = 'World Rapid & Blitz Champion - Blitz';
  const rapid: string = 'World Rapid & Blitz Champion - Rapid';
  return (
    <>
      <sup>{values.includes(classical) ? '*' : ''}</sup>{' '}
      <sup>{values.includes(fisher) ? '**' : ''}</sup>{' '}
      <sup>{values.includes(fide) ? '***' : ''}</sup>{' '}
      <sup>{values.includes(blitz) ? '****' : ''}</sup>{' '}
      <sup>{values.includes(rapid) ? '*****' : ''}</sup>{' '}
    </>
  );
};

const Players: FC<{
  players: {
    rank: number;
    flag: string;
    name: string;
    worldTitles: Record<string, string>;
    rating: { peak: { fide: number } };
    url: { 'chess.com': string };
  }[];
}> = ({ players = [] }) => {
  return (
    <div className="flex flex-col gap-y-2">
      {players.map(({ rank, flag, name, worldTitles, rating, url }, index) => {
        const chessUrl: string = url['chess.com'] ?? '';
        return (
          <div
            key={rank}
            className="flex items-center justify-between text-gray-100">
            <div className="flex items-center gap-x-2 truncate">
              <p className="text-red-500">
                {addZero(index + 1)}. {flag}{' '}
              </p>
              {chessUrl !== '' ? (
                <Link href={chessUrl} target="_blank">
                  <p>
                    <span>{name}</span>{' '}
                    <WorldTitle worldTitles={Object.values(worldTitles)} />
                  </p>
                </Link>
              ) : (
                <p>
                  <span>{name}</span>{' '}
                  <WorldTitle worldTitles={Object.values(worldTitles)} />
                </p>
              )}
            </div>
            <p className="text-red-500">{rating.peak.fide.toFixed(1)}</p>
          </div>
        );
      })}
    </div>
  );
};

export const EloPage: NextPage = () => {
  const players = players2700.concat(playersVietnam);

  const players2775 = players.filter(
    ({
      rating: {
        peak: { fide },
      },
    }) => fide >= 2775
  );
  // World Titles
  const worldTitles: string[] = [
    ...new Set(
      players
        .map(({ worldTitles }) =>
          Object.values(worldTitles as Record<string, string>)
        )
        .flat(1)
        .filter((worldTitle) => Boolean(worldTitle))
    ),
  ].sort((a, b) => (a > b ? 1 : -1));
  const playersByWorldTitles = worldTitles.map((worldTitle: string) => {
    const playersByContinent = players.filter(
      ({ worldTitles: playerWorldTitles }) =>
        Object.values(playerWorldTitles).includes(worldTitle)
    );
    return { worldTitle, players: playersByContinent };
  });
  // Continents
  const continents: string[] = [
    ...new Set(
      players
        .map(({ continent }) => continent)
        .filter((continent) => Boolean(continent))
    ),
  ].sort((a, b) => (a > b ? 1 : -1));
  const playersByContinents = continents.map((continent: string) => {
    const playersByContinent = players.filter(
      ({ continent: playerContinent }) => continent === playerContinent
    );
    return { continent, players: playersByContinent };
  });
  // Countries
  const countries: string[] = [
    ...new Set(
      players
        .map(({ country }) => country)
        .filter((country) => Boolean(country))
    ),
  ].sort((a, b) => (a > b ? 1 : -1));
  const playersByCountries = countries.map((country: string) => {
    const playersByCountry = players.filter(
      ({ country: playerCountry }) => country === playerCountry
    );
    return { country, players: playersByCountry };
  });

  return (
    <div className="h-auto w-screen overflow-hidden lg:h-screen">
      <div className="grid h-full grid-rows-1 lg:grid-cols-2">
        <div className="row-span-1 lg:col-span-1">
          <div className="flex h-full w-full items-center bg-gray-100 text-gray-900">
            <Calculator />
          </div>
        </div>
        <div className="no-scrollbar row-span-1 overflow-auto lg:col-span-1">
          <div className="bg-gray-900 p-8 text-gray-100">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-xl font-black">World Title</h1>
              <div className="flex flex-col gap-y-2">
                {worldTitles.map((worldTitle, index) => {
                  return (
                    <p key={worldTitle}>
                      <span className="text-red-500">
                        {addZero(index + 1)}. 🇺🇳
                      </span>{' '}
                      <span>{worldTitle}</span>{' '}
                      <sup>{'*'.repeat(index + 1)}</sup>
                    </p>
                  );
                })}
              </div>
              {playersByWorldTitles.map(({ worldTitle, players }) => {
                return (
                  <>
                    <h1 className="text-xl font-black">
                      {worldTitle} ({players.length})
                    </h1>
                    <Players players={players} />
                  </>
                );
              })}
              {playersByContinents.map(({ continent, players }) => {
                return (
                  <>
                    <h1 className="text-xl font-black">
                      {continent} ({players.length})
                    </h1>
                    <Players players={players} />
                  </>
                );
              })}
              {playersByCountries.map(({ country, players }) => {
                return (
                  <>
                    <h1 className="text-xl font-black">
                      {country} ({players.length})
                    </h1>
                    <Players players={players} />
                  </>
                );
              })}
              <h1 className="text-xl font-black">2775+</h1>
              <Players players={players2775} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EloPage;
