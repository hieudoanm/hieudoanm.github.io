import { type FC, useEffect, useRef } from 'react';

interface ShortcutGroup {
  label: string;
  bindings: { keys: string; desc: string }[];
}

const GROUPS: ShortcutGroup[] = [
  {
    label: 'General',
    bindings: [
      { keys: 'Cmd+B', desc: 'Toggle sidebar' },
      { keys: 'Cmd+P', desc: 'Quick open file' },
      { keys: 'Cmd+Shift+F', desc: 'Search in files' },
      { keys: 'Cmd+/', desc: 'Show keyboard shortcuts' },
    ],
  },
  {
    label: 'Editor',
    bindings: [
      { keys: 'Cmd+S', desc: 'Save file' },
      { keys: 'Cmd+Shift+S', desc: 'Save as' },
      { keys: 'Cmd+Z', desc: 'Undo' },
      { keys: 'Cmd+Shift+Z', desc: 'Redo' },
      { keys: 'Cmd+G', desc: 'Go to line' },
      { keys: 'Cmd+=', desc: 'Zoom in' },
      { keys: 'Cmd+-', desc: 'Zoom out' },
      { keys: 'Cmd+0', desc: 'Reset zoom' },
    ],
  },
  {
    label: 'Tabs',
    bindings: [
      { keys: 'Ctrl+Tab', desc: 'Switch to recent tab' },
      { keys: 'Cmd+W', desc: 'Close tab' },
    ],
  },
];

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

export const ShortcutsModal: FC<ShortcutsModalProps> = ({ open, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}>
      <div className="bg-base-100 mx-4 max-h-[80vh] w-full max-w-md overflow-auto rounded-lg p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Keyboard Shortcuts</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-square">
            <span className="text-lg leading-none">&times;</span>
          </button>
        </div>
        {GROUPS.map((group) => (
          <div key={group.label} className="mb-4 last:mb-0">
            <h4 className="text-base-content/60 mb-2 text-xs font-semibold tracking-wider uppercase">
              {group.label}
            </h4>
            {group.bindings.map((b) => (
              <div
                key={b.keys}
                className="flex items-center justify-between py-1.5">
                <span className="text-sm">{b.desc}</span>
                <kbd className="bg-base-300 text-base-content/80 rounded px-2 py-0.5 font-mono text-xs">
                  {b.keys}
                </kbd>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
