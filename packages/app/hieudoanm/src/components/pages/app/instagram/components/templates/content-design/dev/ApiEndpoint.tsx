import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Param {
  name: string;
  type: string;
  desc: string;
}

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-success text-success-content',
  POST: 'bg-primary text-primary-content',
  PUT: 'bg-warning text-warning-content',
  DELETE: 'bg-error text-error-content',
  PATCH: 'bg-info text-info-content',
};

export const ApiEndpoint: FC<TemplateProps> = ({ data }) => {
  const method = (data.method as string) ?? 'GET';
  const path = (data.path as string) ?? '';
  const description = (data.description as string) ?? '';
  const params = (data.params as Param[]) ?? [];
  const responseExample = (data.responseExample as string) ?? '';

  const color =
    METHOD_COLORS[method.toUpperCase()] ?? 'bg-neutral text-neutral-content';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-4 text-center">
        <div className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
          API Endpoint
        </div>
      </div>
      <div className="border-base-300 rounded border p-4">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`${color} rounded px-2 py-0.5 text-[10px] font-bold tracking-wider`}>
            {method.toUpperCase()}
          </span>
          <span className="text-base-content font-mono text-xs font-semibold">
            {path}
          </span>
        </div>
        {description && (
          <p className="text-neutral mb-3 text-[10px] leading-relaxed">
            {description}
          </p>
        )}
        {params.length > 0 && (
          <div className="mb-3">
            <div className="text-neutral mb-1 text-[9px] font-bold tracking-wider uppercase">
              Parameters
            </div>
            {params.map((p, i) => (
              <div key={i} className="border-base-300 flex gap-2 border-t py-1">
                <span className="text-primary font-mono text-[10px] font-semibold">
                  {p.name}
                </span>
                <span className="text-accent text-[9px]">{p.type}</span>
                <span className="text-neutral text-[9px]">{p.desc}</span>
              </div>
            ))}
          </div>
        )}
        {responseExample && (
          <div>
            <div className="text-neutral mb-1 text-[9px] font-bold tracking-wider uppercase">
              Response
            </div>
            <pre className="bg-base-200 rounded p-2 font-mono text-[9px] leading-relaxed">
              {responseExample}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

ApiEndpoint.displayName = 'ApiEndpoint';
