'use client';

import { FC, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ToolCard } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import type { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { GAME_CATEGORY_LABELS } from './_maps';

interface CategoryPageProps {
  category: string;
  make: (open: (id: string) => () => void) => Tool[];
}

export const CategoryPage: FC<CategoryPageProps> = ({ category, make }) => {
  const router = useRouter();

  const tools: Tool[] = useMemo(
    () =>
      make(() => () => {}).map((t) => ({
        ...t,
        onClick: () => router.push(`/games/${category}/${t.toolId ?? ''}`),
      })),
    [make, category, router]
  );

  return (
    <FullScreen
      onClose={() => router.push('/games')}
      title={GAME_CATEGORY_LABELS[category] ?? category}>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.label} {...tool} />
          ))}
        </div>
      </div>
    </FullScreen>
  );
};
