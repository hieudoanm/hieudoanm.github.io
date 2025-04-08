import { WidgetGamesFlipism } from '~/widgets/games/WidgetGamesFlipism';
import { WidgetGamesRockPaperScissors } from '~/widgets/games/WidgetGamesRockPaperScissors';
import { WidgetGamesWheelOfFortune } from '~/widgets/games/WidgetGamesWheelOfFortune';

const GamesPage = () => {
  return (
    <div class="h-[150vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-3">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetGamesRockPaperScissors />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetGamesFlipism />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetGamesWheelOfFortune />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
