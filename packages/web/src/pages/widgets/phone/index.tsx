import { WidgetPhoneContacts } from '@nothing/widgets/phone/WidgetPhoneContacts';
import { WidgetPhoneDialer } from '@nothing/widgets/phone/WidgetPhoneDialer';
import { NextPage } from 'next';

const PhonePage: NextPage = () => {
  return (
    <div className="h-100vh w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetPhoneDialer />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full items-center justify-center">
            <WidgetPhoneContacts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePage;
