import { WidgetMail } from '@nothing/widgets/mail/WidgetMail';
import { NextPage } from 'next';

const MailPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetMail />
      </div>
    </div>
  );
};

export default MailPage;
