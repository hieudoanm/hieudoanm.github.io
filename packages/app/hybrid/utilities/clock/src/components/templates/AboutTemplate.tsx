import { FC } from 'react';

interface InfoRow {
  label: string;
  value: string;
}

export const AboutTemplate: FC<{
  name: string;
  description: string;
  version: string;
  items: InfoRow[];
}> = ({ name, description, version, items }) => (
  <div className="flex flex-1 flex-col items-center justify-center p-8">
    <div className="max-w-md text-center">
      <h1 className="text-base-content mb-4 font-mono text-2xl font-normal tracking-widest uppercase">
        {name}
      </h1>
      <p className="text-base-content/60 mb-6 text-sm">{description}</p>
      <div className="border-base-300 rounded-box bg-base-200 border p-4 text-left">
        {items.map((item, i) => (
          <div key={item.label}>
            {i > 0 && <div className="border-base-300 my-2 border-t" />}
            <div className="flex justify-between text-sm">
              <span className="text-base-content/50">{item.label}</span>
              <span className="font-mono">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
      <span className="badge badge-primary badge-sm mt-4">v{version}</span>
    </div>
  </div>
);
AboutTemplate.displayName = 'AboutTemplate';
