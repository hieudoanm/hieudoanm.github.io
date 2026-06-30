import { GetStaticPaths, NextPage } from 'next';
import fs from 'node:fs';
import path from 'node:path';

interface Props {
  content: string;
}

const MarkdownPage: NextPage<Props> = ({ content }) => {
  return <pre className="p-2">{content}</pre>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const markdownDir = path.join(process.cwd(), 'src/markdown');
  const files = fs.readdirSync(markdownDir).filter((f) => f.endsWith('.md'));
  const paths = files.map((f) => ({ params: { slug: f } }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const markdownDir = path.join(process.cwd(), 'src/markdown');
  const content = fs.readFileSync(path.join(markdownDir, params.slug), 'utf-8');
  return { props: { content } };
};

export default MarkdownPage;
