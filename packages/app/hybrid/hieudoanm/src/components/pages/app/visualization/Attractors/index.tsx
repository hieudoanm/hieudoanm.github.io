import type { FC } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms';

import type { AttractorType } from './types';
import { useAnimation } from './hooks/useAnimation';

const ATTRACTOR_LIST: AttractorType[] = [
  'lorenz',
  'aizawa',
  'thomas',
  'halvorsen',
  'arneodo',
];

export const Attractors: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    containerRef,
    videoRef,
    canvasRef,
    currentAttractorRef,
    handDetectedRef,
    handStatusRef,
    switchAttractor,
  } = useAnimation();

  return (
    <FullScreen onClose={onClose} title="Attractors">
      <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-black">
        <div ref={containerRef} className="absolute inset-0" />

        <div className="relative z-10 flex items-start justify-between p-4">
          <div className="min-w-[180px] rounded-2xl border border-blue-500/15 bg-gradient-to-br from-[#0a0f1e]/85 to-[#05050a]/90 p-4 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-[20px]">
            <div className="mb-2.5 text-[10px] tracking-[2px] text-blue-300/50 uppercase">
              Attractor
            </div>

            <div className="relative mb-3.5">
              <select
                value={currentAttractorRef.current}
                onChange={(e) =>
                  switchAttractor(e.target.value as AttractorType, true)
                }
                className="w-full cursor-pointer appearance-none rounded-xl border border-blue-500/20 bg-gradient-to-br from-[#1e2850]/60 to-[#141e3c]/80 px-3.5 py-2.5 pr-9 text-sm font-medium text-white transition-all outline-none hover:border-blue-500/40 hover:from-[#283264]/60 hover:to-[#1e2850]/80 focus:border-blue-400/60 focus:shadow-[0_0_20px_rgba(80,150,255,0.15)]">
                {ATTRACTOR_LIST.map((key) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute top-1/2 right-3.5 h-0 w-0 -translate-y-1/2 border-t-[5px] border-r-[5px] border-l-[5px] border-t-blue-300/60 border-r-transparent border-l-transparent" />
            </div>

            <div className="flex items-center gap-2 border-t border-blue-500/10 pt-3">
              <div
                className={`h-1.5 w-1.5 rounded-full shadow-[0_0_6px] transition-all ${
                  handDetectedRef.current
                    ? 'bg-emerald-400/90 shadow-emerald-400/60'
                    : 'bg-red-400/80 shadow-red-400/40'
                }`}
              />
              <span className="text-[11px] font-normal text-blue-300/60">
                {handDetectedRef.current ? 'Hand detected' : 'No hand'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/70 px-3 py-1.5 text-xs backdrop-blur-[10px]">
            <div
              className={`h-2 w-2 rounded-full transition-all ${
                handDetectedRef.current
                  ? 'bg-emerald-400 shadow-[0_0_8px_#5f5]'
                  : 'bg-red-400'
              }`}
            />
            <span>{handStatusRef.current}</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto mb-4 overflow-hidden rounded-lg border-2 border-blue-500/50 shadow-[0_0_10px_rgba(0,170,255,0.3)]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="block h-[120px] w-[160px] -scale-x-100"
          />
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute top-0 left-0 h-full w-full -scale-x-100"
          />
        </div>

        <p className="relative z-10 mx-auto pb-3 text-[11px] tracking-[0.5px] text-blue-300/25">
          Drag to orbit · Fist to cycle
        </p>
      </div>
    </FullScreen>
  );
};
Attractors.displayName = 'Attractors';
