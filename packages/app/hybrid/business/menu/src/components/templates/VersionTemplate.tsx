'use client';

import { FC } from 'react';

interface VersionTemplateProps {
  version: string;
}

const VersionTemplate: FC<VersionTemplateProps> = ({ version }) => (
  <main className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4">
    <section className="card bg-base-100 shadow">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Version</h1>
        <p className="font-mono text-2xl">{version}</p>
      </div>
    </section>
  </main>
);

export { VersionTemplate };