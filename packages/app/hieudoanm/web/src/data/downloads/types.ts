import type { ComponentType } from 'react';
import { Action } from '@hieudoanm.github.io/components/pages/start/cards/ItemCard';

export interface Download {
  id: string;
  label: string;
  url: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  color: string;
  description: string;
  downloads: Action[];
}
