import { readFileSync } from 'fs';
import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { Suspense } from 'react';

type NotePageProps = {
  mdxSource: any;
};

const NotePage: NextPage<NotePageProps> = ({ mdxSource }: NotePageProps) => {
  return (
    <div className='container mx-auto'>
      <div className='p-4 md:p-8'>
        <Suspense fallback={<>Loading...</>}>
          <MDXRemote {...mdxSource} />
        </Suspense>
      </div>
    </div>
  );
};

export const getStaticPaths = (async () => {
  return {
    paths: [
      {
        params: {
          id: 'wishlist',
        },
      }, // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const { params } = context;
  const id: string = (params ?? { id: '' }).id ?? '';
  const source: string = readFileSync(`./docs/${id}/README.md`, 'utf-8');
  const mdxSource = await serialize(source);
  return { props: { mdxSource } };
};

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { id } = context.query;
//   const source: string = readFileSync(`./docs/${id}/README.md`, 'utf-8');
//   const mdxSource = await serialize(source);
//   return { props: { mdxSource } };
// };

export default NotePage;
