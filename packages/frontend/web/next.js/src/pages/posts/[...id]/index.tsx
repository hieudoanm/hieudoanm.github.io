import matter from 'gray-matter';
import htmlToPdfmake from 'html-to-pdfmake';
import { GetStaticProps, NextPage } from 'next';
import fs, { readFileSync } from 'node:fs';
import path from 'node:path';
import pdfMake from 'pdfmake/build/pdfmake';
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
    <div className="markdown-body min-h-screen bg-gray-900!">
      <article className="container mx-auto p-8">
        <button
          className="w-full cursor-pointer rounded bg-red-500 py-2 font-semibold"
          onClick={() => {
            const converted = htmlToPdfmake(postData.contentHtml);
            const docDefinition = {
              content: converted,
              defaultStyle: { font: 'Times' },
            };
            pdfMake.createPdf(docDefinition).download(`${postData.title}.pdf`);
          }}>
          Download
        </button>
        <h1 className="text-xl font-black">{postData.title}</h1>
        <small>{postData.date}</small>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
};

export default PostPage;
