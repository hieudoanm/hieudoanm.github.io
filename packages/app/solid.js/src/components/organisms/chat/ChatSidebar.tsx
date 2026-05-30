import { ChatConversation } from '../../../data/chat';

interface ChatSidebarProps {
  conversations: ChatConversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  open: boolean;
}

export const ChatSidebar = (props: ChatSidebarProps) => {
  if (!props.open) return null;

  return (
    <div class="bg-base-200 border-base-300 flex w-72 shrink-0 flex-col border-r">
      <div class="border-base-300 flex items-center justify-between border-b px-4 py-4">
        <span class="text-base-content/50 text-xs font-medium tracking-[0.14em] uppercase">
          Conversations
        </span>
        <button
          type="button"
          onClick={props.onNewChat}
          class="btn btn-ghost btn-xs text-base-content/50 hover:text-base-content">
          + New
        </button>
      </div>
      <div class="flex-1 overflow-y-auto">
        {props.conversations.length === 0 ? (
          <div class="flex flex-col items-center px-4 py-12 text-center">
            <p class="text-base-content/30 mb-2 text-xs">
              No conversations yet
            </p>
            <p class="text-base-content/20 text-xs">
              Start a new chat to begin
            </p>
          </div>
        ) : (
          props.conversations.map((conv) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => props.onSelect(conv.id)}
              class={`w-full px-4 py-3 text-left text-sm transition-colors ${
                conv.id === props.activeId
                  ? 'bg-primary/10 border-primary/30 text-base-content border-l-2'
                  : 'text-base-content/60 hover:bg-base-300/50 hover:text-base-content border-l-2 border-transparent'
              }`}>
              <span class="line-clamp-1">{conv.title}</span>
              <span class="text-base-content/20 mt-0.5 block text-xs">
                {conv.messages.length} messages
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
