import { WidgetColorsPicker } from '@web/widgets/colors';
import { NextPage } from 'next';

const ColorsPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="flex h-full w-full items-center justify-center">
        <WidgetColorsPicker />
      </div>
    </div>
  );
};

export default ColorsPage;
