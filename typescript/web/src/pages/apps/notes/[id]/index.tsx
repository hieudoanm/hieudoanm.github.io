import notes from '@web/json/notes.json';
import { readFileSync } from 'fs';
import { GetStaticPaths, GetStaticPropsContext, NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { Suspense } from 'react';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

type NotePageProps = {
  mdxSource: any;
};

const NotePage: NextPage<NotePageProps> = ({ mdxSource }: NotePageProps) => {
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='markdown-body !bg-base-100'>
            <Suspense fallback={<>Loading...</>}>
              <MDXRemote {...mdxSource} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = (async () => {
  const paths = notes.map((id) => ({ params: { id } }));
  return { paths, fallback: true };
}) satisfies GetStaticPaths;

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const { params } = context;
  const id: string = (params ?? { id: '' }).id ?? '';
  const source: string = readFileSync(`./docs/${id}/README.md`, 'utf-8');
  const remarkSource = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(source);
  const remarkSourceString: string = String(remarkSource);
  const mdxSource = await serialize(remarkSourceString);
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

export const dynamic = 'force-static';

export default NotePage;
