export interface Cuisine {
  emoji: string;
  value: string;
  label: string;
}

export interface Food {
  emoji: string;
  value: string;
  label: string;
  category: string;
}

export interface ScheduleEntry {
  day: string;
  meal: string;
  emoji: string;
  restaurant: string;
  note: string;
}
