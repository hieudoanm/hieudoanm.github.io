import { WidgetGamesFlipism } from '@nothing/widgets/games/WidgetGamesFlipism';
import { WidgetGamesRockPaperScissors } from '@nothing/widgets/games/WidgetGamesRockPaperScissors';
import { NextPage } from 'next';

const GamesPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetGamesRockPaperScissors />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetGamesFlipism />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
