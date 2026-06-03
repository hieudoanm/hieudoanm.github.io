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

export const ChatHeader = (props: ChatHeaderProps) => (
  <div class="border-base-300 bg-base-100/85 flex min-h-[60px] items-center justify-between border-b px-6 backdrop-blur-xl">
    <div class="flex items-center gap-3">
      <button
        type="button"
        onClick={props.onToggleSidebar}
        class="btn btn-ghost btn-sm btn-square text-base-content/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span class="text-base-content font-serif text-lg font-bold tracking-widest">
        {props.title ?? 'Chat'}
      </span>
    </div>
    <div class="flex items-center gap-2">
      <ChatModelSelect
        models={props.models}
        value={props.model}
        onChange={props.onModelChange}
        disabled={props.disabled}
      />
      <button
        type="button"
        onClick={props.onNewChat}
        disabled={props.disabled}
        class="btn btn-ghost btn-sm text-base-content/50 hover:text-base-content text-xs">
        New chat
      </button>
    </div>
  </div>
);
