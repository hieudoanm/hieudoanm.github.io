import { ChessTimeClass } from '@prisma/client';
import { FullChessPlayer, TitledChart } from '../TitledChart';

export type TitledChartsProperties = {
  players: FullChessPlayer[];
};

export const TitledCharts: React.FC<TitledChartsProperties> = ({
  players = [],
}) => {
  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
      <div className="col-span-1">
        <TitledChart timeClass={ChessTimeClass.rapid} players={players} />
      </div>
      <div className="col-span-1">
        <TitledChart timeClass={ChessTimeClass.blitz} players={players} />
      </div>
      <div className="col-span-1">
        <TitledChart timeClass={ChessTimeClass.bullet} players={players} />
      </div>
    </div>
  );
};

TitledCharts.displayName = 'TitledCharts';
