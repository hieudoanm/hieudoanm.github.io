import { WidgetSports } from '@web/widgets/sports/WidgetSports';
import { NextPage } from 'next';

const SportsPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="flex h-full items-center justify-center">
        <WidgetSports />
      </div>
    </div>
  );
};

export default SportsPage;
