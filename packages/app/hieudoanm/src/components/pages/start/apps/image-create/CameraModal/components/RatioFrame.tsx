import { FC } from 'react';
import { OverlayMode } from '../types';
import { GridOverlay } from './GridOverlay';

export const RatioFrame: FC<{ ratio: number; overlay: OverlayMode }> = ({
  ratio,
  overlay,
}) => (
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <div
      className="relative w-full transition-all duration-300"
      style={{ aspectRatio: ratio, maxHeight: '100%' }}>
      <div className="absolute inset-0 rounded-2xl border border-white/30" />
      <GridOverlay overlay={overlay} />
    </div>
  </div>
);
RatioFrame.displayName = 'RatioFrame';
