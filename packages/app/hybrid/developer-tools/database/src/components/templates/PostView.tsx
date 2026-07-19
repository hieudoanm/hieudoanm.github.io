import type { FC } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { Markdown } from '@/components/organisms/Markdown';
import type { Post } from '@/posts';

interface PostViewProps {
  post: Post;
  prev: Post | null;
  next: Post | null;
}

export const PostView: FC<PostViewProps> = ({ post, prev, next }) => (
  <div className="bg-base-100 min-h-screen">
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-xl font-bold">Schema Library</h1>
      <Link href="/posts" className="btn btn-ghost btn-sm gap-2">
        <FiArrowLeft className="size-3.5" /> All schemas
      </Link>
    </header>
    <main className="mx-auto max-w-3xl p-6">
      <Markdown source={post.source} />
      <nav className="border-base-300 mt-12 flex items-center justify-between gap-3 border-t pt-4">
        {prev ? (
          <Link
            href={`/posts/${prev.slug}`}
            className="btn btn-ghost btn-sm gap-2">
            <FiArrowLeft className="size-3.5" /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/posts/${next.slug}`}
            className="btn btn-ghost btn-sm gap-2">
            {next.title} <FiArrowRight className="size-3.5" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  </div>
);
