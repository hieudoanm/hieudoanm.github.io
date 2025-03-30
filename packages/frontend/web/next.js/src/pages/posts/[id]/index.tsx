import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import path from 'path';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export async function getStaticPaths() {
  const fileNames = fs.readdirSync(postsDirectory);

  const paths = fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fullPath = path.join(postsDirectory, `${params?.id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(gfm).use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        id: params?.id,
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
