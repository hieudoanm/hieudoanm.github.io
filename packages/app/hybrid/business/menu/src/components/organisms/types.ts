import type { MenuState } from '@/types/menu';

export interface MenuStore {
  state: MenuState;
  setState: React.Dispatch<React.SetStateAction<MenuState>>;
  reset: () => void;
}