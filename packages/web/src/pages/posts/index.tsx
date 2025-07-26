import { Glass } from '@web/components/Glass';
import { getSortedPostsData } from '@web/utils/posts';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

export const getStaticProps = async () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};

const NotesPage: NextPage<{
  posts: { id: string; title: string; date: string }[];
}> = ({ posts }) => {
  const [{ search }, setState] = useState<{ search: string }>({ search: '' });

  return (
    <main className="flex h-screen flex-col gap-y-4 overflow-hidden md:gap-y-8">
      <div className="container mx-auto px-4 md:px-8">
        <Glass.Input
          id="search"
          name="search"
          placeholder="Search"
          className="w-full"
          value={search}
          onChange={(event) => {
            setState((previous) => ({
              ...previous,
              search: event.target.value,
            }));
          }}
        />
      </div>
      <div className="grow overflow-auto">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
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
                  <Glass.Card
                    key={id}
                    className="col-span-1 border-b border-neutral-800 py-4">
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
                            className="inline-block cursor-pointer rounded bg-neutral-100 px-1 py-0.5 text-xs text-neutral-900"
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
                  </Glass.Card>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotesPage;
