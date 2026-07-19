export type DueFilter = 'all' | 'overdue' | 'today' | 'week' | 'none';
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high' | 'urgent';

export interface BoardFilters {
  activeLabel: string | null;
  activeMember: string | null;
  dueFilter: DueFilter;
  priorityFilter: PriorityFilter;
}

export interface Preset extends BoardFilters {
  id: string;
  name: string;
}

export const DUE_OPTIONS: { value: DueFilter; label: string }[] = [
  { value: 'all', label: 'Any due date' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'today', label: 'Due today' },
  { value: 'week', label: 'Next 7 days' },
  { value: 'none', label: 'No due date' },
];

export const PRIORITY_OPTIONS: { value: PriorityFilter; label: string }[] = [
  { value: 'all', label: 'Any priority' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];
