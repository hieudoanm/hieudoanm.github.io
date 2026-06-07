import { render, screen } from '@testing-library/react';
import { YamlEditor } from '../YamlEditor';

jest.mock('@codemirror/state', () => ({
  EditorState: {
    create: jest.fn().mockReturnValue({
      doc: { toString: () => '' },
    }),
  },
}));

jest.mock('@codemirror/view', () => {
  const EditorView = jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
    state: { doc: { toString: () => '' } },
    dispatch: jest.fn(),
  }));
  EditorView.lineWrapping = {};
  EditorView.theme = jest.fn().mockReturnValue({});
  EditorView.updateListener = { of: jest.fn().mockReturnValue([]) };
  return { EditorView };
});

jest.mock('@codemirror/lang-yaml', () => ({
  yaml: jest.fn().mockReturnValue([]),
}));

jest.mock('@codemirror/theme-one-dark', () => ({
  oneDark: [],
}));

describe('YamlEditor', () => {
  const onChange = jest.fn();

  it('renders editor container', () => {
    const { container } = render(
      <YamlEditor value="test: value" onChange={onChange} />
    );
    expect(container.querySelector('[class*="flex-1"]')).toBeInTheDocument();
  });
});
