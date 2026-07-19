import { FC } from 'react';

export const GearIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-3 w-3">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);
GearIcon.displayName = 'GearIcon';
export const PlayIcon: FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M8 5v14l11-7z" />
  </svg>
);
PlayIcon.displayName = 'PlayIcon';
export const PauseIcon: FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
  </svg>
);
PauseIcon.displayName = 'PauseIcon';
export const RotateIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4">
    <path d="M1 4v6h6M23 20v-6h-6" />
    <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
  </svg>
);
RotateIcon.displayName = 'RotateIcon';
export const UndoIcon: FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4">
    <path d="M3 10h13a4 4 0 010 8H7" />
    <path d="M7 6l-4 4 4 4" />
  </svg>
);
UndoIcon.displayName = 'UndoIcon';
