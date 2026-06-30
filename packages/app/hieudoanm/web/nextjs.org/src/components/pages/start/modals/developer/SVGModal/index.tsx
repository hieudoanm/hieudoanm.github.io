import { FC, useCallback, useState } from 'react';
import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';

import { BgMode, Tab, GeneratedIcon } from './types';
import { DEFAULT_SVG, PRESETS, ICON_SIZES } from './constants';
import { svgToCanvas } from './utils/svg';

export const SVGModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [svgCode, setSvgCode] = useState(DEFAULT_SVG);
  const [isCopied, setIsCopied] = useState(false);
  const [bgMode, setBgMode] = useState<BgMode>('grid');
  const [activeTab, setActiveTab] = useState<Tab>('editor');
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [iconError, setIconError] = useState<string | null>(null);
  const [sourceName, setSourceName] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(svgCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [svgCode]);
  const handleDownloadSvg = useCallback(() => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'icon.svg';
    a.click();
    URL.revokeObjectURL(url);
  }, [svgCode]);
  const handleFormat = useCallback(() => {
    setSvgCode(
      svgCode
        .replace(/>\s+</g, '><')
        .replace(/></g, '>\n<')
        .split('\n')
        .map((l) => l.trim())
        .join('\n')
    );
  }, [svgCode]);

  const runIconGeneration = useCallback(
    async (svgText: string, label: string) => {
      setIconError(null);
      setIcons([]);
      setProcessing(true);
      try {
        const generated: GeneratedIcon[] = await Promise.all(
          ICON_SIZES.map(async (size) => {
            const canvas = await svgToCanvas(svgText, size);
            return { size, dataUrl: canvas.toDataURL('image/png'), canvas };
          })
        );
        setIcons(generated);
        setSourceName(label);
      } catch {
        setIconError('Failed to render SVG. Make sure it is valid.');
      } finally {
        setProcessing(false);
      }
    },
    []
  );

  const generateFromEditor = useCallback(
    () => runIconGeneration(svgCode, 'SVG Editor'),
    [svgCode, runIconGeneration]
  );

  const processFile = useCallback(
    async (file: File) => {
      if (file.type !== 'image/svg+xml') {
        setIconError('Only SVG files are accepted.');
        return;
      }
      const svgText = await file.text();
      if (!svgText.trim().startsWith('<svg') && !svgText.includes('<svg')) {
        setIconError('Invalid SVG file.');
        return;
      }
      runIconGeneration(svgText, file.name);
    },
    [runIconGeneration]
  );

  const handleFile = useCallback(
    (file: File) => {
      processFile(file);
    },
    [processFile]
  );

  const downloadSingle = (icon: GeneratedIcon) => {
    const a = document.createElement('a');
    a.href = icon.dataUrl;
    a.download = `icon-${icon.size}x${icon.size}.png`;
    a.click();
  };
  SVGModal.displayName = 'SVGModal';

  const downloadAll = async () => {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    document.head.appendChild(script);
    await new Promise((res) => (script.onload = res));
    const JSZipClass = (
      window as unknown as {
        JSZip: new () => {
          folder(name: string): {
            file(name: string, data: ArrayBuffer): void;
          };
          generateAsync(opts: { type: string }): Promise<Blob>;
        };
      }
    ).JSZip;
    const zip = new JSZipClass();
    const folder = zip.folder('icons');
    for (const icon of icons) {
      const blob = await new Promise<Blob>((res) =>
        icon.canvas.toBlob((b) => res(b!), 'image/png')
      );
      folder.file(
        `icon-${icon.size}x${icon.size}.png`,
        await blob.arrayBuffer()
      );
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'icons.zip';
    a.click();
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="SVG Editor"
      size="max-w-5xl"
      fullHeight>
      <div className="bg-base-200 border-base-300 flex border-b px-4">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === 'editor' ? 'border-primary text-primary border-b-2' : 'text-base-content/60 hover:text-base-content'}`}>
          Editor
        </button>
        <button
          onClick={() => setActiveTab('icons')}
          className={`px-4 py-2 text-sm font-medium transition-all ${activeTab === 'icons' ? 'border-primary text-primary border-b-2' : 'text-base-content/60 hover:text-base-content'}`}>
          Icons
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {activeTab === 'editor' ? (
          <div className="flex h-full flex-col lg:flex-row">
            <div className="border-base-300 bg-base-100 flex flex-1 flex-col border-r">
              <div className="border-base-300 bg-base-200/50 flex items-center justify-between border-b px-4 py-2">
                <span className="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
                  SVG Source
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleFormat}
                    className="btn btn-ghost btn-xs">
                    Format
                  </button>
                  <button
                    onClick={() => setSvgCode(DEFAULT_SVG)}
                    className="btn btn-ghost btn-xs">
                    Reset
                  </button>
                </div>
              </div>
              <textarea
                value={svgCode}
                onChange={(e) => setSvgCode(e.target.value)}
                className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none"
                spellCheck={false}
                placeholder="Paste your SVG code here..."
              />
              <div className="border-base-300 bg-base-200/30 flex items-center gap-2 overflow-x-auto border-t p-2">
                <span className="text-base-content/40 text-[9px] font-bold tracking-widest uppercase">
                  Presets:
                </span>
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setSvgCode(p.code)}
                    className="btn btn-xs border-base-content/10 rounded-full lowercase italic">
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-base-300 flex flex-1 flex-col">
              <div className="border-base-300 bg-base-200/50 flex items-center justify-between border-b px-4 py-2">
                <span className="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
                  Preview
                </span>
                <div className="flex gap-1">
                  {(['grid', 'white', 'black', 'transparent'] as const).map(
                    (mode) => (
                      <button
                        key={mode}
                        onClick={() => setBgMode(mode)}
                        className={`btn btn-xs ${bgMode === mode ? 'btn-primary' : 'btn-ghost'}`}>
                        {mode.charAt(0).toUpperCase()}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div
                className={`flex flex-1 items-center justify-center overflow-auto p-8 transition-colors duration-500 ${bgMode === 'grid' ? 'bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]' : ''} ${bgMode === 'white' ? 'bg-white' : ''} ${bgMode === 'black' ? 'bg-zinc-950' : ''} ${bgMode === 'transparent' ? 'bg-transparent' : ''}`}>
                <div className="relative shadow-2xl">
                  <div
                    className="flex h-full w-full items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: svgCode }}
                  />
                </div>
              </div>
              <div className="border-base-300 bg-base-200/50 flex items-center justify-between border-t p-3">
                <span className="text-base-content/40 font-mono text-[10px]">
                  {svgCode.length} BYTES
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className={`btn btn-sm ${isCopied ? 'btn-success' : 'btn-primary'} min-w-[80px]`}>
                    {isCopied ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={handleDownloadSvg}
                    className="btn btn-outline btn-sm">
                    Export SVG
                  </button>
                  <button
                    onClick={() => {
                      generateFromEditor();
                      setActiveTab('icons');
                    }}
                    className="btn btn-secondary btn-sm">
                    Generate Icons
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-base-100 flex h-full flex-col gap-6 overflow-y-auto p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
                  Icon Generation Source
                </span>
                <button
                  onClick={generateFromEditor}
                  disabled={processing}
                  className="btn btn-outline btn-xs">
                  {processing ? 'Rendering…' : 'Use current editor SVG'}
                </button>
              </div>
              <Dropzone
                accept="image/svg+xml,.svg"
                onFile={handleFile}
                disabled={processing}
                label={
                  processing ? 'Generating...' : 'Drop SVG or Click to Upload'
                }
              />
            </div>
            {iconError && (
              <div className="alert alert-error py-2 text-sm">
                <span>{iconError}</span>
              </div>
            )}
            {icons.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="border-base-300 flex items-center justify-between border-b pb-2">
                  <div>
                    <h4 className="font-bold">Generated Icons</h4>
                    <p className="text-base-content/40 text-[10px]">
                      Source: {sourceName}
                    </p>
                  </div>
                  <button
                    onClick={downloadAll}
                    className="btn btn-primary btn-sm">
                    Download ZIP (All Sizes)
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {icons.map((icon) => (
                    <button
                      key={icon.size}
                      onClick={() => downloadSingle(icon)}
                      className="group bg-base-200 hover:bg-base-300 border-base-300 flex flex-col items-center gap-2 rounded-xl border p-3 transition-all">
                      <img
                        src={icon.dataUrl}
                        alt={`${icon.size}x${icon.size}`}
                        loading="lazy"
                        className="h-12 w-12 object-contain"
                      />
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[10px] font-bold">
                          {icon.size}px
                        </span>
                        <span className="text-primary text-[9px] opacity-0 transition-opacity group-hover:opacity-100">
                          Download ↓
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {icons.length === 0 && !processing && (
              <div className="flex flex-1 flex-col items-center justify-center text-center opacity-30">
                <p className="text-sm italic">No icons generated yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
