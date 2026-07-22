export interface Group {
  category: string;
  countries: string[];
}

export interface Puzzle {
  groups: [Group, Group, Group, Group];
}
