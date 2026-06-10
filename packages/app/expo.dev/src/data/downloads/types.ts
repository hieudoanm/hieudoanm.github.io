import { Action } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';

export type Download = {
  id: string;
  label: string;
  url: string;
  emoji: string;
  color: string;
  description: string;
  downloads: Action[];
};
