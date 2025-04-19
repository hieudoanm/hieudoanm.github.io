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
    <main className="min-h-screen">
      <div className="border-b border-gray-700 px-8 py-4">
        <div className="container mx-auto">
          <input
            id="search"
            name="search"
            placeholder="Search"
            className="w-full rounded border border-gray-700 px-4 py-2"
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
      {posts
        .filter(({ title }) => {
          return search !== ''
            ? title.toLowerCase().includes(search.toLowerCase())
            : true;
        })
        .map(({ id = '', title = '', date = '' }) => (
          <div key={id} className="border-b border-gray-700 px-8 py-4">
            <div className="container mx-auto">
              <Link href={`/posts/${id}`}>
                <p>
                  <b>{title}</b>
                </p>
                <small>Date: {date}</small>
              </Link>
            </div>
          </div>
        ))}
    </main>
  );
};

export default NotesPage;
