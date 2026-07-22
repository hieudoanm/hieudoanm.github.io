export interface Board {
  id: string;
  name: string;
  background: string;
  starred: boolean;
  listIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface List {
  id: string;
  boardId: string;
  name: string;
  cardIds: string[];
  collapsed: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Card {
  id: string;
  listId: string;
  title: string;
  description: string;
  labels: string[];
  dueDate: number | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  memberIds: string[];
  checklistItems: ChecklistItem[];
  commentCount: number;
  coverColor: string | null;
  archived: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Activity {
  id: string;
  boardId: string;
  cardId: string | null;
  message: string;
  userId: string;
  timestamp: number;
}

export interface ProjectsSettings {
  theme: string;
  defaultView: string;
  notifications: boolean;
}
