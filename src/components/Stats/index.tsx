import Container from '@hieudoanm/components/Container';
import Header from '@hieudoanm/components/Header';
import type React from 'react';

export type Statistic = {
  id: string;
  value: string;
  title: string;
  subtitle: string;
};

export type StatsSectionProperties = {
  id: string;
  title: string;
  subtitle: string;
  stats: Array<Statistic>;
};

const StatsSection: React.FC<StatsSectionProperties> = ({
  id: sectionId = '',
  title: sectionTitle = '',
  subtitle: sectionSubtitle = '',
  stats = [],
}) => {
  return (
    <div id={sectionId} className="pb-16">
      <Container>
        <Header subtitle={sectionSubtitle}>{sectionTitle}</Header>
        <div className="rounded-lg border shadow-2xl">
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
                    className={`${border} p-8 text-center`}>
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
