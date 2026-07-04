'use client';

import { FC, useMemo, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import {
  CATEGORIES,
  TOOLS,
  type ImageToolConfig,
  popPreselectedImageTool,
} from './config';
import { ImageConvertTool } from './tools/ImageConvertTool';
import { AiGenerateTool } from './tools/AiGenerateTool';
import { AiRemoveBgTool } from './tools/AiRemoveBgTool';
import { AiRemoveObjectTool } from './tools/AiRemoveObjectTool';
import { AiRemovePersonTool } from './tools/AiRemovePersonTool';
import { AiRemoveWatermarkTool } from './tools/AiRemoveWatermarkTool';
import { AiRestoreTool } from './tools/AiRestoreTool';
import { AiUnblurTool } from './tools/AiUnblurTool';
import { AiUpscaleTool } from './tools/AiUpscaleTool';
import { AiColorizeTool } from './tools/AiColorizeTool';
import { ColorsTool } from './tools/ColorsTool';
import { ContrastCheckerTool } from './tools/ContrastCheckerTool';
import { GradientGeneratorTool } from './tools/GradientGeneratorTool';
import { ImageColorizeTool } from './tools/ImageColorizeTool';
import { ImageDominantColorTool } from './tools/ImageDominantColorTool';
import { Base64Tool } from './tools/Base64Tool';
import { BreakingBadTool } from './tools/BreakingBadTool';
import { CameraTool } from './tools/CameraTool';
import { ChartMakerTool } from './tools/ChartMakerTool';
import { CollageMakerTool } from './tools/CollageMakerTool';
import { GitHubSocialPreviewTool } from './tools/GitHubSocialPreviewTool';
import { HouseTool } from './tools/HouseTool';
import { ImageProfileTool } from './tools/ImageProfileTool';
import { InstaSizeTool } from './tools/InstaSizeTool';
import { MemeMakerTool } from './tools/MemeMakerTool';
import { PixelTool } from './tools/PixelTool';
import { YouTubeThumbnailsTool } from './tools/YouTubeThumbnailsTool';
import { ImageBorderTool } from './tools/ImageBorderTool';
import { ImageBwTool } from './tools/ImageBwTool';
import { ImageCompressTool } from './tools/ImageCompressTool';
import { ImageCropTool } from './tools/ImageCropTool';
import { ImageFlipTool } from './tools/ImageFlipTool';
import { ImagePixelateTool } from './tools/ImagePixelateTool';
import { ImageResizeTool } from './tools/ImageResizeTool';
import { ImageRotateTool } from './tools/ImageRotateTool';
import { ImageRoundTool } from './tools/ImageRoundTool';
import { ImageSharpenTool } from './tools/ImageSharpenTool';
import { ImageSplitTool } from './tools/ImageSplitTool';
import { ImageAdjustTool } from './tools/ImageAdjustTool';
import { ImageBlurBackgroundTool } from './tools/ImageBlurBackgroundTool';
import { ImageCombinerSideBySideTool } from './tools/ImageCombinerSideBySideTool';
import { ImageCombinerStackedTool } from './tools/ImageCombinerStackedTool';
import { ImageMorphingTool } from './tools/ImageMorphingTool';
import { ImagePhotoFiltersTool } from './tools/ImagePhotoFiltersTool';
import { ImagePixelateFaceTool } from './tools/ImagePixelateFaceTool';
import { ImageShadowTool } from './tools/ImageShadowTool';
import { ImageTextTool } from './tools/ImageTextTool';
import { ImageTransparentBgTool } from './tools/ImageTransparentBgTool';
import { ImageVignetteTool } from './tools/ImageVignetteTool';
import { ImageWatermarkTool } from './tools/ImageWatermarkTool';
import { BarcodeTool } from './tools/BarcodeTool';
import { BarcodeReadTool } from './tools/BarcodeReadTool';
import { ImageOcrTool } from './tools/ImageOcrTool';
import { ImageTranslateTool } from './tools/ImageTranslateTool';
import { InvoiceParserTool } from './tools/InvoiceParserTool';
import { QRCodeTool } from './tools/QRCodeTool';
import { QrReadTool } from './tools/QrReadTool';

const UNIQUE_TOOLS: Record<string, FC<{ config: ImageToolConfig }>> = {
  'ai-generate': AiGenerateTool,
  'ai-remove-bg': AiRemoveBgTool,
  'ai-remove-object': AiRemoveObjectTool,
  'ai-remove-person': AiRemovePersonTool,
  'ai-remove-watermark': AiRemoveWatermarkTool,
  'ai-restore': AiRestoreTool,
  'ai-unblur': AiUnblurTool,
  'ai-upscale': AiUpscaleTool,
  'ai-colorize': AiColorizeTool,
  colors: ColorsTool,
  'contrast-checker': ContrastCheckerTool,
  'gradient-generator': GradientGeneratorTool,
  'image-colorize': ImageColorizeTool,
  'image-dominant-color': ImageDominantColorTool,
  base64: Base64Tool,
  'breaking-bad': BreakingBadTool,
  camera: CameraTool,
  'chart-maker': ChartMakerTool,
  'collage-maker': CollageMakerTool,
  'github-social-preview': GitHubSocialPreviewTool,
  house: HouseTool,
  'image-profile': ImageProfileTool,
  instasize: InstaSizeTool,
  'meme-maker': MemeMakerTool,
  pixel: PixelTool,
  'youtube-thumbnails': YouTubeThumbnailsTool,
  'image-border': ImageBorderTool,
  'image-bw': ImageBwTool,
  'image-compress': ImageCompressTool,
  'image-crop': ImageCropTool,
  'image-flip': ImageFlipTool,
  'image-pixelate': ImagePixelateTool,
  'image-resize': ImageResizeTool,
  'image-rotate': ImageRotateTool,
  'image-round': ImageRoundTool,
  'image-sharpen': ImageSharpenTool,
  'image-split': ImageSplitTool,
  'image-adjust': ImageAdjustTool,
  'image-blur-background': ImageBlurBackgroundTool,
  'image-combiner-side-by-side': ImageCombinerSideBySideTool,
  'image-combiner-stacked': ImageCombinerStackedTool,
  'image-morphing': ImageMorphingTool,
  'image-photo-filters': ImagePhotoFiltersTool,
  'image-pixelate-face': ImagePixelateFaceTool,
  'image-shadow': ImageShadowTool,
  'image-text': ImageTextTool,
  'image-transparent-bg': ImageTransparentBgTool,
  'image-vignette': ImageVignetteTool,
  'image-watermark': ImageWatermarkTool,
  barcode: BarcodeTool,
  'barcode-read': BarcodeReadTool,
  'image-ocr': ImageOcrTool,
  'image-translate': ImageTranslateTool,
  'invoice-parser': InvoiceParserTool,
  qr: QRCodeTool,
  'qr-read': QrReadTool,
};

const getToolComponent = (id: string): FC<{ config: ImageToolConfig }> => {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) return ImageConvertTool;
  if (UNIQUE_TOOLS[id]) return UNIQUE_TOOLS[id];
  if (tool.category === 'convert') return ImageConvertTool;
  return ImageConvertTool;
};

