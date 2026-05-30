import { createSignal } from 'solid-js';
import { BlogPostsProps } from '../../../data/blog';
import { BlogHeader } from '../../organisms/blog/BlogHeader';
import { BlogFooter } from '../../organisms/blog/BlogFooter';
import { BlogCardList } from '../../molecules/BlogCardList';
import { BlogSidebar } from '../../molecules/BlogSidebar';

export const BlogsTemplate = (props: BlogPostsProps) => {
  const [activeTag, setActiveTag] = createSignal<string | undefined>();

  const filtered = activeTag()
    ? props.posts.filter((p) => p.tags.includes(activeTag()!))
    : props.posts;

  return (
    <div
      class="bg-base-100 text-base-content min-h-screen font-sans"
      data-theme="luxury">
      <BlogHeader />
      <section class="mx-auto flex max-w-6xl gap-12 px-12 py-16">
        <div class="min-w-0 flex-1">
          {activeTag() && (
            <div class="mb-6 flex items-center gap-2">
              <span class="text-base-content/50 text-xs">Filtered by:</span>
              <span class="badge badge-primary badge-sm">{activeTag()}</span>
              <button
                type="button"
                onClick={() => setActiveTag(undefined)}
                class="text-base-content/40 hover:text-base-content ml-1 text-xs transition-colors">
                Clear
              </button>
            </div>
          )}
          {filtered.length > 0 ? (
            <BlogCardList posts={filtered} />
          ) : (
            <div class="card bg-base-200 border-base-300 border">
              <div class="card-body items-center py-16 text-center">
                <div class="mb-4 text-4xl opacity-40">&empty;</div>
                <h3 class="mb-2 text-base font-medium">No posts found</h3>
                <p class="text-base-content/50 mb-4 text-sm">
                  {activeTag()
                    ? `No posts tagged with "${activeTag()}".`
                    : 'No posts yet.'}
                </p>
                {activeTag() && (
                  <button
                    type="button"
                    onClick={() => setActiveTag(undefined)}
                    class="btn btn-primary btn-sm">
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <aside class="hidden w-64 shrink-0 lg:block">
          <div class="bg-base-200 border-base-300 sticky top-24 rounded-2xl border p-6">
            <BlogSidebar
              meta={props.meta}
              activeTag={activeTag()}
              onTagClick={setActiveTag}
            />
          </div>
        </aside>
      </section>
      <BlogFooter />
    </div>
  );
};
