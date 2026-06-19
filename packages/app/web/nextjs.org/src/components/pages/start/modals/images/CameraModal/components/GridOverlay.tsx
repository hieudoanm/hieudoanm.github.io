import { FC } from 'react';
import { OverlayMode } from '../types';

export const GridOverlay: FC<{ overlay: OverlayMode }> = ({ overlay }) => {
  if (overlay === 'none') return null;
  if (overlay === 'thirds')
    return (
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 h-full w-px bg-white/40" />
        <div className="absolute top-0 left-2/3 h-full w-px bg-white/40" />
        <div className="absolute top-1/3 left-0 h-px w-full bg-white/40" />
        <div className="absolute top-2/3 left-0 h-px w-full bg-white/40" />
      </div>
    );
  return (
    <div className="absolute inset-0">
      <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white/60" />
      <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/60" />
    </div>
  );
};
