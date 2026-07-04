import { render, fireEvent, screen } from '@testing-library/react';
import { MarkdownModal } from '..';
import { saveAs } from 'file-saver';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

jest.mock('../utils/pdfExport', () => ({
  exportPdf: jest.fn(),
}));

jest.mock('../hooks/useCodeMirror', () => {
  const exec = jest.fn();
  return {
    useCodeMirror: jest.fn().mockReturnValue({
      editorRef: { current: null },
      viewRef: { current: null },
      exec,
    }),
  };
});

jest.mock('../hooks/useDraftPersistence', () => ({
  useDraftRestore: jest.fn(),
  useDraftSave: jest.fn(),
}));

jest.mock('../hooks/useScrollSync', () => ({
  useScrollSync: jest.fn().mockReturnValue({ current: null }),
}));

jest.mock('../hooks/useMarkdownRender', () => ({
  useMarkdownRender: jest.fn(),
}));

jest.mock('../components/FileToolbar', () => ({
  FileToolbar: (props: any) => {
    const React = require('react');
    return React.createElement(
      'div',
      null,
      'FileToolbar',
      React.createElement(
        'button',
        { onClick: props.onNew, 'data-testid': 'btn-new' },
        'New'
      ),
      React.createElement(
        'button',
        { onClick: props.onOpen, 'data-testid': 'btn-open' },
        'Open'
      ),
      React.createElement(
        'button',
        { onClick: props.onSave, 'data-testid': 'btn-save' },
        'Save'
      ),
      React.createElement(
        'button',
        { onClick: props.onCopyMarkdown, 'data-testid': 'btn-copymd' },
        'CopyMD'
      ),
      React.createElement(
        'button',
        { onClick: props.onCopyHTML, 'data-testid': 'btn-copyhtml' },
        'CopyHTML'
      ),
      React.createElement(
        'button',
        { onClick: props.onExportHTML, 'data-testid': 'btn-exporthtml' },
        'ExportHTML'
      ),
      React.createElement(
        'button',
        { onClick: props.onDownloadPdf, 'data-testid': 'btn-downloadpdf' },
        'DownloadPDF'
      )
    );
  },
}));

jest.mock('../components/FormatToolbar', () => ({
  FormatToolbar: () => <div>FormatToolbar</div>,
}));

jest.mock('../components/MarkdownPreviewer', () => ({
  MarkdownPreviewer: () => <div>MarkdownPreviewer</div>,
}));

jest.mock('../components/StatsBar', () => ({
  StatsBar: () => <div>StatsBar</div>,
}));

jest.mock('../components/TocSidebar', () => ({
  TocSidebar: () => <div>TocSidebar</div>,
}));

jest.mock('../components/ViewControls', () => ({
  ViewControls: ({
    onViewModeChange,
    onTocToggle,
    onLineNumbersToggle,
    onFontChange,
  }: any) => (
    <div>
      <button onClick={() => onViewModeChange('preview')}>Preview</button>
      <button onClick={() => onViewModeChange('editor')}>Editor</button>
      <button onClick={() => onTocToggle()}>ToC</button>
      <button onClick={() => onLineNumbersToggle()}>#Line</button>
      <select
        onChange={(e) => onFontChange(e.target.value)}
        data-testid="font-select">
        <option value="sans">Sans</option>
      </select>
    </div>
  ),
}));

describe('MarkdownModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders modal title', () => {
    render(<MarkdownModal onClose={onClose} />);
    expect(screen.getByText('Markdown Editor')).toBeInTheDocument();
  });

  it('renders FileToolbar', () => {
    render(<MarkdownModal onClose={onClose} />);
    expect(screen.getByText('FileToolbar')).toBeInTheDocument();
  });

  it('renders FormatToolbar', () => {
    render(<MarkdownModal onClose={onClose} />);
    expect(screen.getByText('FormatToolbar')).toBeInTheDocument();
  });

  it('renders StatsBar', () => {
    render(<MarkdownModal onClose={onClose} />);
    expect(screen.getByText('StatsBar')).toBeInTheDocument();
  });

  it('renders hidden file input', () => {
    render(<MarkdownModal onClose={onClose} />);
    expect(document.querySelector('input[type="file"]')).toBeInTheDocument();
  });

  it('handles save by calling saveAs', () => {
    render(<MarkdownModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Save'));
    expect(saveAs).toHaveBeenCalled();
  });

  it('handles new by clearing local storage', () => {
    localStorage.setItem('@hieudoanm/markdown-draft', 'test-draft');
    render(<MarkdownModal onClose={onClose} />);
    fireEvent.click(screen.getByText('New'));
    expect(localStorage.getItem('@hieudoanm/markdown-draft')).toBeNull();
  });

  it('handles copy markdown', () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn() },
    });
    render(<MarkdownModal onClose={onClose} />);
    fireEvent.click(screen.getByText('CopyMD'));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('handles copy HTML', () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn() },
    });
    render(<MarkdownModal onClose={onClose} />);
    fireEvent.click(screen.getByText('CopyHTML'));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('handles export HTML', () => {
    render(<MarkdownModal onClose={onClose} />);
    fireEvent.click(screen.getByText('ExportHTML'));
    expect(saveAs).toHaveBeenCalled();
  });

  it('handles download PDF', () => {
    const { exportPdf } = require('../utils/pdfExport');
    render(<MarkdownModal onClose={onClose} />);
    fireEvent.click(screen.getByText('DownloadPDF'));
    expect(exportPdf).toHaveBeenCalled();
  });

  it('toggles TOC visibility', () => {
    render(<MarkdownModal onClose={onClose} />);
    fireEvent.click(screen.getByText('ToC'));
    expect(screen.getByText('TocSidebar')).toBeInTheDocument();
  });

  it('changes view mode to preview', () => {
    render(<MarkdownModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Preview'));
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('changes view mode to editor', () => {
    render(<MarkdownModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Editor'));
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });
});
