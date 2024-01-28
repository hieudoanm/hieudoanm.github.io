import { ChessTimeClass } from '@prisma/client';
import { FaBolt, FaClock, FaRocket } from 'react-icons/fa';
import { CountryStat } from '../CountryStat';

export type Stat = { average: number; max: number };

export type Stats = {
  rapid: Stat;
  blitz: Stat;
  bullet: Stat;
};

export type CountryStatsProperties = {
  stats: Stats;
};

export const CountryStats: React.FC<CountryStatsProperties> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-8">
      <div className="col-span-1">
        <CountryStat
          timeClass={ChessTimeClass.rapid}
          average={stats?.rapid?.average ?? 0}
          max={stats?.rapid?.max ?? 0}
          icon={FaClock}
        />
      </div>
      <div className="col-span-1">
        <CountryStat
          timeClass={ChessTimeClass.blitz}
          average={stats?.blitz?.average ?? 0}
          max={stats?.blitz?.max ?? 0}
          icon={FaBolt}
        />
      </div>
      <div className="col-span-1">
        <CountryStat
          timeClass={ChessTimeClass.bullet}
          average={stats?.bullet?.average ?? 0}
          max={stats?.bullet?.max ?? 0}
          icon={FaRocket}
        />
      </div>
    </div>
  );
};

CountryStats.displayName = 'CountryStats';
