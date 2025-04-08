import { WidgetMail } from '~/widgets/mail/WidgetMail';

const MailPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetMail />
      </div>
    </div>
  );
};

export default MailPage;
