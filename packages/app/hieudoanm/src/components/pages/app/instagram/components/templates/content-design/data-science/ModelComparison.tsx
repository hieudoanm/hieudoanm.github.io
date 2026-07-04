import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Model {
  name: string;
  accuracy: string;
  f1: string;
  precision: string;
  recall: string;
  latency: string;
}

export const ModelComparison: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const models = (data.models as Model[]) ?? [];

  const metrics = ['accuracy', 'f1', 'precision', 'recall', 'latency'] as const;

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-4 text-center">
        <div className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
          Model Comparison
        </div>
        {title && (
          <div className="text-base-content mt-1 text-sm font-bold">
            {title}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="border-base-300 overflow-hidden rounded border text-[10px]">
          <div className="bg-base-200 flex">
            <div className="w-24 px-2 py-1.5 font-bold">Model</div>
            {metrics.map((m) => (
              <div
                key={m}
                className="flex-1 px-2 py-1.5 text-center font-bold tracking-wider uppercase">
                {m}
              </div>
            ))}
          </div>
          {models.map((model, i) => (
            <div key={i} className="border-base-300 flex border-t">
              <div className="text-primary w-24 px-2 py-1.5 font-semibold">
                {model.name}
              </div>
              {metrics.map((m) => (
                <div
                  key={m}
                  className="text-base-content flex-1 px-2 py-1.5 text-center">
                  {model[m]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ModelComparison.displayName = 'ModelComparison';
