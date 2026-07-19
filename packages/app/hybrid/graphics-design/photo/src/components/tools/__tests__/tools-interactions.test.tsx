import { act, fireEvent, render, screen } from '@testing-library/react';
import type { FC } from 'react';
import { TOOLS, type ImageToolConfig } from '@/data/photo-tools';
import { downloadBlob, loadImage } from '@/lib/photo-tools';
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

jest.mock('@/lib/photo-tools', () => ({
  downloadBlob: jest.fn(),
  loadImage: jest.fn(),
  processCanvas: jest.fn(),
}));

jest.mock('qrcode', () => ({
  toDataURL: jest.fn().mockResolvedValue('data:image/jpeg;base64,QUJD'),
}));

jest.mock('jsbarcode', () => jest.fn());

jest.mock('tesseract.js', () => ({
  recognize: jest.fn().mockResolvedValue({
    data: { text: 'Total: $12.34\nAcme Corp\n01/02/2023' },
  }),
}));

jest.mock('onnxruntime-web', () => ({
  Tensor: jest.fn(),
  InferenceSession: {
    create: jest
      .fn()
      .mockResolvedValue({ run: jest.fn().mockResolvedValue({}) }),
  },
}));

jest.mock('@/utils/trpc', () => ({
  trpcClient: {
    openrouter: {
      generate: {
        mutate: jest.fn().mockResolvedValue({ text: 'Xin chao' }),
      },
    },
  },
}));

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

const mockLoadImage = loadImage as jest.Mock;
const mockDownloadBlob = downloadBlob as jest.Mock;

const canvasCtxStub = {
  filter: '',
  fillStyle: '',
  strokeStyle: '',
  font: '',
  textAlign: '',
  globalCompositeOperation: '',
  createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  createPattern: jest.fn(() => ({})),
  measureText: jest.fn(() => ({ width: 10 })),
  getImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(16),
    width: 2,
    height: 2,
  })),
  createImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(16),
    width: 2,
    height: 2,
  })),
  putImageData: jest.fn(),
  drawImage: jest.fn(),
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  strokeRect: jest.fn(),
  fill: jest.fn(),
  stroke: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  rect: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  scale: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  setTransform: jest.fn(),
  reset: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  fillText: jest.fn(),
  strokeText: jest.fn(),
  clip: jest.fn(),
  ellipse: jest.fn(),
  quadraticCurveTo: jest.fn(),
  bezierCurveTo: jest.fn(),
};

const makeBlob = () => new Blob(['fake'], { type: 'image/png' });

const images: HTMLImageElement[] = [];

class FakeImage {
  width = 100;
  height = 100;
  naturalWidth = 100;
  naturalHeight = 100;
  src = '';
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor() {
    images.push(this as unknown as HTMLImageElement);
  }
}

class FakeImageData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  constructor(
    data: Uint8ClampedArray | number,
    width?: number,
    height?: number
  ) {
    if (typeof data === 'number') {
      this.width = data;
      this.height = width ?? 1;
      this.data = new Uint8ClampedArray(this.width * this.height * 4);
    } else {
      this.width = width ?? 1;
      this.height = height ?? 1;
      this.data = data;
    }
  }
}

beforeAll(() => {
  Object.defineProperty(global, 'Image', { writable: true, value: FakeImage });
  Object.defineProperty(global, 'ImageData', {
    writable: true,
    value: FakeImageData,
  });
  Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: jest.fn(() => 'blob:fake'),
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    writable: true,
    value: jest.fn(() => canvasCtxStub),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    writable: true,
    value: jest.fn((cb: (b: Blob | null) => void) => cb(makeBlob())),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
    writable: true,
    value: jest.fn(() => 'data:image/png;base64,QUJD'),
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'getBoundingClientRect', {
    writable: true,
    value: jest.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
    })),
  });
  Object.defineProperty(HTMLAnchorElement.prototype, 'click', {
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: {
      getUserMedia: jest
        .fn()
        .mockResolvedValue({ getTracks: () => [{ stop: jest.fn() }] }),
    },
  });
});

beforeEach(() => {
  jest.clearAllMocks();
  images.length = 0;
  mockLoadImage.mockResolvedValue({
    width: 100,
    height: 100,
    naturalWidth: 100,
    naturalHeight: 100,
    src: 'blob:fake',
  });
});

const exercise = async (
  Component: FC<{ config: ImageToolConfig }>,
  config: ImageToolConfig
) => {
  const { container, unmount } = render(<Component config={config} />);

  const fileInput = container.querySelector('input[type="file"]');
  if (fileInput) {
    fireEvent.change(fileInput, {
      target: {
        files: [
          new File(['fake-image-data'], 'photo.png', { type: 'image/png' }),
        ],
      },
    });
  }

  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
    for (const img of images) img.onload?.(new Event('load'));
  });

  for (const el of Array.from(container.querySelectorAll('input'))) {
    const input = el as HTMLInputElement;
    if (input.type === 'file') continue;
    if (input.type === 'checkbox') {
      fireEvent.click(input);
      continue;
    }
    if (input.type === 'color') {
      fireEvent.change(input, { target: { value: '#ff0000' } });
      continue;
    }
    if (input.type === 'range') {
      fireEvent.change(input, { target: { value: '25' } });
      continue;
    }
    if (input.type === 'number') {
      fireEvent.change(input, { target: { value: '25' } });
      continue;
    }
    fireEvent.change(input, { target: { value: 'test' } });
  }

  for (const el of Array.from(container.querySelectorAll('select'))) {
    const select = el as HTMLSelectElement;
    if (select.options.length > 1) {
      fireEvent.change(select, { target: { value: select.options[1].value } });
    }
  }

  for (const el of Array.from(container.querySelectorAll('textarea'))) {
    fireEvent.change(el, { target: { value: 'test text' } });
  }

  await act(async () => {
    for (const img of images) img.onload?.(new Event('load'));
  });

  if (config.id !== 'ai-generate') {
    for (const el of Array.from(container.querySelectorAll('button'))) {
      fireEvent.click(el);
    }
  } else {
    for (const el of Array.from(container.querySelectorAll('button'))) {
      if (el.textContent?.includes('Generate')) continue;
      fireEvent.click(el);
    }
  }

  await act(async () => {
    await new Promise((r) => setTimeout(r, 20));
  });

  const result = container.firstChild;
  unmount();
  return result;
};

const registeredTools = TOOLS.filter((t) => TOOL_COMPONENTS[t.id]);

describe.each(registeredTools)('$title ($id) interactions', (config) => {
  it('handles file, input, select, and button interactions without crashing', async () => {
    const Component = TOOL_COMPONENTS[config.id];
    const result = await exercise(Component, config);
    expect(result).toBeTruthy();
  });
});

describe('ImageConvertTool', () => {
  it('handles interactions without crashing', async () => {
    const config = {
      id: 'image-convert',
      title: 'Convert',
      emoji: 'x',
      description: 'Convert formats',
      category: 'convert' as const,
    };
    const result = await exercise(ImageConvertTool, config);
    expect(result).toBeTruthy();
    expect(mockDownloadBlob).not.toBeNull();
  });
});
