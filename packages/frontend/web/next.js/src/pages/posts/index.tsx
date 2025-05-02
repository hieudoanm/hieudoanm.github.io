import { getSortedPostsData } from '@web/utils/posts';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

export async function getStaticProps() {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
}

const NotesPage: NextPage<{
  posts: { id: string; title: string; date: string }[];
}> = ({ posts }) => {
  const [{ search }, setState] = useState<{ search: string }>({ search: '' });

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-8 py-4">
          <input
            id="search"
            name="search"
            placeholder="Search"
            className="w-full rounded border border-gray-800 px-4 py-2"
            value={search}
            onChange={(event) => {
              setState((previous) => ({
                ...previous,
                search: event.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="grow overflow-auto">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts
              .filter(({ id = '', title = '' }) => {
                const tags: string[] = id
                  .split('/')
                  .filter((tag) => tag !== '');
                tags.pop();

                const tagsFlag: boolean =
                  tags.length > 0 ? tags.includes(search.toLowerCase()) : true;
                const searchFlag: boolean =
                  search !== ''
                    ? title.toLowerCase().includes(search.toLowerCase())
                    : true;
                return tagsFlag || searchFlag;
              })
              .map(({ id = '', title = '', date = '' }) => {
                const tags: string[] = id
                  .split('/')
                  .filter((tag) => tag !== '');
                tags.pop();

                return (
                  <div
                    key={id}
                    className="col-span-1 border-b border-gray-800 py-4">
                    <div className="flex flex-col gap-y-2">
                      <div className="flex flex-col gap-y-1">
                        <Link href={`/posts/${id}`}>
                          <p>
                            <b>{title}</b>
                          </p>
                        </Link>
                        <small>Date: {date}</small>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {tags.map((tag: string) => (
                          <button
                            key={tag}
                            type="button"
                            className="inline-block cursor-pointer rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-900"
                            onClick={() =>
                              setState((previous) => ({
                                ...previous,
                                search: tag,
                              }))
                            }>
                            <b>{tag}</b>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotesPage;
