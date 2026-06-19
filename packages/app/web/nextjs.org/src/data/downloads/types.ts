import { Action } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';

export interface Download {
  id: string;
  label: string;
  url: string;
  emoji: string;
  color: string;
  description: string;
  downloads: Action[];
}
