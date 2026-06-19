import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

import { useClipboard } from './useClipboard';

export const ClipboardModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    clips,
    loading,
    tab,
    setTab,
    selected,
    setSelected,
    error,
    capture,
    copy,
    remove,
    clearAll,
  } = useClipboard();

  return (
    <ModalWrapper
      onClose={onClose}
      title="Clipboard Manager"
      subtitle="Local history · Sync storage · navigator.clipboard"
      size="max-w-2xl">
      <div className="flex items-center gap-2">
        <button
          className="btn btn-xs btn-primary"
          onClick={capture}
          disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            'Capture'
          )}
        </button>

        <button
          className="btn btn-xs btn-ghost"
          onClick={clearAll}
          disabled={!clips.length}>
          Clear
        </button>

        <span className="ml-auto text-xs opacity-50">{clips.length} items</span>
      </div>

      {error && <div className="alert alert-error py-2 text-sm">{error}</div>}

      <div className="tabs tabs-bordered">
        {(['history', 'preview'] as const).map((t) => (
          <button
            key={t}
            className={`tab tab-bordered capitalize ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'history' && (
        <div className="flex max-h-80 flex-col gap-2 overflow-auto">
          {clips.map((c) => (
            <div
              key={c.id}
              className="bg-base-200 flex items-center gap-2 rounded-lg p-2">
              <button
                className="flex-1 truncate text-left text-sm"
                onClick={() => {
                  setSelected(c);
                  setTab('preview');
                }}>
                {c.content}
              </button>
              <button className="btn btn-xs" onClick={() => copy(c.content)}>
                Copy
              </button>
              <button
                className="btn btn-xs btn-ghost"
                onClick={() => remove(c.id)}>
                ✕
              </button>
            </div>
          ))}
          {!clips.length && (
            <p className="text-base-content/30 py-8 text-center text-sm">
              Clipboard is empty
            </p>
          )}
        </div>
      )}

      {tab === 'preview' && (
        <div className="flex flex-col gap-3">
          {selected ? (
            <>
              <pre className="bg-base-200 max-h-64 overflow-auto rounded-lg p-3 text-xs">
                {selected.content}
              </pre>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => copy(selected.content)}>
                  Copy
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => setTab('history')}>
                  Back
                </button>
              </div>
            </>
          ) : (
            <p className="text-base-content/30 py-8 text-center text-sm">
              Select an item to preview
            </p>
          )}
        </div>
      )}
    </ModalWrapper>
  );
};
