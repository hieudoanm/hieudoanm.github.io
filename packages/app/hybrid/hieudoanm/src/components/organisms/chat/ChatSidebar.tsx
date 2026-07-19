import { FC } from 'react';
import { ChatConversation } from '../../../data/chat';

interface ChatSidebarProps {
  conversations: ChatConversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  open: boolean;
}

export const ChatSidebar: FC<ChatSidebarProps> = ({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  open,
}) => {
  if (!open) return null;

  return (
    <div className="bg-base-200 border-base-300 flex w-72 shrink-0 flex-col border-r">
      <div className="border-base-300 flex items-center justify-between border-b px-4 py-4">
        <span className="text-base-content/50 text-xs font-medium tracking-[0.14em] uppercase">
          Conversations
        </span>
        <button
          type="button"
          onClick={onNewChat}
          className="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content">
          + New
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-12 text-center">
            <p className="text-base-content/30 mb-2 text-xs">
              No conversations yet
            </p>
            <p className="text-base-content/20 text-xs">
              Start a new chat to begin
            </p>
          </div>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => onSelect(conv.id)}
              className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                conv.id === activeId
                  ? 'bg-primary/10 border-primary/30 text-base-content border-l-2'
                  : 'text-base-content/60 hover:bg-base-300/50 hover:text-base-content border-l-2 border-transparent'
              }`}>
              <span className="line-clamp-1">{conv.title}</span>
              <span className="text-base-content/20 mt-0.5 block text-xs">
                {conv.messages.length} messages
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
ChatSidebar.displayName = 'ChatSidebar';
