import { memo, type FC, type ReactNode } from 'react';

import { parseMarkdown, tokenizeInline, type MdBlock } from '@/utils/markdown';
import { renderErDiagram } from '@/utils/mermaid';

interface MarkdownProps {
  source: string;
}

const InlineText: FC<{ text: string }> = ({ text }) => {
  const nodes: ReactNode[] = [];
  for (const token of tokenizeInline(text)) {
    if (token.type === 'code') {
      nodes.push(
        <code
          key={nodes.length}
          className="rounded bg-slate-800 px-1 py-0.5 text-[0.85em] text-indigo-300">
          {token.content}
        </code>
      );
    } else if (token.type === 'bold') {
      nodes.push(
        <strong key={nodes.length} className="font-semibold text-slate-100">
          {token.content}
        </strong>
      );
    } else {
      nodes.push(token.content);
    }
  }
  return <>{nodes}</>;
};

const ErDiagram: FC<{ source: string }> = ({ source }) => {
  const result = renderErDiagram(source);
  if (!result) return null;
  return (
    <div
      className="overflow-x-auto rounded-xl border border-slate-800"
      dangerouslySetInnerHTML={{ __html: result.svg }}
    />
  );
};

const CodeBlock: FC<{ lang: string; text: string }> = ({ lang, text }) => (
  <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-[13px] leading-relaxed text-slate-300">
    <code>{text}</code>
  </pre>
);

const TableBlock: FC<{ rows: string[][] }> = ({ rows }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-800">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-slate-800 bg-slate-900/60">
          {(rows[0] ?? []).map((cell, ci) => (
            <th key={ci} className="px-4 py-2 font-semibold text-slate-200">
              <InlineText text={cell} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.slice(1).map((row, ri) => (
          <tr key={ri} className="border-b border-slate-800/60 last:border-0">
            {row.map((cell, ci) => (
              <td key={ci} className="px-4 py-2 text-slate-400">
                <InlineText text={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

const renderBlock = (block: MdBlock, index: number): ReactNode => {
  switch (block.type) {
    case 'heading': {
      const Tag =
        HEADING_TAGS[Math.min(Math.max((block.level ?? 1) - 1, 0), 5)];
      const cls =
        block.level === 1
          ? 'mb-2 mt-2 text-2xl font-bold text-slate-50'
          : block.level === 2
            ? 'mb-3 mt-8 text-xl font-semibold text-slate-100'
            : 'mb-3 mt-6 text-lg font-semibold text-slate-100';
      return (
        <Tag key={index} className={cls}>
          <InlineText text={block.text ?? ''} />
        </Tag>
      );
    }
    case 'blockquote':
      return (
        <blockquote
          key={index}
          className="border-l-4 border-indigo-500/60 pl-4 text-slate-400">
          {block.text?.split('\n').map((line, li) => (
            <p key={li} className="mb-2 last:mb-0">
              <InlineText text={line} />
            </p>
          ))}
        </blockquote>
      );
    case 'paragraph':
      return (
        <p key={index} className="mb-4 text-slate-400">
          <InlineText text={block.text ?? ''} />
        </p>
      );
    case 'code':
      return block.lang === 'mermaid' ? (
        <ErDiagram key={index} source={block.text ?? ''} />
      ) : (
        <div key={index} className="mb-4">
          <CodeBlock lang={block.lang ?? ''} text={block.text ?? ''} />
        </div>
      );
    case 'table':
      return (
        <div key={index} className="mb-4">
          <TableBlock rows={block.rows ?? []} />
        </div>
      );
    case 'list':
      return (
        <ul
          key={index}
          className="mb-4 list-disc space-y-1 pl-5 text-slate-400">
          {(block.items ?? []).map((item, li) => (
            <li key={li}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

export const Markdown: FC<MarkdownProps> = memo(({ source }) => {
  const blocks = parseMarkdown(source);
  return <article className="prose-invert">{blocks.map(renderBlock)}</article>;
});
