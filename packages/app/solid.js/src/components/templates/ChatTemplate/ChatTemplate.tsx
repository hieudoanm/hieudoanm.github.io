import { createSignal } from 'solid-js';
import { ChatMessage, ChatTemplateProps } from '../../../data/chat';
import { ChatMessageList } from '../../molecules/ChatMessageList';
import { ChatInput } from '../../molecules/ChatInput';
import { ChatHeader } from '../../organisms/chat/ChatHeader';
import { ChatFooter } from '../../organisms/chat/ChatFooter';
import { ChatSidebar } from '../../organisms/chat/ChatSidebar';

let messageIdCounter = 0;
const nextId = () => `msg-${++messageIdCounter}`;

export const ChatTemplate = (props: ChatTemplateProps) => {
  const [messages, setMessages] = createSignal<ChatMessage[]>(
    props.initialMessages ?? []
  );
  const [input, setInput] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [model, setModel] = createSignal(props.model ?? '');
  const [sidebarOpen, setSidebarOpen] = createSignal(props.sidebarOpen ?? true);

  const toggleSidebar = () => {
    if (props.onToggleSidebar) {
      props.onToggleSidebar();
    } else {
      setSidebarOpen((s) => !s);
    }
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    props.onModelChange?.(value);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setLoading(false);
    props.onNewChat?.();
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading()) return;

    const userMessage: ChatMessage = {
      id: nextId(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      model: model(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    if (props.onSendMessage) {
      try {
        const response = await props.onSendMessage(text);
        const aiMessage: ChatMessage = {
          id: nextId(),
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
          model: model(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } catch {
        const errorMessage: ChatMessage = {
          id: nextId(),
          role: 'assistant',
          content: 'Sorry, an error occurred. Please try again.',
          timestamp: Date.now(),
          model: model(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    }
    setLoading(false);
  };

  return (
    <div
      class="bg-base-100 text-base-content flex h-screen flex-col font-sans"
      data-theme="luxury">
      <ChatHeader
        model={model()}
        models={props.models ?? []}
        onModelChange={handleModelChange}
        onNewChat={handleNewChat}
        onToggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen()}
        disabled={loading()}
      />
      <div class="flex min-h-0 flex-1">
        <ChatSidebar
          conversations={props.conversations ?? []}
          activeId={props.activeConversationId}
          onSelect={(id: string) => props.onConversationSelect?.(id)}
          onNewChat={handleNewChat}
          open={sidebarOpen()}
        />
        <div class="flex flex-1 flex-col">
          <ChatMessageList messages={messages()} loading={loading()} />
          <ChatInput
            value={input()}
            onChange={setInput}
            onSubmit={handleSendMessage}
            disabled={loading()}
          />
          <ChatFooter />
        </div>
      </div>
    </div>
  );
};
