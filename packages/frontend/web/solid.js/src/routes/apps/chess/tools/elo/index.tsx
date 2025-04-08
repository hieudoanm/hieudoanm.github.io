import { A } from '@solidjs/router';
import { createSignal } from 'solid-js';
import players2700 from '~/json/chess/players/2700.json';
import playersVietnam from '~/json/chess/players/vietnam.json';
import { addZero } from '~/utils/number';

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
  const [formula, setFormula] = createSignal<{
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
    setFormula((previous) => ({
      ...previous,
      ratingNew: ratingPlayer + delta,
    }));
  };

  return (
    <div class="flex w-full flex-col gap-y-2 p-8">
      <div class="flex w-full items-center gap-x-2">
        <label for="ratingPlayer" class="text-sm font-bold">
          Your Rating
        </label>
        <input
          type="number"
          id="ratingPlayer"
          name="ratingPlayer"
          placeholder="Player Rating"
          class="grow text-right"
          value={formula().ratingPlayer}
          onChange={(event) => {
            setFormula((previous) => ({
              ...previous,
              ratingPlayer: parseInt(event.target.value, 10),
            }));
          }}
        />
      </div>
      <div class="flex w-full items-center gap-x-2">
        <label for="ratingOpponent" class="text-sm font-bold">
          Opponent Rating
        </label>
        <input
          type="number"
          id="ratingOpponent"
          name="ratingOpponent"
          placeholder="Opponent Rating"
          class="grow text-right"
          value={formula().ratingOpponent}
          onChange={(event) => {
            setFormula((previous) => ({
              ...previous,
              ratingOpponent: parseInt(event.target.value, 10),
            }));
          }}
        />
      </div>
      <div class="flex w-full items-center gap-x-2">
        <label for="score" class="text-sm font-bold">
          Score
        </label>
        <select
          id="score"
          name="score"
          class="grow appearance-none text-right"
          value={formula().score}
          onChange={(event) => {
            setFormula((previous) => ({
              ...previous,
              score: parseFloat(event.target.value) as Score,
            }));
          }}>
          <option disabled>Score</option>
          <option value={Score.WIN}>Win (1)</option>
          <option value={Score.DRAW}>Draw (0.5)</option>
          <option value={Score.LOSS}>Loss (0)</option>
        </select>
      </div>
      <div class="flex w-full items-center gap-x-2">
        <label for="age" class="text-sm font-bold">
          Age Class
        </label>
        <select
          id="age"
          name="age"
          class="grow appearance-none text-right"
          value={formula().overAge18.toString()}
          onChange={(event) => {
            setFormula((previous) => ({
              ...previous,
              overAge18: Boolean(event.target.value),
            }));
          }}>
          <option disabled>Age</option>
          <option value="true">Over 18</option>
          <option value="false">Under 18</option>
        </select>
      </div>
      <div class="flex w-full items-center gap-x-2">
        <label for="timeClass" class="text-sm font-bold">
          Time Class
        </label>
        <select
          id="timeClass"
          name="timeClass"
          class="grow appearance-none text-right"
          value={formula().timeClass}
          onChange={(event) => {
            setFormula((previous) => ({
              ...previous,
              timeClass: event.target.value as TimeClass,
            }));
          }}>
          <option disabled>Time Class</option>
          <option value={TimeClass.CLASSICAL}>Classical</option>
          <option value={TimeClass.RAPID}>Rapid</option>
          <option value={TimeClass.BLITZ}>Blitz</option>
        </select>
      </div>
      <div class="flex w-full items-center gap-x-2">
        <label for="rating" class="text-sm font-bold">
          Rating Class
        </label>
        <select
          id="rating"
          name="rating"
          class="grow appearance-none text-right"
          value={formula().overRating2400.toString()}
          onChange={(event) => {
            setFormula((previous) => ({
              ...previous,
              overRating2400: Boolean(event.target.value),
            }));
          }}>
          <option disabled>Rating</option>
          <option value="true">Over 2400</option>
          <option value="false">Under 2400</option>
        </select>
      </div>
      <div class="flex w-full items-center gap-x-2">
        <label for="games" class="text-sm font-bold">
          Number of Games
        </label>
        <select
          id="games"
          name="games"
          class="grow appearance-none text-right"
          value={formula().lessThan30Games.toString()}
          onChange={(event) => {
            setFormula((previous) => ({
              ...previous,
              lessThan30Games: Boolean(event.target.value),
            }));
          }}>
          <option disabled>Number of Games</option>
          <option value="false">Under 30</option>
          <option value="true">Over 30</option>
        </select>
      </div>
      <button
        type="button"
        class="w-full rounded bg-gray-900 py-2 text-red-500"
        onClick={() => calculate(formula())}>
        Calculate
      </button>
      <div class="flex w-full items-center gap-x-2">
        <label for="ratingNew" class="text-sm font-bold">
          New Rating
        </label>
        <input
          type="number"
          id="ratingNew"
          name="ratingNew"
          placeholder="New Rating"
          class="grow text-right"
          value={formula().ratingNew}
          readOnly
          disabled
        />
      </div>
    </div>
  );
};

