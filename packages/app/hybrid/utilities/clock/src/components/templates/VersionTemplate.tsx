import { FC } from 'react';

export const VersionTemplate: FC<{ version: string }> = ({ version }) => (
  <div className="flex flex-1 flex-col items-center justify-center p-8">
    <div className="max-w-md text-center">
      <h1 className="text-base-content mb-4 font-mono text-2xl font-normal tracking-widest uppercase">
        Version
      </h1>
      <div className="border-base-300 rounded-box bg-base-200 border p-4 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-base-content/50">Package</span>
          <span className="font-mono">@hieudoanm.github.io/clock</span>
        </div>
        <div className="border-base-300 my-2 border-t" />
        <div className="flex justify-between text-sm">
          <span className="text-base-content/50">Version</span>
          <span className="font-mono">{version}</span>
        </div>
        <div className="border-base-300 my-2 border-t" />
        <div className="flex justify-between text-sm">
          <span className="text-base-content/50">Framework</span>
          <span className="font-mono">Next.js 16</span>
        </div>
        <div className="border-base-300 my-2 border-t" />
        <div className="flex justify-between text-sm">
          <span className="text-base-content/50">UI</span>
          <span className="font-mono">Tailwind CSS 4 + DaisyUI 5</span>
        </div>
      </div>
    </div>
  </div>
);
VersionTemplate.displayName = 'VersionTemplate';
