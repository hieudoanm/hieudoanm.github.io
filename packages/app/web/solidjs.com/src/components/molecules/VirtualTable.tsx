import { JSX, createSignal, onCleanup, onMount } from 'solid-js';

export interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
}

interface VirtualTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowHeight: number;
  height: number;
  renderCell?: (
    item: T,
    column: Column<T>,
    rowIndex: number,
    isSelected: boolean
  ) => JSX.Element;
}

export const VirtualTable = <T,>(props: VirtualTableProps<T>) => {
  let containerRef: HTMLDivElement | undefined;
  const [scrollTop, setScrollTop] = createSignal<number>(0);
  const [selectedIndexes, setSelectedIndexes] = createSignal<Set<number>>(
    new Set()
  );
  const [anchorIndex, setAnchorIndex] = createSignal<number | null>(null);

  const totalHeight = () => props.data.length * props.rowHeight;
  const visibleCount = () => Math.ceil(props.height / props.rowHeight);
  const startIndex = () => Math.floor(scrollTop() / props.rowHeight);
  const endIndex = () =>
    Math.min(startIndex() + visibleCount() + 1, props.data.length);
  const visibleRows = () => props.data.slice(startIndex(), endIndex());

  const handleScroll = () => {
    if (containerRef) {
      setScrollTop(containerRef.scrollTop);
    }
  };

  const scrollToRow = (index: number) => {
    if (!containerRef) return;
    const container = containerRef;
    const currentScrollTop = container.scrollTop;
    const rowTop = index * props.rowHeight;
    const rowBottom = rowTop + props.rowHeight;

    if (rowTop < currentScrollTop) {
      container.scrollTop = rowTop;
    } else if (rowBottom > currentScrollTop + props.height) {
      container.scrollTop = rowBottom - props.height;
    }
  };

  const selectRange = (start: number, end: number) => {
    const rangeStart = Math.min(start, end);
    const rangeEnd = Math.max(start, end);
    const newSelection = new Set(selectedIndexes());
    for (let i = rangeStart; i <= rangeEnd; i++) {
      newSelection.add(i);
    }
    return newSelection;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (props.data.length === 0) return;

    const focusedIndex =
      anchorIndex() !== null
        ? anchorIndex()!
        : selectedIndexes().size > 0
          ? Math.min(...selectedIndexes())
          : 0;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(focusedIndex + 1, props.data.length - 1);
      if (e.shiftKey) {
        setSelectedIndexes(selectRange(anchorIndex() ?? next, next));
      } else {
        setSelectedIndexes(new Set([next]));
        setAnchorIndex(next);
      }
      scrollToRow(next);
      setAnchorIndex(next);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(focusedIndex - 1, 0);
      if (e.shiftKey) {
        setSelectedIndexes(selectRange(anchorIndex() ?? prev, prev));
      } else {
        setSelectedIndexes(new Set([prev]));
        setAnchorIndex(prev);
      }
      scrollToRow(prev);
      setAnchorIndex(prev);
    }
  };

  const handleRowClick = (rowIndex: number, e: MouseEvent) => {
    const isCtrlPressed = e.ctrlKey || e.metaKey;
    const isShiftPressed = e.shiftKey;

    if (isShiftPressed && anchorIndex() !== null) {
      setSelectedIndexes(selectRange(anchorIndex()!, rowIndex));
    } else if (isCtrlPressed) {
      setSelectedIndexes((prev) => {
        const newSelection = new Set(prev);
        if (newSelection.has(rowIndex)) {
          newSelection.delete(rowIndex);
        } else {
          newSelection.add(rowIndex);
        }
        return newSelection;
      });
      setAnchorIndex(rowIndex);
    } else {
      setSelectedIndexes(new Set([rowIndex]));
      setAnchorIndex(rowIndex);
    }
    scrollToRow(rowIndex);
  };

  onMount(() => {
    if (containerRef) {
      containerRef.addEventListener('scroll', handleScroll);
    }
  });

  onCleanup(() => {
    if (containerRef) {
      containerRef.removeEventListener('scroll', handleScroll);
    }
  });

  return (
    <div
      class="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="grid"
      aria-rowcount={props.data.length}
      aria-colcount={props.columns.length}>
      <table class="w-full border-collapse" role="rowgroup">
        <thead>
          <tr>
            {props.columns.map((col) => (
              <th
                key={String(col.key)}
                class="border-b border-neutral-200 bg-neutral-100 p-2 text-left dark:border-neutral-800 dark:bg-neutral-900"
                style={{ width: col.width ?? 'auto' }}
                role="columnheader">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <div
        ref={(el) => {
          containerRef = el;
        }}
        class="relative overflow-y-auto focus:outline-none"
        style={{ height: `${props.height}px` }}
        role="rowgroup">
        <div class="relative" style={{ height: `${totalHeight()}px` }}>
          {visibleRows().map((row, i) => {
            const rowIndex = startIndex() + i;
            const isSelected = selectedIndexes().has(rowIndex);

            const style = {
              position: 'absolute',
              top: `${rowIndex * props.rowHeight}px`,
              height: `${props.rowHeight}px`,
              left: 0,
              right: 0,
              display: 'table',
              width: '100%',
              background: isSelected ? '#e2e8f0' : undefined,
              cursor: 'pointer',
            } as JSX.CSSProperties;

            return (
              <div
                key={rowIndex}
                style={style}
                onClick={(e) => handleRowClick(rowIndex, e)}
                role="row"
                aria-selected={isSelected}
                tabIndex={-1}>
                <table class="w-full border-collapse" role="presentation">
                  <tbody>
                    <tr>
                      {props.columns.map((col) => (
                        <td
                          key={String(col.key)}
                          class="border-b border-neutral-200 p-2 text-left dark:border-neutral-800"
                          style={{ width: col.width ?? 'auto' }}
                          role="gridcell">
                          {props.renderCell
                            ? props.renderCell(row, col, rowIndex, isSelected)
                            : String(row[col.key])}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
