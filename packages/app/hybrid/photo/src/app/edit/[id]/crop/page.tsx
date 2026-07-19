'use client';

import { type FC, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import {
  FiArrowLeft,
  FiRotateCw,
  FiRotateCcw,
  FiMaximize2,
} from 'react-icons/fi';

const CropContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { images, updateImage } = useData();
  const { addToast } = useToast();
  const image = images.find((i) => i.id === id);
  const [aspect, setAspect] = useState<string>('free');
  const [rotation, setRotation] = useState(0);

  const handleRotate = (deg: number) => setRotation((r) => (r + deg) % 360);
  const handleFlip = async (axis: 'h' | 'v') => {
    if (image) {
      await updateImage(image.id, { width: image.height, height: image.width });
      addToast(
        `Flipped ${axis === 'h' ? 'horizontally' : 'vertically'}`,
        'success'
      );
    }
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push(`/edit/${id}`)}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="flex-1 text-lg font-bold">Crop & Transform</h1>
        <button
          type="button"
          onClick={() => {
            addToast('Crop applied', 'success');
            router.push(`/edit/${id}`);
          }}
          className="btn btn-primary btn-sm">
          Apply
        </button>
      </header>
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <div className="card bg-base-200 card-body">
          <h2 className="card-title text-sm">Aspect Ratio</h2>
          <div className="flex flex-wrap gap-2">
            {['free', '1:1', '4:3', '3:2', '16:9', '9:16'].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAspect(a)}
                className={`btn btn-xs ${aspect === a ? 'btn-primary' : 'btn-ghost'}`}>
                {a === 'free' ? 'Free' : a}
              </button>
            ))}
          </div>
        </div>
        <div className="card bg-base-200 card-body">
          <h2 className="card-title text-sm">Rotate</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleRotate(-90)}
              className="btn btn-ghost btn-sm">
              <FiRotateCcw className="size-4" /> -90°
            </button>
            <button
              type="button"
              onClick={() => handleRotate(90)}
              className="btn btn-ghost btn-sm">
              <FiRotateCw className="size-4" /> +90°
            </button>
          </div>
          <input
            type="range"
            min={-45}
            max={45}
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value))}
            className="range range-primary w-full"
          />
          <p className="text-xs opacity-50">Rotation: {rotation}°</p>
        </div>
        <div className="card bg-base-200 card-body">
          <h2 className="card-title text-sm">Flip</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleFlip('h')}
              className="btn btn-ghost btn-sm">
              <FiMaximize2 className="size-4" /> Horizontal
            </button>
            <button
              type="button"
              onClick={() => handleFlip('v')}
              className="btn btn-ghost btn-sm">
              <FiMaximize2 className="size-4 rotate-90" /> Vertical
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CropPage: FC = () => (
  <Providers>
    <CropContent />
  </Providers>
);
export default CropPage;
