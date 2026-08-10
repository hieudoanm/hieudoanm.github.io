'use client';

import { FC } from 'react';

interface CellProps {
  value: string;
  isSelected: boolean;
  isFocus: boolean;
  isEditing: boolean;
  hasComment: boolean;
  commentText: string;
  width: number;
  height: number;
  extraClassName?: string;
  extraStyle?: React.CSSProperties;
  cellRow: number;
  cellCol: number;
  onSelect: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  onStartEdit: () => void;
  onChange: (value: string) => void;
  onCommit: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onPointerDown: (event: React.PointerEvent<HTMLTableCellElement>) => void;
}

const Cell: FC<CellProps> = ({
  value,
  isSelected,
  isFocus,
  isEditing,
  hasComment,
  commentText,
  width,
  height,
  extraClassName = '',
  extraStyle,
  cellRow,
  cellCol,
  onSelect,
  onStartEdit,
  onChange,
  onCommit,
  onKeyDown,
  onPointerDown,
}) => {
  const cellStyle = { width, height, ...extraStyle };

  if (isEditing) {
    return (
      <td
        className="border-base-300 border bg-base-100 p-0"
        style={cellStyle}
        role="gridcell">
        <input
          aria-label="Cell value"
          autoFocus
          className="bg-primary/10 h-full w-full px-1.5 font-mono text-xs outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onCommit}
          onKeyDown={onKeyDown}
          onDoubleClick={(event) => event.stopPropagation()}
        />
      </td>
    );
  }

  const tone = isFocus
    ? 'bg-primary/20'
    : isSelected
      ? 'bg-primary/10'
      : 'bg-base-200';

  return (
    <td
      aria-selected={isSelected || isFocus}
      className={`group border-base-300 relative border p-0 ${tone} ${
        isFocus ? 'z-10 shadow-[inset_0_0_0_1px_theme(colors.primary)]' : ''
      } ${extraClassName}`}
      style={cellStyle}
      onClick={onSelect}
      onDoubleClick={onStartEdit}
      onPointerDown={onPointerDown}
      role="gridcell"
      data-cell=""
      data-row={cellRow}
      data-col={cellCol}
      tabIndex={-1}>
      <span className="block h-full w-full cursor-default truncate px-1.5 py-1 font-mono text-xs">
        {value}
      </span>
      {hasComment && (
        <>
          <span className="bg-accent absolute right-0 bottom-0 h-1.5 w-1.5 rounded-full" />
          <span className="bg-base-100 border-base-300 pointer-events-none absolute bottom-full left-0 z-50 hidden max-w-60 rounded-md border px-2 py-1 text-xs whitespace-normal shadow-lg group-hover:block">
            {commentText}
          </span>
        </>
      )}
    </td>
  );
};

export default Cell;
