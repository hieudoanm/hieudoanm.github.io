import type { FC } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PostView } from '@/components/templates/PostView';
import { getPostBySlug, posts, type Post } from '@/posts';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = (): { slug: string }[] =>
  posts.map((p) => ({ slug: p.slug }));

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post ? `${post.title} · Schema Library` : 'Schema Library',
    description: post?.description,
  };
};

const PostPage: FC<PostPageProps> = async ({ params }) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev: Post | null = idx > 0 ? posts[idx - 1] : null;
  const next: Post | null = idx < posts.length - 1 ? posts[idx + 1] : null;
  return <PostView post={post} prev={prev} next={next} />;
};

export default PostPage;
