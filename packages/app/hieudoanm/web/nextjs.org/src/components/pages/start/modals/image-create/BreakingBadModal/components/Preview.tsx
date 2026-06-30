import { FC, useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import { kebabCase } from '@lodash/ts';
import {
  periodicTable,
  specificNameColorMap,
} from '@hieudoanm.github.io/data/periodic-table';

import { Align } from '../types';
import { highlightElement } from '../utils/highlight';

const alignClassMap: Record<Align, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

export const Preview: FC<{
  isColored: boolean;
  isMultiline: boolean;
  align: Align;
  text: string;
}> = ({ isColored, isMultiline, align, text }) => {
  const captureRef = useRef<HTMLDivElement>(null);
  const words = text.split(/\s+/);
  const multilineClass = isMultiline
    ? 'flex-col gap-y-2'
    : 'flex-row flex-wrap gap-x-4';

  const handleDownload = async ({
    withBackground,
  }: {
    withBackground: boolean;
  }) => {
    if (!captureRef.current) return;
    try {
      const canvas = await html2canvas(captureRef.current, {
        backgroundColor: withBackground ? '#1d232a' : null,
        scrollY: -window.scrollY,
      });
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${kebabCase(text)}.png`;
      a.click();
    } catch (err) {
      console.error('Failed to capture image', err);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div
        ref={captureRef}
        className={`flex h-fit w-fit gap-2 p-4 ${multilineClass} ${alignClassMap[align]}`}>
        {words.map((word, wordIdx) => {
          const { before, tile, after } = highlightElement(word);
          const { specificName } = periodicTable[tile ?? ''] ?? {};
          const bgColorClass = isColored
            ? specificNameColorMap[specificName]
            : 'bg-base-content';
          const textColorClass = isColored
            ? 'text-base-content'
            : 'text-base-100';
          return (
            <div
              key={wordIdx}
              className="flex flex-wrap items-center gap-1 text-4xl font-bold">
              {before.map((letter, idx) => (
                <span
                  key={`b-${idx}`}
                  className="text-base-content text-4xl font-semibold">
                  {letter}
                </span>
              ))}
              {tile && (
                <div
                  className={`${bgColorClass} ${textColorClass} relative flex h-16 w-16 flex-col items-center justify-center rounded`}>
                  <span className="absolute top-1 right-1 text-xs">
                    {periodicTable[tile].number ?? 0}
                  </span>
                  <span className="text-4xl">{tile}</span>
                </div>
              )}
              {after.map((letter, idx) => (
                <span
                  key={`a-${idx}`}
                  className="text-base-content text-4xl font-semibold">
                  {letter}
                </span>
              ))}
            </div>
          );
        })}
      </div>
      <div className="dropdown mx-auto">
        <label tabIndex={0} className="btn btn-ghost btn-sm">
          💾 Download
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-box bg-neutral z-50 w-56 p-2 shadow">
          <li>
            <button
              type="button"
              className="btn btn-ghost justify-start"
              onClick={() => {
                handleDownload({ withBackground: true });
                (document.activeElement as HTMLElement | null)?.blur();
              }}>
              💾 With Background
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-ghost justify-start"
              onClick={() => {
                handleDownload({ withBackground: false });
                (document.activeElement as HTMLElement | null)?.blur();
              }}>
              💾 Without Background
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
Preview.displayName = 'Preview';
