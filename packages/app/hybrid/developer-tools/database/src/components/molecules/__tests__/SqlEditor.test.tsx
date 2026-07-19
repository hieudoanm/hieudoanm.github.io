import { render, screen, fireEvent } from '@testing-library/react';
import { SqlEditor } from '@/components/molecules/SqlEditor';

describe('SqlEditor', () => {
  const onChange = jest.fn();
  const onRun = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a textarea with the given value and placeholder', () => {
    render(
      <SqlEditor
        value="SELECT 1"
        onChange={onChange}
        onRun={onRun}
        placeholder="Enter SQL query..."
      />
    );
    const textarea = screen.getByPlaceholderText('Enter SQL query...');
    expect(textarea).toHaveValue('SELECT 1');
  });

  it('propagates changes to onChange', () => {
    render(<SqlEditor value="" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'SELECT 1' } });
    expect(onChange).toHaveBeenCalledWith('SELECT 1');
  });

  it('runs the query on Ctrl+Enter', () => {
    render(<SqlEditor value="SELECT 1" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onRun).toHaveBeenCalledTimes(1);
  });

  it('runs the query on Cmd+Enter', () => {
    render(<SqlEditor value="SELECT 1" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', metaKey: true });
    expect(onRun).toHaveBeenCalledTimes(1);
  });

  it('does not run on a plain Enter', () => {
    render(<SqlEditor value="SELECT 1" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onRun).not.toHaveBeenCalled();
  });

  it('renders the highlighted overlay', () => {
    render(<SqlEditor value="SELECT 1" onChange={onChange} onRun={onRun} />);
    const pre = document.querySelector('pre[aria-hidden="true"]');
    expect(pre).not.toBeNull();
    expect(pre!.innerHTML).toContain('text-info');
  });

  it('runs only the selected text on Ctrl+Enter', () => {
    render(
      <SqlEditor
        value={'SELECT 1;\nSELECT 2'}
        onChange={onChange}
        onRun={onRun}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(10, 18);
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onRun).toHaveBeenCalledWith('SELECT 2');
  });

  it('does not run when the value is only whitespace', () => {
    render(<SqlEditor value="   " onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onRun).not.toHaveBeenCalled();
  });

  it('comments the current line with Ctrl+/', () => {
    render(<SqlEditor value="SELECT 1" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: '/', ctrlKey: true });
    expect(onChange).toHaveBeenCalledWith('-- SELECT 1');
  });

  it('comments multiple selected lines with Ctrl+/', () => {
    render(
      <SqlEditor
        value={'SELECT 1\nSELECT 2'}
        onChange={onChange}
        onRun={onRun}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(0, 17);
    fireEvent.keyDown(textarea, { key: '/', ctrlKey: true });
    expect(onChange).toHaveBeenCalledWith('-- SELECT 1\n-- SELECT 2');
  });

  it('uncomments a commented line with Ctrl+/', () => {
    render(<SqlEditor value="-- SELECT 1" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: '/', ctrlKey: true });
    expect(onChange).toHaveBeenCalledWith('SELECT 1');
  });

  it('syncs gutter and overlay scroll with the textarea', () => {
    render(<SqlEditor value="SELECT 1" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    const pre = document.querySelector(
      'pre[aria-hidden="true"]'
    ) as HTMLPreElement;
    const gutter = document.querySelectorAll('pre')[1] as HTMLPreElement;
    textarea.scrollTop = 24;
    textarea.scrollLeft = 8;
    fireEvent.scroll(textarea);
    expect(pre.scrollTop).toBe(24);
    expect(pre.scrollLeft).toBe(8);
    expect(gutter.scrollTop).toBe(24);
  });

  it('opens suggestions on Ctrl+Space when onSuggest returns items', () => {
    const onSuggest = jest.fn().mockReturnValue([
      { label: 'users', type: 'table' },
      { label: 'SELECT', type: 'keyword' },
    ]);
    render(
      <SqlEditor
        value="SEL"
        onChange={onChange}
        onRun={onRun}
        onSuggest={onSuggest}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(3, 3);
    fireEvent.keyDown(textarea, { code: 'Space', ctrlKey: true });
    expect(onSuggest).toHaveBeenCalled();
    expect(screen.getByText('users')).toBeInTheDocument();
    expect(screen.getByText('SELECT')).toBeInTheDocument();
  });

  it('accepts a suggestion with Tab', () => {
    const onSuggest = jest
      .fn()
      .mockReturnValue([{ label: 'users', type: 'table' }]);
    render(
      <SqlEditor
        value="SEL"
        onChange={onChange}
        onRun={onRun}
        onSuggest={onSuggest}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(3, 3);
    fireEvent.keyDown(textarea, { code: 'Space', ctrlKey: true });
    fireEvent.keyDown(textarea, { key: 'Tab' });
    expect(onChange).toHaveBeenCalledWith('users');
  });

  it('cycles suggestions with ArrowDown and ArrowUp', () => {
    const onSuggest = jest.fn().mockReturnValue([
      { label: 'users', type: 'table' },
      { label: 'SELECT', type: 'keyword' },
    ]);
    render(
      <SqlEditor
        value="SEL"
        onChange={onChange}
        onRun={onRun}
        onSuggest={onSuggest}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(3, 3);
    fireEvent.keyDown(textarea, { code: 'Space', ctrlKey: true });
    fireEvent.keyDown(textarea, { key: 'ArrowDown' });
    fireEvent.keyDown(textarea, { key: 'ArrowDown' });
    fireEvent.keyDown(textarea, { key: 'ArrowUp' });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('SELECT');
  });

  it('closes suggestions with Escape', () => {
    const onSuggest = jest
      .fn()
      .mockReturnValue([{ label: 'users', type: 'table' }]);
    render(
      <SqlEditor
        value="SEL"
        onChange={onChange}
        onRun={onRun}
        onSuggest={onSuggest}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(3, 3);
    fireEvent.keyDown(textarea, { code: 'Space', ctrlKey: true });
    expect(screen.getByText('users')).toBeInTheDocument();
    fireEvent.keyDown(textarea, { key: 'Escape' });
    expect(screen.queryByText('users')).not.toBeInTheDocument();
  });

  it('accepts a suggestion by clicking it', () => {
    const onSuggest = jest
      .fn()
      .mockReturnValue([{ label: 'users', type: 'table' }]);
    render(
      <SqlEditor
        value="SEL"
        onChange={onChange}
        onRun={onRun}
        onSuggest={onSuggest}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(3, 3);
    fireEvent.keyDown(textarea, { code: 'Space', ctrlKey: true });
    fireEvent.mouseDown(screen.getByText('users'));
    fireEvent.click(screen.getByText('users'));
    expect(onChange).toHaveBeenCalledWith('users');
  });

  it('does not open suggestions when onSuggest is not provided', () => {
    render(<SqlEditor value="SEL" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { code: 'Space', ctrlKey: true });
    expect(screen.queryByText('users')).not.toBeInTheDocument();
  });

  it('highlights the error line in the gutter', () => {
    render(
      <SqlEditor
        value={'SELECT 1\nSELECT bad\nSELECT 3'}
        onChange={onChange}
        onRun={onRun}
        errorLine={2}
      />
    );
    const gutter = document.querySelectorAll('pre')[1] as HTMLPreElement;
    expect(gutter.innerHTML).toContain('text-error');
    expect(gutter.innerHTML).toContain('2');
  });

  it('does not open suggestions when the caret word is empty', () => {
    const onSuggest = jest.fn().mockReturnValue([{ label: 'x', type: 'kw' }]);
    render(
      <SqlEditor
        value="SEL "
        onChange={onChange}
        onRun={onRun}
        onSuggest={onSuggest}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(4, 4);
    fireEvent.keyDown(textarea, { code: 'Space', ctrlKey: true });
    expect(screen.queryByText('x')).not.toBeInTheDocument();
  });

  it('runs the selected text even when onRun receives non-whitespace', () => {
    const onRun2 = jest.fn();
    render(
      <SqlEditor value={'  \nSELECT 2'} onChange={onChange} onRun={onRun2} />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(0, 2);
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true });
    expect(onRun2).not.toHaveBeenCalled();
  });

  it('toggles comments with Ctrl+/', () => {
    render(
      <SqlEditor
        value={'SELECT 1;\nSELECT 2'}
        onChange={onChange}
        onRun={onRun}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(0, 16);
    fireEvent.keyDown(textarea, { key: '/', ctrlKey: true });
    expect(onChange).toHaveBeenCalledWith('-- SELECT 1;\n-- SELECT 2');
  });

  it('toggles comments on the last line without a trailing newline', () => {
    render(<SqlEditor value="SELECT 1" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: '/', ctrlKey: true });
    expect(onChange).toHaveBeenCalledWith('-- SELECT 1');
  });

  it('toggles comments with Cmd+/', () => {
    render(<SqlEditor value="SELECT 1" onChange={onChange} onRun={onRun} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { key: '/', metaKey: true });
    expect(onChange).toHaveBeenCalledWith('-- SELECT 1');
  });

  it('uncomments a commented line with Ctrl+/', () => {
    render(
      <SqlEditor
        value={'-- SELECT 1;\nSELECT 2'}
        onChange={onChange}
        onRun={onRun}
      />
    );
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    textarea.setSelectionRange(0, 12);
    fireEvent.keyDown(textarea, { key: '/', ctrlKey: true });
    expect(onChange).toHaveBeenCalledWith('SELECT 1;\nSELECT 2');
  });

  it('opens suggestions with Ctrl+Space and closes with Escape', () => {
    const onSuggest = jest.fn().mockReturnValue([
      { label: 'users', type: 'table' },
      { label: 'id', type: 'column' },
    ]);
    render(
      <SqlEditor
        value="SEL"
        onChange={onChange}
        onRun={onRun}
        onSuggest={onSuggest}
      />
    );
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { code: 'Space', metaKey: true });
    expect(screen.getByText('users')).toBeInTheDocument();
    const badge = document.querySelector('.badge-success');
    expect(badge).not.toBeNull();
    expect(document.querySelector('.badge-warning')).not.toBeNull();
    fireEvent.keyDown(textarea, { key: 'Escape' });
    expect(screen.queryByText('users')).not.toBeInTheDocument();
  });

  it('ignores other keys while the completion is open', () => {
    const onSuggest = jest
      .fn()
      .mockReturnValue([{ label: 'users', type: 'table' }]);
    render(
      <SqlEditor
        value="SEL"
        onChange={onChange}
        onRun={onRun}
        onSuggest={onSuggest}
      />
    );
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { code: 'Space', ctrlKey: true });
    fireEvent.keyDown(textarea, { key: 'a' });
    expect(screen.getByText('users')).toBeInTheDocument();
  });

  it('accepts a suggestion on Enter', () => {
    const onSuggest = jest
      .fn()
      .mockReturnValue([{ label: 'users', type: 'table' }]);
    render(
      <SqlEditor
        value="SEL"
        onChange={onChange}
        onRun={onRun}
        onSuggest={onSuggest}
      />
    );
    const textarea = screen.getByRole('textbox');
    fireEvent.keyDown(textarea, { code: 'Space', ctrlKey: true });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('users');
  });
});
