import { marked } from 'marked';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';

interface Props {
  content: string;
  rendered?: string;
}

const MarkdownPage: NextPage<Props> = ({ content, rendered }) =>
  rendered ? (
    <div className="flex flex-col gap-y-4 p-4 md:gap-y-8 md:p-8">
      <Link href="/md">Back to MD</Link>
      <article
        className="markdown-body !bg-transparent"
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    </div>
  ) : (
    <pre className="p-2">{content}</pre>
  );

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  if (slug.endsWith('.md')) {
    const filePath = path.join(process.cwd(), 'src/markdown', slug);
    if (!fs.existsSync(filePath)) return { notFound: true };
    const content = fs.readFileSync(filePath, 'utf-8');
    return { props: { content } };
  }
  const filePath = path.join(process.cwd(), 'src/markdown', `${slug}.md`);
  if (!fs.existsSync(filePath)) return { notFound: true };
  const content = fs.readFileSync(filePath, 'utf-8');
  const rendered = marked.parse(content) as string;
  return { props: { content, rendered } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const markdownDir = path.join(process.cwd(), 'src/markdown');
  const files = fs.readdirSync(markdownDir).filter((f) => f.endsWith('.md'));
  return {
    paths: files.flatMap((f) => [
      { params: { slug: f } },
      { params: { slug: f.replace(/\.md$/, '') } },
    ]),
    fallback: 'blocking',
  };
};

export default MarkdownPage;
