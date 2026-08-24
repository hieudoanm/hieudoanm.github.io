import { fireEvent, render, screen } from '@testing-library/react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { CaseToolbar } from '@/components/editor/CaseToolbar';

const createView = (
  doc: string
): { view: EditorView; host: HTMLDivElement } => {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const view = new EditorView({
    state: EditorState.create({ doc, extensions: [] }),
    parent: host,
  });
  return { view, host };
};

describe('CaseToolbar', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('disables every button when there is no view', () => {
    render(<CaseToolbar view={null} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
    buttons.forEach((button) => expect(button).toBeDisabled());
  });

  it.each([
    ['Case UPPER', 'HELLO WORLD'],
    ['Case lower', 'hello world'],
    ['Title case', 'Hello World'],
    ['Case camelCase', 'helloWorld'],
    ['Case snake_case', 'hello_world'],
    ['Case kebab-case', 'hello-world'],
  ])('applies %s to the selection', (label, expected) => {
    const { view } = createView('hello world');
    view.dispatch({ selection: { anchor: 0, head: 11 } });
    render(<CaseToolbar view={view} />);

    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(view.state.doc.toString()).toBe(expected);
  });

  it('converts the whole document without a selection', () => {
    const { view } = createView('hello world');
    view.dispatch({ selection: { anchor: 3, head: 3 } });
    render(<CaseToolbar view={view} />);

    fireEvent.click(screen.getByRole('button', { name: 'Case UPPER' }));
    expect(view.state.doc.toString()).toBe('HELLO WORLD');
  });
});
