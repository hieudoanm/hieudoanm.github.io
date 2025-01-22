import { WidgetPhone } from '@nothing/widgets/phone/WidgetPhone';
import { NextPage } from 'next';

const PhonePage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetPhone />
      </div>
    </div>
  );
};

export default PhonePage;
