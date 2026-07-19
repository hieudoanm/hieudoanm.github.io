import { act, fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { EditorView } from '@codemirror/view';
import { CodeEditor, type CodeEditorHandle } from '../CodeEditor';

jest.mock('../../utils/editor-languages', () => ({
  getLanguageExtension: jest.fn(() => null),
}));

describe('CodeEditor', () => {
  const defaultProps = {
    filename: 'test.ts',
    content: '',
    wordWrap: false,
    fontSize: 13,
    onChange: () => {},
    onSave: () => {},
    onCursorChange: () => {},
    onSelectionChange: () => {},
  };

  const getView = (container: HTMLElement): EditorView | null => {
    const cm = container.querySelector('.cm-editor') as HTMLElement;
    return EditorView.findFromDOM(cm);
  };

  const getContent = (container: HTMLElement): HTMLElement =>
    container.querySelector('.cm-content') as HTMLElement;

  it('renders a container div', () => {
    const { container } = render(<CodeEditor {...defaultProps} />);
    const div = container.firstChild as HTMLElement;
    expect(div.tagName).toBe('DIV');
  });

  it('renders with content', () => {
    const { container } = render(
      <CodeEditor {...defaultProps} content="const x = 1;" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applies the configured font size to the editor container', () => {
    const { container } = render(
      <CodeEditor {...defaultProps} fontSize={16} />
    );
    const div = container.firstChild as HTMLElement;
    expect(div.style.getPropertyValue('--editor-font-size')).toBe('16px');
  });

  it('enables line wrapping when wordWrap is true', () => {
    const { container } = render(
      <CodeEditor {...defaultProps} wordWrap content="hello" />
    );
    expect(getContent(container).classList).toContain('cm-lineWrapping');
  });

  it('reports cursor position (1,1) on mount', () => {
    const onCursorChange = jest.fn();
    render(<CodeEditor {...defaultProps} onCursorChange={onCursorChange} />);
    expect(onCursorChange).toHaveBeenCalledWith(1, 1);
  });

  it('calls onChange when the document changes', () => {
    const onChange = jest.fn();
    const { container } = render(
      <CodeEditor {...defaultProps} content="hello" onChange={onChange} />
    );
    const view = getView(container);
    act(() => {
      view?.dispatch({ changes: { from: 5, insert: ' world' } });
    });
    expect(onChange).toHaveBeenCalledWith('hello world');
  });

  it('replaces the document and calls onChange when the content prop changes', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <CodeEditor {...defaultProps} content="initial" onChange={onChange} />
    );
    rerender(
      <CodeEditor {...defaultProps} content="updated" onChange={onChange} />
    );
    expect(onChange).toHaveBeenCalledWith('updated');
  });

  it('reports selection count and cursor when text is selected', () => {
    const onSelectionChange = jest.fn();
    const onCursorChange = jest.fn();
    const { container } = render(
      <CodeEditor
        {...defaultProps}
        content={'line one\nline two'}
        onSelectionChange={onSelectionChange}
        onCursorChange={onCursorChange}
      />
    );
    const view = getView(container);
    act(() => {
      view?.dispatch({ selection: { anchor: 0, head: 4 } });
    });
    expect(onSelectionChange).toHaveBeenLastCalledWith(4);
    expect(onCursorChange).toHaveBeenLastCalledWith(1, 5);

    act(() => {
      view?.dispatch({ selection: { anchor: 5 } });
    });
    expect(onSelectionChange).toHaveBeenLastCalledWith(0);
  });

  it('calls onSave when Mod-s is pressed', () => {
    const onSave = jest.fn();
    const { container } = render(
      <CodeEditor {...defaultProps} onSave={onSave} />
    );
    fireEvent.keyDown(getContent(container), { key: 's', ctrlKey: true });
    expect(onSave).toHaveBeenCalled();
  });

  it('calls onSaveAs when Mod-Shift-s is pressed', () => {
    const onSaveAs = jest.fn();
    const { container } = render(
      <CodeEditor {...defaultProps} onSaveAs={onSaveAs} />
    );
    fireEvent.keyDown(getContent(container), {
      key: 'S',
      keyCode: 83,
      ctrlKey: true,
      shiftKey: true,
    });
    expect(onSaveAs).toHaveBeenCalled();
  });

  it('opens the search panel when Mod-g is pressed', () => {
    const { container } = render(<CodeEditor {...defaultProps} />);
    fireEvent.keyDown(getContent(container), { key: 'g', ctrlKey: true });
    expect(container.querySelector('.cm-search')).not.toBeNull();
  });

  it('goToLine moves the cursor to the requested line', () => {
    const ref = createRef<CodeEditorHandle>();
    const onCursorChange = jest.fn();
    render(
      <CodeEditor
        {...defaultProps}
        content={'a\nb\nc'}
        ref={ref}
        onCursorChange={onCursorChange}
      />
    );
    act(() => {
      ref.current?.goToLine(3);
    });
    expect(onCursorChange).toHaveBeenLastCalledWith(3, 1);
  });

  it('goToLine clamps out-of-range line numbers', () => {
    const ref = createRef<CodeEditorHandle>();
    const onCursorChange = jest.fn();
    render(
      <CodeEditor
        {...defaultProps}
        content={'a\nb\nc'}
        ref={ref}
        onCursorChange={onCursorChange}
      />
    );
    act(() => {
      ref.current?.goToLine(99);
    });
    expect(onCursorChange).toHaveBeenLastCalledWith(3, 1);

    act(() => {
      ref.current?.goToLine(0);
    });
    expect(onCursorChange).toHaveBeenLastCalledWith(1, 1);
  });
});
