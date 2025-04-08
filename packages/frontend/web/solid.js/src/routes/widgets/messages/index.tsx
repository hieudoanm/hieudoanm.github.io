import { WidgetMessages } from '~/widgets/messages';

const MessagesPage = () => {
  return (
    <div class="h-screen w-screen overflow-hidden bg-gray-100">
      <div class="flex h-full items-center justify-center">
        <WidgetMessages />
      </div>
    </div>
  );
};

export default MessagesPage;
