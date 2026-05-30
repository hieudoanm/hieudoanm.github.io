import { A } from '@solidjs/router';
import { BlogMeta } from '../../data/blog';
import { TagBadge } from '../atoms/TagBadge';

interface BlogSidebarProps {
  meta: BlogMeta;
  activeTag?: string;
  onTagClick?: (tag: string) => void;
}

export const BlogSidebar = (props: BlogSidebarProps) => (
  <aside class="flex flex-col gap-8">
    <div>
      <p class="text-base-content/50 mb-3 text-xs font-medium tracking-[0.14em] uppercase">
        Tags
      </p>
      <div class="flex flex-wrap gap-2">
        {props.meta.tags.map(({ name, count }) => (
          <div key={name} class="flex items-center gap-1">
            <TagBadge
              tag={name}
              active={name === props.activeTag}
              onClick={props.onTagClick}
            />
            <span class="text-base-content/20 text-xs">{count}</span>
          </div>
        ))}
      </div>
    </div>
    <div>
      <p class="text-base-content/50 mb-3 text-xs font-medium tracking-[0.14em] uppercase">
        Recent posts
      </p>
      <div class="flex flex-col gap-3">
        {props.meta.recentPosts.map(({ slug, title, date }) => (
          <A
            key={slug}
            href={`/blog/${slug}`}
            class="text-base-content/60 hover:text-base-content group text-sm leading-relaxed transition-colors">
            <span class="group-hover:text-primary transition-colors">
              {title}
            </span>
            <span class="text-base-content/30 ml-2 text-xs">{date}</span>
          </A>
        ))}
      </div>
    </div>
  </aside>
);
