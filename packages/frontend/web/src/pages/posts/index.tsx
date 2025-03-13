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
    <main className="h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-8">
        <ul>
          {posts.map(({ id, title, date }) => (
            <li key={id} className="border-b border-gray-300 pb-8">
              <Link href={`/posts/${id}`}>
                <p>{title}</p>
              </Link>
              <small>{date}</small>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default NotesPage;
