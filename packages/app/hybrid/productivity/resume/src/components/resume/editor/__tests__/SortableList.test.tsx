import { fireEvent, render, screen } from '@testing-library/react';
import { SortableList } from '../SortableList';

interface Item {
  id: string;
  label: string;
}

const items: Item[] = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
];

const renderList = (onReorder = jest.fn()) =>
  render(
    <SortableList
      items={items}
      getKey={(item) => item.id}
      onReorder={onReorder}
      renderItem={(item) => <div>{item.label}</div>}
    />
  );

const createDataTransfer = () => {
  const store = new Map<string, string>();
  return {
    effectAllowed: '',
    dropEffect: '',
    setData: (type: string, value: string) => {
      store.set(type, value);
    },
    getData: (type: string) => store.get(type) ?? '',
  };
};

const dragItem = (fromIndex: number, toIndex: number) => {
  const dataTransfer = createDataTransfer();
  const handles = screen.getAllByRole('button', { name: 'Drag to reorder' });
  const rows = screen.getAllByText(/Alpha|Beta|Gamma/);
  fireEvent.dragStart(handles[fromIndex], { dataTransfer });
  fireEvent.dragOver(rows[toIndex], { dataTransfer });
  fireEvent.drop(rows[toIndex], { dataTransfer });
  return dataTransfer;
};

describe('SortableList', () => {
  it('renders every item with a drag handle', () => {
    renderList();
    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
    expect(
      screen.getAllByRole('button', { name: 'Drag to reorder' })
    ).toHaveLength(items.length);
  });

  it('reorders by dragging the first item onto the third', () => {
    const onReorder = jest.fn();
    renderList(onReorder);
    dragItem(0, 2);
    expect(onReorder).toHaveBeenCalledWith([items[1], items[2], items[0]]);
  });

  it('reorders by dragging the last item onto the first', () => {
    const onReorder = jest.fn();
    renderList(onReorder);
    dragItem(2, 0);
    expect(onReorder).toHaveBeenCalledWith([items[2], items[0], items[1]]);
  });

  it('does not reorder when dropped on the source row', () => {
    const onReorder = jest.fn();
    renderList(onReorder);
    dragItem(0, 0);
    expect(onReorder).not.toHaveBeenCalled();
  });

  it('sets move semantics on the data transfer', () => {
    renderList();
    const dataTransfer = createDataTransfer();
    const handles = screen.getAllByRole('button', { name: 'Drag to reorder' });
    fireEvent.dragStart(handles[0], { dataTransfer });
    expect(dataTransfer.effectAllowed).toBe('move');
    expect(dataTransfer.getData('text/plain')).toBe('a');
  });

  it('clears drag state after a drop', () => {
    const onReorder = jest.fn();
    renderList(onReorder);
    dragItem(0, 1);
    expect(onReorder).toHaveBeenCalled();
    const handles = screen.getAllByRole('button', { name: 'Drag to reorder' });
    expect(handles[0]).toHaveAttribute('aria-grabbed', 'false');
  });
});
