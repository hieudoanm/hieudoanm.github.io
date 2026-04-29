import { FC, useState } from 'react';

export const HouseModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState('House');
  const letters = name.trim().toUpperCase().split('');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-lg border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">House, M.D.</h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                Name → Badge
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setName('House')}
                className="btn btn-outline btn-xs font-mono tracking-widest">
                Reset
              </button>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-xs btn-square text-base">
                ✕
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="e.g. Gregory"
            className="input input-bordered input-sm w-full font-mono tracking-widest"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="bg-base-200 border-base-300 flex min-h-36 items-center justify-center overflow-x-auto rounded-xl border p-6">
            {letters.length > 0 && (
              <div className="relative flex items-center">
                {letters.map((letter, index) => {
                  const isFirst = index === 0;
                  return (
                    <div
                      key={`${letter}-${index}`}
                      className={`border-base-content flex h-16 w-16 items-center justify-center text-4xl font-bold ${
                        isFirst ? 'mr-3 border-4' : 'border-b-4'
                      }`}>
                      {letter}
                    </div>
                  );
                })}
                <div className="absolute -right-12 -bottom-1 font-mono text-xs font-bold tracking-[0.3em] opacity-60">
                  M.D.
                </div>
              </div>
            )}
          </div>

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Click outside to close · First letter gets full border
          </p>
        </div>
      </div>
    </div>
  );
};
