import type { FC } from 'react';

export const DbDropOverlay: FC<{ isDragging: boolean }> = ({ isDragging }) => {
  if (!isDragging) return null;
  return (
    <div className="bg-base-100/80 pointer-events-none fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="border-primary rounded-2xl border-2 border-dashed p-16 text-center">
        <p className="text-primary text-xl font-normal tracking-widest uppercase">
          Drop .db file
        </p>
      </div>
    </div>
  );
};
