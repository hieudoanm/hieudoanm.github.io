import { WidgetPhoneContacts } from '~/widgets/phone/WidgetPhoneContacts';
import { WidgetPhoneDialer } from '~/widgets/phone/WidgetPhoneDialer';

const PhonePage = () => {
  return (
    <div class="h-[100vh] w-screen overflow-hidden bg-gray-100 md:h-screen">
      <div class="grid h-full grid-cols-1 md:grid-cols-2">
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetPhoneDialer />
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex h-full items-center justify-center">
            <WidgetPhoneContacts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePage;
