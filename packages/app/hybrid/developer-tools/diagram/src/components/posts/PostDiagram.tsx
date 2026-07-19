'use client';

import { FC, useMemo } from 'react';
import Canvas from '@/components/editor/Canvas';
import { downloadSvg } from '@/lib/export';
import { computeLayout } from '@/lib/layout';
import { parseDiagram } from '@/lib/parser';

interface PostDiagramProps {
  text: string;
  name: string;
}

const PostDiagram: FC<PostDiagramProps> = ({ text, name }) => {
  const parsed = useMemo(() => parseDiagram(text), [text]);
  const layout = useMemo(() => computeLayout(parsed.diagram), [parsed.diagram]);
  const title = parsed.diagram.title || name;
  const handleExport = (): void => downloadSvg(layout, title, name);

  return (
    <section className="card border-base-300 bg-base-200 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Diagram</h2>
        <button
          className="btn btn-ghost btn-sm gap-1 font-normal"
          onClick={handleExport}>
          Export SVG
        </button>
      </div>
      {parsed.errors.length > 0 ? (
        <div className="alert alert-warning" role="alert">
          <p className="font-semibold">This diagram source has parse errors.</p>
          <pre className="text-sm whitespace-pre-wrap">
            {parsed.errors
              .map((error) => `Line ${error.line}: ${error.message}`)
              .join('\n')}
          </pre>
        </div>
      ) : (
        <div className="rounded-box bg-base-100 overflow-x-auto p-4">
          <Canvas layout={layout} title={title} zoom={1} />
        </div>
      )}
    </section>
  );
};

export default PostDiagram;
