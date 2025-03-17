import { getSortedPostsData } from '@web/utils/posts';
import { NextPage } from 'next';
import Link from 'next/link';

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
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <ul>
        <li></li>
        {posts.map(({ id, title, date }) => (
          <li key={id} className="mx-auto border-t border-gray-300 px-8 py-4">
            <div className="container mx-auto">
              <Link href={`/posts/${id}`}>
                <p>{title}</p>
              </Link>
              <small>Date: {date}</small>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default NotesPage;
