import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import fs, { readFileSync } from 'node:fs';
import path from 'node:path';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/posts');

// Helper to recursively get all .md file paths
function getMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory()
      ? getMarkdownFiles(fullPath)
      : fullPath.endsWith('.md')
        ? [fullPath]
        : [];
  });
}

export async function getStaticPaths() {
  const filePaths = getMarkdownFiles(postsDirectory);

  const paths = filePaths.map((filePath) => {
    const relativePath: string = path.relative(postsDirectory, filePath);
    const idArray: string[] = relativePath.replace(/\.md$/, '').split(path.sep); // MUST be an array
    return { params: { id: idArray } };
  });

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.info('params.id', params?.id);
  const id: string = Array.isArray(params?.id)
    ? params.id.join('/')
    : (params?.id ?? '');
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(gfm).use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        id,
        ...data,
        contentHtml,
      },
    },
  };
};

const PostPage: NextPage<{
  postData: { title: string; date: string; contentHtml: string };
}> = ({ postData }) => {
  return (
    <div className="markdown-body min-h-screen">
      <article className="container mx-auto p-8">
        <h1 className="text-xl font-black">{postData.title}</h1>
        <small>{postData.date}</small>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
};

export default PostPage;
