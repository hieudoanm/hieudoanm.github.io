export type Party = {
  name: string;
  abbreviation: string;
  color: string;
  seats: number;
};
export type Chamber = { name: string; totalSeats: number; parties: Party[] };
export type Country = {
  name: string;
  flag: string;
  chambers: Record<string, Chamber>;
};
