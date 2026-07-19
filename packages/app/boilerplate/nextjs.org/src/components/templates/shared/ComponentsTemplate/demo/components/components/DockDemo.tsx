import { FC } from 'react';

export const DockDemo: FC = () => (
  <div className="dock dock-sm bg-base-300 relative px-2">
    <button>
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
      </svg>
    </button>
    <button className="dock-active">
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
      </svg>
    </button>
    <button>
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.14 12.94a7 7 0 00.26-1.94 7 7 0 00-.26-1.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96a7.04 7.04 0 00-3.34-1.92l-.36-2.54a.48.48 0 00-.48-.41h-3.84a.48.48 0 00-.48.41l-.36 2.54a7.04 7.04 0 00-3.34 1.92l-2.39-.96a.49.49 0 00-.59.22L2.67 8.48a.48.48 0 00.12.61l2.03 1.58a7 7 0 00-.26 1.94 7 7 0 00.26 1.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96a7.04 7.04 0 003.34 1.92l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54a7.04 7.04 0 003.34-1.92l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 00-.12-.61l-2.03-1.58z" />
      </svg>
    </button>
  </div>
);

DockDemo.displayName = 'DockDemo';