const WorldTitle = ({ worldTitles = [] }: { worldTitles: string[] }) => {
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

const Players = ({
  players = [],
}: {
  players: {
    rank: number;
    flag: string;
    name: string;
    worldTitles: Record<string, string>;
    rating: { peak: { fide: number } };
    url: { 'chess.com': string };
  }[];
}) => {
  return (
    <div class="flex flex-col gap-y-2">
      {players.map(({ rank, flag, name, worldTitles, rating, url }, index) => {
        const chessUrl: string = url['chess.com'] ?? '';
        return (
          <div
            title={rank.toString()}
            class="flex items-center justify-between text-gray-100">
            <div class="flex items-center gap-x-2 truncate">
              <p class="text-red-500">
                {addZero(index + 1)}. {flag}{' '}
              </p>
              {chessUrl !== '' ? (
                <A href={chessUrl} target="_blank">
                  <p>
                    <span>{name}</span>{' '}
                    <WorldTitle worldTitles={Object.values(worldTitles)} />
                  </p>
                </A>
              ) : (
                <p>
                  <span>{name}</span>{' '}
                  <WorldTitle worldTitles={Object.values(worldTitles)} />
                </p>
              )}
            </div>
            <p class="text-red-500">{rating.peak.fide.toFixed(1)}</p>
          </div>
        );
      })}
    </div>
  );
};

export const EloPage = () => {
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
    <div class="h-auto w-screen overflow-hidden lg:h-screen">
      <div class="grid h-full grid-rows-1 lg:grid-cols-2">
        <div class="row-span-1 lg:col-span-1">
          <div class="flex h-full w-full items-center bg-gray-100 text-gray-900">
            <Calculator />
          </div>
        </div>
        <div class="no-scrollbar row-span-1 overflow-auto lg:col-span-1">
          <div class="bg-gray-900 p-8 text-gray-100">
            <div class="flex flex-col gap-y-4">
              <h1 class="text-xl font-black">World Title</h1>
              <div class="flex flex-col gap-y-2">
                {worldTitles.map((worldTitle, index) => {
                  return (
                    <p title={worldTitle}>
                      <span class="text-red-500">{addZero(index + 1)}. 🇺🇳</span>{' '}
                      <span>{worldTitle}</span>{' '}
                      <sup>{'*'.repeat(index + 1)}</sup>
                    </p>
                  );
                })}
              </div>
              {playersByWorldTitles.map(({ worldTitle, players }) => {
                return (
                  <>
                    <h1 class="text-xl font-black">
                      {worldTitle} ({players.length})
                    </h1>
                    <Players players={players} />
                  </>
                );
              })}
              {playersByContinents.map(({ continent, players }) => {
                return (
                  <>
                    <h1 class="text-xl font-black">
                      {continent} ({players.length})
                    </h1>
                    <Players players={players} />
                  </>
                );
              })}
              {playersByCountries.map(({ country, players }) => {
                return (
                  <>
                    <h1 class="text-xl font-black">
                      {country} ({players.length})
                    </h1>
                    <Players players={players} />
                  </>
                );
              })}
              <h1 class="text-xl font-black">2775+</h1>
              <Players players={players2775} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EloPage;
