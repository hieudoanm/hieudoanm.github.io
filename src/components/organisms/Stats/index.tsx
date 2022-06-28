import React from 'react';
import Container from '../../atoms/Container';
import Header from '../../molecules/Header';

export type Statistic = {
  id: string;
  value: string;
  title: string;
  subtitle: string;
};

export type StatsSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  stats: Array<Statistic>;
};

const StatsSection: React.FC<StatsSectionProps> = ({
  id,
  title,
  subtitle,
  stats = [],
}) => {
  return (
    <div id={id} className="pb-16">
      <Container>
        <Header subtitle={subtitle}>{title}</Header>
        <div className="border rounded-lg shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {stats.map(
              (
                { id = '', value, title, subtitle }: Statistic,
                index: number,
                array: Array<Statistic>
              ) => {
                const border: string =
                  index === array.length - 1
                    ? ''
                    : 'border-r-0 border-b md:border-r md:border-b-0';
                return (
                  <div
                    key={`stats-${id}`}
                    className={`${border} text-center p-8`}
                  >
                    <div className="text-5xl">{value}</div>
                    {title && <div className="text-xl">{title}</div>}
                    {subtitle && <p className="text-gray-500">{subtitle}</p>}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

StatsSection.displayName = 'StatsSection';
StatsSection.defaultProps = { stats: [] };

export default StatsSection;
