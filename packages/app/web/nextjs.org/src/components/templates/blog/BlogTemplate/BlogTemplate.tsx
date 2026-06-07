import { FC } from 'react';
import Link from 'next/link';
import { BlogPostProps } from '../../../../data/blog';
import { TagBadge } from '../../../atoms/TagBadge';
import { BlogDate } from '../../../atoms/BlogDate';
import { BlogSidebar } from '../../../molecules/BlogSidebar';

export const BlogTemplate: FC<BlogPostProps> = ({ post, meta }) => (
  <div
    className="bg-base-100 text-base-content min-h-screen font-sans"
    data-theme="luxury">
    <div className="border-base-300 border-b">
      <div className="mx-auto flex max-w-5xl items-start px-12 py-6">
        <Link
          href="/blog"
          className="text-base-content/40 hover:text-primary btn btn-ghost btn-sm transition-colors">
          &larr; Back to blog
        </Link>
      </div>
    </div>

    <article className="mx-auto max-w-5xl px-12 py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
          <h1 className="mb-4 font-serif text-4xl leading-[1.15] font-black tracking-tight">
            {post.title}
          </h1>
          <p className="text-base-content/60 mb-6 text-lg leading-relaxed">
            {post.description}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="avatar placeholder">
              <div className="bg-primary/20 text-primary w-9 rounded-full">
                <span className="text-xs font-medium">
                  {post.author
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
            </div>
            <div>
              <p className="text-base-content font-medium">{post.author}</p>
              <div className="text-base-content/40 flex items-center gap-2 text-xs">
                <BlogDate date={post.date} format="long" />
                {post.readingTime && (
                  <>
                    <span className="text-base-content/20">&middot;</span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="bg-base-300 mb-12 overflow-hidden rounded-2xl">
            <img
              src={post.coverImage}
              alt={post.title}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="text-base-content/80 prose prose-sm max-w-none leading-relaxed">
          {post.content}
        </div>
      </div>
    </article>

    <div className="border-base-300 mx-12 border-t" />

    <section className="mx-auto max-w-5xl px-12 py-16">
      <div className="mx-auto flex max-w-3xl items-start gap-16">
        <div className="min-w-0 flex-1">
          <h2 className="mb-6 font-serif text-2xl font-bold">
            Continue reading
          </h2>
          <div className="flex flex-col gap-4">
            {meta.recentPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map(({ slug, title, date }) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
                  className="card bg-base-200 border-base-300 hover:border-primary/40 group border transition-colors">
                  <div className="card-body p-5">
                    <div className="text-base-content/40 mb-1 text-xs">
                      {date}
                    </div>
                    <h3 className="card-title group-hover:text-primary text-sm font-medium transition-colors">
                      {title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="bg-base-200 border-base-300 sticky top-24 rounded-2xl border p-6">
            <BlogSidebar meta={meta} />
          </div>
        </aside>
      </div>
    </section>

    <footer className="border-base-300 border-t py-12 text-center">
      <p className="text-primary mb-3 font-serif text-2xl font-bold tracking-widest">
        Blog
      </p>
      <p className="text-base-content/30 text-sm">
        &copy; {new Date().getFullYear()} &middot; Built with care
      </p>
    </footer>
  </div>
);
