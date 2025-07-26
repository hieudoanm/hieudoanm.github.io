import { Glass } from '@web/components/Glass';
import { logger } from '@web/utils/log';
import { getSortedPostsData } from '@web/utils/posts';
import { isSubset } from '@web/utils/set';
import matter from 'gray-matter';
import htmlToPdfmake from 'html-to-pdfmake';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import fs, { readFileSync } from 'node:fs';
import path from 'node:path';
import pdfMake from 'pdfmake/build/pdfmake';
import { useState } from 'react';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import html from 'remark-html';

const FONT_FOLDER: string = 'https://hieudoanm.github.io/fonts';
const FONT_NAME_ROBOTO: string = 'Roboto';
const FONT_NAME_TIMES: string = 'Times-New-Roman';

pdfMake.fonts = {
  Roboto: {
    normal: `${FONT_FOLDER}/${FONT_NAME_ROBOTO}/${FONT_NAME_ROBOTO}-Regular.ttf`,
    bold: `${FONT_FOLDER}/${FONT_NAME_ROBOTO}/${FONT_NAME_ROBOTO}-Medium.ttf`,
    italics: `${FONT_FOLDER}/${FONT_NAME_ROBOTO}/${FONT_NAME_ROBOTO}-Italic.ttf`,
    bolditalics: `${FONT_FOLDER}/${FONT_NAME_ROBOTO}/${FONT_NAME_ROBOTO}-MediumItalic.ttf`,
  },
  Times: {
    normal: `${FONT_FOLDER}/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Regular.ttf`,
    bold: `${FONT_FOLDER}/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Bold.ttf`,
    italics: `${FONT_FOLDER}/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Italic.ttf`,
    bolditalics: `${FONT_FOLDER}/${FONT_NAME_TIMES}/${FONT_NAME_TIMES}-Bold-Italic.ttf`,
  },
};

const postsDirectory = path.join(process.cwd(), 'src/posts');

// Helper to recursively get all .md file paths
function getMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath: string = path.join(dir, entry.name);
    const filePath: string[] = fullPath.endsWith('.md') ? [fullPath] : [];
    return entry.isDirectory() ? getMarkdownFiles(fullPath) : filePath;
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
  logger.info(params?.id, 'params.id');
  const id: string = Array.isArray(params?.id)
    ? params.id.join('/')
    : (params?.id ?? '');
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(gfm).use(html).process(content);
  const contentHtml = processedContent.toString();

  const tags: string[] = id.split('/');
  const posts = getSortedPostsData();
  const relatedPosts = posts.filter(({ id = '' }) => {
    const postTags: string[] = id.split('/').filter((tag) => tag !== '');
    postTags.pop();
    return isSubset(new Set(tags), new Set(postTags));
  });

  return {
    props: {
      postData: {
        id,
        ...data,
        contentHtml,
      },
      relatedPosts,
    },
  };
};

const PostPage: NextPage<{
  postData: { title: string; date: string; contentHtml: string };
  relatedPosts: { id: string; title: string; date: string }[];
}> = ({
  postData = { title: '', date: '', contentHtml: '' },
  relatedPosts = [],
}) => {
  const [{ loading }, setState] = useState<{ loading: boolean }>({
    loading: false,
  });
  return (
    <div className="container mx-auto min-h-screen p-8">
      <article className="markdown-body border-b border-neutral-800 bg-neutral-900!">
        <Glass.Button
          className="w-full"
          disabled={loading}
          onClick={() => {
            setState((previous) => ({ ...previous, loading: true }));
            const converted = htmlToPdfmake(postData.contentHtml);
            const docDefinition = {
              content: converted,
              defaultStyle: { font: 'Times' },
            };
            pdfMake.createPdf(docDefinition).download(`${postData.title}.pdf`);
            setState((previous) => ({ ...previous, loading: false }));
          }}>
          {loading ? 'Downloading ...' : 'Download PDF'}
        </Glass.Button>
        <h1 className="text-xl font-black">{postData.title}</h1>
        <Glass.Badge>{postData.date}</Glass.Badge>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <div className="flex flex-col gap-y-4 md:gap-y-8">
        {relatedPosts.map(({ id = '', title = '', date = '' }) => {
          return (
            <Link key={id} href={`/posts/${id}`}>
              <Glass.Card className="flex flex-col gap-y-1 border-b border-neutral-800 py-4">
                <p className="m-0 p-0">
                  <b>{title}</b>
                </p>

                <small>Date: {date}</small>
              </Glass.Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PostPage;
