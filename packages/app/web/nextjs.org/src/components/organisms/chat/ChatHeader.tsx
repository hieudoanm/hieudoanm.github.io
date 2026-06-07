import { FC } from 'react';
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
}) => (
  <div className="border-base-300 bg-base-100/85 flex min-h-[60px] items-center justify-between border-b px-6 backdrop-blur-xl">
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="btn btn-ghost btn-sm btn-square text-base-content/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
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
