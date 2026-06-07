export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: number;
  model?: string;
};

export type ChatConversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  model: string;
  createdAt: number;
  updatedAt: number;
};

export interface ChatTemplateProps {
  initialMessages?: ChatMessage[];
  model?: string;
  onSendMessage?: (message: string) => Promise<string>;
  onModelChange?: (model: string) => void;
  onNewChat?: () => void;
  conversations?: ChatConversation[];
  activeConversationId?: string;
  onConversationSelect?: (id: string) => void;
  models?: { company: string; label: string; value: string }[];
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}
