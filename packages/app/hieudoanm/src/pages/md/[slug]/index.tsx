import fs from 'node:fs';
import path from 'node:path';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface Props {
  content: string;
}

const MarkdownPage: NextPage<Props> = ({ content }) => (
  <pre className="p-2">{content}</pre>
);

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'src/markdown', slug);
  if (!fs.existsSync(filePath)) return { notFound: true };
  const content = fs.readFileSync(filePath, 'utf-8');
  return { props: { content } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const markdownDir = path.join(process.cwd(), 'src/markdown');
  const files = fs.readdirSync(markdownDir).filter((f) => f.endsWith('.md'));
  return {
    paths: files.map((f) => ({ params: { slug: f } })),
    fallback: 'blocking',
  };
};

export default MarkdownPage;
