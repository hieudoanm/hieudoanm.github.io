import { FC } from 'react';
import { GroupHeader } from '@/components/molecules/GroupHeader';
import { ToolCard } from '@/components/organisms/ToolCard';
import type { CourseItem } from '@/lib/catalog';

export interface GroupSectionProps {
  title: string;
  items: CourseItem[];
}

export const GroupSection: FC<GroupSectionProps> = ({ title, items }) => (
  <section data-testid={`group-${title}`} className="flex flex-col gap-4">
    <GroupHeader title={title} count={items.length} />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ToolCard key={item.href} item={item} />
      ))}
    </div>
  </section>
);

GroupSection.displayName = 'GroupSection';
