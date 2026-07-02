import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import { LuX, LuPlus } from 'react-icons/lu';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

const IS_TAURI =
  typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

interface TerminalPanelProps {
  onClose?: () => void;
  cwd?: string;
}

interface TerminalInstanceProps {
  id: number;
  active: boolean;
  cwd?: string;
  onContextMenu: (e: React.MouseEvent, id: number) => void;
}

const TerminalInstance: FC<TerminalInstanceProps> = ({
  id,
  active,
  cwd,
  onContextMenu,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<{ term: Terminal; fitAddon: FitAddon } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const bg = getComputedStyle(el).backgroundColor || '#1d232a';
    const fg = getComputedStyle(el).color || '#a6adbb';

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 13,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: bg,
        foreground: fg,
        cursor: fg,
        selectionBackground: fg + '33',
        black: '#252526',
        red: '#f44747',
        green: '#6a9955',
        yellow: '#d7ba7d',
        blue: '#569cd6',
        magenta: '#c586c0',
        cyan: '#4ec9b0',
        white: fg,
        brightBlack: '#7a7a7a',
        brightRed: '#f44747',
        brightGreen: '#6a9955',
        brightYellow: '#d7ba7d',
        brightBlue: '#569cd6',
        brightMagenta: '#c586c0',
        brightCyan: '#4ec9b0',
        brightWhite: fg,
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(el);
    termRef.current = { term, fitAddon };

    const resizeObserver = new ResizeObserver(() => {
      try {
        fitAddon.fit();
      } catch {
        /* ignore */
      }
    });
    resizeObserver.observe(el);

    let child: { write: (data: string) => Promise<void> } | null = null;

    if (IS_TAURI) {
      import('@tauri-apps/plugin-shell').then(({ Command }) => {
        const cmd = Command.create('terminal-shell', [], {
          cwd: cwd ?? undefined,
        });
        cmd.stdout.on('data', (data: string) => term.write(data));
        cmd.stderr.on('data', (data: string) => term.write(data));
        cmd.spawn().then((c) => {
          child = c;
        });
        cmd.on('close', () => {
          term.write('\r\n\x1b[31m[Process exited]\x1b[0m');
        });
      });
    } else {
      if (id === 0) {
        term.writeln('Terminal available in Tauri desktop app');
        term.writeln('Type "help" for available commands\r\n');
      }
    }

    term.onData((data) => {
      if (child) {
        child.write(data).catch(() => {
          term.write(data);
        });
      } else {
        if (data === '\r') {
          term.write('\r\n');
        } else if (data === '\x7f') {
          term.write('\b \b');
        } else {
          term.write(data);
        }
      }
    });

    return () => {
      resizeObserver.disconnect();
      term.dispose();
      termRef.current = null;
    };
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        termRef.current?.fitAddon.fit();
      } catch {
        /* ignore */
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div
      className={active ? 'flex flex-1 flex-col' : 'hidden'}
      onContextMenu={(e) => onContextMenu(e, id)}>
      <div
        ref={containerRef}
        className="bg-base-300 text-base-content flex-1 p-1.5"
      />
    </div>
  );
};

export const TerminalPanel: FC<TerminalPanelProps> = ({ onClose, cwd }) => {
  const [terminals, setTerminals] = useState<
    { id: number; cwd: string | undefined }[]
  >([{ id: 0, cwd }]);
  const [activeTerminalId, setActiveTerminalId] = useState(0);
  const nextId = useRef(1);
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    terminalId: number;
  } | null>(null);

  const splitTerminal = useCallback(() => {
    const id = nextId.current++;
    setTerminals((prev) => [...prev, { id, cwd }]);
    setActiveTerminalId(id);
    setMenu(null);
  }, []);

  const closeTerminal = useCallback((id: number) => {
    setTerminals((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (next.length === 0) {
        const freshId = nextId.current++;
        return [{ id: freshId, cwd }];
      }
      return next;
    });
    setMenu(null);
  }, []);

  useEffect(() => {
    if (!terminals.find((t) => t.id === activeTerminalId)) {
      setActiveTerminalId(terminals[terminals.length - 1]?.id ?? 0);
    }
  }, [terminals, activeTerminalId]);

  const openContextMenu = useCallback(
    (e: React.MouseEvent, terminalId: number) => {
      e.preventDefault();
      setMenu({ x: e.clientX, y: e.clientY, terminalId });
    },
    []
  );

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(e.target as Node)) return;
      setMenu(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menu]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-base-200 bg-base-200 flex w-full items-center justify-between border-b px-1.5 py-0.5">
        <div className="flex items-center gap-0.5 overflow-x-auto">
          {terminals.map((t) => (
            <button
              key={t.id}
              onContextMenu={(e) => openContextMenu(e, t.id)}
              onClick={() => setActiveTerminalId(t.id)}
              className={`btn btn-ghost btn-xs rounded-none px-2 ${
                t.id === activeTerminalId
                  ? 'text-base-content bg-base-300'
                  : 'text-base-content/60'
              }`}>
              {(() => {
                const name = t.cwd
                  ? t.cwd.split('/').filter(Boolean).pop()
                  : null;
                return (
                  name ||
                  `TERMINAL${terminals.length > 1 ? ` ${t.id + 1}` : ''}`
                );
              })()}
            </button>
          ))}
          <button
            onClick={splitTerminal}
            className="btn btn-ghost btn-square btn-xs text-base-content/60 hover:text-base-content">
            <LuPlus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-0.5">
          {onClose && (
            <button
              onClick={onClose}
              className="btn btn-ghost btn-square btn-xs text-base-content/60 hover:text-base-content">
              <LuX className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
      <div className="relative flex flex-1 flex-col">
        {terminals.map((t) => (
          <TerminalInstance
            key={t.id}
            id={t.id}
            active={t.id === activeTerminalId}
            cwd={t.cwd}
            onContextMenu={openContextMenu}
          />
        ))}
        {menu && (
          <div
            ref={menuRef}
            className="bg-base-100 border-base-300 fixed z-50 min-w-36 rounded-md border py-1 shadow-xl"
            style={{ left: menu.x, top: menu.y }}>
            <button
              onClick={splitTerminal}
              className="hover:bg-base-300 flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm">
              <LuPlus className="h-3.5 w-3.5" />
              Split Terminal
            </button>
            {terminals.length > 1 && (
              <button
                onClick={() => closeTerminal(menu.terminalId)}
                className="hover:bg-base-300 flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm">
                <LuX className="h-3.5 w-3.5" />
                Close
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
