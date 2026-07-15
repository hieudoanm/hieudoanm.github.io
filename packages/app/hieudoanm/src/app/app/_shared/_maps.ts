import type { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import type { ModalId } from '@hieudoanm.github.io/components/pages/start/types';
import { CATEGORY_MAKERS } from '@hieudoanm.github.io/components/pages/start/components/sidebars/tabs/AppsTab/makeTools';

interface CategoryConfig {
  make: (open: (id: ModalId) => () => void) => Tool[];
}

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> =
  Object.fromEntries(
    Object.entries(CATEGORY_MAKERS).map(([key, make]) => [key, { make }])
  );
