'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { generatePassword, checkStrength } from '@/data/models';
import { copyToClipboard } from '@/utils/format';
import { useToast } from '@/providers/ToastProvider';
import { FiArrowLeft, FiCopy, FiRefreshCw } from 'react-icons/fi';

const GeneratorContent: FC = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState(() => generatePassword(16, opts));
  const strength = checkStrength(password);
  const strengthColors = [
    'bg-error',
    'bg-error',
    'bg-warning',
    'bg-warning',
    'bg-success',
    'bg-success',
  ];

  const regenerate = () => setPassword(generatePassword(length, opts));
  const handleCopy = async () => {
    await copyToClipboard(password);
    addToast('Password copied', 'success');
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-lg font-bold">Password Generator</h1>
      </header>
      <main className="mx-auto max-w-lg space-y-6 p-6">
        <div className="card bg-base-200 card-body">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={password}
              readOnly
              className="input input-bordered flex-1 font-mono"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="btn btn-primary btn-circle">
              <FiCopy className="size-5" />
            </button>
            <button
              type="button"
              onClick={regenerate}
              className="btn btn-ghost btn-circle">
              <FiRefreshCw className="size-5" />
            </button>
          </div>
          <div className="mt-3">
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded ${i < strength.score ? strengthColors[strength.score] : 'bg-base-300'}`}
                />
              ))}
            </div>
            <p className="mt-1 text-xs">{strength.label}</p>
          </div>
        </div>
        <div className="card bg-base-200 card-body space-y-4">
          <label className="label">
            <span className="label-text">Length: {length}</span>
          </label>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => {
              setLength(parseInt(e.target.value));
              setPassword(generatePassword(parseInt(e.target.value), opts));
            }}
            className="range range-primary"
          />
          {(['upper', 'lower', 'numbers', 'symbols'] as const).map((k) => (
            <label key={k} className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={opts[k]}
                onChange={(e) => {
                  const o = { ...opts, [k]: e.target.checked };
                  setOpts(o);
                  setPassword(generatePassword(length, o));
                }}
              />
              <span className="label-text capitalize">
                {k === 'upper' ? 'Uppercase' : k === 'lower' ? 'Lowercase' : k}
              </span>
            </label>
          ))}
        </div>
      </main>
    </div>
  );
};

const GeneratorPage: FC = () => (
  <Providers>
    <GeneratorContent />
  </Providers>
);
export default GeneratorPage;
