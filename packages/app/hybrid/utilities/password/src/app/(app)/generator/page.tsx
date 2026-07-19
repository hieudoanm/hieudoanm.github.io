'use client';

import { type FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import {
  generatePassword,
  checkStrength,
  generatePin,
  generateMemorablePassword,
} from '@/data/models';
import { copyToClipboard } from '@/utils/format';
import { useToast } from '@/providers/ToastProvider';
import { FiArrowLeft, FiCopy, FiRefreshCw } from 'react-icons/fi';

const GeneratorContent: FC = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const [mode, setMode] = useState<'password' | 'pin'>('password');
  const [length, setLength] = useState(16);
  const [memorable, setMemorable] = useState(false);
  const [wordCount, setWordCount] = useState(4);
  const [pinLength, setPinLength] = useState(6);
  const [opts, setOpts] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });
  const [value, setValue] = useState('');

  const regenerate = (): void => {
    if (mode === 'pin') setValue(generatePin(pinLength));
    else if (memorable) setValue(generateMemorablePassword(wordCount));
    else setValue(generatePassword(length, opts));
  };

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const strength = checkStrength(value);
  const strengthColors = [
    'bg-error',
    'bg-error',
    'bg-warning',
    'bg-warning',
    'bg-success',
    'bg-success',
  ];

  const handleCopy = async (): Promise<void> => {
    await copyToClipboard(value);
    addToast(
      mode === 'pin'
        ? 'PIN copied'
        : memorable
          ? 'Passphrase copied'
          : 'Password copied',
      'success'
    );
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setMode('password');
              setValue(
                memorable
                  ? generateMemorablePassword(wordCount)
                  : generatePassword(length, opts)
              );
            }}
            className={`btn btn-sm flex-1 ${mode === 'password' ? 'btn-primary' : 'btn-ghost'}`}>
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('pin');
              setValue(generatePin(pinLength));
            }}
            className={`btn btn-sm flex-1 ${mode === 'pin' ? 'btn-primary' : 'btn-ghost'}`}>
            PIN
          </button>
        </div>
        <div className="card bg-base-200 card-body">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              readOnly
              aria-label="Generated value"
              className="input input-bordered flex-1 font-mono"
            />
            <button
              type="button"
              onClick={() => void handleCopy()}
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
          {mode === 'password' && !memorable && (
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
          )}
        </div>
        {mode === 'password' ? (
          <div className="card bg-base-200 card-body space-y-4">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={memorable}
                onChange={(e) => {
                  setMemorable(e.target.checked);
                  setValue(
                    e.target.checked
                      ? generateMemorablePassword(wordCount)
                      : generatePassword(length, opts)
                  );
                }}
              />
              <span className="label-text">Memorable passphrase</span>
            </label>
            {memorable ? (
              <>
                <label className="label">
                  <span className="label-text">Words: {wordCount}</span>
                </label>
                <input
                  type="range"
                  min={3}
                  max={10}
                  value={wordCount}
                  onChange={(e) => {
                    setWordCount(parseInt(e.target.value));
                    setValue(
                      generateMemorablePassword(parseInt(e.target.value))
                    );
                  }}
                  className="range range-primary"
                />
              </>
            ) : (
              <>
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
                    setValue(generatePassword(parseInt(e.target.value), opts));
                  }}
                  className="range range-primary"
                />
                {(['upper', 'lower', 'numbers', 'symbols'] as const).map(
                  (k) => (
                    <label
                      key={k}
                      className="label cursor-pointer justify-start gap-4">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={opts[k]}
                        onChange={(e) => {
                          const o = { ...opts, [k]: e.target.checked };
                          setOpts(o);
                          setValue(generatePassword(length, o));
                        }}
                      />
                      <span className="label-text capitalize">
                        {k === 'upper'
                          ? 'Uppercase'
                          : k === 'lower'
                            ? 'Lowercase'
                            : k}
                      </span>
                    </label>
                  )
                )}
              </>
            )}
          </div>
        ) : (
          <div className="card bg-base-200 card-body space-y-4">
            <label className="label">
              <span className="label-text">PIN Length: {pinLength}</span>
            </label>
            <input
              type="range"
              min={4}
              max={12}
              value={pinLength}
              onChange={(e) => {
                setPinLength(parseInt(e.target.value));
                setValue(generatePin(parseInt(e.target.value)));
              }}
              className="range range-primary"
            />
          </div>
        )}
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
