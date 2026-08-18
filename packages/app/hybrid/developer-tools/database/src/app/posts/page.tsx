import type { FC } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiBookOpen } from 'react-icons/fi';

import { posts } from '@/posts';

const PostsPage: FC = () => (
  <div className="bg-base-100 min-h-screen">
    <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-xl font-bold">Schema Library</h1>
      <Link href="/" className="btn btn-ghost btn-sm gap-2">
        <FiArrowLeft className="size-3.5" /> Back
      </Link>
    </header>
    <main className="mx-auto max-w-4xl p-6">
      <p className="text-base-content/60 mb-6">
        Classic database schemas with ER diagrams, table designs and sample SQL.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="card bg-base-200 card-body hover:bg-base-300 transition-colors">
            <FiBookOpen className="text-primary size-6" />
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-base-content/50 line-clamp-2 text-sm">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  </div>
);

export default PostsPage;
