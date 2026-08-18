'use client';

import Link from 'next/link';
import { useMemo, useState, type FC } from 'react';
import type { PostSummary } from '@/lib/posts';

export const POSTS_PER_PAGE = 12;

interface PostsBrowserProps {
  posts: PostSummary[];
}

const PostsBrowser: FC<PostsBrowserProps> = ({ posts }) => {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.includes(q));
      const matchesTags = activeTags.every((tag) => post.tags.includes(tag));
      return matchesQuery && matchesTags;
    });
  }, [posts, query, activeTags]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );
  const currentPage = Math.min(page, pageCount);
  const start =
    filteredPosts.length === 0 ? 0 : (currentPage - 1) * POSTS_PER_PAGE + 1;
  const end = Math.min(currentPage * POSTS_PER_PAGE, filteredPosts.length);
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const onSearch = (value: string): void => {
    setQuery(value);
    setPage(1);
  };

  const toggleTag = (tag: string): void => {
    setActiveTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    );
    setPage(1);
  };

  const clearFilters = (): void => {
    setActiveTags([]);
    setQuery('');
    setPage(1);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          aria-label="Search posts"
          className="input input-bordered input-sm w-full max-w-xs"
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search by title, description, or tag"
          type="search"
          value={query}
        />
        {activeTags.length > 0 && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={clearFilters}
            type="button">
            Clear filters
          </button>
        )}
      </div>

      {allTags.length > 0 && (
        <div
          aria-label="Filter by tag"
          className="mt-4 flex flex-wrap gap-1.5"
          role="group">
          {allTags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <button
                aria-pressed={active}
                className={`badge cursor-pointer ${
                  active ? 'badge-primary' : 'badge-neutral'
                }`}
                key={tag}
                onClick={() => toggleTag(tag)}
                type="button">
                {tag}
              </button>
            );
          })}
        </div>
      )}

      <p aria-live="polite" className="text-base-content/70 mt-4 text-sm">
        {filteredPosts.length === 0
          ? 'No posts match your search.'
          : `Showing ${start}–${end} of ${filteredPosts.length} posts`}
      </p>

      <ul className="mt-4 space-y-2">
        {visiblePosts.map((post) => (
          <li key={post.slug}>
            <Link
              className="card border-base-300 bg-base-200 hover:border-primary block p-4 transition-colors"
              href={`/posts/${post.slug}/`}>
              <span className="font-semibold">{post.title}</span>
              <span className="text-base-content/70 mt-1 block text-sm">
                {post.description}
              </span>
              <span className="text-base-content/50 mt-1 block text-xs">
                <span className="capitalize">{post.category}</span> ·{' '}
                <span className="capitalize">{post.difficulty}</span>
              </span>
              {post.tags.length > 0 && (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span className="badge badge-ghost badge-sm" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {pageCount > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-6 flex items-center justify-between">
          <button
            aria-label="Previous page"
            className="btn btn-outline btn-sm"
            disabled={currentPage === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            type="button">
            Previous
          </button>
          <span className="text-base-content/70 text-sm">
            Page {currentPage} of {pageCount}
          </span>
          <button
            aria-label="Next page"
            className="btn btn-outline btn-sm"
            disabled={currentPage === pageCount}
            onClick={() =>
              setPage((current) => Math.min(pageCount, current + 1))
            }
            type="button">
            Next
          </button>
        </nav>
      )}
    </div>
  );
};

export default PostsBrowser;
