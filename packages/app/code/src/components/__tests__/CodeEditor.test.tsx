import { render } from '@testing-library/react';
import { CodeEditor } from '../CodeEditor';

jest.mock('../../utils/editor-languages', () => ({
  getLanguageExtension: jest.fn(() => null),
}));

describe('CodeEditor', () => {
  it('renders a container div', () => {
    const { container } = render(
      <CodeEditor
        filename="test.ts"
        content=""
        wordWrap={false}
        onChange={() => {}}
        onSave={() => {}}
        onCursorChange={() => {}}
      />
    );
    const div = container.firstChild as HTMLElement;
    expect(div.tagName).toBe('DIV');
  });

  it('renders with content', () => {
    const { container } = render(
      <CodeEditor
        filename="test.ts"
        content="const x = 1;"
        wordWrap={false}
        onChange={() => {}}
        onSave={() => {}}
        onCursorChange={() => {}}
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
