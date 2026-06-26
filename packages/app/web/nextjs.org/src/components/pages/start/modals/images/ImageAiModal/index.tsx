'use client';

import { FC, useState } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab =
  | 'remove-bg'
  | 'remove-person'
  | 'remove-object'
  | 'remove-watermark'
  | 'restore'
  | 'colorize'
  | 'upscale'
  | 'unblur'
  | 'ai-generate'
  | 'ai-art';

const TABS: { id: Tab; label: string; desc: string; cmd: string }[] = [
  {
    id: 'remove-bg',
    label: 'Remove BG',
    desc: 'Remove background from image using AI.',
    cmd: 'hieudoanm image background input.jpg output.png',
  },
  {
    id: 'remove-person',
    label: 'Remove Person',
    desc: 'Remove a person from a photo using AI inpainting.',
    cmd: 'rembg -o output.png input.png',
  },
  {
    id: 'remove-object',
    label: 'Remove Object',
    desc: 'Remove unwanted objects from photos using AI.',
    cmd: 'Uses AI inpainting — try stable-diffusion or clipdrop CLI',
  },
  {
    id: 'remove-watermark',
    label: 'Remove Watermark',
    desc: 'Remove watermarks from images.',
    cmd: 'Uses AI inpainting or clone-stamp — try la-ma inpainting tools',
  },
  {
    id: 'restore',
    label: 'Restore',
    desc: 'Restore old or damaged photos using AI.',
    cmd: 'Uses AI photo restoration — try GFPGAN or CodeFormer',
  },
  {
    id: 'colorize',
    label: 'Colorize',
    desc: 'Add color to black and white photos using AI.',
    cmd: 'Uses AI colorization — try DeOldify or DDColor',
  },
  {
    id: 'upscale',
    label: 'Upscale',
    desc: 'Increase image resolution using AI super-resolution.',
    cmd: 'Uses AI upscaling — try Real-ESRGAN or ESRGAN',
  },
  {
    id: 'unblur',
    label: 'Unblur',
    desc: 'Sharpen and deblur blurred images.',
    cmd: 'hieudoanm image sharpen input.jpg output.jpg',
  },
  {
    id: 'ai-generate',
    label: 'AI Generate',
    desc: 'Generate images from text descriptions using AI.',
    cmd: 'Uses AI image generation — try Stable Diffusion or DALL-E via OpenRouter',
  },
  {
    id: 'ai-art',
    label: 'AI Art',
    desc: 'Create artistic images from text prompts.',
    cmd: 'Uses AI art generation — try Stable Diffusion or Midjourney via API',
  },
];

export const ImageAiModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('remove-bg');

  return (
    <ModalWrapper onClose={onClose} title="Image AI" size="max-w-lg">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            className={`tab ${tab === t.id ? 'tab-active' : ''}`}
            onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {TABS.map(
        (t) =>
          tab === t.id && (
            <div key={t.id} className="flex flex-col gap-4">
              <p className="text-sm">{t.desc}</p>
              <div className="bg-base-200 rounded p-4">
                <p className="mb-2 text-xs font-bold">CLI Command:</p>
                <pre className="text-sm">{t.cmd}</pre>
              </div>
              <p className="text-base-content/60 text-xs">
                AI-powered image operations require external AI models or
                services installed on your system.
              </p>
            </div>
          )
      )}
    </ModalWrapper>
  );
};
