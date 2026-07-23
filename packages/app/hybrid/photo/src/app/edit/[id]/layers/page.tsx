'use client';

import { type FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiUnlock,
  FiPlus,
  FiTrash2,
  FiMoreVertical,
} from 'react-icons/fi';

const LayersContent: FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { layers, addLayer, updateLayer, deleteLayer } = useData();
  const { addToast } = useToast();

  const blendModes = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'soft-light',
    'hard-light',
  ];

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push(`/edit/${id}`)}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="flex-1 text-lg font-bold">Layers</h1>
        <button
          type="button"
          onClick={async () => {
            await addLayer({
              name: `Layer ${layers.length + 1}`,
              type: 'image',
              visible: true,
              locked: false,
              opacity: 100,
              blendMode: 'normal',
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              rotation: 0,
            });
            addToast('Layer added', 'success');
          }}
          className="btn btn-primary btn-sm">
          <FiPlus className="size-4" /> Add
        </button>
      </header>
      <main className="mx-auto max-w-2xl space-y-3 p-6">
        {layers.map((l) => (
          <div key={l.id} className="card bg-base-200 card-body p-3">
            <div className="mb-2 flex items-center gap-2">
              <FiMoreVertical className="size-4 cursor-grab opacity-30" />
              <button
                type="button"
                onClick={() => updateLayer(l.id, { visible: !l.visible })}
                className="btn btn-ghost btn-xs btn-circle">
                {l.visible ? (
                  <FiEye className="size-4" />
                ) : (
                  <FiEyeOff className="size-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => updateLayer(l.id, { locked: !l.locked })}
                className="btn btn-ghost btn-xs btn-circle">
                {l.locked ? (
                  <FiLock className="size-4" />
                ) : (
                  <FiUnlock className="size-4" />
                )}
              </button>
              <input
                type="text"
                value={l.name}
                onChange={(e) => updateLayer(l.id, { name: e.target.value })}
                className="input input-xs flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  deleteLayer(l.id);
                  addToast('Layer deleted', 'info');
                }}
                className="btn btn-ghost btn-xs btn-circle text-error">
                <FiTrash2 className="size-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs opacity-50">
                  Opacity: {l.opacity}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={l.opacity}
                  onChange={(e) =>
                    updateLayer(l.id, { opacity: parseInt(e.target.value) })
                  }
                  className="range range-xs range-primary w-full"
                />
              </div>
              <div>
                <label className="text-xs opacity-50">Blend Mode</label>
                <select
                  value={l.blendMode}
                  onChange={(e) =>
                    updateLayer(l.id, { blendMode: e.target.value })
                  }
                  className="select select-xs w-full">
                  {blendModes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
        {layers.length === 0 && (
          <p className="text-base-content/50 py-8 text-center">
            No layers. Click Add to create one.
          </p>
        )}
      </main>
    </div>
  );
};

const LayersPage: FC = () => (
  <Providers>
    <LayersContent />
  </Providers>
);
export default LayersPage;
