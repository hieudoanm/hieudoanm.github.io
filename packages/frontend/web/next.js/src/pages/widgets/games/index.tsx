import { WidgetGamesFlipism } from '@web/widgets/games/WidgetGamesFlipism';
import { WidgetGamesRockPaperScissors } from '@web/widgets/games/WidgetGamesRockPaperScissors';
import { WidgetGamesWheelOfFortune } from '@web/widgets/games/WidgetGamesWheelOfFortune';
import { NextPage } from 'next';

const GamesPage: NextPage = () => {
  return (
    <div className="h-[150vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-3">
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
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetGamesWheelOfFortune />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
