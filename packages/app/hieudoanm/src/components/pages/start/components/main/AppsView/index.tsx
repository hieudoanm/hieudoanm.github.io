import { ComponentType, FC, Suspense, lazy, useMemo } from 'react';

import { loaders } from './loaders';
import { ModalId } from '../../../types';

const cache = new Map<string, ComponentType<{ onClose: () => void }>>();

const getModalComponent = (
  id: ModalId
): ComponentType<{ onClose: () => void }> | null => {
  const existing = cache.get(id);
  if (existing) return existing;

  const factory = loaders[id];
  if (!factory) return null;

  const Lazy = lazy(factory);
  cache.set(id, Lazy);
  return Lazy;
};

interface AppsViewProps {
  appId: ModalId;
  onBack: () => void;
}

export const AppsView: FC<AppsViewProps> = ({ appId, onBack }) => {
  const AppComponent = useMemo(() => getModalComponent(appId), [appId]);

  if (!AppComponent) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-base-content/40 text-sm">App not found: {appId}</p>
        <button onClick={onBack} className="btn btn-ghost btn-sm">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-md" />
        </div>
      }>
      <AppComponent onClose={onBack} />
    </Suspense>
  );
};

AppsView.displayName = 'AppsView';
