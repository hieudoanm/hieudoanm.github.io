import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

interface Component {
  name: string;
  desc: string;
}

interface Connection {
  from: string;
  to: string;
  label: string;
}

export const ArchitectureDiagram: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const components = (data.components as Component[]) ?? [];
  const connections = (data.connections as Connection[]) ?? [];

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <div className="mb-2 text-center">
        <h2 className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
          Architecture
        </h2>
        {title && (
          <h3 className="text-base-content mt-1 text-sm font-bold">{title}</h3>
        )}
      </div>
      <ul className="flex flex-1 flex-col gap-2">
        {components.map((comp, i) => (
          <li key={i}>
            <div className="border-base-300 rounded-xl border p-2">
              <div className="text-base-content text-sm font-bold">
                {comp.name}
              </div>
              {comp.desc && (
                <div className="text-neutral mt-0.5 text-[10px]">
                  {comp.desc}
                </div>
              )}
            </div>
            {i < components.length - 1 && connections[i] && (
              <div className="text-neutral flex items-center justify-center gap-1 py-1 text-[9px]">
                <span>{connections[i].from}</span>
                <span className="text-primary font-bold">→</span>
                <span>{connections[i].to}</span>
                {connections[i].label && (
                  <span className="text-primary/60 ml-1">
                    ({connections[i].label})
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

ArchitectureDiagram.displayName = 'ArchitectureDiagram';
