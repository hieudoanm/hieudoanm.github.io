import { createSignal } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

const DEFAULT_SVG = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
  </defs>
  <rect x="50" y="50" width="300" height="300" rx="40" fill="url(#gradient)" />
  <circle cx="200" cy="200" r="80" fill="white" fill-opacity="0.2" />
  <text x="200" y="215" font-family="sans-serif" font-size="24" fill="white" text-anchor="middle" font-weight="bold">SVG EDITOR</text>
</svg>`;

const PRESETS = [
  { name: 'Modern', code: DEFAULT_SVG },
  {
    name: 'Galaxy',
    code: `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#020617"/><g transform="translate(200,200)"><circle r="140" fill="none" stroke="#3b82f6" stroke-width="0.5" stroke-dasharray="1 10"/><circle r="100" fill="none" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="5 15" opacity="0.5"/><circle r="60" fill="none" stroke="#ec4899" stroke-width="2" stroke-dasharray="10 20"/><circle r="20" fill="#f43f5e" filter="blur(8px)"/><circle r="6" fill="white"/></g></svg>`,
  },
  {
    name: 'Aurora',
    code: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#8B5CF6" d="M44.7,-76.4C58.2,-69.2,70,-58.5,77.4,-45.5C84.7,-32.5,87.7,-17.2,85.1,-2.6C82.5,12,74.3,25.9,64.8,38.2C55.3,50.5,44.6,61.1,32.1,68.2C19.7,75.3,5.5,78.9,-9.4,77.5C-24.3,76.1,-39.8,69.7,-52.2,59.8C-64.6,49.9,-73.9,36.5,-78.9,21.8C-83.9,7.1,-84.6,-8.8,-79.9,-23.5C-75.2,-38.2,-65.1,-51.7,-52.1,-59.1C-39.1,-66.5,-23.2,-67.7,-8.4,-75.4C6.5,-83.1,21.3,-97.3,44.7,-76.4Z" transform="translate(100 100)" filter="blur(4px)" /></svg>`,
  },
  {
    name: 'Blueprint',
    code: `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#2563eb"/><path d="M0 50h100M50 0v100" stroke="#60a5fa" stroke-width="0.5"/><path d="M20 20h60v60h-60z" fill="none" stroke="white" stroke-width="1.5" stroke-dasharray="4 2"/><circle cx="50" cy="50" r="25" fill="none" stroke="white" stroke-width="1"/></svg>`,
  },
];

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

type BgMode = 'grid' | 'white' | 'black' | 'transparent';
type Tab = 'editor' | 'icons';

type GeneratedIcon = {
  size: number;
  dataUrl: string;
  canvas: HTMLCanvasElement;
};

function svgToCanvas(
  svgText: string,
  size: number
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const sized = svgText
      .replace(/width="[^"]*"/, `width="${size}"`)
      .replace(/height="[^"]*"/, `height="${size}"`);

    const blob = new Blob([sized], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to render SVG'));
    };
    img.src = url;
  });
}

