import { FC } from 'react';
import { useDoi } from '@/providers/DoiProvider';

const ErrorState: FC = () => {
  const { error, retry } = useDoi();
  return (
    <div className="border-error/30 bg-error/5 rounded-xl border p-6 text-center">
      <h2 className="text-error mb-2 font-semibold">Failed to load database</h2>
      <p className="text-base-content/60 mb-4 text-sm">{error}</p>
      <button type="button" onClick={retry} className="btn btn-primary btn-sm">
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
