import { render } from '@testing-library/react';
import type { FC } from 'react';
import { TOOLS, type ImageToolConfig } from '@/data/photo-tools';
import { ImageConvertTool } from '@/components/tools/ImageConvertTool';
import { AiGenerateTool } from '@/components/tools/AiGenerateTool';
import { AiRemoveBgTool } from '@/components/tools/AiRemoveBgTool';
import { AiRemoveObjectTool } from '@/components/tools/AiRemoveObjectTool';
import { AiRemovePersonTool } from '@/components/tools/AiRemovePersonTool';
import { AiRemoveWatermarkTool } from '@/components/tools/AiRemoveWatermarkTool';
import { AiRestoreTool } from '@/components/tools/AiRestoreTool';
import { AiUnblurTool } from '@/components/tools/AiUnblurTool';
import { AiUpscaleTool } from '@/components/tools/AiUpscaleTool';
import { AiColorizeTool } from '@/components/tools/AiColorizeTool';
import { ColorsTool } from '@/components/tools/ColorsTool';
import { ContrastCheckerTool } from '@/components/tools/ContrastCheckerTool';
import { GradientGeneratorTool } from '@/components/tools/GradientGeneratorTool';
import { ImageColorizeTool } from '@/components/tools/ImageColorizeTool';
import { ImageDominantColorTool } from '@/components/tools/ImageDominantColorTool';
import { Base64Tool } from '@/components/tools/Base64Tool';
import { BreakingBadTool } from '@/components/tools/BreakingBadTool';
import { CameraTool } from '@/components/tools/CameraTool';
import { ChartMakerTool } from '@/components/tools/ChartMakerTool';
import { CollageMakerTool } from '@/components/tools/CollageMakerTool';
import { GitHubSocialPreviewTool } from '@/components/tools/GitHubSocialPreviewTool';
import { HouseTool } from '@/components/tools/HouseTool';
import { ImageProfileTool } from '@/components/tools/ImageProfileTool';
import { InstaSizeTool } from '@/components/tools/InstaSizeTool';
import { MemeMakerTool } from '@/components/tools/MemeMakerTool';
import { PixelTool } from '@/components/tools/PixelTool';
import { YouTubeThumbnailsTool } from '@/components/tools/YouTubeThumbnailsTool';
import { ImageBorderTool } from '@/components/tools/ImageBorderTool';
import { ImageBwTool } from '@/components/tools/ImageBwTool';
import { ImageCompressTool } from '@/components/tools/ImageCompressTool';
import { ImageCropTool } from '@/components/tools/ImageCropTool';
import { ImageFlipTool } from '@/components/tools/ImageFlipTool';
import { ImagePixelateTool } from '@/components/tools/ImagePixelateTool';
import { ImageResizeTool } from '@/components/tools/ImageResizeTool';
import { ImageRotateTool } from '@/components/tools/ImageRotateTool';
import { ImageRoundTool } from '@/components/tools/ImageRoundTool';
import { ImageSharpenTool } from '@/components/tools/ImageSharpenTool';
import { ImageSplitTool } from '@/components/tools/ImageSplitTool';
import { ImageAdjustTool } from '@/components/tools/ImageAdjustTool';
import { ImageBlurBackgroundTool } from '@/components/tools/ImageBlurBackgroundTool';
import { ImageCombinerSideBySideTool } from '@/components/tools/ImageCombinerSideBySideTool';
import { ImageCombinerStackedTool } from '@/components/tools/ImageCombinerStackedTool';
import { ImageMorphingTool } from '@/components/tools/ImageMorphingTool';
import { ImagePhotoFiltersTool } from '@/components/tools/ImagePhotoFiltersTool';
import { ImagePixelateFaceTool } from '@/components/tools/ImagePixelateFaceTool';
import { ImageShadowTool } from '@/components/tools/ImageShadowTool';
import { ImageTextTool } from '@/components/tools/ImageTextTool';
import { ImageTransparentBgTool } from '@/components/tools/ImageTransparentBgTool';
import { ImageVignetteTool } from '@/components/tools/ImageVignetteTool';
import { ImageWatermarkTool } from '@/components/tools/ImageWatermarkTool';
import { BarcodeTool } from '@/components/tools/BarcodeTool';
import { BarcodeReadTool } from '@/components/tools/BarcodeReadTool';
import { ImageOcrTool } from '@/components/tools/ImageOcrTool';
import { ImageTranslateTool } from '@/components/tools/ImageTranslateTool';
import { InvoiceParserTool } from '@/components/tools/InvoiceParserTool';
import { QRCodeTool } from '@/components/tools/QRCodeTool';
import { QrReadTool } from '@/components/tools/QrReadTool';

const TOOL_COMPONENTS: Record<string, FC<{ config: ImageToolConfig }>> = {
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

const registeredTools = TOOLS.filter((t) => TOOL_COMPONENTS[t.id]);

describe.each(registeredTools)('$title ($id)', (config) => {
  it('renders without throwing', () => {
    const Component = TOOL_COMPONENTS[config.id];
    const { container } = render(<Component config={config} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe('ImageConvertTool', () => {
  it('renders as the fallback tool', () => {
    const config = {
      id: 'image-convert',
      title: 'Convert',
      emoji: '🔄',
      description: 'Convert formats',
      category: 'convert' as const,
    };
    const { container } = render(<ImageConvertTool config={config} />);
    expect(container.firstChild).toBeTruthy();
  });
});
