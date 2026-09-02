import { FC } from 'react';

export interface InfoLabel {
  label: string;
  value: string;
}

interface AboutTemplateProps {
  name: string;
  description: string;
  version: string;
  items: InfoLabel[];
}

const AboutTemplate: FC<AboutTemplateProps> = ({
  name,
  description,
  version,
  items,
}) => (
  <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4">
    <section className="card bg-base-100 shadow">
      <div className="card-body">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-base-content/60">{description}</p>
        <span className="badge badge-outline w-fit">Version {version}</span>
      </div>
    </section>
    <section className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="text-xl font-bold">Tech stack</h2>
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.label} className="rounded-lg bg-base-200 p-3">
              <dt className="text-sm text-base-content/60">{item.label}</dt>
              <dd className="font-semibold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  </main>
);

export { AboutTemplate };