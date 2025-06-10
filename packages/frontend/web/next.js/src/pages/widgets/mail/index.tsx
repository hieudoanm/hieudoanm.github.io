import { WidgetMail } from '@web/widgets/mail/WidgetMail';
import { NextPage } from 'next';

const MailPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="flex h-full items-center justify-center">
        <WidgetMail />
      </div>
    </div>
  );
};

export default MailPage;
