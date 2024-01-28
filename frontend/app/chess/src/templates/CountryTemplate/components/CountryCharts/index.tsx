import { ChessPlayer, ChessStats, ChessTimeClass } from '@prisma/client';
import { CountryChart } from '../CountryChart';

export type CountryChartsProperties = {
  players: (ChessPlayer & { stats: ChessStats[] })[];
};

export const CountryCharts: React.FC<CountryChartsProperties> = ({
  players = [],
}) => {
  if (players.length === 0) return <></>;

  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
      <div className="col-span-1">
        <CountryChart timeClass={ChessTimeClass.rapid} players={players} />
      </div>
      <div className="col-span-1">
        <CountryChart timeClass={ChessTimeClass.blitz} players={players} />
      </div>
      <div className="col-span-1">
        <CountryChart timeClass={ChessTimeClass.bullet} players={players} />
      </div>
    </div>
  );
};

CountryCharts.displayName = 'CountryCharts';
