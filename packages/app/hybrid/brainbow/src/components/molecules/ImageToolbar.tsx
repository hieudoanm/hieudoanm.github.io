import type { FC } from 'react';
import { Toolbar } from '@/components/atoms/Toolbar';
import { Button } from '@/components/atoms/Button';

export interface ImageToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
}

export const ImageToolbar: FC<ImageToolbarProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onFit,
}) => (
  <div className="flex items-center gap-2">
    <Toolbar>
      <Button
        variant="outline"
        size="sm"
        aria-label="Zoom out"
        onClick={onZoomOut}>
        -
      </Button>
      <span className="w-16 text-center font-mono text-sm">
        {Math.round(zoom * 100)}%
      </span>
      <Button
        variant="outline"
        size="sm"
        aria-label="Zoom in"
        onClick={onZoomIn}>
        +
      </Button>
      <Button variant="ghost" size="sm" onClick={onFit}>
        Fit
      </Button>
    </Toolbar>
  </div>
);
