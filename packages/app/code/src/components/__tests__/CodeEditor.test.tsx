import { render } from '@testing-library/react';
import { CodeEditor } from '../CodeEditor';

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
});
