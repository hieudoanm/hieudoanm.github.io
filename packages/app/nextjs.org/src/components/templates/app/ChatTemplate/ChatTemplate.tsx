import { FC, useState, useCallback } from 'react';
import { ChatMessage, ChatTemplateProps } from '../../../../data/chat';
import { ChatMessageList } from '../../../molecules/ChatMessageList';
import { ChatInput } from '../../../molecules/ChatInput';
import { ChatHeader } from '../../../organisms/chat/ChatHeader';
import { ChatFooter } from '../../../organisms/chat/ChatFooter';
import { ChatSidebar } from '../../../organisms/chat/ChatSidebar';

let messageIdCounter = 0;
const nextId = () => `msg-${++messageIdCounter}`;

export const ChatTemplate: FC<ChatTemplateProps> = ({
  initialMessages,
  model: initialModel,
  onSendMessage: externalSend,
  onModelChange: externalModelChange,
  onNewChat: externalNewChat,
  conversations = [],
  activeConversationId,
  onConversationSelect,
  models = [],
  sidebarOpen: initialSidebarOpen,
  onToggleSidebar: externalToggleSidebar,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages ?? []
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(initialModel ?? '');
  const [sidebarOpen, setSidebarOpen] = useState(initialSidebarOpen ?? true);

  const toggleSidebar = useCallback(() => {
    if (externalToggleSidebar) {
      externalToggleSidebar();
    } else {
      setSidebarOpen((s) => !s);
    }
  }, [externalToggleSidebar]);

  const handleModelChange = useCallback(
    (value: string) => {
      setModel(value);
      externalModelChange?.(value);
    },
    [externalModelChange]
  );

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setInput('');
    setLoading(false);
    externalNewChat?.();
  }, [externalNewChat]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMessage: ChatMessage = {
        id: nextId(),
        role: 'user',
        content: text,
        timestamp: Date.now(),
        model,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setLoading(true);

      if (externalSend) {
        try {
          const response = await externalSend(text);
          const aiMessage: ChatMessage = {
            id: nextId(),
            role: 'assistant',
            content: response,
            timestamp: Date.now(),
            model,
          };
          setMessages((prev) => [...prev, aiMessage]);
        } catch {
          const errorMessage: ChatMessage = {
            id: nextId(),
            role: 'assistant',
            content: 'Sorry, an error occurred. Please try again.',
            timestamp: Date.now(),
            model,
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
      }
      setLoading(false);
    },
    [loading, model, externalSend]
  );

  return (
    <div
      className="bg-base-100 text-base-content flex h-screen flex-col font-sans"
      data-theme="luxury">
      <ChatHeader
        model={model}
        models={models}
        onModelChange={handleModelChange}
        onNewChat={handleNewChat}
        onToggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        disabled={loading}
      />
      <div className="flex min-h-0 flex-1">
        <ChatSidebar
          conversations={conversations}
          activeId={activeConversationId}
          onSelect={(id) => onConversationSelect?.(id)}
          onNewChat={handleNewChat}
          open={sidebarOpen}
        />
        <div className="flex flex-1 flex-col">
          <ChatMessageList messages={messages} loading={loading} />
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSendMessage}
            disabled={loading}
          />
          <ChatFooter />
        </div>
      </div>
    </div>
  );
};
