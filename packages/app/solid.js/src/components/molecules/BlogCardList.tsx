import { BlogPost } from '../../data/blog';
import { BlogCard } from './BlogCard';

interface BlogCardListProps {
  posts: BlogPost[];
}

export const BlogCardList = (props: BlogCardListProps) => (
  <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
    {props.posts.map((post) => (
      <BlogCard key={post.slug} post={post} />
    ))}
  </div>
);
