import fs from 'node:fs';
import path from 'node:path';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

interface Props {
  files: string[];
}

const MarkdownIndex: NextPage<Props> = ({ files }) => (
  <div className="p-8">
    <h1 className="mb-6 text-2xl font-bold">Markdown Files</h1>
    <ul className="space-y-2">
      {files.map((file) => (
        <li key={file}>
          <Link
            href={`/md/${file}`}
            className="text-blue-500 underline hover:text-blue-700">
            {file}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const markdownDir = path.join(process.cwd(), 'src/markdown');
  const files = fs.readdirSync(markdownDir).filter((f) => f.endsWith('.md'));
  return { props: { files } };
};

export default MarkdownIndex;
