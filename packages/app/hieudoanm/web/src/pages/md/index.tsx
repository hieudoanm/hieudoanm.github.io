import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import fs from 'node:fs';
import path from 'node:path';

interface Props {
  files: string[];
}

const MarkdownPage: NextPage<Props> = ({ files }) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const origin = globalThis.location.origin;
    const md = `# Markdown\n\n${files
      .map((f) => `- [${f}](${origin}/md/${f})`)
      .join('\n')}`;
    setMarkdown(md);
  }, [files]);

  return <pre className="p-2">{markdown}</pre>;
};

export const getStaticProps = async () => {
  const markdownDir = path.join(process.cwd(), 'src/markdown');
  const files = fs.readdirSync(markdownDir).filter((f) => f.endsWith('.md'));
  return { props: { files } };
};

export default MarkdownPage;
