import { FC } from 'react';
import { PiList } from 'react-icons/pi';
import { ChatModelSelect } from '../../molecules/ChatModelSelect';

interface ModelOption {
  company: string;
  label: string;
  value: string;
}

interface ChatHeaderProps {
  title?: string;
  model: string;
  models: ModelOption[];
  onModelChange: (value: string) => void;
  onNewChat: () => void;
  onToggleSidebar: () => void;
  sidebarOpen?: boolean;
  disabled?: boolean;
}

export const ChatHeader: FC<ChatHeaderProps> = ({
  title = 'Chat',
  model,
  models,
  onModelChange,
  onNewChat,
  onToggleSidebar,
  sidebarOpen,
  disabled,
}) => {
  return (
    <div className="border-base-300 bg-base-100/85 flex min-h-[60px] items-center justify-between border-b px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="btn btn-ghost btn-sm btn-square text-base-content/50">
          <PiList className="h-5 w-5" />
        </button>
        <span className="text-base-content font-serif text-lg font-bold tracking-widest">
          {title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <ChatModelSelect
          models={models}
          value={model}
          onChange={onModelChange}
          disabled={disabled}
        />
        <button
          type="button"
          onClick={onNewChat}
          disabled={disabled}
          className="btn btn-ghost btn-sm text-base-content/50 hover:text-base-content text-xs">
          New chat
        </button>
      </div>
    </div>
  );
};
ChatHeader.displayName = 'ChatHeader';
