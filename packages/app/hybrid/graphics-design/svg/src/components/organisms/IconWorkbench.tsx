'use client';

import { type FC, useCallback, useState } from 'react';
import { useToast } from '@/providers/ToastProvider';
import {
  downloadIconsZip,
  generateIcons,
  readSvgFile,
} from '@/utils/iconGenerator';
import { DEFAULT_SVG, ICON_SIZES, PRESETS } from '@/data/iconPresets';
import type { GeneratedIcon, IconBgMode } from '@/types';
import { IconGenerator } from './IconGenerator';

type EditorTab = 'editor' | 'icons';

interface IconWorkbenchProps {
  value: string;
  onChange: (value: string) => void;
}

const BG_MODES: IconBgMode[] = ['grid', 'white', 'black', 'transparent'];

const BG_CLASSES: Record<IconBgMode, string> = {
  grid: 'bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]',
  white: 'bg-white',
  black: 'bg-zinc-950',
  transparent: 'bg-transparent',
};

const formatSvg = (code: string): string =>
  code
    .replace(/>\s+</g, '><')
    .replace(/></g, '>\n<')
    .split('\n')
    .map((l) => l.trim())
    .join('\n');

export const IconWorkbench: FC<IconWorkbenchProps> = ({ value, onChange }) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<EditorTab>('editor');
  const [bgMode, setBgMode] = useState<IconBgMode>('grid');
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [iconError, setIconError] = useState<string | null>(null);
  const [sourceName, setSourceName] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const runIconGeneration = useCallback(
    async (svgText: string, label: string) => {
      setIconError(null);
      setIcons([]);
      setProcessing(true);
      try {
        setIcons(await generateIcons(svgText, ICON_SIZES));
        setSourceName(label);
      } catch {
        setIconError('Failed to render SVG. Make sure it is valid.');
      } finally {
        setProcessing(false);
      }
    },
    []
  );

  const generateFromEditor = useCallback(() => {
    runIconGeneration(value, 'SVG Editor');
    setActiveTab('icons');
  }, [value, runIconGeneration]);

  const handleFile = useCallback(
    async (file: File) => {
      const result = await readSvgFile(file);
      if (!result.ok) {
        setIconError(
          result.reason === 'type'
            ? 'Only SVG files are accepted.'
            : 'Invalid SVG file.'
        );
        return;
      }
      runIconGeneration(result.text, file.name);
    },
    [runIconGeneration]
  );

  const handleDownloadSingle = useCallback((icon: GeneratedIcon) => {
    const a = document.createElement('a');
    a.href = icon.dataUrl;
    a.download = `icon-${icon.size}x${icon.size}.png`;
    a.click();
  }, []);

  const handleDownloadAll = useCallback(async () => {
    try {
      await downloadIconsZip(icons);
      addToast('Downloaded icons.zip', 'success');
    } catch {
      addToast('Failed to download ZIP', 'error');
    }
  }, [icons, addToast]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="bg-base-200 border-base-300 flex border-b px-4">
        <button
          type="button"
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 text-sm font-normal transition-all ${
            activeTab === 'editor'
              ? 'border-primary text-primary border-b-2'
              : 'text-base-content/60 hover:text-base-content'
          }`}>
          Editor
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('icons')}
          className={`px-4 py-2 text-sm font-normal transition-all ${
            activeTab === 'icons'
              ? 'border-primary text-primary border-b-2'
              : 'text-base-content/60 hover:text-base-content'
          }`}>
          Icons
        </button>
      </div>
      {activeTab === 'editor' ? (
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <div className="border-base-300 bg-base-100 flex min-h-0 flex-1 flex-col border-r">
            <div className="border-base-300 bg-base-200/50 flex items-center justify-between border-b px-4 py-2">
              <span className="text-base-content/40 text-[10px] tracking-widest uppercase">
                SVG Source
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onChange(formatSvg(value))}
                  className="btn btn-ghost btn-xs">
                  Format
                </button>
                <button
                  type="button"
                  onClick={() => onChange(DEFAULT_SVG)}
                  className="btn btn-ghost btn-xs">
                  Reset
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1">
              <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none"
                spellCheck={false}
                placeholder="Paste your SVG code here..."
              />
            </div>
            <div className="border-base-300 bg-base-200/30 flex items-center gap-2 overflow-x-auto border-t p-2">
              <span className="text-base-content/40 text-[9px] tracking-widest uppercase">
                Presets:
              </span>
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => onChange(p.code)}
                  className="btn btn-xs border-base-content/10 rounded-full lowercase italic">
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-base-300 flex min-h-0 flex-1 flex-col">
            <div className="border-base-300 bg-base-200/50 flex items-center justify-between border-b px-4 py-2">
              <span className="text-base-content/40 text-[10px] tracking-widest uppercase">
                Preview
              </span>
              <div className="flex gap-1">
                {BG_MODES.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setBgMode(mode)}
                    className={`btn btn-xs ${bgMode === mode ? 'btn-primary' : 'btn-ghost'}`}>
                    {mode.charAt(0).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`flex flex-1 items-center justify-center overflow-auto p-8 transition-colors duration-500 ${BG_CLASSES[bgMode]}`}>
              <div className="relative shadow-2xl">
                <div
                  className="flex h-full w-full items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              </div>
            </div>
            <div className="border-base-300 bg-base-200/50 flex items-center justify-between border-t p-3">
              <div className="flex items-center gap-3">
                <span className="text-base-content/40 font-mono text-[10px]">
                  {value.length} BYTES
                </span>
                <span className="text-base-content/40 font-mono text-[10px]">
                  Lines: {value.split('\n').length}
                </span>
              </div>
              <button
                type="button"
                onClick={generateFromEditor}
                disabled={processing}
                className="btn btn-secondary btn-sm">
                {processing ? 'Rendering…' : 'Generate Icons'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <IconGenerator
          icons={icons}
          processing={processing}
          error={iconError}
          sourceName={sourceName}
          onUseEditor={() => runIconGeneration(value, 'SVG Editor')}
          onFile={handleFile}
          onDownloadSingle={handleDownloadSingle}
          onDownloadAll={handleDownloadAll}
        />
      )}
    </div>
  );
};
