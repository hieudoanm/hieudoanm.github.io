import { A } from '@solidjs/router';
import { BlogPostProps } from '../../../../data/blog';
import { TagBadge } from '../../../atoms/TagBadge';
import { BlogDate } from '../../../atoms/BlogDate';
import { BlogSidebar } from '../../../molecules/BlogSidebar';

export const BlogTemplate = (props: BlogPostProps) => (
  <div
    class="bg-base-100 text-base-content min-h-screen font-sans"
    data-theme="luxury">
    <div class="border-base-300 border-b">
      <div class="mx-auto flex max-w-5xl items-start px-12 py-6">
        <A
          href="/blog"
          class="text-base-content/40 hover:text-primary btn btn-ghost btn-sm transition-colors">
          &larr; Back to blog
        </A>
      </div>
    </div>

    <article class="mx-auto max-w-5xl px-12 py-16">
      <div class="mx-auto max-w-3xl">
        <header class="mb-12">
          <div class="mb-4 flex flex-wrap gap-2">
            {props.post.tags.map((tag) => (
              <TagBadge tag={tag} />
            ))}
          </div>
          <h1 class="mb-4 font-serif text-4xl leading-[1.15] font-black tracking-tight">
            {props.post.title}
          </h1>
          <p class="text-base-content/60 mb-6 text-lg leading-relaxed">
            {props.post.description}
          </p>
          <div class="flex items-center gap-4 text-sm">
            <div class="avatar placeholder">
              <div class="bg-primary/20 text-primary w-9 rounded-full">
                <span class="text-xs font-medium">
                  {props.post.author
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </span>
              </div>
            </div>
            <div>
              <p class="text-base-content font-medium">{props.post.author}</p>
              <div class="text-base-content/40 flex items-center gap-2 text-xs">
                <BlogDate date={props.post.date} format="long" />
                {props.post.readingTime && (
                  <>
                    <span class="text-base-content/20">&middot;</span>
                    <span>{props.post.readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {props.post.coverImage && (
          <div class="bg-base-300 mb-12 overflow-hidden rounded-2xl">
            <img
              src={props.post.coverImage}
              alt={props.post.title}
              class="w-full object-cover"
            />
          </div>
        )}

        <div class="text-base-content/80 prose prose-sm max-w-none leading-relaxed">
          {props.post.content}
        </div>
      </div>
    </article>

    <div class="border-base-300 mx-12 border-t" />

    <section class="mx-auto max-w-5xl px-12 py-16">
      <div class="mx-auto flex max-w-3xl items-start gap-16">
        <div class="min-w-0 flex-1">
          <h2 class="mb-6 font-serif text-2xl font-bold">Continue reading</h2>
          <div class="flex flex-col gap-4">
            {props.meta.recentPosts
              .filter((p) => p.slug !== props.post.slug)
              .slice(0, 3)
              .map(({ slug, title, date }) => (
                <A
                  href={`/blog/${slug}`}
                  class="card bg-base-200 border-base-300 hover:border-primary/40 group border transition-colors">
                  <div class="card-body p-5">
                    <div class="text-base-content/40 mb-1 text-xs">{date}</div>
                    <h3 class="card-title group-hover:text-primary text-sm font-medium transition-colors">
                      {title}
                    </h3>
                  </div>
                </A>
              ))}
          </div>
        </div>
        <aside class="hidden w-64 shrink-0 lg:block">
          <div class="bg-base-200 border-base-300 sticky top-24 rounded-2xl border p-6">
            <BlogSidebar meta={props.meta} />
          </div>
        </aside>
      </div>
    </section>

    <footer class="border-base-300 border-t py-12 text-center">
      <p class="text-primary mb-3 font-serif text-2xl font-bold tracking-widest">
        Blog
      </p>
      <p class="text-base-content/30 text-sm">
        &copy; {new Date().getFullYear()} &middot; Built with care
      </p>
    </footer>
  </div>
);
