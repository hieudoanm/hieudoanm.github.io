'use client';

import { FC, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ToolCard } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import type { Tool } from '@hieudoanm.github.io/components/pages/start/components/cards/ToolCard';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { TOOL_SECTION_LABELS } from '@hieudoanm.github.io/components/pages/start/sections';
import { CATEGORY_CONFIGS } from './_maps';

interface CategoryPageProps {
  category: string;
}

export const CategoryPage: FC<CategoryPageProps> = ({ category }) => {
  const router = useRouter();
  const config = CATEGORY_CONFIGS[category];

  const tools: Tool[] = useMemo(
    () =>
      config
        ? config
            .make(() => () => {})
            .map((t) => ({
              ...t,
              onClick: () => router.push(`/app/${category}/${t.toolId ?? ''}`),
            }))
        : [],
    [config, category, router]
  );

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-base-content/40 text-sm">Category not found</p>
      </div>
    );
  }

  return (
    <FullScreen
      onClose={() => router.push('/')}
      title={TOOL_SECTION_LABELS[category] ?? category}>
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
