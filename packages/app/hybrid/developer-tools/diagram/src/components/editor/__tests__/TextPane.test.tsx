import { fireEvent, render, screen } from '@testing-library/react';
import TextPane from '@/components/editor/TextPane';

describe('TextPane', () => {
  const base = {
    onChange: jest.fn(),
    onUndo: jest.fn(),
    onRedo: jest.fn(),
  };

  beforeEach(() => {
    base.onChange.mockClear();
    base.onUndo.mockClear();
    base.onRedo.mockClear();
  });

  it('renders the source text and line numbers', () => {
    render(<TextPane errors={[]} {...base} text={'node a: A\nnode b: B'} />);
    const editor = screen.getByLabelText(
      'Diagram source'
    ) as HTMLTextAreaElement;
    expect(editor.value).toBe('node a: A\nnode b: B');
    expect(screen.getByText('2 lines')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('reports edits through onChange', () => {
    render(<TextPane errors={[]} {...base} text="node a: A" />);
    fireEvent.change(screen.getByLabelText('Diagram source'), {
      target: { value: 'node a: B' },
    });
    expect(base.onChange).toHaveBeenCalledWith('node a: B');
  });

  it('highlights lines with parse errors', () => {
    render(
      <TextPane
        errors={[{ line: 2, message: 'bad' }]}
        {...base}
        text={'node a: A\nbroken'}
      />
    );
    const errorLine = screen.getByText('2');
    expect(errorLine.className).toContain('text-error');
  });

  it('syncs the gutter scroll with the textarea', () => {
    render(<TextPane errors={[]} {...base} text={'node a: A\nnode b: B'} />);
    const editor = screen.getByLabelText('Diagram source');
    fireEvent.scroll(editor, { target: { scrollTop: 42 } });
    const gutter = document.querySelector(
      '[aria-hidden="true"]'
    ) as HTMLDivElement;
    expect(gutter.scrollTop).toBe(42);
  });

  it('undoes with Ctrl+Z and redoes with Ctrl+Y', () => {
    render(<TextPane errors={[]} {...base} text="node a: A" />);
    const editor = screen.getByLabelText('Diagram source');
    fireEvent.keyDown(editor, { key: 'z', ctrlKey: true });
    expect(base.onUndo).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(editor, { key: 'y', ctrlKey: true });
    expect(base.onRedo).toHaveBeenCalledTimes(1);
  });

  it('undoes with Cmd+Z and redoes with Cmd+Shift+Z', () => {
    render(<TextPane errors={[]} {...base} text="node a: A" />);
    const editor = screen.getByLabelText('Diagram source');
    fireEvent.keyDown(editor, { key: 'Z', metaKey: true });
    expect(base.onUndo).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(editor, { key: 'Z', metaKey: true, shiftKey: true });
    expect(base.onRedo).toHaveBeenCalledTimes(1);
  });

  it('does not treat bare keys as shortcuts', () => {
    render(<TextPane errors={[]} {...base} text="node a: A" />);
    const editor = screen.getByLabelText('Diagram source');
    fireEvent.keyDown(editor, { key: 'z' });
    fireEvent.keyDown(editor, { key: 'y', ctrlKey: false });
    expect(base.onUndo).not.toHaveBeenCalled();
    expect(base.onRedo).not.toHaveBeenCalled();
  });
});
