import type { DragEvent, MouseEvent } from 'react';

import type { DbPageState } from '@/hooks/useDbPageState';

interface LayoutProps {
  state: Pick<
    DbPageState,
    | 'sidebarWidth'
    | 'setSidebarWidth'
    | 'expandedTables'
    | 'setExpandedTables'
    | 'isDragging'
    | 'setIsDragging'
  >;
  onFile: (file: File) => void;
}

export interface DbPageLayout {
  expandedTables: Record<string, boolean>;
  sidebarWidth: number;
  isDragging: boolean;
  toggleTable: (name: string) => void;
  startResize: (e: MouseEvent) => void;
  handleDragOver: (e: DragEvent) => void;
  handleDragLeave: () => void;
  handleDrop: (e: DragEvent) => void;
}
export const useDbPageLayout = ({
  state,
  onFile,
}: LayoutProps): DbPageLayout => {
  const toggleTable = (name: string) =>
    state.setExpandedTables((p) => ({ ...p, [name]: !p[name] }));

  const startResize = (e: MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = state.sidebarWidth;
    const onMove = (ev: globalThis.MouseEvent) => {
      const w = Math.min(480, Math.max(160, startW + (ev.clientX - startX)));
      state.setSidebarWidth(w);
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    state.setIsDragging(true);
  };
  const handleDragLeave = () => state.setIsDragging(false);
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    state.setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  return {
    expandedTables: state.expandedTables,
    sidebarWidth: state.sidebarWidth,
    isDragging: state.isDragging,
    toggleTable,
    startResize,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
