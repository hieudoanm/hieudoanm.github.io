import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Setting {
  label: string;
  value: string;
}

export const CameraSettings: FC<TemplateProps> = ({ data }) => {
  const camera = (data.camera as string) ?? 'Camera';
  const settings = (data.settings as Setting[]) ?? [];
  const mode = (data.mode as string) ?? '';
  const tip = (data.tip as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="text-accent mb-1 text-xs font-bold tracking-[0.2em] uppercase">
        Camera Settings
      </div>
      <h1 className="text-base-content mb-2 text-2xl font-bold">{camera}</h1>
      {mode && (
        <span className="rounded-box bg-primary/10 text-primary mb-4 px-3 py-1 text-xs font-bold">
          {mode}
        </span>
      )}
      {settings.length > 0 && (
        <div className="mt-2 grid w-full max-w-xs grid-cols-2 gap-2">
          {settings.map((s, i) => (
            <div
              key={i}
              className="border-base-300 rounded border p-2 text-center">
              <div className="text-base-content text-sm font-bold">
                {s.value}
              </div>
              <div className="text-neutral text-[10px] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
      {tip && (
        <p className="text-neutral mt-4 max-w-xs text-xs leading-relaxed italic">
          {tip}
        </p>
      )}
    </div>
  );
};

CameraSettings.displayName = 'CameraSettings';
