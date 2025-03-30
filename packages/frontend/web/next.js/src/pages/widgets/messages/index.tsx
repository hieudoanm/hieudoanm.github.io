import { WidgetMessages } from '@web/widgets/messages';
import { NextPage } from 'next';

const MessagesPage: NextPage = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <div className="flex h-full items-center justify-center">
        <WidgetMessages />
      </div>
    </div>
  );
};

export default MessagesPage;
