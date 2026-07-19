'use client';

import { FC } from 'react';

import { ATTRACTOR_LIST } from './constants';
import type { AttractorType } from './types';
import { useAttractors } from './useAttractors';

export const Attractors: FC = () => {
  const { containerRef, currentAttractor, switchAttractor } = useAttractors();

  return (
    <div className="relative h-[65vh] w-full overflow-hidden rounded-xl bg-black">
      <div ref={containerRef} className="absolute inset-0" />

      <div className="absolute top-3 left-3 z-10">
        <select
          aria-label="Attractor"
          value={currentAttractor}
          onChange={(e) =>
            switchAttractor(e.target.value as AttractorType, true)
          }
          className="select select-sm border-white/15 bg-white/10 text-sm text-white shadow-lg backdrop-blur-md hover:border-white/30 focus:border-white/40">
          {ATTRACTOR_LIST.map((key) => (
            <option key={key} value={key} className="text-base-content">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <p className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-wide whitespace-nowrap text-white/25">
        Drag to orbit · Scroll to zoom
      </p>
    </div>
  );
};

Attractors.displayName = 'Attractors';
