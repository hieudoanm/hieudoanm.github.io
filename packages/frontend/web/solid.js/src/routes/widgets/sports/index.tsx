import { WidgetSports } from '~/widgets/sports/WidgetSports';

const SportsPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetSports />
      </div>
    </div>
  );
};

export default SportsPage;
