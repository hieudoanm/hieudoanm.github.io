import { fireEvent, render, screen } from '@testing-library/react';
import { JSONSchemaModal } from '../JSONSchemaModal';

jest.mock('@codemirror/lang-json', () => ({
  json: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-yaml', () => ({
  yaml: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-java', () => ({
  java: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-javascript', () => ({
  javascript: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-python', () => ({
  python: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-rust', () => ({
  rust: jest.fn(() => []),
}));

jest.mock('@codemirror/lang-xml', () => ({
  xml: jest.fn(() => []),
}));

jest.mock('@codemirror/state', () => ({
  EditorState: { create: jest.fn() },
}));

jest.mock('@codemirror/view', () => ({
  EditorView: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
    dom: document.createElement('div'),
    state: { doc: { toString: () => '{}' } },
    dispatch: jest.fn(),
  })),
  keymap: jest.fn(() => []),
}));

jest.mock('../JSONSchemaModal/hooks/useCodeMirror', () => ({
  useCodeMirror: jest.fn(() => ({
    ref: { current: document.createElement('div') },
    viewRef: { current: null },
  })),
}));

jest.mock('@lodashx/ts', () => ({
  json: jest.fn((data) => ({
    convert: jest.fn((fmt: string) => {
      if (fmt === 'schema') return '{\n  "type": "object"\n}';
      if (fmt === 'java') return 'public class Data {}';
      if (fmt === 'py') return 'class Data: pass';
      if (fmt === 'rs') return 'struct Data {};';
      if (fmt === 'ts') return 'interface Data {}';
      if (fmt === 'xml') return '<root></root>';
      if (fmt === 'yaml') return 'key: value';
      return JSON.stringify(data, null, 2);
    }),
  })),
  parseJson: jest.fn((text: string) => JSON.parse(text)),
}));

jest.mock('yaml', () => ({
  parse: jest.fn(() => ({ key: 'value' })),
  stringify: jest.fn(() => 'key: value\n'),
}));

describe('JSONSchemaModal', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  it('should render with JSON input by default', () => {
    const { container } = render(<JSONSchemaModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('should switch between json and yaml input modes', () => {
    render(<JSONSchemaModal onClose={jest.fn()} />);
    const tabs = screen.getAllByRole('tab');
    const yamlTab = tabs.find((t) => t.textContent === 'YAML');
    if (yamlTab) fireEvent.click(yamlTab);
  });

  it('should switch to schema panel', () => {
    render(<JSONSchemaModal onClose={jest.fn()} />);
    const schemaTab = screen.getByText('📐 Schema');
    fireEvent.click(schemaTab);
    expect(schemaTab).toBeInTheDocument();
  });

  it('should switch to convert panel', () => {
    render(<JSONSchemaModal onClose={jest.fn()} />);
    const convertTab = screen.getByText('🔀 Convert');
    fireEvent.click(convertTab);
    expect(convertTab).toBeInTheDocument();
  });

  it('should click beautify', () => {
    render(<JSONSchemaModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Beautify'));
  });

  it('should click minify', () => {
    render(<JSONSchemaModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Minify'));
  });

  it('should click sort', () => {
    render(<JSONSchemaModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Sort'));
  });

  it('should copy active panel content', () => {
    render(<JSONSchemaModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('📋'));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('should minify be disabled in yaml mode', () => {
    render(<JSONSchemaModal onClose={jest.fn()} />);
    const tabs = screen.getAllByRole('tab');
    const yamlTab = tabs.find((t) => t.textContent === 'YAML');
    if (yamlTab) fireEvent.click(yamlTab);
    expect(screen.getByText('Minify')).toBeDisabled();
  });
});
