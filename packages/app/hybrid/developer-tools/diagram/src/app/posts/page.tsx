import Link from 'next/link';
import type { Metadata } from 'next';
import { FC } from 'react';
import PostsBrowser from '@/components/posts/PostsBrowser';
import { listPostSummaries } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Posts — Diagram Examples',
  description:
    'System-design interview examples with questions, answers, and diagrams.',
};

const PostsPage: FC = () => {
  const posts = listPostSummaries();
  return (
    <div className="h-screen overflow-y-auto">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <header className="mb-8">
          <p className="mb-6 opacity-60">
            <Link className="link" href="/">
              ← Open the editor
            </Link>
          </p>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-base-content/70 mt-2">
            {posts.length} system-design interview examples with questions,
            answers, and diagrams.
          </p>
        </header>
        <PostsBrowser posts={posts} />
      </main>
    </div>
  );
};

export default PostsPage;