export const SVGModal = (props: { onClose: () => void }) => {
  const [svgCode, setSvgCode] = createSignal(DEFAULT_SVG);
  const [isCopied, setIsCopied] = createSignal(false);
  const [bgMode, setBgMode] = createSignal<BgMode>('grid');
  const [activeTab, setActiveTab] = createSignal<Tab>('editor');

  const [icons, setIcons] = createSignal<GeneratedIcon[]>([]);
  const [iconError, setIconError] = createSignal<string | null>(null);
  const [dragging, setDragging] = createSignal(false);
  const [sourceName, setSourceName] = createSignal<string | null>(null);
  const [processing, setProcessing] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;

  const handleCopy = () => {
    navigator.clipboard.writeText(svgCode()).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([svgCode()], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'icon.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFormat = () => {
    const formatted = svgCode()
      .replace(/>\s+</g, '><')
      .replace(/></g, '>\n<')
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
    setSvgCode(formatted);
  };

  const runIconGeneration = async (svgText: string, label: string) => {
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
  };

  const generateFromEditor = () => {
    runIconGeneration(svgCode(), 'SVG Editor');
  };

  const processFile = async (file: File) => {
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
  };

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) processFile(files[0]);
  };

  const downloadSingle = (icon: GeneratedIcon) => {
    const a = document.createElement('a');
    a.href = icon.dataUrl;
    a.download = `icon-${icon.size}x${icon.size}.png`;
    a.click();
  };

  const downloadAll = async () => {
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    document.head.appendChild(script);
    await new Promise((res) => (script.onload = res));
    // @ts-ignore
    const zip = new window.JSZip();
    const folder = zip.folder('icons');
    for (const icon of icons()) {
      const blob = await new Promise<Blob>((res) =>
        icon.canvas.toBlob((b) => res(b!), 'image/png')
      );
      const buf = await blob.arrayBuffer();
      folder.file(`icon-${icon.size}x${icon.size}.png`, buf);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = 'icons.zip';
    a.click();
  };

  return (
    <ModalWrapper
      onClose={props.onClose}
      title="SVG Editor"
      size="max-w-5xl"
      fullHeight>
      {/* Tabs */}
      <div class="bg-base-200 border-base-300 flex border-b px-4">
        <button
          onClick={() => setActiveTab('editor')}
          class={`px-4 py-2 text-sm font-medium transition-all ${activeTab() === 'editor' ? 'border-primary text-primary border-b-2' : 'text-base-content/60 hover:text-base-content'}`}>
          ✏️ Editor
        </button>
        <button
          onClick={() => setActiveTab('icons')}
          class={`px-4 py-2 text-sm font-medium transition-all ${activeTab() === 'icons' ? 'border-primary text-primary border-b-2' : 'text-base-content/60 hover:text-base-content'}`}>
          🖼️ Icons
        </button>
      </div>

      {/* Content */}
      <div class="min-h-0 flex-1 overflow-hidden">
        {activeTab() === 'editor' ? (
          <div class="flex h-full flex-col lg:flex-row">
            {/* Left: Editor */}
            <div class="border-base-300 bg-base-100 flex flex-1 flex-col border-r">
              <div class="border-base-300 bg-base-200/50 flex items-center justify-between border-b px-4 py-2">
                <span class="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
                  SVG Source
                </span>
                <div class="flex gap-2">
                  <button
                    onClick={handleFormat}
                    class="btn btn-ghost btn-xs tooltip"
                    data-tip="Format">
                    Format
                  </button>
                  <button
                    onClick={() => setSvgCode(DEFAULT_SVG)}
                    class="btn btn-ghost btn-xs tooltip"
                    data-tip="Reset">
                    Reset
                  </button>
                </div>
              </div>
              <textarea
                value={svgCode()}
                onChange={(e: Event) =>
                  setSvgCode((e.target as HTMLTextAreaElement).value)
                }
                class="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none"
                spellCheck={false}
                placeholder="Paste your SVG code here..."
              />
              <div class="border-base-300 bg-base-200/30 flex items-center gap-2 overflow-x-auto border-t p-2">
                <span class="text-base-content/40 text-[9px] font-bold tracking-widest uppercase">
                  Presets:
                </span>
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setSvgCode(p.code)}
                    class="btn btn-xs border-base-content/10 rounded-full lowercase italic">
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Preview */}
            <div class="bg-base-300 flex flex-1 flex-col">
              <div class="border-base-300 bg-base-200/50 flex items-center justify-between border-b px-4 py-2">
                <span class="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
                  Preview
                </span>
                <div class="flex gap-1">
                  {(['grid', 'white', 'black', 'transparent'] as const).map(
                    (mode) => (
                      <button
                        key={mode}
                        onClick={() => setBgMode(mode)}
                        class={`btn btn-xs ${bgMode() === mode ? 'btn-primary' : 'btn-ghost'}`}>
                        {mode.charAt(0).toUpperCase()}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div
                class={`flex flex-1 items-center justify-center overflow-auto p-8 transition-colors duration-500 ${bgMode() === 'grid' ? 'bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]' : ''} ${bgMode() === 'white' ? 'bg-white' : ''} ${bgMode() === 'black' ? 'bg-zinc-950' : ''} ${bgMode() === 'transparent' ? 'bg-transparent' : ''}`}>
                <div class="relative shadow-2xl">
                  <div
                    class="flex h-full w-full items-center justify-center"
                    innerHTML={svgCode()}
                  />
                </div>
              </div>
              <div class="border-base-300 bg-base-200/50 flex items-center justify-between border-t p-3">
                <span class="text-base-content/40 font-mono text-[10px]">
                  {svgCode().length} BYTES
                </span>
                <div class="flex gap-2">
                  <button
                    onClick={handleCopy}
                    class={`btn btn-sm ${isCopied() ? 'btn-success' : 'btn-primary'} min-w-[80px]`}>
                    {isCopied() ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={handleDownloadSvg}
                    class="btn btn-outline btn-sm">
                    Export SVG
                  </button>
                  <button
                    onClick={() => {
                      generateFromEditor();
                      setActiveTab('icons');
                    }}
                    class="btn btn-secondary btn-sm">
                    Generate Icons
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="bg-base-100 flex h-full flex-col gap-6 overflow-y-auto p-6">
            {/* Import Area */}
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <span class="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
                  Icon Generation Source
                </span>
                <button
                  onClick={generateFromEditor}
                  disabled={processing()}
                  class="btn btn-outline btn-xs">
                  {processing() ? '⏳ Rendering…' : '✏️ Use current editor SVG'}
                </button>
              </div>

              <div
                onClick={() => !processing() && inputRef?.click()}
                onDragOver={(e: DragEvent) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e: DragEvent) => {
                  e.preventDefault();
                  setDragging(false);
                  handleFiles((e.dataTransfer as DataTransfer).files);
                }}
                class={`border-base-content/10 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 transition-all ${processing() ? 'bg-base-200 cursor-wait' : dragging() ? 'bg-primary/5 border-primary/40' : 'bg-base-200/50 hover:bg-base-200'}`}>
                <input
                  ref={(el) => {
                    inputRef = el;
                  }}
                  type="file"
                  accept="image/svg+xml,.svg"
                  class="hidden"
                  onChange={(e: Event) =>
                    handleFiles((e.target as HTMLInputElement).files)
                  }
                />
                <span class="text-3xl">
                  {processing() ? '⏳' : dragging() ? '📂' : '📁'}
                </span>
                <div class="flex flex-col items-center gap-1 text-center">
                  <span class="text-sm font-medium">
                    {processing()
                      ? 'Generating...'
                      : 'Drop SVG or Click to Upload'}
                  </span>
                  <span class="text-base-content/40 text-[10px] tracking-widest uppercase">
                    SVG only · Generates PNG: 72px to 512px
                  </span>
                </div>
              </div>
            </div>

            {/* Error */}
            {iconError() && (
              <div class="alert alert-error py-2 text-sm">
                <span>{iconError()}</span>
              </div>
            )}

            {/* Results Grid */}
            {icons().length > 0 && (
              <div class="flex flex-col gap-4">
                <div class="border-base-300 flex items-center justify-between border-b pb-2">
                  <div>
                    <h4 class="font-bold">Generated Icons</h4>
                    <p class="text-base-content/40 text-[10px]">
                      Source: {sourceName()}
                    </p>
                  </div>
                  <button onClick={downloadAll} class="btn btn-primary btn-sm">
                    Download ZIP (All Sizes)
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {icons().map((icon) => (
                    <button
                      key={icon.size}
                      onClick={() => downloadSingle(icon)}
                      class="group bg-base-200 hover:bg-base-300 border-base-300 flex flex-col items-center gap-2 rounded-xl border p-3 transition-all">
                      <img
                        src={icon.dataUrl}
                        alt={`${icon.size}x${icon.size}`}
                        class="h-12 w-12 object-contain"
                      />
                      <div class="flex flex-col items-center gap-0.5">
                        <span class="text-[10px] font-bold">{icon.size}px</span>
                        <span class="text-primary text-[9px] opacity-0 transition-opacity group-hover:opacity-100">
                          Download ↓
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {icons().length === 0 && !processing() && (
              <div class="flex flex-1 flex-col items-center justify-center text-center opacity-30">
                <p class="text-sm italic">No icons generated yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
