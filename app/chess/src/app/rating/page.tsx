import { APP_NAME } from '@chess/common/constants/app.constants';
import { BUILD_ENV } from '@chess/common/environments/environments';
import { ChessTimeClass } from '@prisma/client';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: `${APP_NAME} - Rating`,
};

type RatingPageProperties = {
  searchParams: {
    rating: number;
    opponentRating: number;
    age: number;
    games: number;
    result: number;
    timeClass: ChessTimeClass;
  };
};

const RatingPage: NextPage<RatingPageProperties> = ({
  searchParams,
}: RatingPageProperties) => {
  const {
    rating = 1000,
    opponentRating = 1000,
    age = 18,
    games = 30,
    result = 0.5,
    timeClass = 'classical',
  } = searchParams;

  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <p className="text-xl md:text-2xl lg:text-3xl">Rating</p>
    </div>
  );
};

export const dynamic =
  BUILD_ENV === 'static' ? 'force-static' : 'force-dynamic';

export default RatingPage;
