import Link from 'next/link';
import { FC } from 'react';
import PostContent from '@/components/posts/PostContent';
import PostDiagram from '@/components/posts/PostDiagram';
import type { Post } from '@/lib/posts';

interface PostPageViewProps {
  post: Post;
}

const PostPageView: FC<PostPageViewProps> = ({ post }) => (
  <div className="h-screen overflow-y-auto">
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="mb-6 opacity-60">
        <Link className="link" href="/posts/">
          ← All posts
        </Link>
      </p>
      <PostContent post={post} />
      {post.diagramText && (
        <div className="mt-8">
          <PostDiagram text={post.diagramText} name={post.title} />
        </div>
      )}
    </main>
  </div>
);

export default PostPageView;
