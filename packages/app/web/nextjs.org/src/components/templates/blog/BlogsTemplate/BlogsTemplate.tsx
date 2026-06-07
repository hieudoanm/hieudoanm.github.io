import { FC, useState } from 'react';
import { BlogPostsProps } from '../../../../data/blog';
import { BlogHeader } from '../../../organisms/blog/BlogHeader';
import { BlogFooter } from '../../../organisms/blog/BlogFooter';
import { BlogCardList } from '../../../molecules/BlogCardList';
import { BlogSidebar } from '../../../molecules/BlogSidebar';

export const BlogsTemplate: FC<BlogPostsProps> = ({ posts, meta }) => {
  const [activeTag, setActiveTag] = useState<string | undefined>();

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div
      className="bg-base-100 text-base-content min-h-screen font-sans"
      data-theme="luxury">
      <BlogHeader />
      <section className="mx-auto flex max-w-6xl gap-12 px-12 py-16">
        <div className="min-w-0 flex-1">
          {activeTag && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-base-content/50 text-xs">Filtered by:</span>
              <span className="badge badge-primary badge-sm">{activeTag}</span>
              <button
                type="button"
                onClick={() => setActiveTag(undefined)}
                className="text-base-content/40 hover:text-base-content ml-1 text-xs transition-colors">
                Clear
              </button>
            </div>
          )}
          {filtered.length > 0 ? (
            <BlogCardList posts={filtered} />
          ) : (
            <div className="card bg-base-200 border-base-300 border">
              <div className="card-body items-center py-16 text-center">
                <div className="mb-4 text-4xl opacity-40">&empty;</div>
                <h3 className="mb-2 text-base font-medium">No posts found</h3>
                <p className="text-base-content/50 mb-4 text-sm">
                  {activeTag
                    ? `No posts tagged with "${activeTag}".`
                    : 'No posts yet.'}
                </p>
                {activeTag && (
                  <button
                    type="button"
                    onClick={() => setActiveTag(undefined)}
                    className="btn btn-primary btn-sm">
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="bg-base-200 border-base-300 sticky top-24 rounded-2xl border p-6">
            <BlogSidebar
              meta={meta}
              activeTag={activeTag}
              onTagClick={setActiveTag}
            />
          </div>
        </aside>
      </section>
      <BlogFooter />
    </div>
  );
};
