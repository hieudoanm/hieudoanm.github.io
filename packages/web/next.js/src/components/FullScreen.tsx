import { useBrowser } from '@web/hooks/window/navigator/use-browser';
import { useWindowSize } from '@web/hooks/window/use-size';
import { hex2hsl, hex2rgb } from '@web/utils/colors/code/hex';
import { getBrightness, randomHexColorCode } from '@web/utils/colors/utils';
import { copyToClipboard } from '@web/utils/navigator';
import { FC, useEffect, useState } from 'react';
import { FaRotate, FaWindowMaximize, FaWindowMinimize } from 'react-icons/fa6';

export const FullScreen: FC = () => {
  const { width = 0, height = 0 } = useWindowSize();
  const { browser = '' } = useBrowser();
  const [
    {
      full = false,
      hex = '#101828',
      hsl = hex2hsl('#101828'),
      rgb = hex2rgb('#101828'),
    },
    setState,
  ] = useState<{
    full: boolean;
    hex: string;
    hsl: { h: number; s: number; l: number } | null;
    rgb: { r: number; g: number; b: number } | null;
  }>({
    full: false,
    hex: '#101828',
    hsl: hex2hsl('#101828'),
    rgb: hex2rgb('#101828'),
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.key === ' ') {
        const hex = randomHexColorCode();
        setState((previous) => ({
          ...previous,
          hex,
          hsl: hex2hsl(hex),
          rgb: hex2rgb(hex),
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`h-full w-full ${full ? 'fixed top-0 right-0 bottom-0 left-0' : 'rounded'}`}
      style={{
        backgroundColor: hex,
        color: getBrightness(hex) ? '#ffffff' : '#101828',
      }}>
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute top-4 right-0 left-0 text-center text-sm md:top-8 md:text-base">
          {width}
        </div>
        <div className="absolute top-0 bottom-0 left-4 flex -rotate-90 items-center text-sm md:left-8 md:text-base">
          {height}
        </div>
        <div className="absolute right-0 bottom-4 left-0 text-center text-sm md:bottom-8 md:text-base">
          {browser}
        </div>
        <button
          className="absolute top-4 right-4 cursor-pointer md:top-8 md:right-8"
          onClick={() => {
            setState((previous) => ({
              ...previous,
              full: !previous.full,
            }));
          }}>
          {full ? <FaWindowMinimize /> : <FaWindowMaximize />}
        </button>
        <button
          className="absolute right-2 bottom-2 cursor-pointer md:right-4 md:bottom-4"
          onClick={() => {
            setState((previous) => ({
              ...previous,
              hex: '#101828',
              hsl: hex2hsl('#101828'),
              rgb: hex2rgb('#101828'),
            }));
          }}>
          <FaRotate />
        </button>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => {
            const hex = randomHexColorCode();
            setState((previous) => ({
              ...previous,
              hex,
              hsl: hex2hsl(hex),
              rgb: hex2rgb(hex),
            }));
          }}>
          <div className="pointer-events-none flex max-w-md flex-col text-center">
            <input
              id="hex"
              name="hex"
              placeholder="HEX"
              className="w-full border-b border-dotted py-1 text-center uppercase focus:outline-none"
              value={hex}
              readOnly
            />
            <input
              id="rgb"
              name="rgb"
              placeholder="RGB"
              className="w-full border-b border-dotted py-1 text-center focus:outline-none"
              value={`rgb(${rgb?.r}, ${rgb?.g}, ${rgb?.b})`}
              onClick={() => {
                copyToClipboard(`rgb(${rgb?.r}, ${rgb?.g}, ${rgb?.b})`);
              }}
              readOnly
            />
            <input
              id="hsl"
              name="hsl"
              placeholder="HSL"
              className="w-full border-b border-dotted py-1 text-center focus:outline-none"
              value={`hsl(${hsl?.h}, ${hsl?.s}, ${hsl?.l}%)`}
              readOnly
            />
          </div>
        </button>
      </div>
    </div>
  );
};
