import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FC } from 'react';
import PostPageView from '@/components/posts/PostPageView';
import { getPost, listPosts } from '@/lib/posts';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export const generateStaticParams = (): { slug: string }[] =>
  listPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Diagram Examples`,
    description: post.description,
  };
};

const PostPage: FC<PostPageProps> = async ({ params }) => {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <PostPageView post={post} />;
};

export default PostPage;
