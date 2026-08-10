import { fireEvent, render, screen } from '@testing-library/react';
import TextPane from '@/components/editor/TextPane';

describe('TextPane', () => {
  it('renders the source text and line numbers', () => {
    const onChange = jest.fn();
    render(
      <TextPane errors={[]} onChange={onChange} text={'node a: A\nnode b: B'} />
    );
    const editor = screen.getByLabelText(
      'Diagram source'
    ) as HTMLTextAreaElement;
    expect(editor.value).toBe('node a: A\nnode b: B');
    expect(screen.getByText('2 lines')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('reports edits through onChange', () => {
    const onChange = jest.fn();
    render(<TextPane errors={[]} onChange={onChange} text="node a: A" />);
    fireEvent.change(screen.getByLabelText('Diagram source'), {
      target: { value: 'node a: B' },
    });
    expect(onChange).toHaveBeenCalledWith('node a: B');
  });

  it('highlights lines with parse errors', () => {
    render(
      <TextPane
        errors={[{ line: 2, message: 'bad' }]}
        onChange={jest.fn()}
        text={'node a: A\nbroken'}
      />
    );
    const errorLine = screen.getByText('2');
    expect(errorLine.className).toContain('text-error');
  });

  it('syncs the gutter scroll with the textarea', () => {
    render(
      <TextPane
        errors={[]}
        onChange={jest.fn()}
        text={'node a: A\nnode b: B'}
      />
    );
    const editor = screen.getByLabelText('Diagram source');
    fireEvent.scroll(editor, { target: { scrollTop: 42 } });
    const gutter = document.querySelector(
      '[aria-hidden="true"]'
    ) as HTMLDivElement;
    expect(gutter.scrollTop).toBe(42);
  });
});