const CATEGORY_TOOLS: Record<string, string[]> = {};
for (const t of TOOLS) {
  (CATEGORY_TOOLS[t.category] ??= []).push(t.id);
}

const toolCategoryMap: Record<string, string> = {};
for (const [cat, ids] of Object.entries(CATEGORY_TOOLS)) {
  for (const id of ids) {
    toolCategoryMap[id] = cat;
  }
}

export const ImageModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTool, setActiveTool] = useState<ImageToolConfig | null>(() => {
    const id = popPreselectedImageTool();
    return TOOLS.find((t) => t.id === id) ?? null;
  });
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.key, false]))
  );

  const filteredByQuery = useMemo(
    () =>
      !query.trim()
        ? TOOLS
        : TOOLS.filter(
            (t) =>
              t.title.toLowerCase().includes(query.toLowerCase()) ||
              t.description.toLowerCase().includes(query.toLowerCase())
          ),
    [query]
  );

  const grouped = useMemo(() => {
    const map: Record<string, ImageToolConfig[]> = {};
    for (const t of filteredByQuery) {
      const cat = toolCategoryMap[t.id] ?? 'misc';
      (map[cat] ??= []).push(t);
    }
    return map;
  }, [filteredByQuery]);

  const ToolComponent = activeTool ? getToolComponent(activeTool.id) : null;

  return (
    <FullScreen
      onClose={onClose}
      title={activeTool ? activeTool.title : 'Image'}>
      <div className="-m-8 flex h-[calc(100%+4rem)] flex-row-reverse">
        <ToolbarSidebar
          query={query}
          onQueryChange={setQuery}
          grouped={grouped}
          expanded={expanded}
          onToggle={(key) =>
            setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
          }
          onSelect={setActiveTool}
          activeToolId={activeTool?.id ?? null}
        />
        <div className="flex flex-1 flex-col overflow-y-auto p-8">
          {activeTool && ToolComponent ? (
            <ToolComponent config={activeTool} />
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-base-content/30 text-sm">
                Select an image tool
              </p>
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
ImageModal.displayName = 'ImageModal';

function ToolbarSidebar({
  query,
  onQueryChange,
  grouped,
  expanded,
  onToggle,
  onSelect,
  activeToolId,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  grouped: Record<string, ImageToolConfig[]>;
  expanded: Record<string, boolean>;
  onToggle: (key: string) => void;
  onSelect: (tool: ImageToolConfig) => void;
  activeToolId: string | null;
}) {
  return (
    <aside className="border-base-300 flex w-56 shrink-0 flex-col border-l bg-inherit">
      <div className="border-base-300 border-b p-3">
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {CATEGORIES.map((cat) => {
          const tools = grouped[cat.key];
          if (!tools || tools.length === 0) return null;
          const isExpanded = query.trim().length > 0 || expanded[cat.key];
          return (
            <div key={cat.key}>
              <button
                className="hover:bg-base-200 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium"
                onClick={() => onToggle(cat.key)}>
                <span className="text-lg">{cat.emoji}</span>
                <span className="flex-1">{cat.label}</span>
                <span className="text-base-content/30 text-xs">
                  {isExpanded ? '▾' : '▸'}
                </span>
              </button>
              {isExpanded && (
                <div className="ml-2 space-y-0.5">
                  {tools.map((tool) => (
                    <button
                      key={tool.id}
                      className={`hover:bg-base-200 flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-xs transition-colors ${
                        activeToolId === tool.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }`}
                      onClick={() => onSelect(tool)}>
                      <span>{tool.emoji}</span>
                      <span>{tool.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
