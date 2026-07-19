export type Paytable = Record<number, Record<number, number>>;

export interface KenoDraw {
  drawn: number[];
  catches: number;
  won: number;
}
