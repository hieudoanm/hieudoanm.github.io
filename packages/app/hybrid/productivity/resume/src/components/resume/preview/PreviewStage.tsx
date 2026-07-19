'use client';

import type { FC, ReactNode, Ref } from 'react';

interface PreviewStageProps {
  containerRef: Ref<HTMLDivElement>;
  scale: number;
  widthPx: number;
  heightPx: number;
  children: ReactNode;
}

export const PreviewStage: FC<PreviewStageProps> = ({
  containerRef,
  scale,
  widthPx,
  heightPx,
  children,
}) => (
  <div
    ref={containerRef}
    className="bg-base-300 flex min-h-0 flex-1 items-start justify-center overflow-auto p-6">
    <div
      data-resume-scale
      style={{
        width: widthPx * scale,
        height: heightPx * scale,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}>
      {children}
    </div>
  </div>
);

PreviewStage.displayName = 'PreviewStage';
