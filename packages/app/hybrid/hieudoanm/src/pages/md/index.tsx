import fs from 'node:fs';
import path from 'node:path';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

interface Props {
  files: string[];
}

const MarkdownIndex: NextPage<Props> = ({ files }) => (
  <div className="mx-auto flex w-full max-w-xl flex-col gap-4 p-8 md:gap-8">
    <p className="text-center">
      <Link href="/">Back to Home</Link>
    </p>
    <h1 className="mb-6 text-center text-2xl font-bold">Markdown Files</h1>
    <div className="border-base-300 rounded-xl border">
      <table className="table-compact table-bordered table">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-right">Raw</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file: string) => {
            const slug = file.replace(/\.md$/, '');
            return (
              <tr key={file}>
                <td className="px-4 py-2">
                  <Link
                    href={`/md/${slug}`}
                    className="text-blue-500 underline hover:text-blue-700">
                    {slug}
                  </Link>
                </td>
                <td className="px-4 py-2 text-right">
                  <Link
                    href={`/md/${file}`}
                    className="text-blue-500 underline hover:text-blue-700">
                    {file}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const markdownDir = path.join(process.cwd(), 'src/markdown');
  const files = fs.readdirSync(markdownDir).filter((f) => f.endsWith('.md'));
  return { props: { files } };
};

export default MarkdownIndex;
