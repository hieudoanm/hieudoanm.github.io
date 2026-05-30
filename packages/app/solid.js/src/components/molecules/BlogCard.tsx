import { A } from '@solidjs/router';
import { BlogPost } from '../../data/blog';
import { BlogDate } from '../atoms/BlogDate';
import { TagBadge } from '../atoms/TagBadge';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = (props: BlogCardProps) => (
  <A
    href={`/blog/${props.post.slug}`}
    class="card bg-base-200 border-base-300 hover:border-primary/40 group border transition-colors">
    <div class="card-body p-7">
      {props.post.coverImage && (
        <div class="bg-base-300 mb-4 flex h-44 items-center justify-center overflow-hidden rounded-lg">
          <img
            src={props.post.coverImage}
            alt={props.post.title}
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div class="mb-3 flex items-center gap-3">
        <BlogDate date={props.post.date} />
        {props.post.readingTime && (
          <span class="text-base-content/30 text-xs">
            {props.post.readingTime} min read
          </span>
        )}
      </div>
      <h3 class="card-title text-base-content group-hover:text-primary mb-2 text-sm font-medium transition-colors">
        {props.post.title}
      </h3>
      <p class="text-base-content/50 mb-4 line-clamp-2 text-sm leading-relaxed">
        {props.post.description}
      </p>
      <div class="mt-auto flex flex-wrap gap-2">
        {props.post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  </A>
);
